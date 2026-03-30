#!/bin/bash

# 🔄 业务适配脚本
# 将现有项目适配到不同业务场景

set -e

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 业务类型配置
declare -A BUSINESS_CONFIGS
BUSINESS_CONFIGS["golf"]="打位:人:60:4:10b981:golf:outdoor"
BUSINESS_CONFIGS["fitness"]="课程:人:90:20:ef4444:fitness:energy"
BUSINESS_CONFIGS["restaurant"]="餐桌:位:120:12:f59e0b:food:elegant"
BUSINESS_CONFIGS["clinic"]="诊室:人:30:1:3b82f6:medical:professional"

# 打印帮助信息
show_help() {
    echo -e "${BLUE}🔄 业务适配脚本${NC}"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -p, --path PATH           项目路径 (默认: 当前目录)"
    echo "  -t, --target TYPE         目标业务类型"
    echo "  -h, --help                显示帮助信息"
    echo ""
    echo "业务类型:"
    echo "  - golf      高尔夫球场"
    echo "  - fitness   健身中心"
    echo "  - restaurant 餐厅"
    echo "  - clinic    诊所"
    echo ""
    echo "示例:"
    echo "  $0 -t fitness              # 适配当前目录到健身房"
    echo "  $0 -p ~/my-project -t restaurant  # 适配指定项目到餐厅"
}

# 解析命令行参数
PROJECT_PATH="."
TARGET_TYPE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--path)
            PROJECT_PATH="$2"
            shift 2
            ;;
        -t|--target)
            TARGET_TYPE="$2"
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
if [[ -z "$TARGET_TYPE" ]]; then
    echo -e "${RED}❌ 错误: 请指定目标业务类型${NC}"
    show_help
    exit 1
fi

# 检查业务类型是否支持
if [[ -z "${BUSINESS_CONFIGS[$TARGET_TYPE]}" ]]; then
    echo -e "${RED}❌ 错误: 不支持的业务类型 '$TARGET_TYPE'${NC}"
    echo -e "${YELLOW}支持的业务类型: ${!BUSINESS_CONFIGS[*]}${NC}"
    exit 1
fi

# 检查项目路径
if [[ ! -d "$PROJECT_PATH" ]]; then
    echo -e "${RED}❌ 错误: 项目路径 '$PROJECT_PATH' 不存在${NC}"
    exit 1
fi

# 获取业务配置
IFS=':' read -r ENTITY CAPACITY_UNIT TIME_SLOT MAX_CAPACITY COLOR ICON THEME <<< "${BUSINESS_CONFIGS[$TARGET_TYPE]}"

echo -e "${BLUE}🔄 开始业务适配...${NC}"
echo -e "   项目路径: $PROJECT_PATH"
echo -e "   目标类型: $TARGET_TYPE"
echo -e "   实体名称: $ENTITY"
echo -e "   容量单位: $CAPACITY_UNIT"
echo -e "   时段长度: ${TIME_SLOT}分钟"
echo -e "   最大容量: $MAX_CAPACITY"
echo ""

# 1. 更新业务配置文件
echo -e "${YELLOW}⚙️  更新业务配置...${NC}"
CONFIG_FILE="$PROJECT_PATH/config/business.config.ts"

# 创建配置目录
mkdir -p "$(dirname "$CONFIG_FILE")"

# 生成新的业务配置
cat > "$CONFIG_FILE" << EOF
export const businessConfig = {
  name: "$(get_business_name "$TARGET_TYPE")",
  type: "$TARGET_TYPE",
  entity: "$ENTITY",
  capacityUnit: "$CAPACITY_UNIT",
  timeSlotDuration: $TIME_SLOT,
  maxCapacity: $MAX_CAPACITY,
  
  booking: {
    maxAdvanceDays: $(get_max_days "$TARGET_TYPE"),
    minAdvanceHours: $(get_min_hours "$TARGET_TYPE"),
    allowPartial: $(get_allow_partial "$TARGET_TYPE"),
  },
  
  ui: {
    primaryColor: "#$COLOR",
    iconSet: "$ICON",
    theme: "$THEME",
  }
};
EOF
echo -e "${GREEN}   ✅ 业务配置更新完成${NC}"

# 2. 更新 Prisma Schema
echo -e "${YELLOW}🗄️  更新数据库模型...${NC}"
SCHEMA_FILE="$PROJECT_PATH/prisma/schema.prisma"

if [[ -f "$SCHEMA_FILE" ]]; then
    # 备份原文件
    cp "$SCHEMA_FILE" "$SCHEMA_FILE.backup"
    
    # 更新 Venue 模型
    sed -i '' "s/venueType.*打位/venueType \"$ENTITY\"/g" "$SCHEMA_FILE"
    sed -i '' "s/maxPlayers.*4/maxPlayers $MAX_CAPACITY/g" "$SCHEMA_FILE"
    
    echo -e "${GREEN}   ✅ 数据库模型更新完成${NC}"
    echo -e "${YELLOW}   ⚠️  请运行: npx prisma migrate dev${NC}"
else
    echo -e "${YELLOW}   ⚠️  Prisma schema 不存在，跳过更新${NC}"
fi

# 3. 更新配置文件
echo -e "${YELLOW}📋 更新应用配置...${NC}"
APP_CONFIG="$PROJECT_PATH/config/app.config.ts"

if [[ -f "$APP_CONFIG" ]]; then
    # 备份原文件
    cp "$APP_CONFIG" "$APP_CONFIG.backup"
    
    # 更新应用名称
    sed -i '' "s/KTSP高尔夫预订系统/$(get_app_name "$TARGET_TYPE")/g" "$APP_CONFIG"
    
    echo -e "${GREEN}   ✅ 应用配置更新完成${NC}"
else
    echo -e "${YELLOW}   ⚠️  应用配置不存在，跳过更新${NC}"
fi

# 4. 更新 Tailwind 配置
echo -e "${YELLOW}🎨 更新主题配置...${NC}"
TAILWIND_CONFIG="$PROJECT_PATH/tailwind.config.ts"

if [[ -f "$TAILWIND_CONFIG" ]]; then
    # 备份原文件
    cp "$TAILWIND_CONFIG" "$TAILWIND_CONFIG.backup"
    
    # 更新主色调
    sed -i '' "s/--primary 220 90% 50%/--primary $COLOR 70% 50%/g" "$TAILWIND_CONFIG"
    
    echo -e "${GREEN}   ✅ 主题配置更新完成${NC}"
else
    echo -e "${YELLOW}   ⚠️  Tailwind 配置不存在，跳过更新${NC}"
fi

# 5. 更新环境配置
echo -e "${YELLOW}🔧 更新环境配置...${NC}"
ENV_FILE="$PROJECT_PATH/.env.example"

if [[ -f "$ENV_FILE" ]]; then
    # 备份原文件
    cp "$ENV_FILE" "$ENV_FILE.backup"
    
    # 更新数据库名称
    NEW_DB_NAME="$(basename "$PROJECT_PATH")_${TARGET_TYPE}"
    sed -i '' "s/ktsp_booking/$NEW_DB_NAME/g" "$ENV_FILE"
    
    echo -e "${GREEN}   ✅ 环境配置更新完成${NC}"
else
    echo -e "${YELLOW}   ⚠️  环境配置不存在，跳过更新${NC}"
fi

# 6. 创建适配说明文档
echo -e "${YELLOW}📚 生成适配说明...${NC}"
ADAPT_DOC="$PROJECT_PATH/docs/业务适配说明.md"
mkdir -p "$(dirname "$ADAPT_DOC")"

cat > "$ADAPT_DOC" << EOF
# 业务适配说明

## 📋 适配信息

- **原项目**: $(basename "$PROJECT_PATH")
- **目标类型**: $TARGET_TYPE
- **适配时间**: $(date)

## 🔄 已完成的适配

### ✅ 配置文件
- \`config/business.config.ts\` - 业务逻辑配置
- \`config/app.config.ts\` - 应用配置
- \`tailwind.config.ts\` - 主题配置
- \`.env.example\` - 环境配置

### ✅ 数据库
- \`prisma/schema.prisma\` - 数据模型更新

## 🚀 下一步操作

### 1. 数据库迁移
\`\`\`bash
npx prisma migrate dev --name adapt-to-$TARGET_TYPE
\`\`\`

### 2. 重新安装依赖
\`\`\`bash
npm install
\`\`\`

### 3. 更新 UI 组件
根据业务需求更新以下组件：
- \`src/components/booking/\` - 预订相关组件
- \`src/components/ui/\` - 基础 UI 组件

### 4. 更新文案
检查并更新以下文件中的文案：
- \`config/modules/\` - 模块配置
- \`src/app/\` - 页面标题和描述

### 5. 测试验证
\`\`\`bash
npm run dev
npm test
\`\`\`

## 🎨 UI 定制建议

### 图标替换
\`\`\`typescript
// 示例：将高尔夫图标替换为健身图标
import { Dumbbell } from 'lucide-react';
// 替换原有的 Golf 图标
\`\`\`

### 颜色主题
当前主色调: \`#$COLOR\`
可根据需要调整 \`tailwind.config.ts\`

### 布局调整
根据业务特点调整页面布局：
- 高尔夫：场地展示为主
- 健身：课程安排为主  
- 餐厅：桌型选择为主
- 诊所：医生排班为主

---

*适配完成时间: $(date)*
EOF

echo -e "${GREEN}   ✅ 适配说明生成完成${NC}"

# 完成
echo ""
echo -e "${GREEN}🎉 业务适配完成！${NC}"
echo ""
echo -e "${BLUE}📂 项目路径: $PROJECT_PATH${NC}"
echo -e "${BLUE}🎯 目标类型: $TARGET_TYPE${NC}"
echo ""
echo -e "${YELLOW}📋 下一步操作:${NC}"
echo "1. 进入项目目录: cd $PROJECT_PATH"
echo "2. 查看适配说明: cat docs/业务适配说明.md"
echo "3. 执行数据库迁移: npx prisma migrate dev"
echo "4. 启动开发服务器: npm run dev"
echo ""
echo -e "${GREEN}✨ 适配完成！${NC}"

# 辅助函数
get_business_name() {
    case $1 in
        "golf") echo "高尔夫俱乐部" ;;
        "fitness") echo "健身中心" ;;
        "restaurant") echo "餐厅" ;;
        "clinic") echo "诊所" ;;
        *) echo "预订系统" ;;
    esac
}

get_app_name() {
    case $1 in
        "golf") echo "高尔夫预订系统" ;;
        "fitness") echo "健身预约系统" ;;
        "restaurant") echo "餐厅预订系统" ;;
        "clinic") echo "诊所预约系统" ;;
        *) echo "预订系统" ;;
    esac
}

get_max_days() {
    case $1 in
        "golf") echo "7" ;;
        "fitness") echo "3" ;;
        "restaurant") echo "30" ;;
        "clinic") echo "14" ;;
        *) echo "7" ;;
    esac
}

get_min_hours() {
    case $1 in
        "golf") echo "2" ;;
        "fitness") echo "4" ;;
        "restaurant") echo "1" ;;
        "clinic") echo "24" ;;
        *) echo "2" ;;
    esac
}

get_allow_partial() {
    case $1 in
        "golf") echo "true" ;;
        "fitness") echo "false" ;;
        "restaurant") echo "true" ;;
        "clinic") echo "false" ;;
        *) echo "true" ;;
    esac
}
