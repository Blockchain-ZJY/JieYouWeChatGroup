// 第三方聚合支付平台集成
// 推荐平台：Ping++, BeeCloud, PayJS等

// 方案1：使用PayJS（个人开发者友好）
const PAYJS_CONFIG = {
  mchid: 'your_payjs_mchid', // PayJS商户号
  key: 'your_payjs_key',     // PayJS密钥
  api_url: 'https://payjs.cn/api/native',
};

export const createPayJSOrder = async (amount, description) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const orderId = `ORDER_${Date.now()}`;
    
    // 构造签名参数
    const params = {
      mchid: PAYJS_CONFIG.mchid,
      total_fee: Math.round(amount * 100), // 转换为分
      out_trade_no: orderId,
      body: description,
      notify_url: 'https://your-domain.com/notify',
    };
    
    // 生成签名
    const sign = generatePayJSSign(params, PAYJS_CONFIG.key);
    params.sign = sign;
    
    const response = await fetch(PAYJS_CONFIG.api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    const data = await response.json();
    
    if (data.return_code === 1) {
      return {
        success: true,
        orderId: orderId,
        qrCode: data.code_url,
        payjs_order_id: data.payjs_order_id,
      };
    } else {
      throw new Error(data.return_msg || '创建订单失败');
    }
  } catch (error) {
    console.error('PayJS创建订单失败:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// PayJS签名生成
function generatePayJSSign(params, key) {
  const sortedParams = Object.keys(params)
    .filter(k => k !== 'sign' && params[k])
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join('&');
  
  const stringToSign = `${sortedParams}&key=${key}`;
  
  // 使用MD5加密（需要引入crypto-js库）
  // npm install crypto-js
  const CryptoJS = require('crypto-js');
  return CryptoJS.MD5(stringToSign).toString().toUpperCase();
}

// 方案2：使用Ping++
const PINGPP_CONFIG = {
  app_id: 'your_pingpp_app_id',
  api_key: 'your_pingpp_api_key',
  api_url: 'https://api.pingxx.com/v1/charges',
};

export const createPingppOrder = async (amount, description) => {
  try {
    const orderData = {
      order_no: `ORDER_${Date.now()}`,
      app: { id: PINGPP_CONFIG.app_id },
      channel: 'wx_pub_qr', // 微信公众号二维码支付
      amount: Math.round(amount * 100), // 转换为分
      currency: 'cny',
      client_ip: '127.0.0.1', // 客户端IP
      subject: description,
      body: description,
      extra: {},
    };

    const response = await fetch(PINGPP_CONFIG.api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PINGPP_CONFIG.api_key}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    
    if (data.id) {
      return {
        success: true,
        orderId: data.order_no,
        qrCode: data.credential.wx_pub_qr,
        charge_id: data.id,
      };
    } else {
      throw new Error(data.error?.message || '创建订单失败');
    }
  } catch (error) {
    console.error('Ping++创建订单失败:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// 方案3：使用易支付（码支付）
const EPAY_CONFIG = {
  pid: 'your_epay_pid',
  key: 'your_epay_key',
  api_url: 'https://your-epay-domain.com/submit.php',
};

export const createEpayOrder = async (amount, description) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const orderId = `ORDER_${Date.now()}`;
    
    const params = {
      pid: EPAY_CONFIG.pid,
      type: 'wxpay', // 微信支付
      out_trade_no: orderId,
      notify_url: 'https://your-domain.com/notify',
      return_url: 'https://your-domain.com/return',
      name: description,
      money: amount.toString(),
      clientip: '127.0.0.1',
    };
    
    // 生成签名
    const sign = generateEpaySign(params, EPAY_CONFIG.key);
    params.sign = sign;
    params.sign_type = 'MD5';
    
    // 构造支付URL
    const payUrl = `${EPAY_CONFIG.api_url}?${new URLSearchParams(params).toString()}`;
    
    return {
      success: true,
      orderId: orderId,
      payUrl: payUrl, // 直接跳转的支付页面
      qrCode: null, // 易支付通常是页面跳转，不是二维码
    };
  } catch (error) {
    console.error('易支付创建订单失败:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// 易支付签名生成
function generateEpaySign(params, key) {
  const sortedParams = Object.keys(params)
    .filter(k => k !== 'sign' && k !== 'sign_type' && params[k])
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join('&');
  
  const stringToSign = `${sortedParams}&key=${key}`;
  
  const CryptoJS = require('crypto-js');
  return CryptoJS.MD5(stringToSign).toString();
}

// 统一支付接口
export const createPaymentOrder = async (amount, description, method = 'payjs') => {
  switch (method) {
    case 'payjs':
      return await createPayJSOrder(amount, description);
    case 'pingpp':
      return await createPingppOrder(amount, description);
    case 'epay':
      return await createEpayOrder(amount, description);
    default:
      throw new Error('不支持的支付方式');
  }
}; 