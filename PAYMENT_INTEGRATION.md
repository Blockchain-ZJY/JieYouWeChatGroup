# 支付系统集成指南

## 📱 **当前实现**

目前的支付流程是模拟实现，包含以下功能：
- 支付页面展示
- 倒计时功能
- 模拟支付成功检测
- 自动跳转到加群页面

## 🔧 **真实支付集成步骤**

### **1. 选择支付服务商**

推荐的支付服务商：
- **微信支付** - 适合微信生态
- **支付宝** - 覆盖面广
- **Ping++** - 聚合支付平台
- **PayPal** - 国际支付

### **2. 后端API开发**

需要开发以下后端接口：

```javascript
// 创建支付订单
POST /api/payment/create
{
  "amount": 16.8,
  "description": "戒忧南昌同城搭子群",
  "user_info": "用户标识"
}

// 查询支付状态
GET /api/payment/status/{orderId}

// 支付回调接口
POST /api/payment/notify
```

### **3. 微信支付集成**

#### **后端集成（Node.js示例）**

```javascript
const WxPay = require('wechatpay-node-v3');

// 创建支付订单
app.post('/api/payment/wechat/create', async (req, res) => {
  try {
    const { amount, description } = req.body;
    
    const order = {
      appid: process.env.WECHAT_APPID,
      mchid: process.env.WECHAT_MCHID,
      description: description,
      out_trade_no: `ORDER_${Date.now()}`,
      notify_url: process.env.NOTIFY_URL,
      amount: {
        total: Math.round(amount * 100), // 转换为分
        currency: 'CNY'
      }
    };

    const result = await wxpay.transactions_native(order);
    
    res.json({
      success: true,
      orderId: order.out_trade_no,
      qrCode: result.code_url,
      amount: amount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 支付回调
app.post('/api/payment/notify', async (req, res) => {
  try {
    // 验证签名
    const { resource } = req.body;
    // 处理支付成功逻辑
    // 更新订单状态
    // 发送入群邀请等
    
    res.json({ code: 'SUCCESS', message: '成功' });
  } catch (error) {
    res.status(500).json({ code: 'FAIL', message: '失败' });
  }
});
```

#### **前端集成修改**

修改 `src/components/PaymentPage.js`：

```javascript
import { createPaymentOrder, checkPaymentStatus } from '../utils/paymentAPI';

// 在 useEffect 中
useEffect(() => {
  const initPayment = async () => {
    try {
      const order = await createPaymentOrder(16.8, '戒忧南昌同城搭子群');
      setOrderId(order.orderId);
      setQrCodeUrl(order.qrCode);
      
      // 开始轮询支付状态
      const interval = setInterval(async () => {
        const status = await checkPaymentStatus(order.orderId);
        if (status.status === 'success') {
          setPaymentStatus('success');
          clearInterval(interval);
          onPaymentSuccess();
        }
      }, 2000);
      
    } catch (error) {
      console.error('支付初始化失败:', error);
    }
  };
  
  initPayment();
}, []);
```

### **4. 支付宝集成**

```javascript
// 支付宝SDK集成示例
const AlipaySdk = require('alipay-sdk').default;

const alipaySdk = new AlipaySdk({
  appId: process.env.ALIPAY_APPID,
  privateKey: process.env.ALIPAY_PRIVATE_KEY,
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY,
});

app.post('/api/payment/alipay/create', async (req, res) => {
  try {
    const { amount, description } = req.body;
    
    const result = await alipaySdk.exec('alipay.trade.precreate', {
      out_trade_no: `ORDER_${Date.now()}`,
      total_amount: amount,
      subject: description,
      notify_url: process.env.NOTIFY_URL,
    });
    
    res.json({
      success: true,
      qrCode: result.qr_code,
      orderId: result.out_trade_no
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### **5. 环境变量配置**

创建 `.env` 文件：

```env
# 微信支付配置
WECHAT_APPID=your_wechat_appid
WECHAT_MCHID=your_merchant_id
WECHAT_PRIVATE_KEY=your_private_key
WECHAT_SERIAL_NO=your_serial_no

# 支付宝配置
ALIPAY_APPID=your_alipay_appid
ALIPAY_PRIVATE_KEY=your_alipay_private_key
ALIPAY_PUBLIC_KEY=alipay_public_key

# 回调地址
NOTIFY_URL=https://yourdomain.com/api/payment/notify
```

### **6. 数据库设计**

```sql
-- 订单表
CREATE TABLE payment_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id VARCHAR(50) UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'success', 'failed', 'cancelled') DEFAULT 'pending',
  payment_method VARCHAR(20),
  user_info TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP NULL,
  INDEX idx_order_id (order_id),
  INDEX idx_status (status)
);

-- 用户表（可选）
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  wechat_id VARCHAR(100),
  phone VARCHAR(20),
  join_status ENUM('pending', 'joined') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **7. 安全注意事项**

1. **签名验证**：必须验证支付回调的签名
2. **HTTPS**：生产环境必须使用HTTPS
3. **订单防重**：避免重复支付
4. **金额校验**：回调时验证金额是否正确
5. **日志记录**：记录所有支付相关操作

### **8. 测试环境**

```javascript
// 测试环境可以添加快速支付按钮
{process.env.NODE_ENV === 'development' && (
  <button
    onClick={() => {
      setPaymentStatus('success');
      setTimeout(() => onPaymentSuccess(), 1000);
    }}
    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
  >
    测试支付成功
  </button>
)}
```

## 🚀 **部署建议**

1. 使用HTTPS证书
2. 配置域名白名单
3. 设置支付回调URL
4. 监控支付成功率
5. 设置异常告警

## 📞 **技术支持**

如需要完整的支付集成开发，可以：
1. 联系专业的支付集成服务商
2. 使用聚合支付平台（如Ping++、BeeCloud等）
3. 参考官方文档进行集成

---

**注意**：当前版本是演示版本，实际使用时需要集成真实的支付接口。 