import type { StateCreator } from 'zustand'
import { ModalMode, type ModalModeType, type User } from '../types'

export type  UISlice =  {
  modalMode: ModalModeType
  searchText: string
  currentUser: User | null
  loading: boolean
  error: string | null
}

export const createUISlice: StateCreator<
  UISlice,
  [],
  [],
  UISlice
> = (set, get) => ({
  modalMode: ModalMode.CLOSED,
  searchText: '',
  currentUser: null,
  loading: false,
  error: null,
})
