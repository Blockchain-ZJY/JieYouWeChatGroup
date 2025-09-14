# 戒忧南昌同城搭子群 - 宣传页面

这是一个使用React和TailwindCSS构建的现代化入群宣传页面。

## 功能特性

- 📱 完全响应式设计，适配手机端
- 🎨 现代化UI设计，使用TailwindCSS
- 🖼️ 动态头像展示，无限循环滚动
- 📸 活动图片轮播展示
- 🌟 群友秀展示功能
- ✨ 流畅的动画效果和星空背景
- 💰 完整的支付流程（模拟）
- 🔄 支付成功后自动跳转加群页面
- 📱 管理员二维码展示
- 💎 醒目的入群按钮

## 技术栈

- React 18
- TailwindCSS 3
- Swiper.js (图片轮播)
- Google Fonts (字体)

## 安装和运行

### 普通方式

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm start
```

3. 构建生产版本：
```bash
npm run build
```

### Docker方式（推荐）

#### 快速启动

**Windows用户：**
```bash
docker-build.bat
```

**Linux/Mac用户：**
```bash
chmod +x docker-build.sh
./docker-build.sh
```

#### 手动操作

1. 构建镜像：
```bash
docker-compose build
```

2. 启动容器：
```bash
docker-compose up -d
```

3. 停止容器：
```bash
docker-compose down
```

4. 查看运行状态：
```bash
docker-compose ps
```

#### 访问应用

容器启动后，访问 http://localhost:3000 即可查看应用。

## 服务器部署

### 1. 准备服务器环境

如果服务器还没有安装Docker，可以使用我们提供的安装脚本：

```bash
# 给脚本执行权限
chmod +x docker-install.sh

# 运行安装脚本
./docker-install.sh

# 重新登录以使docker组权限生效
newgrp docker
```

### 2. 部署到服务器

```bash
# 上传项目文件到服务器
# 方法1: 使用git
git clone <你的仓库地址>
cd 戒忧南昌同城搭子群

# 方法2: 使用scp上传
# scp -r ./* user@server:/path/to/project/

# 给脚本执行权限
chmod +x deploy.sh server-management.sh

# 执行部署
./deploy.sh
```

### 3. 服务器管理

使用管理脚本进行日常维护：

```bash
# 查看服务状态
./server-management.sh status

# 查看日志
./server-management.sh logs

# 重启服务
./server-management.sh restart

# 更新服务
./server-management.sh update

# 备份数据
./server-management.sh backup

# 停止服务
./server-management.sh stop

# 启动服务
./server-management.sh start

# 清理资源
./server-management.sh clean
```

### 4. 访问应用

部署成功后，通过以下地址访问：
- http://服务器IP地址
- http://域名 (如果配置了域名)

### 5. 注意事项

- 确保服务器防火墙开放80端口
- 如果使用云服务器，需要在安全组中开放80端口
- 建议配置SSL证书使用HTTPS
- 定期备份和更新应用

## 项目结构

```
├── public/
│   └── index.html
├── src/
│   ├── App.js          # 主组件
│   ├── index.js        # 入口文件
│   └── index.css       # 样式文件
├── pics/
│   ├── heads/          # 用户头像图片
│   └── events/         # 活动图片
├── package.json
├── tailwind.config.js
└── README.md
```

## 页面内容

- **头部标题**: 群名称和特色标签
- **群成员展示**: 动态切换的用户头像网格
- **群简介**: 展示群的主要功能和特色
- **社群权益**: 突出显示群的价值点
- **精彩活动**: 轮播展示活动图片
- **付费说明**: 重要的退款政策说明
- **入群按钮**: 醒目的付费入群按钮

## 自定义配置

- 在 `src/App.js` 中修改图片路径和内容
- 在 `tailwind.config.js` 中自定义主题颜色
- 在 `src/index.css` 中添加自定义样式

## 注意事项

- 确保图片路径正确，放置在 `public/pics` 目录下
- 图片加载失败时会自动隐藏
- 适配了移动端显示效果 