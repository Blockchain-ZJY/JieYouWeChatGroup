// 支付API模拟工具
// 在实际项目中，这些应该是真实的API调用

export const createPaymentOrder = async (amount, description) => {
  // 模拟创建支付订单
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        orderId: `ORDER_${Date.now()}`,
        amount: amount,
        description: description,
        qrCode: 'https://example.com/qrcode', // 实际项目中这里是真实的支付二维码
        expireTime: Date.now() + 5 * 60 * 1000, // 5分钟后过期
      });
    }, 1000);
  });
};

export const checkPaymentStatus = async (orderId) => {
  // 模拟检查支付状态
  return new Promise((resolve) => {
    setTimeout(() => {
      // 随机返回支付状态（实际项目中应该查询真实状态）
      const statuses = ['pending', 'success', 'failed'];
      const randomStatus = Math.random() < 0.3 ? 'success' : 'pending'; // 30%概率成功
      
      resolve({
        orderId: orderId,
        status: randomStatus,
        paidAt: randomStatus === 'success' ? new Date().toISOString() : null,
      });
    }, 1000);
  });
};

export const generateQRCode = (paymentUrl) => {
  // 实际项目中可以使用qrcode库生成二维码
  // 这里返回模拟的二维码数据
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="white"/>
      <rect x="10" y="10" width="180" height="180" fill="black"/>
      <rect x="20" y="20" width="160" height="160" fill="white"/>
      <text x="100" y="110" text-anchor="middle" font-size="12" fill="black">
        微信支付二维码
      </text>
    </svg>
  `)}`;
};

// 实际项目中的集成示例：

/*
// 微信支付集成示例
export const createWechatPayOrder = async (amount, description) => {
  try {
    const response = await fetch('/api/payment/wechat/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // 微信支付金额以分为单位
        description: description,
        notify_url: window.location.origin + '/api/payment/notify',
        return_url: window.location.origin + '/payment/success',
      }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('创建支付订单失败:', error);
    throw error;
  }
};

// 支付宝支付集成示例
export const createAlipayOrder = async (amount, description) => {
  try {
    const response = await fetch('/api/payment/alipay/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        subject: description,
        notify_url: window.location.origin + '/api/payment/notify',
        return_url: window.location.origin + '/payment/success',
      }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('创建支付订单失败:', error);
    throw error;
  }
};
*/ 