#!/bin/bash

# 服务器管理脚本
# 戒忧南昌同城搭子群宣传页面

COMPOSE_FILE="docker-compose.prod.yml"
PROJECT_NAME="nanchang-group-promo"

show_usage() {
    echo "📋 服务器管理脚本 - 戒忧南昌同城搭子群"
    echo ""
    echo "使用方法:"
    echo "  ./server-management.sh [命令]"
    echo ""
    echo "可用命令:"
    echo "  start     - 启动服务"
    echo "  stop      - 停止服务"
    echo "  restart   - 重启服务"
    echo "  status    - 查看服务状态"
    echo "  logs      - 查看服务日志"
    echo "  update    - 更新服务"
    echo "  clean     - 清理资源"
    echo "  backup    - 备份数据"
    echo ""
}

start_service() {
    echo "🚀 启动服务..."
    docker-compose -f $COMPOSE_FILE up -d
    echo "✅ 服务已启动"
    status_service
}

stop_service() {
    echo "⏹️  停止服务..."
    docker-compose -f $COMPOSE_FILE down
    echo "✅ 服务已停止"
}

restart_service() {
    echo "🔄 重启服务..."
    stop_service
    sleep 3
    start_service
}

status_service() {
    echo "📊 服务状态:"
    docker-compose -f $COMPOSE_FILE ps
    echo ""
    echo "💾 资源使用情况:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}\t{{.NetIO}}\t{{.BlockIO}}"
}

show_logs() {
    echo "📋 服务日志:"
    docker-compose -f $COMPOSE_FILE logs --tail=50 -f
}

update_service() {
    echo "🔄 更新服务..."
    
    # 备份当前版本
    backup_service
    
    # 停止服务
    stop_service
    
    # 清理旧镜像
    echo "🧹 清理旧资源..."
    docker system prune -f
    
    # 重新构建
    echo "🔨 重新构建镜像..."
    docker-compose -f $COMPOSE_FILE build --no-cache
    
    # 启动服务
    start_service
    
    echo "✅ 服务更新完成"
}

clean_resources() {
    echo "🧹 清理Docker资源..."
    
    # 停止服务
    stop_service
    
    # 清理容器、镜像、网络、卷
    docker system prune -a --volumes -f
    
    echo "✅ 资源清理完成"
}

backup_service() {
    echo "💾 备份服务数据..."
    
    BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p $BACKUP_DIR
    
    # 备份配置文件
    cp $COMPOSE_FILE $BACKUP_DIR/
    cp nginx.conf $BACKUP_DIR/
    cp Dockerfile $BACKUP_DIR/
    
    # 导出镜像
    if docker images | grep -q $PROJECT_NAME; then
        docker save $(docker images --format "{{.Repository}}:{{.Tag}}" | grep $PROJECT_NAME) -o $BACKUP_DIR/images.tar
    fi
    
    echo "✅ 备份完成: $BACKUP_DIR"
}

# 主程序
case "$1" in
    start)
        start_service
        ;;
    stop)
        stop_service
        ;;
    restart)
        restart_service
        ;;
    status)
        status_service
        ;;
    logs)
        show_logs
        ;;
    update)
        update_service
        ;;
    clean)
        clean_resources
        ;;
    backup)
        backup_service
        ;;
    *)
        show_usage
        exit 1
        ;;
esac 