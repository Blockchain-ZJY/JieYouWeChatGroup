#!/bin/bash

# Docker快速安装脚本
# 适用于Ubuntu/Debian/CentOS服务器

echo "🐳 开始安装Docker和Docker Compose..."

# 检测操作系统
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID
else
    echo "❌ 无法检测操作系统"
    exit 1
fi

echo "📋 检测到操作系统: $OS"

# Ubuntu/Debian安装
if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
    echo "📦 更新包管理器..."
    sudo apt-get update

    echo "🔧 安装必要依赖..."
    sudo apt-get install -y \
        ca-certificates \
        curl \
        gnupg \
        lsb-release

    echo "🔑 添加Docker GPG密钥..."
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    echo "📝 添加Docker仓库..."
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    echo "📦 更新包列表..."
    sudo apt-get update

    echo "🐳 安装Docker..."
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# CentOS安装
elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
    echo "🔧 安装必要依赖..."
    sudo yum install -y yum-utils

    echo "📝 添加Docker仓库..."
    sudo yum-config-manager \
        --add-repo \
        https://download.docker.com/linux/centos/docker-ce.repo

    echo "🐳 安装Docker..."
    sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

else
    echo "❌ 不支持的操作系统: $OS"
    exit 1
fi

echo "🚀 启动Docker服务..."
sudo systemctl start docker
sudo systemctl enable docker

echo "👥 将当前用户添加到docker组..."
sudo usermod -aG docker $USER

echo "📋 安装Docker Compose (独立版本)..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "✅ Docker安装完成！"
echo "🔄 请重新登录或运行以下命令以使docker组权限生效:"
echo "   newgrp docker"
echo ""
echo "🧪 验证安装:"
echo "   docker --version"
echo "   docker-compose --version" 