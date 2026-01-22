import type { StateCreator } from 'zustand'
// import { ProductApi } from '@/api'
// import { message } from 'antd'
import type { Base, UI } from '../types'

export const createBaseSlice: StateCreator<Base & UI, [], [], Base> = (set, get) => ({
  products: [],

  fetchProducts: async () => {
    // TODO: 实现 fetchProducts
  },
  addProduct: async (product) => {
    // TODO: 实现 addProduct - 添加产品
  },
  updateProduct: async (id, updates) => {
    // TODO: 实现 updateProduct - 更新产品
  },
  deleteProduct: async (id) => {
    // TODO: 实现 deleteProduct - 删除产品
  },
})
