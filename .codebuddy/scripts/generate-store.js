#!/usr/bin/env node

/**
 * Store Generator Script
 * 
 * 用法: node .codebuddy/scripts/generate-store.js <storeName>
 * 示例: node .codebuddy/scripts/generate-store.js user
 * 
 * 读取 .codebuddy/config/<storeName>.csv
 * 使用 .codebuddy/templates/store/ 下的 hbs 模板
 * 输出到 .codebuddy/output/<storeName>/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置路径
const ROOT_DIR = path.resolve(__dirname, '../..');
const CONFIG_DIR = path.join(__dirname, '../config');
const TEMPLATE_DIR = path.join(__dirname, '../templates/store');
const OUTPUT_DIR = path.join(__dirname, '../output');

/**
 * 解析 CSV 文件
 */
function parseCSV(csvPath) {
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
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
 * 按 layer 分组数据
 */
function groupByLayer(data) {
  const groups = {
    base: [],
    ui: [],
    derived: [],
    options: []
  };
  
  data.forEach(row => {
    const layer = row.layer?.toLowerCase();
    if (groups[layer]) {
      groups[layer].push(row);
    }
  });
  
  return groups;
}

/**
 * 处理模板数据
 */
function processTemplateData(storeName, groups) {
  const EntityName = capitalize(storeName);
  const StoreName = capitalize(storeName);
  
  // 处理 base 层
  const baseStates = groups.base.filter(r => r.category === 'state');
  const baseActions = groups.base.filter(r => r.category === 'action').map(r => ({
    ...r,
    params: parseParams(r.params),
    needsLoading: r.type.includes('Promise'),
    apiMethod: r.name.replace(/^(fetch|add|update|delete)/, '').toLowerCase() || r.name
  }));
  
  // 处理 ui 层
  const uiStates = groups.ui.filter(r => r.category === 'state');
  const uiActions = groups.ui.filter(r => r.category === 'action').map(r => ({
    ...r,
    params: parseParams(r.params),
    setField: r.name.replace(/^set/, '').replace(/^./, c => c.toLowerCase())
  }));
  
  // 处理 options 层
  const optionActions = groups.options.map(r => {
    const params = parseParams(r.params);
    let modalMode = r.name.replace('handle', '').toUpperCase();
    // handleCancel 应该设置为 CLOSED
    if (modalMode === 'CANCEL') {
      modalMode = 'CLOSED';
    }
    return {
      ...r,
      params,
      isModalAction: r.name.match(/^handle(Add|View|Edit|Cancel)$/),
      modalMode,
      needsUser: r.name.match(/^handle(View|Edit)$/),
      isSearchAction: r.name === 'handleSearch',
      isResetAction: r.name === 'handleReset'
    };
  });
  
  // 处理 derived 层 - 只生成架构，具体实现标记 TODO
  const derived = groups.derived.map(r => {
    // 根据类型推断默认值
    const defaultVal = r.defaultValue || getDefaultByType(r.type);
    return { ...r, expression: `${defaultVal} /* TODO: 实现 ${r.name} - ${r.description || ''} */` };
  });
  
  return {
    storeName,
    StoreName,
    EntityName,
    entityLabel: storeName,
    base: groups.base,
    ui: groups.ui,
    derived,
    options: groups.options,
    baseStates,
    baseActions,
    uiStates,
    uiActions,
    optionActions
  };
}

/**
 * 解析参数 JSON
 */
function parseParams(paramsStr) {
  if (!paramsStr) return [];
  try {
    return JSON.parse(paramsStr);
  } catch {
    return [];
  }
}

/**
 * 首字母大写
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 根据类型推断默认值
 */
function getDefaultByType(type) {
  if (!type) return 'null';
  const t = type.toLowerCase().trim();
  if (t === 'boolean') return 'false';
  if (t === 'string') return "''";
  if (t === 'number') return '0';
  if (t.endsWith('[]')) return '[]';
  if (t.startsWith('{') || t.includes('record<')) return '{}';
  return 'null';
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
 * 生成 Store 文件
 */
function generateStore(storeName) {
  const csvPath = path.join(CONFIG_DIR, `${storeName}.csv`);
  
  if (!fs.existsSync(csvPath)) {
    console.error(`错误: 找不到配置文件 ${csvPath}`);
    process.exit(1);
  }
  
  console.log(`📖 读取配置: ${csvPath}`);
  const csvData = parseCSV(csvPath);
  const groups = groupByLayer(csvData);
  const templateData = processTemplateData(storeName, groups);
  
  const outputPath = path.join(OUTPUT_DIR, storeName);
  ensureDir(outputPath);
  ensureDir(path.join(outputPath, 'slices'));
  ensureDir(path.join(outputPath, 'selectors'));
  
  // 生成文件映射
  const files = [
    { template: 'types.hbs', output: 'types.ts' },
    { template: 'store.hbs', output: `${storeName}Store.ts` },
    { template: 'index.hbs', output: 'index.ts' },
    { template: 'slices/baseSlice.hbs', output: 'slices/baseSlice.ts' },
    { template: 'slices/uiSlice.hbs', output: 'slices/uiSlice.ts' },
    { template: 'slices/optionSlice.hbs', output: 'slices/optionSlice.ts' },
    { template: 'selectors/index.hbs', output: 'selectors/index.ts' },
    { template: 'selectors/useBase.hbs', output: 'selectors/useBase.ts' },
    { template: 'selectors/useUI.hbs', output: 'selectors/useUI.ts' },
    { template: 'selectors/useDerived.hbs', output: 'selectors/useDerived.ts' },
    { template: 'selectors/useOptions.hbs', output: 'selectors/useOptions.ts' },
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
  console.log(`\n下一步: 将 ${outputPath} 复制到 src/store/${storeName}/`);
}

// 主入口
const storeName = process.argv[2];

if (!storeName) {
  console.log('用法: node generate-store.js <storeName>');
  console.log('示例: node generate-store.js user');
  process.exit(1);
}

generateStore(storeName);
