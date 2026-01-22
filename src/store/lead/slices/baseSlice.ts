import type { StateCreator } from 'zustand'
import { LeadApi } from '@/api/leadApi'
import { message } from 'antd'
import type { Base, UI } from '../types'

export const createBaseSlice: StateCreator<Base & UI, [], [], Base> = (set, get) => ({
  leads: [],

  fetchLeads: async (searchName?: string) => {
    set({ loading: true, error: null })
    try {
      const params = searchName ? { name: searchName } : undefined
      const leads = await LeadApi.getLeads(params)
      set({ leads, loading: false })
    } catch (error) {
      set({ error: '获取线索列表失败', loading: false })
      message.error('获取线索列表失败')
    }
  },
  addLead: async (lead) => {
    set({ loading: true, error: null })
    try {
      await LeadApi.createLead(lead)
      message.success('添加线索成功')
      await get().fetchLeads(get().searchText || undefined)
    } catch (error) {
      set({ error: '添加线索失败', loading: false })
      message.error('添加线索失败')
    }
  },
  updateLead: async (id, updates) => {
    set({ loading: true, error: null })
    try {
      await LeadApi.updateLead(id, updates)
      message.success('更新线索成功')
      await get().fetchLeads(get().searchText || undefined)
    } catch (error) {
      set({ error: '更新线索失败', loading: false })
      message.error('更新线索失败')
    }
  },
  deleteLead: async (id) => {
    set({ loading: true, error: null })
    try {
      await LeadApi.deleteLead(id)
      message.success('删除线索成功')
      await get().fetchLeads(get().searchText || undefined)
    } catch (error) {
      set({ error: '删除线索失败', loading: false })
      message.error('删除线索失败')
    }
  },
})
