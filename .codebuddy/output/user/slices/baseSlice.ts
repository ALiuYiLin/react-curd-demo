import type { StateCreator } from 'zustand'
// import { UserApi } from '@/api'
// import { message } from 'antd'
import type { Base, UI } from '../types'

export const createBaseSlice: StateCreator<Base & UI, [], [], Base> = (set, get) => ({
  users: [],

  fetchUsers: async () => {
    // TODO: 实现 fetchUsers
  },
  addUser: async (user) => {
    // TODO: 实现 addUser - 添加用户
  },
  updateUser: async (id, updates) => {
    // TODO: 实现 updateUser - 更新用户
  },
  deleteUser: async (id) => {
    // TODO: 实现 deleteUser - 删除用户
  },
})
