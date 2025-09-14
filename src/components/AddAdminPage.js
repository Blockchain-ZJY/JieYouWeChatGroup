import React, { useState } from 'react';

const AddAdminPage = ({ onBack }) => {
  const [copied, setCopied] = useState(false);

  const copyWechatId = () => {
    // 这里可以设置实际的微信号
    const wechatId = "nanchang_admin_2024";
    navigator.clipboard.writeText(wechatId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center z-50">
      {/* 背景星光 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(80)].map((_, i) => (
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

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-lg mx-4 text-center border border-white/20 relative">
        {/* 关闭按钮 */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
        >
          ×
        </button>

        {/* 成功提示 */}
        <div className="mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-2">支付成功！</h2>
          <p className="text-green-300 text-lg">欢迎加入戒忧南昌同城搭子群</p>
        </div>

        {/* 步骤说明 */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 mb-8 border border-blue-400/30">
          <h3 className="text-xl font-bold text-white mb-4">📱 接下来请按以下步骤操作：</h3>
          <div className="text-left space-y-3 text-purple-200">
            <div className="flex items-start space-x-3">
              <span className="bg-blue-500 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>长按下方二维码识别或保存到相册</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-500 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>添加管理员微信好友</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-500 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>发送付款截图给管理员验证</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-500 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
              <span>管理员验证后拉您入群</span>
            </div>
          </div>
        </div>

        {/* 管理员二维码 */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-2xl">
          <h4 className="text-gray-800 font-bold text-lg mb-4">扫码添加管理员微信</h4>
          <div className="relative">
            <img
              src="pics/admin/admin.jpg"
              alt="管理员微信二维码"
              className="w-64 h-64 mx-auto rounded-2xl shadow-lg object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* 备用显示 */}
            <div className="w-64 h-64 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 hidden">
              <div className="text-center">
                <div className="text-4xl mb-2">📱</div>
                <div>管理员二维码</div>
              </div>
            </div>
            
            {/* 扫描提示动画 */}
            <div className="absolute inset-0 border-4 border-green-500 rounded-2xl animate-pulse opacity-50"></div>
          </div>
          
          <div className="mt-4 space-y-2">
            <p className="text-gray-600 font-medium">戒忧俱乐部</p>
            <p className="text-gray-500 text-sm">长按识别二维码添加好友</p>
          </div>
        </div>

        {/* 微信号复制 */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 mb-6 border border-green-400/30">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-white font-medium">微信号</div>
              <div className="text-green-300 text-lg font-mono">nanchang_admin_2024</div>
            </div>
            <button
              onClick={copyWechatId}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                copied 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {copied ? '已复制' : '复制'}
            </button>
          </div>
        </div>

        {/* 重要提醒 */}
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-4 mb-6 border border-orange-400/30">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">⚠️</span>
            <div className="text-left">
              <div className="text-orange-200 font-medium mb-1">重要提醒</div>
              <div className="text-orange-100 text-sm space-y-1">
                <p>• 请务必发送付款截图给管理员验证</p>
                <p>• 验证通过后24小时内拉您入群</p>
                <p>• 如有疑问可直接咨询管理员</p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex space-x-3">
          <button
            onClick={onBack}
            className="flex-1 bg-white/10 text-white font-medium py-3 px-4 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
          >
            返回首页
          </button>
          <button
            onClick={() => {
              // 可以添加客服联系方式
              alert('客服微信：nanchang_service\n工作时间：9:00-21:00');
            }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            联系客服
          </button>
        </div>

        {/* 装饰元素 */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-bounce-slow opacity-60"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse-slow opacity-60"></div>
      </div>
    </div>
  );
};

export default AddAdminPage; 