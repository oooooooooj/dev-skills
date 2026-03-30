# 🏌️ Next.js 预订系统模板

> 基于 KTSP 高尔夫预订系统的完整业务模板

---

## 🎯 适用场景

- 🏌️ **高尔夫球场**：打位预约、教练预约
- 🏋️ **健身房**：课程预约、私教预约
- 🍽️ **餐厅**：餐桌预订、包间预订
- 🏥 **诊所**：医生预约、体检预约
- 💇 **美容院**：服务预约、技师预约

---

## 🚀 快速开始

```bash
# 1. 复制模板
cp -r ~/dev-skills/templates/nextjs-booking-system ~/my-new-project

# 2. 进入项目
cd ~/my-new-project

# 3. 安装依赖
npm install

# 4. 配置数据库
# 编辑 .env 文件

# 5. 初始化数据库
npx prisma migrate dev

# 6. 启动开发服务器
npm run dev
```

---

## 📋 功能清单

### ✅ 核心功能
- 🔐 **用户系统**：手机号登录、第三方登录、会员等级
- 📅 **预约系统**：时段选择、冲突检测、并发控制
- 👥 **邀请组队**：多人预约、邀请通知、状态管理
- 💰 **积分系统**：签到、兑换、流水记录
- 🎫 **优惠券**：发放、使用、过期管理
- 📊 **管理后台**：用户管理、订单管理、统计报表

### 🎨 UI/UX 特性
- 📱 **响应式设计**：手机/平板/桌面完美适配
- 🌙 **主题切换**：亮色/暗色模式
- 🔔 **实时通知**：WebSocket 推送
- ⚡ **骨架屏**：优雅的加载状态

---

## 🔧 技术栈

- **前端**：Next.js 16 + TypeScript + TailwindCSS
- **UI库**：shadcn/ui + Lucide Icons
- **后端**：Next.js API Routes
- **数据库**：MySQL + Prisma ORM
- **认证**：NextAuth.js
- **部署**：Vercel + Docker

---

## 📁 项目结构

```
src/
├── app/                    # 页面路由
│   ├── (main)/            # 用户端页面
│   ├── (admin)/           # 管理后台
│   └── api/               # API接口
├── components/            # React组件
│   ├── ui/               # 基础UI组件
│   ├── booking/          # 预约相关组件
│   └── payment/          # 支付相关组件
├── lib/                  # 工具库
│   ├── auth.ts           # 认证逻辑
│   ├── booking-service.ts # 预约服务
│   └── payment-service.ts # 支付服务
├── hooks/                # 自定义Hooks
├── config/               # 配置文件
└── types/                # 类型定义
```

---

## 🎨 自定义配置

### 1. 业务配置
```typescript
// config/business.config.ts
export const businessConfig = {
  name: "我的健身房",
  type: "fitness", // golf, restaurant, fitness, clinic
  currency: "CNY",
  timezone: "Asia/Shanghai",
  
  // 预约规则
  booking: {
    maxAdvanceDays: 7,
    minAdvanceHours: 2,
    maxParticipants: 10,
    timeSlotDuration: 60, // 分钟
  },
  
  // 支付方式
  payment: {
    methods: ["wechat", "alipay", "card"],
    depositRequired: true,
    refundPolicy: "24h",
  }
};
```

### 2. UI配置
```typescript
// config/ui.config.ts
export const uiConfig = {
  theme: {
    primaryColor: "#10b981", // 绿色
    secondaryColor: "#f59e0b", // 橙色
    mode: "light", // light | dark | auto
  },
  
  branding: {
    logo: "/logo.png",
    favicon: "/favicon.ico",
    companyName: "我的公司",
  },
  
  layout: {
    navigation: "bottom", // top | bottom
    sidebar: false,
    compact: false,
  }
};
```

---

## 🔄 业务适配

### 高尔夫 → 健身房
```bash
# 1. 运行适配脚本
./scripts/adapt-business.sh --target fitness

# 2. 修改配置
# 编辑 config/business.config.ts

# 3. 更新UI
# 替换图标、文案、颜色
```

### 餐厅 → 诊所
```bash
# 1. 复制模板
cp -r templates/nextjs-booking-system my-clinic

# 2. 运行适配
./scripts/adapt-business.sh --target clinic

# 3. 定制开发
# 根据具体需求调整
```

---

## 📱 部署指南

### Vercel 部署
```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel --prod
```

### Docker 部署
```bash
# 1. 构建镜像
docker build -t my-booking-app .

# 2. 运行容器
docker run -p 3000:3000 my-booking-app
```

---

## 🧪 测试

```bash
# 运行所有测试
npm test

# 运行E2E测试
npm run test:e2e

# 运行性能测试
npm run test:performance
```

---

## 📞 支持

- 📖 [完整文档](../docs/)
- 🐛 [问题反馈](https://github.com/your-repo/issues)
- 💬 [交流群组](https://your-community.com)

---

*基于 KTSP 高尔夫预订系统，经过多个项目验证的成熟模板*
