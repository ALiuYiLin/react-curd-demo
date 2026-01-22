import type { StateCreator } from 'zustand'
import { ModalMode, type UI} from '../types'


export const createUISlice: StateCreator<
  UI,
  [],
  [],
  UI
> = (set, get) => ({
  modalMode: ModalMode.CLOSED,
  searchText: '',
  currentUser: null,
  loading: false,
  error: null,
  setCurrentUser: (user) => set({ currentUser: user }),
})
