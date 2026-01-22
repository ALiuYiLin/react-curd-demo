# 线索（Leads）接口文档

## 表结构

| 字段 | 类型 | 描述 | 约束 |
|------|------|------|------|
| id | INTEGER | 主键 | PRIMARY KEY AUTOINCREMENT |
| name | TEXT | 线索名称/联系人 | NOT NULL |
| phone | TEXT | 电话 | - |
| email | TEXT | 邮箱 | - |
| company | TEXT | 公司名称 | - |
| source | TEXT | 来源 | DEFAULT 'website' |
| status | TEXT | 状态 | DEFAULT 'new' |
| priority | TEXT | 优先级 | DEFAULT 'medium' |
| assigned_to | TEXT | 负责人 | - |
| remark | TEXT | 备注 | - |
| followed_at | DATETIME | 跟进时间 | - |
| created_at | DATETIME | 创建时间 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | 更新时间 | DEFAULT CURRENT_TIMESTAMP |

### 字段枚举值

- **source（来源）**: website, referral, advertisement, exhibition, cold_call, social_media, other
- **status（状态）**: new, contacted, following, converted, lost
- **priority（优先级）**: low, medium, high
## 示例数据

```json
[
  {
    "id": 1,
    "name": "张伟",
    "phone": "13800138001",
    "email": "zhangwei@company.com",
    "company": "科技有限公司",
    "source": "website",
    "status": "new",
    "priority": "high",
    "assigned_to": "销售A",
    "remark": "对产品很感兴趣，需要尽快跟进"
  },
  {
    "id": 2,
    "name": "李娜",
    "phone": "13900139002",
    "email": "lina@enterprise.com",
    "company": "大型企业集团",
    "source": "referral",
    "status": "following",
    "priority": "high",
    "assigned_to": "销售B",
    "remark": "老客户推荐，有明确采购意向"
  },
  {
    "id": 3,
    "name": "王强",
    "phone": "13700137003",
    "email": "wangqiang@startup.com",
    "company": "创业科技",
    "source": "advertisement",
    "status": "contacted",
    "priority": "medium",
    "assigned_to": "销售A",
    "remark": "通过广告了解，预算有限"
  }
]
```

## 接口列表

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /leads | 获取线索列表，支持过滤 |
| GET | /leads/:id | 根据 ID 获取线索 |
| POST | /leads | 创建新线索 |
| PUT | /leads/:id | 全量更新线索 |
| PATCH | /leads/:id | 部分更新线索 |
| DELETE | /leads/:id | 删除线索 |

## 查询参数（GET /leads）

| 参数 | 类型 | 描述 |
|------|------|------|
| name | string | 按名称模糊搜索 |
| phone | string | 按电话模糊搜索 |
| company | string | 按公司模糊搜索 |
| source | string | 按来源过滤 |
| status | string | 按状态过滤 |
| priority | string | 按优先级过滤 |
| assigned_to | string | 按负责人过滤 |
| limit | number | 限制返回数量 |
| offset | number | 分页偏移量 |

## 请求体（POST/PUT）

```json
{
  "name": "张伟",
  "phone": "13800138001",
  "email": "zhangwei@company.com",
  "company": "科技有限公司",
  "source": "website",
  "status": "new",
  "priority": "high",
  "assigned_to": "销售A",
  "remark": "备注信息",
  "followed_at": "2026-01-19 10:00:00"
}
```

## 响应格式

所有响应使用统一格式：

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": { ... }
}
```

### 成功响应示例

```json
{
  "code": 200,
  "msg": "获取线索列表成功",
  "data": [
    {
      "id": 1,
      "name": "张伟",
      "phone": "13800138001",
      "email": "zhangwei@company.com",
      "company": "科技有限公司",
      "source": "website",
      "status": "new",
      "priority": "high",
      "assigned_to": "销售A",
      "remark": "对产品很感兴趣",
      "followed_at": null,
      "created_at": "2026-01-19 08:00:00",
      "updated_at": "2026-01-19 08:00:00"
    }
  ]
}
```

### 错误响应示例

```json
{
  "code": 404,
  "msg": "线索不存在"
}
```
