#!/usr/bin/env node

/**
 * 🔄 业务适配脚本 (Node.js版本)
 * 将现有项目适配到不同业务场景
 * 
 * 跨平台支持：Windows, macOS, Linux
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

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

// 业务类型配置
const BUSINESS_CONFIGS = {
  golf: {
    name: '高尔夫俱乐部',
    appName: '高尔夫预订系统',
    entity: '打位',
    capacityUnit: '人',
    timeSlotDuration: 60,
    maxCapacity: 4,
    maxAdvanceDays: 7,
    minAdvanceHours: 2,
    allowPartial: true,
    primaryColor: '10b981',
    iconSet: 'golf',
    theme: 'outdoor'
  },
  fitness: {
    name: '健身中心',
    appName: '健身预约系统',
    entity: '课程',
    capacityUnit: '人',
    timeSlotDuration: 90,
    maxCapacity: 20,
    maxAdvanceDays: 3,
    minAdvanceHours: 4,
    allowPartial: false,
    primaryColor: 'ef4444',
    iconSet: 'fitness',
    theme: 'energy'
  },
  restaurant: {
    name: '餐厅',
    appName: '餐厅预订系统',
    entity: '餐桌',
    capacityUnit: '位',
    timeSlotDuration: 120,
    maxCapacity: 12,
    maxAdvanceDays: 30,
    minAdvanceHours: 1,
    allowPartial: true,
    primaryColor: 'f59e0b',
    iconSet: 'food',
    theme: 'elegant'
  },
  clinic: {
    name: '诊所',
    appName: '诊所预约系统',
    entity: '诊室',
    capacityUnit: '人',
    timeSlotDuration: 30,
    maxCapacity: 1,
    maxAdvanceDays: 14,
    minAdvanceHours: 24,
    allowPartial: false,
    primaryColor: '3b82f6',
    iconSet: 'medical',
    theme: 'professional'
  }
};

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log(colorize('blue', '🔄 业务适配脚本'));
  console.log('');
  console.log('用法: node adapt-business.js [选项]');
  console.log('');
  console.log('选项:');
  console.log('  -p, --path PATH           项目路径 (默认: 当前目录)');
  console.log('  -t, --target TYPE         目标业务类型');
  console.log('  -h, --help                显示帮助信息');
  console.log('');
  console.log('业务类型:');
  console.log('  - golf      高尔夫球场');
  console.log('  - fitness   健身中心');
  console.log('  - restaurant 餐厅');
  console.log('  - clinic    诊所');
  console.log('');
  console.log('示例:');
  console.log('  node adapt-business.js -t fitness              # 适配当前目录到健身房');
  console.log('  node adapt-business.js -p ~/my-project -t restaurant  # 适配指定项目到餐厅');
}

/**
 * 解析命令行参数
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    path: '.',
    target: ''
  };

  for (let i = 0; i < args.length; i += 2) {
    const arg = args[i];
    const value = args[i + 1];

    switch (arg) {
      case '-p':
      case '--path':
        options.path = value;
        break;
      case '-t':
      case '--target':
        options.target = value;
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
  if (!options.target) {
    console.error(colorize('red', '❌ 错误: 请指定目标业务类型'));
    showHelp();
    process.exit(1);
  }

  // 检查业务类型是否支持
  if (!BUSINESS_CONFIGS[options.target]) {
    console.error(colorize('red', `❌ 错误: 不支持的业务类型 '${options.target}'`));
    console.log(colorize('yellow', `支持的业务类型: ${Object.keys(BUSINESS_CONFIGS).join(', ')}`));
    process.exit(1);
  }

  // 检查项目路径
  const resolvedPath = path.resolve(options.path);
  if (!await fs.pathExists(resolvedPath)) {
    console.error(colorize('red', `❌ 错误: 项目路径 '${resolvedPath}' 不存在`));
    process.exit(1);
  }

  return resolvedPath;
}

/**
 * 备份文件
 */
async function backupFile(filePath) {
  if (await fs.pathExists(filePath)) {
    const backupPath = `${filePath}.backup`;
    await fs.copy(filePath, backupPath);
    return true;
  }
  return false;
}

/**
 * 更新文件内容
 */
async function updateFile(filePath, replacements) {
  if (!await fs.pathExists(filePath)) {
    return false;
  }

  let content = await fs.readFile(filePath, 'utf8');
  
  for (const [search, replace] of replacements) {
    content = content.replace(new RegExp(search, 'g'), replace);
  }
  
  await fs.writeFile(filePath, content);
  return true;
}

/**
 * 生成业务配置文件
 */
function generateBusinessConfig(targetType) {
  const config = BUSINESS_CONFIGS[targetType];
  
  return `export const businessConfig = {
  name: "${config.name}",
  type: "${targetType}",
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
    primaryColor: "#${config.primaryColor}",
    iconSet: "${config.iconSet}",
    theme: "${config.theme}",
  }
};`;
}

/**
 * 生成适配说明文档
 */
function generateAdaptDoc(projectPath, targetType) {
  const config = BUSINESS_CONFIGS[targetType];
  const projectName = path.basename(projectPath);
  const currentDate = new Date().toLocaleString('zh-CN');
  
  return `# 业务适配说明

## 📋 适配信息

- **原项目**: ${projectName}
- **目标类型**: ${targetType}
- **适配时间**: ${currentDate}

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
npx prisma migrate dev --name adapt-to-${targetType}
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
当前主色调: \`#${config.primaryColor}\`
可根据需要调整 \`tailwind.config.ts\`

### 布局调整
根据业务特点调整页面布局：
- 高尔夫：场地展示为主
- 健身：课程安排为主  
- 餐厅：桌型选择为主
- 诊所：医生排班为主

---

*适配完成时间: ${currentDate}*`;
}

/**
 * 主函数
 */
async function main() {
  try {
    // 解析参数
    const options = parseArgs();
    
    // 验证参数
    const projectPath = await validateOptions(options);
    const config = BUSINESS_CONFIGS[options.target];
    
    console.log(colorize('blue', '🔄 开始业务适配...'));
    console.log(`   项目路径: ${projectPath}`);
    console.log(`   目标类型: ${options.target}`);
    console.log(`   实体名称: ${config.entity}`);
    console.log(`   容量单位: ${config.capacityUnit}`);
    console.log(`   时段长度: ${config.timeSlotDuration}分钟`);
    console.log(`   最大容量: ${config.maxCapacity}`);
    console.log('');

    // 1. 更新业务配置文件
    console.log(colorize('yellow', '⚙️  更新业务配置...'));
    const configFile = path.join(projectPath, 'config', 'business.config.ts');
    await fs.ensureDir(path.dirname(configFile));
    
    const businessConfig = generateBusinessConfig(options.target);
    await fs.writeFile(configFile, businessConfig);
    console.log(colorize('green', '   ✅ 业务配置更新完成'));

    // 2. 更新 Prisma Schema
    console.log(colorize('yellow', '🗄️  更新数据库模型...'));
    const schemaFile = path.join(projectPath, 'prisma', 'schema.prisma');
    
    if (await fs.pathExists(schemaFile)) {
      await backupFile(schemaFile);
      
      const replacements = [
        [`venueType.*打位`, `venueType "${config.entity}"`],
        [`maxPlayers.*4`, `maxPlayers ${config.maxCapacity}`]
      ];
      
      await updateFile(schemaFile, replacements);
      console.log(colorize('green', '   ✅ 数据库模型更新完成'));
      console.log(colorize('yellow', '   ⚠️  请运行: npx prisma migrate dev'));
    } else {
      console.log(colorize('yellow', '   ⚠️  Prisma schema 不存在，跳过更新'));
    }

    // 3. 更新配置文件
    console.log(colorize('yellow', '📋 更新应用配置...'));
    const appConfig = path.join(projectPath, 'config', 'app.config.ts');
    
    if (await fs.pathExists(appConfig)) {
      await backupFile(appConfig);
      
      const replacements = [
        ['KTSP高尔夫预订系统', config.appName]
      ];
      
      await updateFile(appConfig, replacements);
      console.log(colorize('green', '   ✅ 应用配置更新完成'));
    } else {
      console.log(colorize('yellow', '   ⚠️  应用配置不存在，跳过更新'));
    }

    // 4. 更新 Tailwind 配置
    console.log(colorize('yellow', '🎨 更新主题配置...'));
    const tailwindConfig = path.join(projectPath, 'tailwind.config.ts');
    
    if (await fs.pathExists(tailwindConfig)) {
      await backupFile(tailwindConfig);
      
      const replacements = [
        ['--primary 220 90% 50%', `--primary ${config.primaryColor} 70% 50%`]
      ];
      
      await updateFile(tailwindConfig, replacements);
      console.log(colorize('green', '   ✅ 主题配置更新完成'));
    } else {
      console.log(colorize('yellow', '   ⚠️  Tailwind 配置不存在，跳过更新'));
    }

    // 5. 更新环境配置
    console.log(colorize('yellow', '🔧 更新环境配置...'));
    const envFile = path.join(projectPath, '.env.example');
    
    if (await fs.pathExists(envFile)) {
      await backupFile(envFile);
      
      const projectName = path.basename(projectPath);
      const newDbName = `${projectName}_${options.target}`;
      
      const replacements = [
        ['ktsp_booking', newDbName]
      ];
      
      await updateFile(envFile, replacements);
      console.log(colorize('green', '   ✅ 环境配置更新完成'));
    } else {
      console.log(colorize('yellow', '   ⚠️  环境配置不存在，跳过更新'));
    }

    // 6. 创建适配说明文档
    console.log(colorize('yellow', '📚 生成适配说明...'));
    const adaptDoc = path.join(projectPath, 'docs', '业务适配说明.md');
    await fs.ensureDir(path.dirname(adaptDoc));
    
    const docContent = generateAdaptDoc(projectPath, options.target);
    await fs.writeFile(adaptDoc, docContent);
    console.log(colorize('green', '   ✅ 适配说明生成完成'));

    // 完成
    console.log('');
    console.log(colorize('green', '🎉 业务适配完成！'));
    console.log('');
    console.log(colorize('blue', `📂 项目路径: ${projectPath}`));
    console.log(colorize('blue', `🎯 目标类型: ${options.target}`));
    console.log('');
    console.log(colorize('yellow', '📋 下一步操作:'));
    console.log(`1. 进入项目目录: cd "${projectPath}"`);
    console.log('2. 查看适配说明: cat docs/业务适配说明.md');
    console.log('3. 执行数据库迁移: npx prisma migrate dev');
    console.log('4. 启动开发服务器: npm run dev');
    console.log('');
    console.log(colorize('green', '✨ 适配完成！'));

  } catch (error) {
    console.error(colorize('red', `❌ 适配失败: ${error.message}`));
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
  generateAdaptDoc
};
