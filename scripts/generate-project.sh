#!/bin/bash

# 🚀 项目生成脚本
# 基于模板快速创建新项目

set -e

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 默认配置
DEFAULT_TEMPLATE="nextjs-booking-system"
DEFAULT_BUSINESS_TYPE="generic"
SKILLS_DIR="$HOME/dev-skills"

# 打印帮助信息
show_help() {
    echo -e "${BLUE}🚀 项目生成脚本${NC}"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -t, --template TEMPLATE     项目模板 (默认: $DEFAULT_TEMPLATE)"
    echo "  -n, --name NAME             项目名称"
    echo "  -p, --path PATH             项目路径 (默认: ~/项目名称)"
    echo "  -b, --business TYPE         业务类型 (golf, fitness, restaurant, clinic)"
    echo "  -h, --help                  显示帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 -n my-fitness-app -b fitness"
    echo "  $0 -t nextjs-booking-system -n restaurant-system -b restaurant"
    echo ""
    echo "可用模板:"
    echo "  - nextjs-booking-system     完整预订系统"
    echo "  - react-admin-dashboard     管理后台"
    echo "  - vue-ecommerce            电商系统"
}

# 解析命令行参数
TEMPLATE="$DEFAULT_TEMPLATE"
PROJECT_NAME=""
PROJECT_PATH=""
BUSINESS_TYPE="$DEFAULT_BUSINESS_TYPE"

while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--template)
            TEMPLATE="$2"
            shift 2
            ;;
        -n|--name)
            PROJECT_NAME="$2"
            shift 2
            ;;
        -p|--path)
            PROJECT_PATH="$2"
            shift 2
            ;;
        -b|--business)
            BUSINESS_TYPE="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo -e "${RED}未知选项: $1${NC}"
            show_help
            exit 1
            ;;
    esac
done

# 检查必需参数
if [[ -z "$PROJECT_NAME" ]]; then
    echo -e "${RED}❌ 错误: 请提供项目名称${NC}"
    show_help
    exit 1
fi

# 设置默认项目路径
if [[ -z "$PROJECT_PATH" ]]; then
    PROJECT_PATH="$HOME/$PROJECT_NAME"
fi

# 检查模板是否存在
TEMPLATE_PATH="$SKILLS_DIR/templates/$TEMPLATE"
if [[ ! -d "$TEMPLATE_PATH" ]]; then
    echo -e "${RED}❌ 错误: 模板 '$TEMPLATE' 不存在${NC}"
    echo -e "${YELLOW}可用模板:${NC}"
    ls -1 "$SKILLS_DIR/templates/" 2>/dev/null || echo "  (无可用模板)"
    exit 1
fi

# 检查目标路径是否已存在
if [[ -d "$PROJECT_PATH" ]]; then
    echo -e "${RED}❌ 错误: 目录 '$PROJECT_PATH' 已存在${NC}"
    echo -e "${YELLOW}请选择其他路径或删除现有目录${NC}"
    exit 1
fi

echo -e "${BLUE}🚀 开始生成项目...${NC}"
echo -e "   模板: $TEMPLATE"
echo -e "   名称: $PROJECT_NAME"
echo -e "   路径: $PROJECT_PATH"
echo -e "   业务: $BUSINESS_TYPE"
echo ""

# 1. 复制模板
echo -e "${YELLOW}📋 复制模板...${NC}"
cp -r "$TEMPLATE_PATH" "$PROJECT_PATH"
echo -e "${GREEN}   ✅ 模板复制完成${NC}"

# 2. 更新 package.json
echo -e "${YELLOW}📦 更新 package.json...${NC}"
PACKAGE_JSON="$PROJECT_PATH/package.json"
if [[ -f "$PACKAGE_JSON" ]]; then
    # 替换项目名称
    sed -i '' "s/\"name\": \"ktsp-booking\"/\"name\": \"$PROJECT_NAME\"/g" "$PACKAGE_JSON"
    echo -e "${GREEN}   ✅ package.json 更新完成${NC}"
else
    echo -e "${YELLOW}   ⚠️  package.json 不存在，跳过更新${NC}"
fi

# 3. 创建业务配置
echo -e "${YELLOW}⚙️  生成业务配置...${NC}"
CONFIG_FILE="$PROJECT_PATH/config/business.config.ts"

# 根据业务类型生成配置
case "$BUSINESS_TYPE" in
    "golf")
        cat > "$CONFIG_FILE" << 'EOF'
export const businessConfig = {
  name: "高尔夫俱乐部",
  type: "golf",
  entity: "打位",
  capacityUnit: "人",
  timeSlotDuration: 60,
  maxCapacity: 4,
  
  booking: {
    maxAdvanceDays: 7,
    minAdvanceHours: 2,
    allowPartial: true,
  },
  
  ui: {
    primaryColor: "#10b981",
    iconSet: "golf",
    theme: "outdoor",
  }
};
EOF
        ;;
    "fitness")
        cat > "$CONFIG_FILE" << 'EOF'
export const businessConfig = {
  name: "健身中心",
  type: "fitness",
  entity: "课程",
  capacityUnit: "人",
  timeSlotDuration: 90,
  maxCapacity: 20,
  
  booking: {
    maxAdvanceDays: 3,
    minAdvanceHours: 4,
    allowPartial: false,
  },
  
  ui: {
    primaryColor: "#ef4444",
    iconSet: "fitness",
    theme: "energy",
  }
};
EOF
        ;;
    "restaurant")
        cat > "$CONFIG_FILE" << 'EOF'
export const businessConfig = {
  name: "餐厅",
  type: "restaurant",
  entity: "餐桌",
  capacityUnit: "位",
  timeSlotDuration: 120,
  maxCapacity: 12,
  
  booking: {
    maxAdvanceDays: 30,
    minAdvanceHours: 1,
    allowPartial: true,
  },
  
  ui: {
    primaryColor: "#f59e0b",
    iconSet: "food",
    theme: "elegant",
  }
};
EOF
        ;;
    "clinic")
        cat > "$CONFIG_FILE" << 'EOF'
export const businessConfig = {
  name: "诊所",
  type: "clinic",
  entity: "诊室",
  capacityUnit: "人",
  timeSlotDuration: 30,
  maxCapacity: 1,
  
  booking: {
    maxAdvanceDays: 14,
    minAdvanceHours: 24,
    allowPartial: false,
  },
  
  ui: {
    primaryColor: "#3b82f6",
    iconSet: "medical",
    theme: "professional",
  }
};
EOF
        ;;
    *)
        cat > "$CONFIG_FILE" << 'EOF'
export const businessConfig = {
  name: "预订系统",
  type: "generic",
  entity: "项目",
  capacityUnit: "人",
  timeSlotDuration: 60,
  maxCapacity: 10,
  
  booking: {
    maxAdvanceDays: 7,
    minAdvanceHours: 2,
    allowPartial: true,
  },
  
  ui: {
    primaryColor: "#6366f1",
    iconSet: "default",
    theme: "modern",
  }
};
EOF
        ;;
esac
echo -e "${GREEN}   ✅ 业务配置生成完成${NC}"

# 4. 创建环境配置文件
echo -e "${YELLOW}🔧 生成环境配置...${NC}"
ENV_FILE="$PROJECT_PATH/.env.example"
cat > "$ENV_FILE" << 'EOF'
# 数据库配置
DATABASE_URL="mysql://user:password@localhost:3306/db_name"

# NextAuth 配置
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# 第三方登录
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# 微信登录
WECHAT_APP_ID=""
WECHAT_APP_SECRET=""

# 支付配置
WECHAT_PAY_MERCHANT_ID=""
WECHAT_PAY_KEY=""
ALIPAY_APP_ID=""
ALIPAY_PRIVATE_KEY=""

# 短信服务
SMS_ACCESS_KEY=""
SMS_SECRET_KEY=""

# 文件上传
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE="5MB"

# Redis (可选)
REDIS_URL="redis://localhost:6379"

# 邮件服务
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
EOF
echo -e "${GREEN}   ✅ 环境配置生成完成${NC}"

# 5. 创建启动脚本
echo -e "${YELLOW}📜 生成启动脚本...${NC}"
START_SCRIPT="$PROJECT_PATH/scripts/setup.sh"
mkdir -p "$(dirname "$START_SCRIPT")"
cat > "$START_SCRIPT" << 'EOF'
#!/bin/bash

# 项目初始化脚本

echo "🚀 初始化项目..."

# 1. 安装依赖
echo "📦 安装依赖..."
npm install

# 2. 复制环境配置
echo "🔧 配置环境变量..."
if [[ ! -f .env ]]; then
    cp .env.example .env
    echo "⚠️  请编辑 .env 文件配置数据库等信息"
fi

# 3. 生成 Prisma 客户端
echo "🗄️  初始化数据库..."
npx prisma generate

# 4. 运行数据库迁移
echo "🔄 执行数据库迁移..."
npx prisma migrate dev --name init

# 5. 启动开发服务器
echo "🌟 启动开发服务器..."
npm run dev
EOF
chmod +x "$START_SCRIPT"
echo -e "${GREEN}   ✅ 启动脚本生成完成${NC}"

# 6. 创建开发文档
echo -e "${YELLOW}📚 生成开发文档...${NC}"
DEV_DOC="$PROJECT_PATH/docs/开发指南.md"
mkdir -p "$(dirname "$DEV_DOC")"
cat > "$DEV_DOC" << EOF
# $PROJECT_NAME 开发指南

## 🚀 快速开始

### 1. 环境准备
- Node.js 18+
- MySQL 8.0+
- Git

### 2. 项目初始化
\`\`\`bash
./scripts/setup.sh
\`\`\`

### 3. 启动开发
\`\`\`bash
npm run dev
\`\`\`

## 📁 项目结构

请参考模板 README.md

## 🔧 开发规范

### 代码风格
- 使用 TypeScript
- 遵循 ESLint 规则
- 组件使用 PascalCase
- 文件名使用 kebab-case

### 提交规范
\`\`\`bash
feat: 新功能
fix: 修复问题
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建工具
\`\`\`

## 🧪 测试

\`\`\`bash
# 单元测试
npm test

# E2E 测试
npm run test:e2e

# 测试覆盖率
npm run test:coverage
\`\`\`

## 📦 部署

### Vercel 部署
\`\`\`bash
vercel --prod
\`\`\`

### Docker 部署
\`\`\`bash
docker build -t $PROJECT_NAME .
docker run -p 3000:3000 $PROJECT_NAME
\`\`\`

---

*生成时间: $(date)*
EOF
echo -e "${GREEN}   ✅ 开发文档生成完成${NC}"

# 完成
echo ""
echo -e "${GREEN}🎉 项目生成完成！${NC}"
echo ""
echo -e "${BLUE}📂 项目路径: $PROJECT_PATH${NC}"
echo -e "${BLUE}🚀 启动命令: cd $PROJECT_PATH && ./scripts/setup.sh${NC}"
echo ""
echo -e "${YELLOW}📋 下一步操作:${NC}"
echo "1. 进入项目目录: cd $PROJECT_PATH"
echo "2. 编辑环境配置: vim .env"
echo "3. 运行初始化: ./scripts/setup.sh"
echo "4. 开始开发: npm run dev"
echo ""
echo -e "${GREEN}✨ 享受开发吧！${NC}"
