import api from './config'
import type { ApiResponse } from './types'

// 产品类型
export interface Product {
  id: number
  name: string
  type: string
  description: string
  price: number
  stock: number
  status: 'active' | 'inactive'
  image_url: string
  created_at: string
  updated_at: string
}

export interface CreateProductRequest {
  name: string
  type: string
  description?: string
  price: number
  stock: number
  status?: 'active' | 'inactive'
  image_url?: string
}

export interface UpdateProductRequest {
  name?: string
  type?: string
  description?: string
  price?: number
  stock?: number
  status?: 'active' | 'inactive'
  image_url?: string
}

export interface GetProductsParams {
  name?: string
  type?: string
  status?: 'active' | 'inactive'
  minPrice?: number
  maxPrice?: number
  limit?: number
  offset?: number
}

/**
 * 产品管理 API
 */
export class ProductApi {
  /**
   * 获取产品列表
   */
  static async getProducts(params?: GetProductsParams): Promise<ApiResponse<Product[]>> {
    const response = await api.get('/products', { params })
    return response.data
  }

  /**
   * 根据ID获取产品
   */
  static async getProductById(id: number): Promise<ApiResponse<Product>> {
    const response = await api.get(`/products/${id}`)
    return response.data
  }

  /**
   * 创建产品
   */
  static async createProduct(data: CreateProductRequest): Promise<ApiResponse<Product>> {
    const response = await api.post('/products', data)
    return response.data
  }

  /**
   * 更新产品
   */
  static async updateProduct(id: number, data: UpdateProductRequest): Promise<ApiResponse<Product>> {
    const response = await api.put(`/products/${id}`, data)
    return response.data
  }

  /**
   * 部分更新产品
   */
  static async patchProduct(id: number, data: UpdateProductRequest): Promise<ApiResponse<Product>> {
    const response = await api.patch(`/products/${id}`, data)
    return response.data
  }

  /**
   * 删除产品
   */
  static async deleteProduct(id: number): Promise<ApiResponse<null>> {
    const response = await api.delete(`/products/${id}`)
    return response.data
  }

  /**
   * 按名称搜索产品
   */
  static async searchProductsByName(name: string): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ name })
  }
}
