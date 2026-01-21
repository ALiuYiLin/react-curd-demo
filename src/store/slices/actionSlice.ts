import type { StateCreator } from 'zustand'
import { ModalMode, type User } from '../types'
import type { BaseSlice } from './baseSlice'
import type { UISlice } from './uiSlice'

export type ActionSlice =  {  
  handleAdd: () => void
  handleView: (user: User) => void
  handleEdit: (user: User) => void
  handleCancel: () => void
  handleSearch: (value: string) => void
  handleReset: () => void
}

export const createActionSlice: StateCreator<
  ActionSlice & BaseSlice & UISlice ,
  [],
  [],
  ActionSlice
> = (set, get) => ({
  handleAdd: () => {
    set({ currentUser: null, modalMode: ModalMode.ADD })
  },

  handleView: (user) => {
    set({ currentUser: user, modalMode: ModalMode.VIEW })
  },

  handleEdit: (user) => {
    set({ currentUser: user, modalMode: ModalMode.EDIT })
  },

  handleCancel: () => {
    set({ modalMode: ModalMode.CLOSED, currentUser: null })
  },

  handleSearch: (value) => {
    set({ searchText: value })
    get().fetchUsers(value.trim() || undefined)
  },

  handleReset: () => {
    set({ searchText: '' })
    get().fetchUsers()
  },
})
