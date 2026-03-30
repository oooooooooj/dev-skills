# 🤝 贡献指南

感谢你对 Dev Skills 项目的关注！我们欢迎各种形式的贡献。

---

## 🎯 贡献方式

### 🐛 报告问题
- 使用 [GitHub Issues](https://github.com/your-username/dev-skills/issues) 报告 bug
- 提供详细的复现步骤和环境信息
- 包含相关的错误日志和截图

### 💡 功能建议
- 在 Issues 中提出新功能建议
- 详细描述使用场景和预期效果
- 讨论技术实现方案

### 🔧 代码贡献
1. **Fork** 项目到你的 GitHub 账户
2. **Clone** 你的 Fork 到本地
3. **创建** 新分支：`git checkout -b feature/amazing-feature`
4. **提交** 你的更改：`git commit -m 'feat: add amazing feature'`
5. **推送** 到分支：`git push origin feature/amazing-feature`
6. **创建** Pull Request

---

## 📝 开发规范

### 代码风格
- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件使用 PascalCase 命名
- 文件名使用 kebab-case

### 提交规范
使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
feat: 新功能
fix: 修复问题
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建工具
perf: 性能优化
ci: CI/CD
```

### 测试要求
- 新功能必须包含测试用例
- 确保所有测试通过：`npm test`
- 保持测试覆盖率在 80% 以上

---

## 🎨 贡献方向

### 🆕 新业务类型
添加新的业务场景支持：
1. 在 `BUSINESS_CONFIGS` 中添加配置
2. 更新帮助文档
3. 添加测试用例
4. 更新 README.md

### 🎨 UI 主题
开发新的主题风格：
1. 创建主题配置文件
2. 设计颜色方案
3. 更新 Tailwind 配置
4. 添加主题预览

### 📱 移动端优化
- 响应式设计改进
- 移动端交互优化
- PWA 功能支持
- 移动端性能优化

### 🔧 工具扩展
开发新的生成工具：
1. 创建新的脚本文件
2. 添加命令行参数解析
3. 实现核心逻辑
4. 添加使用文档

---

## 🧪 测试指南

### 运行测试
```bash
# 单元测试
npm test

# 测试覆盖率
npm run test:coverage

# E2E 测试
npm run test:e2e

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

### 测试文件结构
```
tests/
├── unit/           # 单元测试
│   ├── scripts/
│   └── utils/
├── integration/    # 集成测试
│   └── workflows/
└── e2e/           # 端到端测试
    └── scenarios/
```

---

## 📚 文档贡献

### 文档类型
- **README.md**：项目介绍和快速开始
- **docs/**：详细使用指南
- **API.md**：API 文档
- **CHANGELOG.md**：版本更新日志

### 文档规范
- 使用 Markdown 格式
- 包含代码示例
- 添加适当的 emoji 装饰
- 保持中英文术语一致

---

## 🏷️ 发布流程

### 版本号规范
遵循 [Semantic Versioning](https://semver.org/)：
- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

### 发布步骤
1. 更新版本号：`npm version patch/minor/major`
2. 更新 CHANGELOG.md
3. 创建 Git 标签：`git tag v1.0.0`
4. 推送到远程：`git push origin --tags`
5. 发布到 npm：`npm publish`

---

## 💬 社区参与

### GitHub Discussions
- **Q&A**：使用问题讨论
- **Ideas**：新功能想法
- **Show and Tell**：项目展示
- **General**：一般讨论

### 代码审查
- 参与 Pull Request 审查
- 提供建设性反馈
- 帮助改进代码质量
- 分享最佳实践

---

## 🎉 贡献者认可

### 贡献者列表
所有贡献者都会在以下地方被认可：
- README.md 中的贡献者部分
- CHANGELOG.md 中的版本记录
- GitHub Contributors 列表
- 项目发布说明

### 贡献等级
- 🌟 **新手贡献者**：第一次贡献
- 💎 **活跃贡献者**：多次有效贡献
- 👑 **核心贡献者**：重要功能和维护
- 🚀 **项目维护者**：项目管理权限

---

## 📞 联系方式

- **项目维护者**：[maintainer@example.com]
- **技术讨论**：[GitHub Discussions](https://github.com/your-username/dev-skills/discussions)
- **紧急问题**：[GitHub Issues](https://github.com/your-username/dev-skills/issues)

---

## 📄 许可证

通过贡献代码，你同意你的贡献将在 [MIT License](LICENSE) 下发布。

---

**感谢你的贡献！** 🎉

每一个贡献都让这个项目变得更好。无论是代码、文档、设计还是想法，我们都非常欢迎。
