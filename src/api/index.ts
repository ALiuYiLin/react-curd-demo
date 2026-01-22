// API 配置
export { default as api } from './config'

// API 类
export { UserApi } from './userApi'
export { CommentApi } from './commentApi'
export { ProductApi } from './productApi'
export { LeadApi } from './leadApi'

// 类型定义
export * from './types'
export type { Product, CreateProductRequest, UpdateProductRequest, GetProductsParams } from './productApi'
export type { Lead, CreateLeadRequest, UpdateLeadRequest, GetLeadsParams } from './leadApi'

// 便捷方法
export const userApi = {
  getAll: (params?: any) => import('./userApi').then(m => m.UserApi.getUsers(params)),
  getById: (id: number) => import('./userApi').then(m => m.UserApi.getUserById(id)),
  create: (data: any) => import('./userApi').then(m => m.UserApi.createUser(data)),
  update: (id: number, data: any) => import('./userApi').then(m => m.UserApi.updateUser(id, data)),
  delete: (id: number) => import('./userApi').then(m => m.UserApi.deleteUser(id)),
  searchByName: (name: string) => import('./userApi').then(m => m.UserApi.searchUsersByName(name)),
}

export const commentApi = {
  getAll: () => import('./commentApi').then(m => m.CommentApi.getComments()),
  getById: (id: number) => import('./commentApi').then(m => m.CommentApi.getCommentById(id)),
}

export const productApi = {
  getAll: (params?: any) => import('./productApi').then(m => m.ProductApi.getProducts(params)),
  getById: (id: number) => import('./productApi').then(m => m.ProductApi.getProductById(id)),
  create: (data: any) => import('./productApi').then(m => m.ProductApi.createProduct(data)),
  update: (id: number, data: any) => import('./productApi').then(m => m.ProductApi.updateProduct(id, data)),
  delete: (id: number) => import('./productApi').then(m => m.ProductApi.deleteProduct(id)),
  searchByName: (name: string) => import('./productApi').then(m => m.ProductApi.searchProductsByName(name)),
}