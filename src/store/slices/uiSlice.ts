import type { StateCreator } from 'zustand'
import { ModalMode, type ModalModeType, type User } from '../types'
import type { UserSlice } from './userSlice'

export interface UISlice {
  modalMode: ModalModeType
  searchText: string
  
  handleAdd: () => void
  handleView: (user: User) => void
  handleEdit: (user: User) => void
  handleCancel: () => void
  handleSearch: (value: string) => void
  handleReset: () => void
}

export const createUISlice: StateCreator<
  UISlice & UserSlice,
  [],
  [],
  UISlice
> = (set, get) => ({
  modalMode: ModalMode.CLOSED,
  searchText: '',

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
