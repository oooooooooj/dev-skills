# 🚀 GitHub 发布指南

## 📋 发布步骤

### 1. 🏗️ 创建GitHub仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 "+" → "New repository"
3. 填写仓库信息：
   - **Repository name**: `dev-skills`
   - **Description**: `🚀 跨平台项目生成器 - 5分钟生成高质量项目，支持Windows/macOS/Linux`
   - **Visibility**: Public (公开)
   - **Initialize with**: ❌ 不要勾选任何选项

### 2. 🔗 连接本地仓库

创建仓库后，GitHub会显示以下命令，请复制执行：

```bash
# 添加远程仓库 (替换 YOUR_USERNAME 为你的GitHub用户名)
git remote add origin https://github.com/YOUR_USERNAME/dev-skills.git

# 推送到GitHub
git push -u origin main
```

### 3. 🎯 仓库设置

#### 启用GitHub Pages
1. 进入仓库 → Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. 点击 Save

#### 启用Issues和Discussions
1. Settings → General
2. Features: ✅ Issues, ✅ Discussions, ✅ Projects, ✅ Wiki
3. 点击 Save updates

#### 设置标签
1. 进入仓库 → Issues → Labels
2. 添加自定义标签：
   - `enhancement` - 新功能请求
   - `bug` - Bug报告
   - `documentation` - 文档相关
   - `good first issue` - 适合新手
   - `help wanted` - 需要帮助

### 4. 📝 创建Release

1. 进入仓库 → Releases → "Create a new release"
2. 填写信息：
   - **Tag version**: `v1.0.0`
   - **Release title**: `🎉 v1.0.0 - 首次发布`
   - **Description**: 
   ```markdown
   ## 🎉 Dev Skills v1.0.0 发布

   ### ✨ 主要特性
   - 🌍 **跨平台支持**：完美支持Windows、macOS、Linux
   - 🎯 **多业务类型**：健身房、餐厅、诊所、高尔夫
   - ⚡ **极速生成**：5分钟创建完整项目
   - 🔄 **业务适配**：现有项目快速适配新业务
   - 📦 **开箱即用**：零配置启动

   ### 🚀 快速开始
   ```bash
   # 克隆项目
   git clone https://github.com/YOUR_USERNAME/dev-skills.git
   cd dev-skills

   # 安装依赖
   npm install

   # 生成健身房项目
   node scripts/generate-project.js --name "my-fitness-app" --business fitness

   # 启动项目
   cd my-fitness-app
   scripts\setup.bat  # Windows
   ./scripts/setup.sh  # macOS/Linux
   npm run dev
   ```

   ### 📚 文档
   - 📖 [使用指南](docs/使用指南.md)
   - 🤝 [贡献指南](CONTRIBUTING.md)
   - 📋 [更新日志](CHANGELOG.md)
   - 🎬 [演示项目](examples/demo.md)

   ### 🌟 特别感谢
   感谢所有为这个项目做出贡献的开发者！

   ---
   ⭐ 如果这个项目对你有帮助，请给个Star支持一下！
   ```

### 5. 📢 推广准备

#### 准备推广文案
```markdown
🚀 **Dev Skills - 跨平台项目生成器**

终于解决了Windows开发者的痛点！🎉

✨ 主要特性：
- 🌍 完美支持Windows/macOS/Linux
- 🎯 健身房、餐厅、诊所、高尔夫多业务类型
- ⚡ 5分钟生成完整项目
- 🔄 现有项目快速适配新业务
- 📦 零配置，开箱即用

🔗 GitHub: https://github.com/YOUR_USERNAME/dev-skills

⭐ 如果对你有帮助，请给个Star支持！#开源 #NodeJS #React #开发工具
```

#### 推广渠道
- 🐦 Twitter/LinkedIn
- 💬 Reddit (r/programming, r/webdev)
- 🏠 掘金/知乎/SegmentFault
- 📺 B站/YouTube (制作演示视频)

---

## 🔧 自动化脚本

如果你想要完全自动化，可以使用以下脚本：

```bash
#!/bin/bash
# 一键发布脚本

# 1. 检查Git状态
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ 工作目录干净，可以发布"
else
    echo "❌ 有未提交的更改，请先提交"
    exit 1
fi

# 2. 推送到GitHub
echo "🚀 推送到GitHub..."
git push -u origin main

# 3. 创建Release (需要GitHub CLI)
if command -v gh &> /dev/null; then
    echo "📝 创建GitHub Release..."
    gh release create v1.0.0 --title "🎉 v1.0.0 - 首次发布" --notes-file RELEASE_NOTES.md
else
    echo "⚠️  GitHub CLI未安装，请手动创建Release"
fi

echo "🎉 发布完成！"
echo "🔗 仓库地址: https://github.com/YOUR_USERNAME/dev-skills"
```

---

## 📊 发布后监控

### 查看数据
- ⭐ Star数量增长
- 🍴 Fork数量
- 👀 观看数量
- 📈 访问流量
- 🐛 Issues和PR

### 社区互动
- 💬 及时回复Issues
- 🤝 欢迎贡献者
- 📝 更新文档
- 🎉 感谢Star用户

---

**🎉 准备好了吗？开始你的开源之旅吧！**
