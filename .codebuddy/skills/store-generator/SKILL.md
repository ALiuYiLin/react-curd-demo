---
name: store-generator
description: 根据 CSV 配置文件生成 Zustand Store 代码。当用户需要"生成 store"、"根据配置生成 store"时触发此 skill。
---

# Store Generator

## 概述

此 skill 读取 `config/store/{entityName}.csv` 配置文件，使用 Handlebars 模板生成完整的 Zustand Store 代码。

## 触发条件

当用户需要以下操作时触发：
- "生成 store"
- "根据配置生成 store"
- "生成 xxx 的 store"

## 配置文件

**输入路径**: `config/store/{entityName}.csv`

**CSV 格式**:
```csv
layer,name,type,category,defaultValue,description,params,returnType,dependencies
```

## 输出目录

**输出路径**: `.codebuddy/skills/store-generator/output/{entityName}/`

生成的文件结构：
```
output/{entityName}/
├── index.ts
├── types.ts
├── {entityName}Store.ts
├── slices/
│   ├── baseSlice.ts
│   ├── uiSlice.ts
│   └── optionSlice.ts
└── selectors/
    ├── index.ts
    ├── useBase.ts
    ├── useUI.ts
    ├── useDerived.ts
    └── useOptions.ts
```

## 执行方式

```bash
node .codebuddy/skills/store-generator/scripts/generate.js <entityName>
```

**示例**:
```bash
node .codebuddy/skills/store-generator/scripts/generate.js user
node .codebuddy/skills/store-generator/scripts/generate.js product
node .codebuddy/skills/store-generator/scripts/generate.js lead
```

## 模板说明

模板位于 `.codebuddy/skills/store-generator/templates/` 目录下：

| 模板 | 输出 | 说明 |
|------|------|------|
| types.hbs | types.ts | 类型定义 |
| store.hbs | {name}Store.ts | Store 主文件 |
| index.hbs | index.ts | 导出文件 |
| slices/baseSlice.hbs | slices/baseSlice.ts | 基础数据层 |
| slices/uiSlice.hbs | slices/uiSlice.ts | UI 状态层 |
| slices/optionSlice.hbs | slices/optionSlice.ts | 操作层 |
| selectors/*.hbs | selectors/*.ts | 选择器 hooks |

## 生成后操作

将生成的文件复制到 `src/store/{entityName}/` 目录。
