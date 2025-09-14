// 使用腾讯云云函数实现微信支付
// 需要先在腾讯云创建云函数

const CLOUD_FUNCTION_URL = 'https://your-scf-url.tencentcloudapi.com';

export const createWechatPayOrder = async (amount, description, userInfo = {}) => {
  try {
    const response = await fetch(`${CLOUD_FUNCTION_URL}/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        description: description,
        user_info: userInfo,
        timestamp: Date.now(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      orderId: data.orderId,
      qrCode: data.qrCode,
      amount: amount,
      expireTime: data.expireTime,
    };
  } catch (error) {
    console.error('创建支付订单失败:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const checkPaymentStatus = async (orderId) => {
  try {
    const response = await fetch(`${CLOUD_FUNCTION_URL}/check-payment/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      status: data.status, // pending, success, failed
      orderId: data.orderId,
      paidAt: data.paidAt,
    };
  } catch (error) {
    console.error('查询支付状态失败:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// 使用WebSocket实时获取支付状态（可选）
export const subscribePaymentStatus = (orderId, callback) => {
  const ws = new WebSocket(`wss://your-websocket-url/${orderId}`);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'payment_status') {
      callback(data.status, data);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket连接错误:', error);
  };

  return () => {
    ws.close();
  };
}; 