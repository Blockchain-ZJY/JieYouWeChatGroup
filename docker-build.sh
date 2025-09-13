#!/bin/bash

echo "🚀 开始构建戒忧南昌同城搭子群宣传页面..."

# 停止并删除现有容器
echo "⏹️  停止现有容器..."
docker-compose down

# 构建镜像
echo "🔨 构建Docker镜像..."
docker-compose build --no-cache

# 启动容器
echo "▶️  启动容器..."
docker-compose up -d

# 显示运行状态
echo "✅ 构建完成！"
echo "📱 应用已启动，访问地址: http://localhost:3000"
echo "🐳 容器状态:"
docker-compose ps 