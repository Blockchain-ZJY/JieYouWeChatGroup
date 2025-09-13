#!/bin/bash

echo "🔧 修复依赖问题并重新部署..."

# 停止现有容器
echo "⏹️  停止现有容器..."
docker-compose -f docker-compose.prod.yml down --remove-orphans

# 清理Docker缓存
echo "🧹 清理Docker缓存..."
docker system prune -f

# 删除可能有问题的镜像
echo "🗑️  删除旧镜像..."
docker rmi $(docker images -q nanchang-group-promo_nanchang-group-app) 2>/dev/null || true

# 重新构建镜像（使用简化版Dockerfile）
echo "🔨 重新构建镜像..."
docker-compose -f docker-compose.prod.yml build --no-cache

# 启动容器
echo "▶️  启动容器..."
docker-compose -f docker-compose.prod.yml up -d

# 等待容器启动
echo "⏳ 等待容器启动..."
sleep 15

# 检查容器状态
echo "🔍 检查容器状态..."
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ 部署成功！"
    echo "🌐 应用已启动，访问地址:"
    echo "   http://$(hostname -I | awk '{print $1}' 2>/dev/null || echo 'localhost')"
    echo ""
    echo "🐳 容器状态:"
    docker-compose -f docker-compose.prod.yml ps
else
    echo "❌ 部署失败，查看错误日志:"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi

echo ""
echo "📋 有用的命令:"
echo "  查看日志: docker-compose -f docker-compose.prod.yml logs -f"
echo "  重启服务: docker-compose -f docker-compose.prod.yml restart"
echo "  停止服务: docker-compose -f docker-compose.prod.yml down" 