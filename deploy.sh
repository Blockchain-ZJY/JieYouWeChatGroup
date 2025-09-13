#!/bin/bash

# 服务器部署脚本
# 戒忧南昌同城搭子群宣传页面

set -e

echo "🚀 开始部署戒忧南昌同城搭子群宣传页面到服务器..."

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装，请先安装Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

# 停止现有容器
echo "⏹️  停止现有容器..."
docker-compose -f docker-compose.prod.yml down --remove-orphans

# 清理旧镜像
echo "🧹 清理旧镜像..."
docker system prune -f

# 构建新镜像
echo "🔨 构建生产环境镜像..."
docker-compose -f docker-compose.prod.yml build --no-cache

# 启动容器
echo "▶️  启动生产环境容器..."
docker-compose -f docker-compose.prod.yml up -d

# 等待容器启动
echo "⏳ 等待容器启动..."
sleep 10

# 检查容器状态
echo "🔍 检查容器状态..."
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ 部署成功！"
    echo "🌐 应用已启动，可通过以下地址访问:"
    echo "   http://$(hostname -I | awk '{print $1}')"
    echo "   http://localhost"
    echo ""
    echo "🐳 容器状态:"
    docker-compose -f docker-compose.prod.yml ps
    echo ""
    echo "📊 容器日志 (最近10行):"
    docker-compose -f docker-compose.prod.yml logs --tail=10
else
    echo "❌ 部署失败，请检查日志:"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi 