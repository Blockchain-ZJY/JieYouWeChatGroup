import React, { useState, useEffect } from 'react';

const PaymentPage = ({ onPaymentSuccess, onBack }) => {
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, success, failed
  const [countdown, setCountdown] = useState(300); // 5分钟倒计时

  // 模拟支付状态检查（实际项目中应该调用后端API）
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPaymentStatus('failed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 模拟支付成功检测（实际项目中应该通过后端回调）
    const paymentCheck = setTimeout(() => {
      // 这里可以添加实际的支付状态检查逻辑
      // 示例：随机在30-60秒后模拟支付成功
      const randomDelay = Math.random() * 30000 + 30000;
      setTimeout(() => {
        setPaymentStatus('success');
        clearInterval(timer);
        setTimeout(() => {
          onPaymentSuccess();
        }, 2000);
      }, randomDelay);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(paymentCheck);
    };
  }, [onPaymentSuccess]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (paymentStatus === 'success') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md mx-4 text-center border border-white/20">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-white mb-2">支付成功！</h2>
          <p className="text-purple-200 mb-4">正在跳转到加群页面...</p>
          <div className="animate-spin w-8 h-8 border-4 border-white/20 border-t-white rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md mx-4 text-center border border-white/20">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-2">支付超时</h2>
          <p className="text-purple-200 mb-6">请重新发起支付</p>
          <button
            onClick={onBack}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            返回重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center z-50">
      {/* 背景星光 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md mx-4 text-center border border-white/20 relative">
        {/* 关闭按钮 */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">微信支付</h2>
        <p className="text-purple-200 mb-6">扫描下方二维码完成支付</p>

        {/* 支付金额 */}
        <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-2xl p-4 mb-6 border border-orange-400/30">
          <div className="text-3xl font-bold text-white mb-1">¥19.9</div>
          <div className="text-orange-200 text-sm">戒忧南昌同城搭子群</div>
        </div>

        {/* 二维码区域 */}
        <div className="bg-white rounded-2xl p-6 mb-6 relative">
          <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
            <img src={require('../pics/收款码.jpg')} alt="微信收款码" className="w-full h-full object-contain rounded-xl" />
          </div>
        </div>

        {/* 新按钮 */}
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl text-lg mt-2 transition-colors"
          onClick={() => {
            window.open('https://w.url.qq.com/?id=戒忧南昌同城搭子群', '_blank');
          }}
        >
          已支付，添加群主入群
        </button>

        {/* 倒计时 */}
        <div className="text-center mb-4">
          <div className="text-white/80 text-sm mb-2">支付剩余时间</div>
          <div className="text-2xl font-bold text-orange-300">
            {formatTime(countdown)}
          </div>
        </div>

        {/* 支付说明 */}
        <div className="text-purple-200 text-sm space-y-1">
          <p>• 请在{formatTime(countdown)}内完成支付</p>
          <p>• 支付成功后将自动跳转</p>
          <p>• 如有问题请联系客服</p>
        </div>

        {/* 底部按钮 */}
        <div className="mt-6 flex space-x-3">
          <button
            onClick={onBack}
            className="flex-1 bg-white/10 text-white font-medium py-3 px-4 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
          >
            取消支付
          </button>
          <button
            onClick={() => {
              // 刷新支付状态的逻辑
              window.location.reload();
            }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            刷新状态
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 