import type { StateCreator } from 'zustand'
import { ModalMode, type UI } from '../types'

export const createUISlice: StateCreator<UI, [], [], UI> = (set, get) => ({
  modalMode: ModalMode.CLOSED,
  searchText: '',
  currentProduct: null,
  loading: false,
  error: null,
  setCurrentProduct: (product) => set({ currentProduct: product }),
})
