import type { StateCreator } from 'zustand'
import { ProductApi } from '@/api/productApi'
import { message } from 'antd'
import type { Base, UI } from '../types'

export const createBaseSlice: StateCreator<Base & UI, [], [], Base> = (set, get) => ({
  products: [],

  fetchProducts: async (searchName?: string) => {
    set({ loading: true, error: null })
    try {
      const response = await ProductApi.getProducts({ name: searchName })
      if (response.code !== 200) {
        throw new Error(response.msg)
      }
      set({ products: response.data, loading: false })
    } catch (error: any) {
      const errorMsg = error.response?.data?.msg || error.message || '获取产品列表失败'
      set({ error: errorMsg, loading: false })
      message.error(errorMsg)
      throw error
    }
  },

  addProduct: async (productData) => {
    set({ loading: true, error: null })
    try {
      const response = await ProductApi.createProduct(productData)
      if (response.code !== 200) {
        throw new Error(response.msg)
      }
      message.success(response.msg || '产品创建成功')
      await get().fetchProducts()
    } catch (error: any) {
      const errorMsg = error.response?.data?.msg || error.message || '创建产品失败'
      set({ error: errorMsg, loading: false })
      message.error(errorMsg)
      throw error
    }
  },

  updateProduct: async (id, updates) => {
    set({ loading: true, error: null })
    try {
      const response = await ProductApi.updateProduct(id, updates)
      if (response.code !== 200) {
        throw new Error(response.msg)
      }
      message.success(response.msg || '产品更新成功')
      await get().fetchProducts()
    } catch (error: any) {
      const errorMsg = error.response?.data?.msg || error.message || '更新产品失败'
      set({ error: errorMsg, loading: false })
      message.error(errorMsg)
      throw error
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await ProductApi.deleteProduct(id)
      if (response.code !== 200) {
        throw new Error(response.msg)
      }
      message.success(response.msg || '产品删除成功')
      const { currentProduct } = get()
      if (currentProduct?.id === id) {
        set({ currentProduct: null })
      }
      await get().fetchProducts()
    } catch (error: any) {
      const errorMsg = error.response?.data?.msg || error.message || '删除产品失败'
      set({ error: errorMsg, loading: false })
      message.error(errorMsg)
      throw error
    }
  },
})
