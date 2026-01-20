// API 响应基础结构
export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
}

// 用户相关类型
export interface User {
  id: number
  name: string
  email: string
  age?: number
  created_at?: string
  updated_at?: string
}

export interface CreateUserRequest {
  name: string
  email: string
  age?: number
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  age?: number
}

export interface GetUsersParams {
  name?: string  // 按姓名搜索
  page?: number
  limit?: number
}

// 评论相关类型
export interface Comment {
  id: number
  content: string
  author: string
  created_at?: string
  updated_at?: string
}

// 分页响应
export interface PaginatedResponse<T> {
  list: T[]
  total: number
  page: number
  limit: number
}