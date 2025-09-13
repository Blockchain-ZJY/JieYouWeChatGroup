import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

function App() {
  const [isVisible, setIsVisible] = useState({});

  // 交集观察器，用于滚动动画
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 用户头像数据
  const avatars = [
    'pics/heads/9ace742ddef1fa35540f6b424a26cfa3.jpg',
    'pics/heads/db159bb0c817ef4d6352e6721b3def98.jpg',
    'pics/heads/344efaeea580b89c907dfce1dc670875.jpg',
    'pics/heads/bdb3b2736fc6ccbc23633b33dd595f01.jpg',
    'pics/heads/31b12e8a49e6dfb78dc34a96fc2d6e9a.jpg',
    'pics/heads/d0fbc842bb8894a777f419f96338f903.jpg',
    'pics/heads/fdadf7c0536589dac43f102553a2a7ab.jpg',
    'pics/heads/a2d482c75c468153c96016fdeea6dda6.jpg',
    'pics/heads/c36a1dac0a6dc97dbd6ab5b80e2c42d2.jpg',
    'pics/heads/275f7ab31dfde58bd1dcf231cb320409.jpg',
    'pics/heads/5b5fd311fcf04843fd8558a902429c90.jpg',
    'pics/heads/17baaf52a64b56ed8c4239ed8b5d902e.jpg',
    'pics/heads/7dfb5d7af203b7e33cb9dce752322ab2.jpg'
  ];

  // 活动图片数据
  const eventImages = [
    'pics/events/54aae68aca435c2fcf1daabd200f5bfc.jpg',
    'pics/events/5cf34808a6f350f13f4fd04c02a81038.jpg',
    'pics/events/fdaa92dc26327a39c3aa04e882d8407a.jpg',
    'pics/events/475ae550f570afb070326b9440cfa02b.jpg',
    'pics/events/ff1facbc7ed58b0bada50787f664c04c.jpg',
    'pics/events/430e678adc4818bb8ed5422757f728b7.jpg',
    'pics/events/429c7ad89c05117b62c693c362bcb49d.jpg',
    'pics/events/fd49170435a0f8329e888fa4c6654bb1.jpg',
    'pics/events/e5fcaba405f1f752f1fb0faba2c78ad7.jpg',
    'pics/events/29a9fe7f62a8f32b902ae6bc3199c40e.jpg',
    'pics/events/fb177b0d7d1950bee4f0499f862a7a97.jpg',
    'pics/events/f8faf78eb309d3f5e0d59e8d66d09894.jpg'
  ];

  // 移除了头像分组逻辑，现在使用连续滚动

  const handleJoinGroup = () => {
    // 这里可以添加实际的入群逻辑
    alert('正在跳转到支付页面...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 relative overflow-hidden">
      {/* 星空背景 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* 小星星 */}
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* 中等星星 */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`mid-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* 大星星 */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`big-star-${i}`}
            className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* 闪烁的亮星 */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`bright-star-${i}`}
            className="absolute animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${5 + Math.random() * 3}s`
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
          </div>
        ))}
        
        {/* 彩色星云效果 */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-bounce-slow"></div>
      </div>
      
      {/* 头部标题 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 text-white">
        {/* 装饰性背景元素 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse-slow"></div>
          <div className="absolute top-20 right-16 w-16 h-16 bg-white rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-16 right-10 w-14 h-14 bg-white rounded-full animate-pulse-slow"></div>
        </div>
        
        <div className="relative px-6 py-12 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100 animate-pulse-slow">
              戒忧南昌同城搭子群
            </h1>
            <div className="relative">
              <p className="text-xl md:text-2xl opacity-95 font-medium mb-6">
                高质量同城搭子
              </p>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full text-lg font-bold shadow-lg transform rotate-3 animate-bounce-slow">
                400人+ 在线
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur rounded-full text-sm font-medium border border-white border-opacity-30 animate-float">
                🔥 超级热门
              </span>
              <span className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur rounded-full text-sm font-medium border border-white border-opacity-30 animate-float" style={{animationDelay: '0.5s'}}>
                💎 高端品质
              </span>
              <span className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur rounded-full text-sm font-medium border border-white border-opacity-30 animate-float" style={{animationDelay: '1s'}}>
                🌟 每日活跃
              </span>
            </div>
          </div>
        </div>
        
        {/* 波浪形底部 */}

      </div>

      {/* 群成员头像展示 */}
      <div id="members" data-animate className="py-16 -mt-8 relative overflow-hidden">
        {/* 局部星光增强 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* 额外的星星增强这个区域 */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`extra-star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative">
          <div className="text-center mb-12 px-6">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              活跃群成员
            </h2>
            <p className="text-purple-200 text-lg">
              实时在线，随时互动
            </p>
          </div>
          
          {/* 滚动容器 */}
          <div className="relative">
            {/* 渐变遮罩 */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-indigo-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-pink-900 to-transparent z-10"></div>
            
            {/* 滚动内容 */}
            <div className="flex animate-scroll">
              {/* 无限循环的头像 */}
              {avatars.concat(avatars).concat(avatars).map((avatar, index) => (
                <div
                  key={`scroll-${index}`}
                  className="relative group mx-4 flex-shrink-0"
                >
                  <div className="relative">
                    <img
                      src={avatar}
                      alt={`群成员 ${index + 1}`}
                      className="w-20 h-20 rounded-3xl object-cover ring-4 ring-white/20 shadow-2xl group-hover:scale-110 group-hover:ring-white/40 transition-all duration-300 ease-out"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    
                    {/* 悬停光效 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* 名字标签 (悬停显示) */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur text-gray-800 text-xs px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                      用户{(index % 13) + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center px-6">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur px-6 py-3 rounded-full border border-white/20">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-white font-medium">
                400+ 位群成员
              </span>
              <div className="w-2 h-2 bg-white/50 rounded-full animate-ping"></div>
            </div>
            <p className="text-purple-200 mt-4 text-sm">
              无限滚动展示 · 精选成员
            </p>
          </div>
        </div>
      </div>

      {/* 群简介 */}
      <div id="intro" data-animate className="px-6 py-16 relative">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
              群简介
            </h2>
            <p className="text-purple-200 text-lg">
              让每个人都能找到合适的搭子
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative space-y-8">
              <div className="text-center">
                <p className="text-xl leading-relaxed text-white/90 mb-8">
                  群内可以寻<span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-lg font-semibold mx-1 shadow-lg transform hover:scale-105 transition-transform">🍕 饭搭子拼奶茶</span>、找<span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-full text-lg font-semibold mx-1 shadow-lg transform hover:scale-105 transition-transform">🛍️ 逛搭子薅羊毛</span>、约<span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full text-lg font-semibold mx-1 shadow-lg transform hover:scale-105 transition-transform">🏃 运动搭子甩赘肉</span>、求<span className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-lg font-semibold mx-1 shadow-lg transform hover:scale-105 transition-transform">📚 学习搭子卷进度</span>、唤<span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-lg font-semibold mx-1 shadow-lg transform hover:scale-105 transition-transform">🍻 酒搭子聊人生</span>
                </p>
                
                <div className="text-2xl mb-6 text-purple-200">
                  只要你缺搭子，这里啥搭子都有！
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-6 text-white text-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold mb-2">
                    🚀 拒绝独自emo，组队才是正经事～
                  </div>
                  <div className="text-lg opacity-90">
                    马上加入，开始你的搭子之旅！
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 社群权益 */}
      <div id="benefits" data-animate className="px-6 py-16 relative">
        {/* 局部背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">
              社群权益
            </h2>
            <p className="text-purple-200 text-lg">
              加入我们，享受专属福利
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              {/* 背景装饰 */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl shadow-lg mr-4 group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-3xl">🎮</span>
                  </div>
                  <h3 className="font-bold text-2xl text-white">趣味游戏</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-purple-100 text-lg leading-relaxed">
                    猫鼠游戏、撕名牌等热门玩法，全程免费参与
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-pink-500/30 text-pink-200 rounded-full text-sm font-medium">免费体验</span>
                    <span className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm font-medium">热门玩法</span>
                    <span className="px-3 py-1 bg-indigo-500/30 text-indigo-200 rounded-full text-sm font-medium">团队合作</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              {/* 背景装饰 */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg mr-4 group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-3xl">📅</span>
                  </div>
                  <h3 className="font-bold text-2xl text-white">定期活动</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-purple-100 text-lg leading-relaxed">
                    每周至少3场精彩活动，不愁没局约
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm font-medium">每周3场</span>
                    <span className="px-3 py-1 bg-indigo-500/30 text-indigo-200 rounded-full text-sm font-medium">精彩纷呈</span>
                    <span className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm font-medium">不定期惊喜</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 额外优势 */}
          <div className="mt-12 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl p-8 text-white text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">🌟 还有更多惊喜等你发现</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4">
                <div className="text-2xl mb-2">🎉</div>
                <div className="font-medium">节日活动</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4">
                <div className="text-2xl mb-2">🎁</div>
                <div className="font-medium">专属福利</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4">
                <div className="text-2xl mb-2">👥</div>
                <div className="font-medium">优质社交</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4">
                <div className="text-2xl mb-2">📱</div>
                <div className="font-medium">便捷沟通</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 活动图片轮播 */}
      <div id="activities" data-animate className="px-6 py-16 relative">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-36 h-36 bg-gradient-to-r from-orange-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-10 w-28 h-28 bg-gradient-to-r from-purple-500/15 to-indigo-500/15 rounded-full blur-3xl animate-float"></div>
        </div>
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            {/* <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent mb-4">
              精彩活动
            </h2> */}
            <p className="text-purple-200 text-lg">
              记录我们的美好时光
            </p>
          </div>
          
          <div className="relative">
            <Swiper
              modules={[Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="activity-swiper"
            >
              {eventImages.map((image, index) => (
                <SwiperSlide key={index} className="!w-80">
                  <div className="relative group cursor-pointer">
                    <div className="overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={image}
                        alt={`活动 ${index + 1}`}
                        className="w-full h-80 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      
                      {/* 悬停遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* 悬停内容 */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {/* <h3 className="text-xl font-bold mb-2">精彩活动 #{index + 1}</h3> */}
                        <p className="text-sm opacity-90">与搭子们的美好时光</p>
                      </div>
                    </div>
                    
                    {/* 装饰元素 */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          {/* 统计信息 */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-pink-300 mb-2">100+</div>
              <div className="text-purple-200">已举办活动</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-purple-300 mb-2">400+</div>
              <div className="text-purple-200">活跃成员</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-indigo-300 mb-2">98%</div>
              <div className="text-purple-200">满意度</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-blue-300 mb-2">24/7</div>
              <div className="text-purple-200">在线服务</div>
            </div>
          </div>
        </div>
      </div>

      {/* 群友秀 */}
      <div id="membershow" data-animate className="px-6 py-16 relative">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-pink-500/15 to-purple-500/15 rounded-full blur-3xl animate-float"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-4">
              群友秀
            </h2>
            <p className="text-purple-200 text-lg">
              展示我们精彩的群友生活
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 群友秀图片 */}
            {[
              'pics/membershow/0be4703dcebaa504aa62a4bb82f6ea5e.jpg',
              'pics/membershow/e50aacba5ecc9af0732e4a4284901ae8.png',
              'pics/membershow/086c7591dcd71a3ef154fb010ab9085c.png',
              'pics/membershow/521153d7de34af57241b259d8ed6b10c.jpg',
              'pics/membershow/f6eeafb948fe4684ebb51a2078420d06.jpg',
              'pics/membershow/image.png'
            ].map((image, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/20 hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image}
                    alt={`群友秀 ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.style.display = 'none';
                    }}
                  />
                  
                  {/* 悬停遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* 悬停内容 */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-lg font-bold mb-1">群友生活 #{index + 1}</h3>
                    <p className="text-sm opacity-90">分享美好时光</p>
                  </div>
                </div>
                
                {/* 点赞功能 */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-6 text-white flex items-center justify-center">
                    ❤️
                  </div>
                </div>
                
                {/* 装饰星光 */}
                <div className="absolute top-2 left-2 w-3 h-3 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
          
          {/* 底部说明 */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur px-6 py-3 rounded-full border border-white/20">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-white font-medium">
                精选群友生活瞬间
              </span>
              <div className="w-2 h-2 bg-white/50 rounded-full animate-ping"></div>
            </div>
            <p className="text-purple-200 mt-4 text-sm">
              记录每一个精彩时刻 · 分享生活美好
            </p>
          </div>
        </div>
      </div>

      {/* 付费说明 */}
      <div className="px-6 py-12 relative">
        <div className="max-w-md mx-auto bg-amber-500/20 backdrop-blur-lg border border-amber-400/30 rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold text-amber-200 mb-3 flex items-center">
            <span className="text-xl mr-2">⚠️</span>
            关于付费退款
          </h3>
          <p className="text-sm text-amber-100 leading-relaxed">
            划重点！一旦付费，无论何种原因（哪怕是违规被踢出群），都不支持退款。群费金额不高，核心是为了筛选同频伙伴，让社群保持高质量、正能量的状态。
          </p>
        </div>
      </div>

      {/* 入群按钮 */}
      <div className="px-6 py-16 relative">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-1/4 w-28 h-28 bg-gradient-to-r from-pink-500/20 to-indigo-500/20 rounded-full blur-3xl animate-float"></div>
        </div>
        <div className="max-w-md mx-auto relative">
          <button
            onClick={handleJoinGroup}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-slow"
          >
            <span className="flex items-center justify-center">
              <span className="text-2xl mr-2">💎</span>
              限时16.8元进群
              <span className="text-2xl ml-2">🚀</span>
            </span>
          </button>
          <p className="text-center text-purple-300 text-sm mt-3">
            点击立即加入高质量同城搭子群
          </p>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="px-6 py-12 text-center text-purple-300 text-sm relative">
        {/* 装饰线 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
        <p>戒忧南昌同城搭子群 © 2025</p>
        <p className="mt-1">让每个人都能找到合适的搭子</p>
      </div>
    </div>
  );
}

export default App; 