# API 集成指南

## 概述

本项目已集成 axios 并封装了完整的 API 接口，支持用户管理和评论管理功能。

## API 配置

### 环境变量
```bash
# .env 文件
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_ENV=development
```

### 基础配置
- **Base URL**: `http://localhost:3001/api`
- **Timeout**: 10秒
- **Content-Type**: `application/json`

## API 接口

### 用户管理 API

#### 1. 获取所有用户
```typescript
GET /users
// 响应示例
{
  "code": 200,
  "msg": "获取用户列表成功",
  "data": [
    {
      "id": 1,
      "name": "张三",
      "email": "zhangsan@example.com",
      "age": 25,
      "created_at": "2026-01-20 08:56:34",
      "updated_at": "2026-01-20 08:56:34"
    }
  ]
}
```

#### 2. 按姓名搜索用户
```typescript
GET /users?name=张
// 响应格式同上，返回匹配的用户列表
```

#### 3. 获取指定用户
```typescript
GET /users/:id
// 响应示例
{
  "code": 200,
  "msg": "获取用户成功",
  "data": {
    "id": 1,
    "name": "张三",
    "email": "zhangsan@example.com",
    "age": 25,
    "created_at": "2026-01-20 08:56:34",
    "updated_at": "2026-01-20 08:56:34"
  }
}
```

#### 4. 创建用户
```typescript
POST /users
// 请求体
{
  "name": "李四",
  "email": "lisi@example.com",
  "age": 30
}
// 响应格式同获取用户
```

#### 5. 更新用户
```typescript
PUT /users/:id
// 请求体（部分更新）
{
  "name": "李四更新",
  "age": 31
}
// 响应格式同获取用户
```

#### 6. 删除用户
```typescript
DELETE /users/:id
// 响应示例
{
  "code": 200,
  "msg": "用户删除成功",
  "data": null
}
```

### 评论管理 API

#### 1. 获取评论列表
```typescript
GET /
// 响应示例
{
  "code": 200,
  "msg": "获取评论列表成功",
  "data": [
    {
      "id": 1,
      "content": "这是一条评论",
      "author": "张三",
      "created_at": "2026-01-20 08:56:34",
      "updated_at": "2026-01-20 08:56:34"
    }
  ]
}
```

#### 2. 获取指定评论
```typescript
GET /:id
// 响应格式同上，返回单个评论对象
```

## 使用方式

### 1. 直接使用 API 类
```typescript
import { UserApi, CommentApi } from '../api'

// 获取用户列表
const response = await UserApi.getUsers()
if (response.code === 200) {
  console.log('用户列表:', response.data)
}

// 搜索用户
const searchResult = await UserApi.searchUsersByName('张')

// 创建用户
const newUser = await UserApi.createUser({
  name: '新用户',
  email: 'newuser@example.com',
  age: 25
})
```

### 2. 使用便捷方法
```typescript
import { userApi, commentApi } from '../api'

// 用户操作
const users = await userApi.getAll()
const user = await userApi.getById(1)
const created = await userApi.create({ name: '张三', email: 'test@example.com' })
const updated = await userApi.update(1, { age: 26 })
const deleted = await userApi.delete(1)
const searched = await userApi.searchByName('张')

// 评论操作
const comments = await commentApi.getAll()
const comment = await commentApi.getById(1)
```

### 3. 在 Zustand Store 中使用
```typescript
// store 已集成 API 调用
const { fetchUsers, addUser, updateUser, deleteUser } = useAppStore()

// 获取用户（支持搜索）
await fetchUsers() // 获取所有用户
await fetchUsers('张') // 搜索姓名包含"张"的用户

// 其他操作会自动调用 API 并更新状态
```

## 错误处理

### 1. 网络错误处理
- API 不可用时自动使用模拟数据
- 统一的错误提示和日志记录
- 支持重试机制

### 2. 业务错误处理
- 根据响应 code 判断操作结果
- 统一的错误消息显示
- 详细的错误日志记录

### 3. 响应拦截器
```typescript
// 自动处理常见错误
- 401: 未授权访问
- 500: 服务器错误
- 网络错误: 自动降级到模拟数据
```

## 开发调试

### 1. 请求日志
所有 API 请求都会在控制台输出详细日志：
```
API Request: GET /users undefined
API Response: 200 {code: 200, msg: "获取用户列表成功", data: [...]}
```

### 2. 错误日志
```
Response Error: 404 {code: 404, msg: "用户不存在"}
```

### 3. 模拟数据
当 API 服务不可用时，系统会自动使用内置的模拟数据，确保开发和演示的连续性。

## 扩展指南

### 1. 添加新的 API 接口
1. 在 `src/api/types.ts` 中定义类型
2. 在相应的 API 类中添加方法
3. 在 `src/api/index.ts` 中导出便捷方法

### 2. 修改 API 配置
1. 更新 `.env` 文件中的环境变量
2. 修改 `src/api/config.ts` 中的配置

### 3. 自定义错误处理
在 `src/api/config.ts` 的响应拦截器中添加自定义逻辑。