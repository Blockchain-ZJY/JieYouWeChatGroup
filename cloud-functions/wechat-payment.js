// 腾讯云云函数 - 微信支付处理
// 文件名: wechat-payment.js

const crypto = require('crypto');
const axios = require('axios');

// 微信支付配置（在云函数环境变量中配置）
const WECHAT_CONFIG = {
  appid: process.env.WECHAT_APPID,
  mchid: process.env.WECHAT_MCHID,
  private_key: process.env.WECHAT_PRIVATE_KEY,
  serial_no: process.env.WECHAT_SERIAL_NO,
  api_key_v3: process.env.WECHAT_API_KEY_V3,
};

// 生成签名
function generateSignature(method, url, timestamp, nonce, body) {
  const message = `${method}\n${url}\n${timestamp}\n${nonce}\n${body}\n`;
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(message);
  return sign.sign(WECHAT_CONFIG.private_key, 'base64');
}

// 创建支付订单
async function createPaymentOrder(amount, description) {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomBytes(16).toString('hex');
  const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const orderData = {
    appid: WECHAT_CONFIG.appid,
    mchid: WECHAT_CONFIG.mchid,
    description: description,
    out_trade_no: orderId,
    notify_url: 'https://your-domain.com/payment-notify', // 支付回调地址
    amount: {
      total: Math.round(amount * 100), // 转换为分
      currency: 'CNY'
    },
  };

  const body = JSON.stringify(orderData);
  const url = '/v3/pay/transactions/native';
  const signature = generateSignature('POST', url, timestamp, nonce, body);
  
  const authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${WECHAT_CONFIG.mchid}",nonce_str="${nonce}",signature="${signature}",timestamp="${timestamp}",serial_no="${WECHAT_CONFIG.serial_no}"`;

  try {
    const response = await axios.post(`https://api.mch.weixin.qq.com${url}`, orderData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authorization,
      },
    });

    return {
      success: true,
      orderId: orderId,
      qrCode: response.data.code_url,
      expireTime: Date.now() + 5 * 60 * 1000, // 5分钟后过期
    };
  } catch (error) {
    console.error('微信支付订单创建失败:', error.response?.data || error.message);
    throw new Error('支付订单创建失败');
  }
}

// 查询支付状态
async function queryPaymentStatus(orderId) {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomBytes(16).toString('hex');
  
  const url = `/v3/pay/transactions/out-trade-no/${orderId}?mchid=${WECHAT_CONFIG.mchid}`;
  const signature = generateSignature('GET', url, timestamp, nonce, '');
  
  const authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${WECHAT_CONFIG.mchid}",nonce_str="${nonce}",signature="${signature}",timestamp="${timestamp}",serial_no="${WECHAT_CONFIG.serial_no}"`;

  try {
    const response = await axios.get(`https://api.mch.weixin.qq.com${url}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': authorization,
      },
    });

    const tradeState = response.data.trade_state;
    let status = 'pending';
    
    if (tradeState === 'SUCCESS') {
      status = 'success';
    } else if (tradeState === 'CLOSED' || tradeState === 'PAYERROR') {
      status = 'failed';
    }

    return {
      success: true,
      status: status,
      orderId: orderId,
      paidAt: tradeState === 'SUCCESS' ? response.data.success_time : null,
    };
  } catch (error) {
    console.error('查询支付状态失败:', error.response?.data || error.message);
    return {
      success: false,
      error: '查询失败',
    };
  }
}

// 云函数主入口
exports.main = async (event, context) => {
  const { httpMethod, path, body } = event;
  
  try {
    // 创建支付订单
    if (httpMethod === 'POST' && path === '/create-payment') {
      const { amount, description } = JSON.parse(body);
      
      if (!amount || !description) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '参数不完整' }),
        };
      }

      const result = await createPaymentOrder(amount, description);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(result),
      };
    }
    
    // 查询支付状态
    if (httpMethod === 'GET' && path.startsWith('/check-payment/')) {
      const orderId = path.split('/').pop();
      
      if (!orderId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '订单ID不能为空' }),
        };
      }

      const result = await queryPaymentStatus(orderId);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(result),
      };
    }
    
    // 支付回调处理
    if (httpMethod === 'POST' && path === '/payment-notify') {
      // 处理微信支付回调
      // 这里需要验证签名和处理支付成功逻辑
      console.log('收到支付回调:', body);
      
      return {
        statusCode: 200,
        body: JSON.stringify({ code: 'SUCCESS', message: '成功' }),
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ error: '接口不存在' }),
    };
    
  } catch (error) {
    console.error('云函数执行错误:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: '服务器内部错误' }),
    };
  }
}; 