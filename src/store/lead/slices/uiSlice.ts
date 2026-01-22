import type { StateCreator } from 'zustand'
import { ModalMode, type UI } from '../types'

export const createUISlice: StateCreator<UI, [], [], UI> = (set, get) => ({
  modalMode: ModalMode.CLOSED,
  searchText: '',
  currentLead: null,
  loading: false,
  error: null,
  setCurrentLead: (lead) => set({ currentLead: lead }),
})
