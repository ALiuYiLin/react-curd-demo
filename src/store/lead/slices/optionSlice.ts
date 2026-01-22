import type { StateCreator } from "zustand";
import { ModalMode, type Options, type Base, type UI } from "../types";

export const createOptionSlice: StateCreator<
  Options & Base & UI,
  [],
  [],
  Options
> = (set, get) => ({
  handleAdd: () => {
    set({ modalMode: ModalMode.ADD, currentLead: null })
  },
  handleView: (lead) => {
    set({ modalMode: ModalMode.VIEW, currentLead: lead })
  },
  handleEdit: (lead) => {
    set({ modalMode: ModalMode.EDIT, currentLead: lead })
  },
  handleCancel: () => {
    set({ modalMode: ModalMode.CLOSED, currentLead: null })
  },
  handleSearch: (value) => {
    set({ searchText: value })
    get().fetchLeads(value || undefined)
  },
  handleReset: () => {
    set({ searchText: '' })
    get().fetchLeads()
  },
})
