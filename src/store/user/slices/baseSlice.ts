import type { StateCreator } from 'zustand'
import { UserApi } from '../../../api'
import { message } from 'antd'
import type { Base, UI } from '../types'

export const createBaseSlice: StateCreator<Base & UI, [], [], Base> = (set, get) => ({
  users: [],

  fetchUsers: async (searchName?: string) => {
    set({ loading: true, error: null })
    try {
      const response = await UserApi.getUsers({ name: searchName })
      if (response.code !== 200) {
        throw new Error(response.msg)
      }
      set({ users: response.data, loading: false })
    } catch (error: any) {
      const errorMsg = error.response?.data?.msg || error.message || '获取用户列表失败'
      set({ error: errorMsg, loading: false })
      message.error(errorMsg)
      throw error
    }
  },

  addUser: async (userData) => {
    set({ loading: true, error: null })
    try {
      const response = await UserApi.createUser(userData)
      if (response.code !== 200) {
        throw new Error(response.msg)
      }
      message.success(response.msg || '用户创建成功')
      await get().fetchUsers()
    } catch (error: any) {
      const errorMsg = error.response?.data?.msg || error.message || '创建用户失败'
      set({ error: errorMsg, loading: false })
      message.error(errorMsg)
      throw error
    }
  },

  updateUser: async (id, updates) => {
    set({ loading: true, error: null })
    try {
      const response = await UserApi.updateUser(id, updates)
      if (response.code !== 200) {
        throw new Error(response.msg)
      }
      message.success(response.msg || '用户更新成功')
      await get().fetchUsers()
    } catch (error: any) {
      const errorMsg = error.response?.data?.msg || error.message || '更新用户失败'
      set({ error: errorMsg, loading: false })
      message.error(errorMsg)
      throw error
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await UserApi.deleteUser(id)
      if (response.code !== 200) {
        throw new Error(response.msg)
      }
      message.success(response.msg || '用户删除成功')
      const { currentUser } = get()
      if (currentUser?.id === id) {
        set({ currentUser: null })
      }
      await get().fetchUsers()
    } catch (error: any) {
      const errorMsg = error.response?.data?.msg || error.message || '删除用户失败'
      set({ error: errorMsg, loading: false })
      message.error(errorMsg)
      throw error
    }
  },
})
