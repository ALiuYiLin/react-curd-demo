---
name: page-generator
description: 根据 CSV 配置文件生成 React 页面组件代码。当用户需要"生成页面"、"根据配置生成页面"时触发此 skill。
---

# Page Generator

## 概述

此 skill 读取 `config/page/{entityName}.csv` 配置文件，使用 Handlebars 模板生成完整的 React 页面组件代码。

## 触发条件

当用户需要以下操作时触发：
- "生成页面"
- "根据配置生成页面"
- "生成 xxx 的页面"

## 配置文件

**输入路径**: `config/page/{entityName}.csv`

**CSV 格式**:
```csv
field,label,type,component,required,rules,width,searchable,tableShow,formShow
```

## 输出目录

**输出路径**: `.codebuddy/skills/page-generator/output/{entityName}/`

生成的文件结构：
```
output/{entityName}/
├── index.ts
├── {entityName}.tsx
├── action.tsx
├── filter.tsx
├── table.tsx
└── form.tsx
```

## 执行方式

```bash
node .codebuddy/skills/page-generator/scripts/generate.js <entityName> [entityLabel]
```

**示例**:
```bash
node .codebuddy/skills/page-generator/scripts/generate.js user 用户
node .codebuddy/skills/page-generator/scripts/generate.js product 产品
node .codebuddy/skills/page-generator/scripts/generate.js lead 线索
```

## 模板说明

模板位于 `.codebuddy/skills/page-generator/templates/` 目录下：

| 模板 | 输出 | 说明 |
|------|------|------|
| index.hbs | index.ts | 导出文件 |
| page.hbs | {name}.tsx | 页面主组件 |
| action.hbs | action.tsx | 操作按钮组件 |
| filter.hbs | filter.tsx | 搜索过滤组件 |
| table.hbs | table.tsx | 表格组件 |
| form.hbs | form.tsx | 表单模态框组件 |

## 生成后操作

将生成的文件复制到 `src/pages/{entityName}/` 目录。
