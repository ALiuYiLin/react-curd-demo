# Zustand 状态管理集成指南

## 概述

本项目已集成 Zustand 作为状态管理解决方案。Zustand 是一个轻量级、简单易用的状态管理库。

## 项目结构

```
src/
├── store/
│   └── index.ts          # Zustand store 定义
├── components/
│   └── UserStats.tsx     # 用户统计组件（展示状态使用）
└── pages/
    └── user/
        └── user.tsx      # 用户管理页面（CRUD 操作）
```

## Store 结构

### 状态定义
```typescript
interface AppState {
  // 数据状态
  users: User[]
  currentUser: User | null
  loading: boolean
  
  // 操作方法
  addUser: (user: Omit<User, 'id'>) => void
  updateUser: (id: string, updates: Partial<User>) => void
  deleteUser: (id: string) => void
  setCurrentUser: (user: User | null) => void
  fetchUsers: () => Promise<void>
  setLoading: (loading: boolean) => void
}
```

## 使用方式

### 1. 基本使用
```typescript
import { useAppStore } from '../store'

function MyComponent() {
  const { users, addUser, deleteUser } = useAppStore()
  
  // 使用状态和操作
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

### 2. 选择器优化（避免不必要的重渲染）
```typescript
import { useUsers, useCurrentUser } from '../store'

function OptimizedComponent() {
  const users = useUsers()        // 只订阅 users 状态
  const currentUser = useCurrentUser()  // 只订阅 currentUser 状态
  
  return <div>...</div>
}
```

### 3. 异步操作
```typescript
const { fetchUsers, loading } = useAppStore()

useEffect(() => {
  fetchUsers()  // 异步获取用户数据
}, [fetchUsers])
```

## 功能特性

### ✅ 已实现功能
- [x] 用户 CRUD 操作（增删改查）
- [x] 异步数据获取
- [x] 加载状态管理
- [x] 当前用户选择
- [x] 实时统计信息
- [x] DevTools 支持

### 🔧 主要操作

1. **添加用户**: `addUser(userData)`
2. **更新用户**: `updateUser(id, updates)`
3. **删除用户**: `deleteUser(id)`
4. **获取用户列表**: `fetchUsers()`
5. **设置当前用户**: `setCurrentUser(user)`

## DevTools 支持

项目已配置 Zustand DevTools，可以在浏览器开发者工具中查看状态变化：

1. 打开浏览器开发者工具
2. 切换到 Redux DevTools 标签
3. 选择 "app-store" 来查看状态变化

## 最佳实践

1. **状态分离**: 将不同领域的状态分离到不同的 store
2. **选择器优化**: 使用选择器避免不必要的重渲染
3. **异步操作**: 在 store 中处理异步逻辑
4. **类型安全**: 使用 TypeScript 确保类型安全
5. **DevTools**: 利用 DevTools 进行调试

## 扩展建议

1. **持久化**: 可以添加 `persist` 中间件实现状态持久化
2. **更多 Store**: 根据业务需要创建更多专门的 store
3. **中间件**: 添加更多中间件如 `subscribeWithSelector`
4. **测试**: 为 store 添加单元测试

## 运行项目

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 `http://localhost:5173` 查看应用效果。