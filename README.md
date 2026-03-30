# 🚀 Dev Skills - 跨平台项目生成器

[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![Cross Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue.svg)](https://github.com/your-username/dev-skills)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/your-username/dev-skills?style=social)](https://github.com/your-username/dev-skills)

> ⚡ **5分钟生成高质量项目，提升10倍开发效率**
> 
> 🎯 支持健身房、餐厅、诊所、高尔夫等多种业务场景
> 💻 完美支持Windows、macOS、Linux全平台

---

## ✨ 特性亮点

- 🚀 **极速生成**：5分钟创建完整项目
- 🌍 **跨平台**：Windows/macOS/Linux全支持
- 🎯 **多业务**：健身房、餐厅、诊所、高尔夫
- ⚙️ **配置化**：灵活的业务配置和主题定制
- � **可适配**：现有项目快速适配新业务
- 📦 **开箱即用**：完整工具链，零配置启动

---

## 🎯 快速开始

### 🌟 Node.js版本 (推荐)
```bash
# 克隆项目
git clone https://github.com/your-username/dev-skills.git
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

### 📦 支持的业务类型

| 业务类型 | 实体名称 | 容量单位 | 时段长度 | 最大容量 | 主色调 |
|---------|---------|---------|---------|---------|--------|
| 🏋️ fitness | 课程 | 人 | 90分钟 | 20人 | 红色 |
| 🍽️ restaurant | 餐桌 | 位 | 120分钟 | 12位 | 橙色 |
| 🏥 clinic | 诊室 | 人 | 30分钟 | 1人 | 蓝色 |
| 🏌️ golf | 打位 | 人 | 60分钟 | 4人 | 绿色 |

---

## 🔄 业务适配

现有项目快速适配新业务场景：

```bash
# 适配当前目录到健身房
node scripts/adapt-business.js --target fitness

# 适配指定项目到餐厅
node scripts/adapt-business.js --path ~/my-project --target restaurant
```

---

## 💻 Windows支持

🎉 **完美支持Windows！** 无需WSL或Git Bash：

```powershell
# Windows命令
node scripts/generate-project.js --name "my-project" --business fitness
scripts\setup.bat
```

### ✨ Windows特性
- 🎯 **自动识别平台**：生成对应的脚本格式
- 📁 **路径兼容**：支持Windows路径格式
- 🚀 **批处理脚本**：自动生成`.bat`启动脚本
- 🎨 **颜色输出**：支持Windows终端彩色显示

---

## 📁 项目结构

```
your-project/
├── config/
│   ├── business.config.ts    # 业务配置
│   └── app.config.ts         # 应用配置
├── src/
│   ├── app/                   # 页面路由
│   ├── components/            # React组件
│   ├── lib/                   # 工具库
│   ├── hooks/                 # 自定义Hooks
│   └── types/                 # 类型定义
├── prisma/
│   └── schema.prisma          # 数据库模型
├── docs/                      # 项目文档
└── scripts/                   # 自动化脚本
```

---

## � 技术栈

- **前端框架**：Next.js 14+ / React 18+
- **类型安全**：TypeScript
- **样式方案**：TailwindCSS
- **数据库**：Prisma + MySQL
- **认证**：NextAuth.js
- **部署**：Vercel / Docker

---

## 📈 效果对比

| 开发方式 | 传统开发 | 使用技能库 | 效率提升 |
|---------|---------|-----------|---------|
| **开发周期** | 2-3周 | 2-3天 | **80%** ⬆️ |
| **代码质量** | 不稳定 | 统一标准 | **显著提升** |
| **维护成本** | 高 | 低 | **60%** ⬇️ |

---

## 🚀 使用场景

### 🏋️ 健身房预约系统
```bash
node scripts/generate-project.js --name "fit-booking" --business fitness
```
- 课程预约管理
- 教练排班系统
- 会员管理
- 收费统计

### 🍽️ 餐厅预订系统
```bash
node scripts/generate-project.js --name "restaurant-system" --business restaurant
```
- 桌位预订
- 菜单管理
- 订单处理
- 客户管理

### 🏥 诊所预约系统
```bash
node scripts/generate-project.js --name "clinic-system" --business clinic
```
- 医生排班
- 患者预约
- 病历管理
- 药品管理

### 🏌️ 高尔夫预订系统
```bash
node scripts/generate-project.js --name "golf-booking" --business golf
```
- 场地预订
- 会员管理
- 赛事组织
- 收费管理

---

## 🤝 贡献指南

欢迎贡献代码、提出建议或报告问题！

### 🎯 贡献方向
- 🆕 **新业务类型**：添加更多业务场景
- 🎨 **UI主题**：设计新的主题风格
- 📱 **移动端**：优化移动端体验
- 🔧 **工具扩展**：开发新的生成工具

### 📝 提交规范
```bash
feat: 添加新业务类型支持
fix: 修复Windows路径问题
docs: 更新使用文档
style: 代码格式优化
refactor: 重构配置生成逻辑
test: 添加单元测试
chore: 更新依赖版本
```

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/dev-skills&type=Date)](https://star-history.com/#your-username/dev-skills&Date)

---

## � 联系我们

- 📧 **邮箱**：dev-skills@example.com
- 🐛 **问题反馈**：[GitHub Issues](https://github.com/your-username/dev-skills/issues)
- � **讨论区**：[GitHub Discussions](https://github.com/your-username/dev-skills/discussions)
- � **文档**：[完整文档](https://github.com/your-username/dev-skills/wiki)

---

## � 许可证

本项目采用 [MIT 许可证](LICENSE) - 欢迎自由使用和修改！

---

## ❤️ 致谢

感谢所有为这个项目做出贡献的开发者！

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个Star支持一下！**

[![GitHub stars](https://img.shields.io/github/stars/your-username/dev-skills?style=social)](https://github.com/your-username/dev-skills)

</div>
