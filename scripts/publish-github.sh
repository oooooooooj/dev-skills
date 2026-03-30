#!/bin/bash

# 🚀 Dev Skills GitHub 发布脚本
# 一键发布到GitHub并创建Release

set -e

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Dev Skills GitHub 发布脚本${NC}"
echo ""

# 检查Git状态
echo -e "${YELLOW}📋 检查Git状态...${NC}"
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}   ✅ 工作目录干净，可以发布${NC}"
else
    echo -e "${RED}   ❌ 有未提交的更改，请先提交${NC}"
    git status --short
    exit 1
fi

# 检查远程仓库
echo -e "${YELLOW}🔗 检查远程仓库...${NC}"
if git remote get-url origin > /dev/null 2>&1; then
    echo -e "${GREEN}   ✅ 远程仓库已配置${NC}"
    REMOTE_URL=$(git remote get-url origin)
    echo -e "   📡 远程地址: ${REMOTE_URL}"
else
    echo -e "${YELLOW}   ⚠️  远程仓库未配置${NC}"
    echo -e "   📝 请先在GitHub创建仓库，然后运行："
    echo -e "   git remote add origin https://github.com/YOUR_USERNAME/dev-skills.git"
    exit 1
fi

# 推送到GitHub
echo -e "${YELLOW}📤 推送到GitHub...${NC}"
if git push -u origin main; then
    echo -e "${GREEN}   ✅ 推送成功${NC}"
else
    echo -e "${RED}   ❌ 推送失败${NC}"
    exit 1
fi

# 检查GitHub CLI
echo -e "${YELLOW}🔧 检查GitHub CLI...${NC}"
if command -v gh &> /dev/null; then
    echo -e "${GREEN}   ✅ GitHub CLI已安装${NC}"
    
    # 检查是否已登录
    if gh auth status > /dev/null 2>&1; then
        echo -e "${GREEN}   ✅ GitHub CLI已登录${NC}"
        
        # 创建Release
        echo -e "${YELLOW}📝 创建GitHub Release...${NC}"
        if gh release create v1.0.0 \
            --title "🎉 v1.0.0 - 首次发布" \
            --notes-file RELEASE_NOTES.md \
            --draft false; then
            echo -e "${GREEN}   ✅ Release创建成功${NC}"
        else
            echo -e "${YELLOW}   ⚠️  Release创建失败，请手动创建${NC}"
        fi
    else
        echo -e "${YELLOW}   ⚠️  GitHub CLI未登录${NC}"
        echo -e "   📝 请运行: gh auth login"
    fi
else
    echo -e "${YELLOW}   ⚠️  GitHub CLI未安装${NC}"
    echo -e "   📝 请安装GitHub CLI: https://cli.github.com/"
    echo -e "   📝 或手动在GitHub网页创建Release"
fi

# 获取仓库信息
REPO_URL=$(git remote get-url origin | sed 's/\.git$//')
if [[ $REPO_URL == git@* ]]; then
    REPO_URL=$(echo $REPO_URL | sed 's/git@github.com:/https:\/\/github.com\//')
fi

# 完成
echo ""
echo -e "${GREEN}🎉 发布完成！${NC}"
echo ""
echo -e "${BLUE}📂 仓库地址: ${REPO_URL}${NC}"
echo -e "${BLUE}📋 Release地址: ${REPO_URL}/releases/tag/v1.0.0${NC}"
echo -e "${BLUE}📖 文档地址: ${REPO_URL}#readme${NC}"
echo ""
echo -e "${YELLOW}📋 下一步操作:${NC}"
echo "1. 🎯 访问仓库: ${REPO_URL}"
echo "2. ⭐ 给项目一个Star"
echo "3. 📢 分享到技术社区"
echo "4. 🤝 欢迎贡献代码"
echo ""
echo -e "${GREEN}✨ 祝你的项目获得更多关注！${NC}"
