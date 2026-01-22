import type { StateCreator } from "zustand";
import { ModalMode, type Options, type Base, type UI } from "../types";

export const createOptionSlice: StateCreator<
  Options & Base & UI,
  [],
  [],
  Options
> = (set, get) => ({
  handleAdd: () => {
    set({ currentUser: null, modalMode: ModalMode.ADD });
  },

  handleView: (user) => {
    set({ currentUser: user, modalMode: ModalMode.VIEW });
  },

  handleEdit: (user) => {
    set({ currentUser: user, modalMode: ModalMode.EDIT });
  },

  handleCancel: () => {
    set({ modalMode: ModalMode.CLOSED, currentUser: null });
  },

  handleSearch: (value) => {
    set({ searchText: value });
    get().fetchUsers(value.trim() || undefined);
  },

  handleReset: () => {
    set({ searchText: "" });
    get().fetchUsers();
  },
});
