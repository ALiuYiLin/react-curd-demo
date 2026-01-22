#!/usr/bin/env node

/**
 * Page Generator Script
 * 
 * 用法: node .codebuddy/scripts/generate-page.js <pageName> [entityLabel]
 * 示例: node .codebuddy/scripts/generate-page.js user 用户
 *       node .codebuddy/scripts/generate-page.js product 产品
 * 
 * 读取 .codebuddy/config/page-<pageName>.csv
 * 使用 .codebuddy/templates/page/ 下的 hbs 模板
 * 输出到 .codebuddy/output/pages/<pageName>/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置路径
const CONFIG_DIR = path.join(__dirname, '../config');
const TEMPLATE_DIR = path.join(__dirname, '../templates/page');
const OUTPUT_DIR = path.join(__dirname, '../output/pages');

// 注册 Handlebars helper
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

/**
 * 解析 CSV 文件
 */
function parseCSV(csvPath) {
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    data.push(row);
  }
  return data;
}

/**
 * 解析 CSV 行（处理引号内的逗号）
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * 首字母大写
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 获取复数形式（简单处理）
 */
function pluralize(str) {
  if (str.endsWith('y')) {
    return str.slice(0, -1) + 'ies';
  }
  if (str.endsWith('s') || str.endsWith('x') || str.endsWith('ch') || str.endsWith('sh')) {
    return str + 'es';
  }
  return str + 's';
}

/**
 * 映射字段类型到 TypeScript 类型
 */
function mapFieldType(type) {
  const typeMap = {
    'string': 'string',
    'number': 'number',
    'boolean': 'boolean',
    'date': 'string',
    'datetime': 'string',
  };
  return typeMap[type.toLowerCase()] || 'string';
}

/**
 * 解析 rules JSON
 */
function parseRules(rulesStr) {
  if (!rulesStr) return null;
  try {
    const rules = JSON.parse(rulesStr);
    return JSON.stringify(rules);
  } catch {
    return null;
  }
}

/**
 * 处理模板数据
 */
function processTemplateData(pageName, entityLabel, fields) {
  const EntityName = capitalize(pageName);
  const pluralName = pluralize(pageName);
  
  // 实体字段定义
  const entityFields = fields.map(f => ({
    field: f.field,
    type: mapFieldType(f.type),
    optional: f.required !== 'true',
  }));
  
  // 添加时间戳字段
  entityFields.push(
    { field: 'created_at', type: 'string', optional: true },
    { field: 'updated_at', type: 'string', optional: true }
  );
  
  // 表格列
  const tableColumns = fields
    .filter(f => f.tableShow === 'true')
    .map(f => ({
      field: f.field,
      label: f.label,
      width: f.width || null,
    }));
  
  // 表单字段
  const formFields = fields
    .filter(f => f.formShow === 'true')
    .map(f => {
      const rules = parseRules(f.rules);
      let min = null, max = null;
      if (rules) {
        const rulesArr = JSON.parse(rules);
        const numRule = rulesArr.find(r => r.min !== undefined || r.max !== undefined);
        if (numRule) {
          min = numRule.min;
          max = numRule.max;
        }
      }
      return {
        field: f.field,
        label: f.label,
        component: f.component || 'Input',
        required: f.required === 'true',
        rules: rules,
        min,
        max,
      };
    });
  
  // 可搜索字段
  const searchFields = fields.filter(f => f.searchable === 'true');
  const searchFieldsLabel = searchFields.map(f => f.label).join('或');
  
  return {
    pageName,
    EntityName,
    entityLabel: entityLabel || pageName,
    pluralName,
    entityFields,
    tableColumns,
    formFields,
    searchFieldsLabel: searchFieldsLabel || EntityName,
  };
}

/**
 * 编译并渲染模板
 */
function renderTemplate(templatePath, data) {
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  const template = Handlebars.compile(templateContent);
  return template(data);
}

/**
 * 确保目录存在
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * 生成页面文件
 */
function generatePage(pageName, entityLabel) {
  const csvPath = path.join(CONFIG_DIR, `page-${pageName}.csv`);
  
  if (!fs.existsSync(csvPath)) {
    console.error(`错误: 找不到配置文件 ${csvPath}`);
    console.log(`\n请创建配置文件，格式如下:`);
    console.log(`field,label,type,component,required,rules,width,searchable,tableShow,formShow`);
    console.log(`id,ID,number,InputNumber,false,,80,false,true,false`);
    console.log(`name,名称,string,Input,true,"[{""required"":true,""message"":""请输入名称""}]",,true,true,true`);
    process.exit(1);
  }
  
  console.log(`📖 读取配置: ${csvPath}`);
  const csvData = parseCSV(csvPath);
  const templateData = processTemplateData(pageName, entityLabel, csvData);
  
  const outputPath = path.join(OUTPUT_DIR, pageName);
  ensureDir(outputPath);
  
  // 生成文件映射
  const files = [
    { template: 'index.hbs', output: 'index.ts' },
    { template: 'page.hbs', output: `${pageName}.tsx` },
    { template: 'action.hbs', output: 'action.tsx' },
    { template: 'filter.hbs', output: 'filter.tsx' },
    { template: 'table.hbs', output: 'table.tsx' },
    { template: 'form.hbs', output: 'form.tsx' },
  ];
  
  console.log(`\n📝 生成文件到: ${outputPath}`);
  
  files.forEach(({ template, output }) => {
    const templatePath = path.join(TEMPLATE_DIR, template);
    const outputFilePath = path.join(outputPath, output);
    
    if (!fs.existsSync(templatePath)) {
      console.warn(`  ⚠️  跳过: ${template} (模板不存在)`);
      return;
    }
    
    const content = renderTemplate(templatePath, templateData);
    fs.writeFileSync(outputFilePath, content);
    console.log(`  ✅ ${output}`);
  });
  
  console.log(`\n🎉 生成完成!`);
  console.log(`\n下一步:`);
  console.log(`  1. 将 ${outputPath} 复制到 src/pages/${pageName}/`);
  console.log(`  2. 确保已生成对应的 store: npm run gen:store ${pageName}`);
  console.log(`  3. 在 src/store/index.ts 中导出 ${capitalize(pageName)}Store`);
}

// 主入口
const pageName = process.argv[2];
const entityLabel = process.argv[3];

if (!pageName) {
  console.log('用法: node generate-page.js <pageName> [entityLabel]');
  console.log('示例: node generate-page.js user 用户');
  console.log('      node generate-page.js product 产品');
  process.exit(1);
}

generatePage(pageName, entityLabel);
