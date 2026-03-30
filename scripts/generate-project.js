#!/usr/bin/env node

/**
 * 🚀 项目生成脚本 (Node.js版本)
 * 基于模板快速创建新项目
 * 
 * 跨平台支持：Windows, macOS, Linux
 */

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const readline = require('readline');

// 颜色输出工具
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const colorize = (color, text) => `${colors[color]}${text}${colors.reset}`;

// 默认配置
const DEFAULT_TEMPLATE = 'nextjs-booking-system';
const DEFAULT_BUSINESS_TYPE = 'generic';
const SKILLS_DIR = path.join(os.homedir(), 'dev-skills');

// 业务类型配置
const BUSINESS_CONFIGS = {
  golf: {
    name: '高尔夫俱乐部',
    entity: '打位',
    capacityUnit: '人',
    timeSlotDuration: 60,
    maxCapacity: 4,
    maxAdvanceDays: 7,
    minAdvanceHours: 2,
    allowPartial: true,
    primaryColor: '#10b981',
    iconSet: 'golf',
    theme: 'outdoor'
  },
  fitness: {
    name: '健身中心',
    entity: '课程',
    capacityUnit: '人',
    timeSlotDuration: 90,
    maxCapacity: 20,
    maxAdvanceDays: 3,
    minAdvanceHours: 4,
    allowPartial: false,
    primaryColor: '#ef4444',
    iconSet: 'fitness',
    theme: 'energy'
  },
  restaurant: {
    name: '餐厅',
    entity: '餐桌',
    capacityUnit: '位',
    timeSlotDuration: 120,
    maxCapacity: 12,
    maxAdvanceDays: 30,
    minAdvanceHours: 1,
    allowPartial: true,
    primaryColor: '#f59e0b',
    iconSet: 'food',
    theme: 'elegant'
  },
  clinic: {
    name: '诊所',
    entity: '诊室',
    capacityUnit: '人',
    timeSlotDuration: 30,
    maxCapacity: 1,
    maxAdvanceDays: 14,
    minAdvanceHours: 24,
    allowPartial: false,
    primaryColor: '#3b82f6',
    iconSet: 'medical',
    theme: 'professional'
  },
  generic: {
    name: '预订系统',
    entity: '项目',
    capacityUnit: '人',
    timeSlotDuration: 60,
    maxCapacity: 10,
    maxAdvanceDays: 7,
    minAdvanceHours: 2,
    allowPartial: true,
    primaryColor: '#6366f1',
    iconSet: 'default',
    theme: 'modern'
  }
};

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log(colorize('blue', '🚀 项目生成脚本'));
  console.log('');
  console.log('用法: node generate-project.js [选项]');
  console.log('');
  console.log('选项:');
  console.log('  -t, --template TEMPLATE     项目模板 (默认: nextjs-booking-system)');
  console.log('  -n, --name NAME             项目名称');
  console.log('  -p, --path PATH             项目路径 (默认: ~/项目名称)');
  console.log('  -b, --business TYPE         业务类型 (golf, fitness, restaurant, clinic)');
  console.log('  -h, --help                  显示帮助信息');
  console.log('');
  console.log('示例:');
  console.log('  node generate-project.js -n my-fitness-app -b fitness');
  console.log('  node generate-project.js -t nextjs-booking-system -n restaurant-system -b restaurant');
  console.log('');
  console.log('可用模板:');
  console.log('  - nextjs-booking-system     完整预订系统');
  console.log('  - react-admin-dashboard     管理后台');
  console.log('  - vue-ecommerce            电商系统');
}

/**
 * 解析命令行参数
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    template: DEFAULT_TEMPLATE,
    name: '',
    path: '',
    business: DEFAULT_BUSINESS_TYPE
  };

  for (let i = 0; i < args.length; i += 2) {
    const arg = args[i];
    const value = args[i + 1];

    switch (arg) {
      case '-t':
      case '--template':
        options.template = value;
        break;
      case '-n':
      case '--name':
        options.name = value;
        break;
      case '-p':
      case '--path':
        options.path = value;
        break;
      case '-b':
      case '--business':
        options.business = value;
        break;
      case '-h':
      case '--help':
        showHelp();
        process.exit(0);
      default:
        console.error(colorize('red', `❌ 错误: 未知选项 ${arg}`));
        showHelp();
        process.exit(1);
    }
  }

  return options;
}

/**
 * 验证参数
 */
async function validateOptions(options) {
  if (!options.name) {
    console.error(colorize('red', '❌ 错误: 请提供项目名称'));
    showHelp();
    process.exit(1);
  }

  // 设置默认项目路径
  if (!options.path) {
    options.path = path.join(os.homedir(), options.name);
  }

  // 检查模板是否存在
  const templatePath = path.join(SKILLS_DIR, 'templates', options.template);
  if (!await fs.pathExists(templatePath)) {
    console.error(colorize('red', `❌ 错误: 模板 '${options.template}' 不存在`));
    console.log(colorize('yellow', '可用模板:'));
    
    try {
      const templates = await fs.readdir(path.join(SKILLS_DIR, 'templates'));
      templates.forEach(template => console.log(`  - ${template}`));
    } catch (error) {
      console.log('  (无可用模板)');
    }
    
    process.exit(1);
  }

  // 检查目标路径是否已存在
  if (await fs.pathExists(options.path)) {
    console.error(colorize('red', `❌ 错误: 目录 '${options.path}' 已存在`));
    console.log(colorize('yellow', '请选择其他路径或删除现有目录'));
    process.exit(1);
  }

  // 检查业务类型是否支持
  if (!BUSINESS_CONFIGS[options.business]) {
    console.error(colorize('red', `❌ 错误: 不支持的业务类型 '${options.business}'`));
    console.log(colorize('yellow', `支持的业务类型: ${Object.keys(BUSINESS_CONFIGS).join(', ')}`));
    process.exit(1);
  }
}

/**
 * 生成业务配置文件
 */
function generateBusinessConfig(businessType) {
  const config = BUSINESS_CONFIGS[businessType];
  
  return `export const businessConfig = {
  name: "${config.name}",
  type: "${businessType}",
  entity: "${config.entity}",
  capacityUnit: "${config.capacityUnit}",
  timeSlotDuration: ${config.timeSlotDuration},
  maxCapacity: ${config.maxCapacity},
  
  booking: {
    maxAdvanceDays: ${config.maxAdvanceDays},
    minAdvanceHours: ${config.minAdvanceHours},
    allowPartial: ${config.allowPartial},
  },
  
  ui: {
    primaryColor: "${config.primaryColor}",
    iconSet: "${config.iconSet}",
    theme: "${config.theme}",
  }
};`;
}

/**
 * 生成环境配置文件
 */
function generateEnvConfig() {
  return `# 数据库配置
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
`;
}

/**
 * 生成启动脚本
 */
function generateSetupScript(projectName) {
  const isWindows = process.platform === 'win32';
  
  if (isWindows) {
    return `@echo off
REM 项目初始化脚本

echo 🚀 初始化项目...

REM 1. 安装依赖
echo 📦 安装依赖...
npm install

REM 2. 复制环境配置
echo 🔧 配置环境变量...
if not exist .env (
    copy .env.example .env
    echo ⚠️  请编辑 .env 文件配置数据库等信息
)

REM 3. 生成 Prisma 客户端
echo 🗄️  初始化数据库...
npx prisma generate

REM 4. 运行数据库迁移
echo 🔄 执行数据库迁移...
npx prisma migrate dev --name init

REM 5. 启动开发服务器
echo 🌟 启动开发服务器...
npm run dev
`;
  } else {
    return `#!/bin/bash

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
`;
  }
}

/**
 * 生成开发文档
 */
function generateDevDoc(projectName) {
  const currentDate = new Date().toLocaleDateString('zh-CN');
  
  return `# ${projectName} 开发指南

## 🚀 快速开始

### 1. 环境准备
- Node.js 18+
- MySQL 8.0+
- Git

### 2. 项目初始化
\`\`\`bash
${process.platform === 'win32' ? 'scripts\\setup.bat' : './scripts/setup.sh'}
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
docker build -t ${projectName} .
docker run -p 3000:3000 ${projectName}
\`\`\`

---

*生成时间: ${currentDate}*`;
}

/**
 * 主函数
 */
async function main() {
  try {
    // 解析参数
    const options = parseArgs();
    
    // 验证参数
    await validateOptions(options);
    
    console.log(colorize('blue', '🚀 开始生成项目...'));
    console.log(`   模板: ${options.template}`);
    console.log(`   名称: ${options.name}`);
    console.log(`   路径: ${options.path}`);
    console.log(`   业务: ${options.business}`);
    console.log('');

    // 1. 复制模板
    console.log(colorize('yellow', '📋 复制模板...'));
    const templatePath = path.join(SKILLS_DIR, 'templates', options.template);
    await fs.copy(templatePath, options.path);
    console.log(colorize('green', '   ✅ 模板复制完成'));

    // 2. 更新 package.json
    console.log(colorize('yellow', '📦 更新 package.json...'));
    const packageJsonPath = path.join(options.path, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = options.name;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      console.log(colorize('green', '   ✅ package.json 更新完成'));
    } else {
      console.log(colorize('yellow', '   ⚠️  package.json 不存在，跳过更新'));
    }

    // 3. 创建业务配置
    console.log(colorize('yellow', '⚙️  生成业务配置...'));
    const configDir = path.join(options.path, 'config');
    await fs.ensureDir(configDir);
    const configPath = path.join(configDir, 'business.config.ts');
    const businessConfig = generateBusinessConfig(options.business);
    await fs.writeFile(configPath, businessConfig);
    console.log(colorize('green', '   ✅ 业务配置生成完成'));

    // 4. 创建环境配置文件
    console.log(colorize('yellow', '🔧 生成环境配置...'));
    const envPath = path.join(options.path, '.env.example');
    const envConfig = generateEnvConfig();
    await fs.writeFile(envPath, envConfig);
    console.log(colorize('green', '   ✅ 环境配置生成完成'));

    // 5. 创建启动脚本
    console.log(colorize('yellow', '📜 生成启动脚本...'));
    const scriptsDir = path.join(options.path, 'scripts');
    await fs.ensureDir(scriptsDir);
    const setupScript = generateSetupScript(options.name);
    const setupScriptPath = path.join(scriptsDir, process.platform === 'win32' ? 'setup.bat' : 'setup.sh');
    await fs.writeFile(setupScriptPath, setupScript);
    
    // 在Unix系统上设置执行权限
    if (process.platform !== 'win32') {
      try {
        execSync(`chmod +x "${setupScriptPath}"`);
      } catch (error) {
        console.log(colorize('yellow', '   ⚠️  无法设置执行权限，请手动设置: chmod +x scripts/setup.sh'));
      }
    }
    
    console.log(colorize('green', '   ✅ 启动脚本生成完成'));

    // 6. 创建开发文档
    console.log(colorize('yellow', '📚 生成开发文档...'));
    const docsDir = path.join(options.path, 'docs');
    await fs.ensureDir(docsDir);
    const devDoc = generateDevDoc(options.name);
    const devDocPath = path.join(docsDir, '开发指南.md');
    await fs.writeFile(devDocPath, devDoc);
    console.log(colorize('green', '   ✅ 开发文档生成完成'));

    // 完成
    console.log('');
    console.log(colorize('green', '🎉 项目生成完成！'));
    console.log('');
    console.log(colorize('blue', `📂 项目路径: ${options.path}`));
    const setupCommand = process.platform === 'win32' ? 
      `cd "${options.path}" && scripts\\setup.bat` : 
      `cd "${options.path}" && ./scripts/setup.sh`;
    console.log(colorize('blue', `🚀 启动命令: ${setupCommand}`));
    console.log('');
    console.log(colorize('yellow', '📋 下一步操作:'));
    console.log(`1. 进入项目目录: cd "${options.path}"`);
    console.log('2. 编辑环境配置: vim .env');
    console.log('3. 运行初始化: ' + (process.platform === 'win32' ? 'scripts\\setup.bat' : './scripts/setup.sh'));
    console.log('4. 开始开发: npm run dev');
    console.log('');
    console.log(colorize('green', '✨ 享受开发吧！'));

  } catch (error) {
    console.error(colorize('red', `❌ 生成失败: ${error.message}`));
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = {
  main,
  BUSINESS_CONFIGS,
  generateBusinessConfig,
  generateEnvConfig,
  generateSetupScript,
  generateDevDoc
};
