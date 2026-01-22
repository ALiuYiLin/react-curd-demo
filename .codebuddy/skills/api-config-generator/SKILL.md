---
name: api-config-generator
description: 根据 API 接口文档自动生成 store 配置和 page 配置的 CSV 文件。当用户需要"根据接口文档生成配置"、"读取 API 文档生成 CSV"、"生成 xxx 的配置"时触发此 skill。
---

# API 配置生成器

## 概述

此 skill 读取 `docs/api/{entityName}.md` 接口文档，自动生成 store 和 page 的 CSV 配置文件。

## 触发条件

当用户需要以下操作时触发：
- "根据接口文档生成配置"
- "读取 API 文档生成 CSV"
- "生成 xxx 的 store 和 page 配置"
- "从 docs/api/xxx.md 生成配置"

## 执行步骤

### Step 1: 读取接口文档

读取 `docs/api/{entityName}.md` 文件，解析以下信息：

| 解析内容 | 用途 |
|---------|------|
| 表结构 | 字段名、类型、描述、约束 |
| 字段枚举值 | Select 组件选项 |
| 接口列表 | CRUD 操作路径 |
| 查询参数 | 搜索/过滤字段 |

### Step 2: 生成 Store 配置 CSV

**输出路径**: `config/store/{entityName}.csv`

**CSV 格式**:
```csv
layer,name,type,category,defaultValue,description,params,returnType,dependencies
```

**字段说明**:

| 字段 | 说明 | 示例 |
|------|------|------|
| layer | 层级: base/ui/derived/options | base |
| name | 变量/方法名 | users |
| type | TypeScript 类型 | User[] |
| category | 类别: state/action | state |
| defaultValue | 默认值 | [] |
| description | 描述 | 用户列表 |
| params | 方法参数(JSON数组) | `[{"name":"id","type":"number"}]` |
| returnType | 方法返回类型 | Promise<void> |
| dependencies | 依赖的层级 | ui |

**生成模板**:

```csv
layer,name,type,category,defaultValue,description,params,returnType,dependencies
base,{entities},{Entity}[],state,[],{实体}列表,,,
base,fetch{Entities},(searchName?: string) => Promise<void>,action,,,,"[{""name"":""searchName"",""type"":""string"",""optional"":true}]",Promise<void>,ui
base,add{Entity},"({entity}: Omit<{Entity}, 'id' | 'created_at' | 'updated_at'>) => Promise<void>",action,,添加{实体},"[{""name"":""{entity}"",""type"":""Omit<{Entity}, 'id' | 'created_at' | 'updated_at'>""}]",Promise<void>,ui
base,update{Entity},"(id: number, updates: Partial<{Entity}>) => Promise<void>",action,,更新{实体},"[{""name"":""id"",""type"":""number""},{""name"":""updates"",""type"":""Partial<{Entity}>""}]",Promise<void>,ui
base,delete{Entity},(id: number) => Promise<void>,action,,删除{实体},"[{""name"":""id"",""type"":""number""}]",Promise<void>,ui
ui,modalMode,ModalModeType,state,ModalMode.CLOSED,模态框模式,,,
ui,searchText,string,state,'',搜索文本,,,
ui,current{Entity},{Entity} | null,state,null,当前{实体},,,
ui,loading,boolean,state,false,加载状态,,,
ui,error,string | null,state,null,错误信息,,,
ui,setCurrent{Entity},({entity}: {Entity} | null) => void,action,,设置当前{实体},"[{""name"":""{entity}"",""type"":""{Entity} | null""}]",void,
derived,isModalOpen,boolean,state,false,模态框是否打开,,,ui
derived,isViewMode,boolean,state,false,是否查看模式,,,ui
derived,isEditMode,boolean,state,false,是否编辑模式,,,ui
derived,isAddMode,boolean,state,false,是否添加模式,,,ui
derived,modalTitle,string,state,'',模态框标题,,,ui
options,handleAdd,() => void,action,,打开添加模态框,,[],void,ui
options,handleView,({entity}: {Entity}) => void,action,,打开查看模态框,"[{""name"":""{entity}"",""type"":""{Entity}""}]",void,ui
options,handleEdit,({entity}: {Entity}) => void,action,,打开编辑模态框,"[{""name"":""{entity}"",""type"":""{Entity}""}]",void,ui
options,handleCancel,() => void,action,,关闭模态框,,[],void,ui
options,handleSearch,(value: string) => void,action,,搜索,"[{""name"":""value"",""type"":""string""}]",void,"ui,base"
options,handleReset,() => void,action,,重置搜索,,[],void,"ui,base"
```

### Step 3: 生成 Page 配置 CSV

**输出路径**: `config/page/{entityName}.csv`

**CSV 格式**:
```csv
field,label,type,component,required,rules,width,searchable,tableShow,formShow
```

**字段说明**:

| 字段 | 说明 | 示例 |
|------|------|------|
| field | 字段名 | name |
| label | 显示标签 | 姓名 |
| type | 数据类型 | string/number/boolean |
| component | 表单组件 | Input/InputNumber/Select/DatePicker |
| required | 是否必填 | true/false |
| rules | 验证规则(JSON数组) | `[{"required":true,"message":"请输入"}]` |
| width | 表格列宽度 | 80 |
| searchable | 是否可搜索 | true/false |
| tableShow | 是否在表格显示 | true/false |
| formShow | 是否在表单显示 | true/false |

**生成规则**:

| 条件 | 处理方式 |
|------|---------|
| id 字段 | tableShow=true, formShow=false, width=80 |
| NOT NULL 约束 | required=true |
| 时间戳字段 | tableShow=false, formShow=false |
| 查询参数中的字段 | searchable=true |
| TEXT 类型 | component=Input |
| INTEGER 类型 | component=InputNumber |
| DATETIME 类型 | component=DatePicker |
| 有枚举值 | component=Select |
| email 字段 | 添加邮箱验证规则 |

---

## 命名约定

| 文档名 | entityName | Entity | entity | entities | 中文名 |
|--------|------------|--------|--------|----------|--------|
| leads.md | lead | Lead | lead | leads | 线索 |
| users.md | user | User | user | users | 用户 |
| products.md | product | Product | product | products | 产品 |

---

## 示例

### 输入

`docs/api/leads.md` 包含线索表结构和接口定义。

### 输出 1: `config/store/lead.csv`

```csv
layer,name,type,category,defaultValue,description,params,returnType,dependencies
base,leads,Lead[],state,[],线索列表,,,
base,fetchLeads,(searchName?: string) => Promise<void>,action,,,,"[{""name"":""searchName"",""type"":""string"",""optional"":true}]",Promise<void>,ui
base,addLead,"(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => Promise<void>",action,,添加线索,"[{""name"":""lead"",""type"":""Omit<Lead, 'id' | 'created_at' | 'updated_at'>""}]",Promise<void>,ui
base,updateLead,"(id: number, updates: Partial<Lead>) => Promise<void>",action,,更新线索,"[{""name"":""id"",""type"":""number""},{""name"":""updates"",""type"":""Partial<Lead>""}]",Promise<void>,ui
base,deleteLead,(id: number) => Promise<void>,action,,删除线索,"[{""name"":""id"",""type"":""number""}]",Promise<void>,ui
ui,modalMode,ModalModeType,state,ModalMode.CLOSED,模态框模式,,,
ui,searchText,string,state,'',搜索文本,,,
ui,currentLead,Lead | null,state,null,当前线索,,,
ui,loading,boolean,state,false,加载状态,,,
ui,error,string | null,state,null,错误信息,,,
ui,setCurrentLead,(lead: Lead | null) => void,action,,设置当前线索,"[{""name"":""lead"",""type"":""Lead | null""}]",void,
derived,isModalOpen,boolean,state,false,模态框是否打开,,,ui
derived,isViewMode,boolean,state,false,是否查看模式,,,ui
derived,isEditMode,boolean,state,false,是否编辑模式,,,ui
derived,isAddMode,boolean,state,false,是否添加模式,,,ui
derived,modalTitle,string,state,'',模态框标题,,,ui
options,handleAdd,() => void,action,,打开添加模态框,,[],void,ui
options,handleView,(lead: Lead) => void,action,,打开查看模态框,"[{""name"":""lead"",""type"":""Lead""}]",void,ui
options,handleEdit,(lead: Lead) => void,action,,打开编辑模态框,"[{""name"":""lead"",""type"":""Lead""}]",void,ui
options,handleCancel,() => void,action,,关闭模态框,,[],void,ui
options,handleSearch,(value: string) => void,action,,搜索,"[{""name"":""value"",""type"":""string""}]",void,"ui,base"
options,handleReset,() => void,action,,重置搜索,,[],void,"ui,base"
```

### 输出 2: `config/page/lead.csv`

```csv
field,label,type,component,required,rules,width,searchable,tableShow,formShow
id,ID,number,InputNumber,false,,80,false,true,false
name,线索名称,string,Input,true,"[{""required"":true,""message"":""请输入线索名称""}]",,true,true,true
phone,电话,string,Input,false,,,true,true,true
email,邮箱,string,Input,false,"[{""type"":""email"",""message"":""请输入有效的邮箱地址""}]",,false,true,true
company,公司名称,string,Input,false,,,true,true,true
source,来源,string,Select,false,,,true,true,true
status,状态,string,Select,false,,,true,true,true
priority,优先级,string,Select,false,,,true,true,true
assigned_to,负责人,string,Input,false,,,true,true,true
remark,备注,string,Input,false,,,false,true,true
followed_at,跟进时间,string,DatePicker,false,,,false,false,true
```

---

## 注意事项

1. 实体名使用**单数形式**作为 entityName（leads.md → lead）
2. 时间戳字段（created_at/updated_at）默认不在表单和表格中显示
3. 有枚举值的字段自动使用 Select 组件
4. 根据接口文档的查询参数确定 searchable 字段
5. 生成后可手动调整 CSV 配置
