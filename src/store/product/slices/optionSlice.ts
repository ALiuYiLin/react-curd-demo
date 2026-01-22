import type { StateCreator } from "zustand";
import { ModalMode, type Options, type Base, type UI } from "../types";

export const createOptionSlice: StateCreator<
  Options & Base & UI,
  [],
  [],
  Options
> = (set, get) => ({
  handleAdd: () => {
    set({ currentProduct: null, modalMode: ModalMode.ADD });
  },

  handleView: (product) => {
    set({ currentProduct: product, modalMode: ModalMode.VIEW });
  },

  handleEdit: (product) => {
    set({ currentProduct: product, modalMode: ModalMode.EDIT });
  },

  handleCancel: () => {
    set({ modalMode: ModalMode.CLOSED, currentProduct: null });
  },

  handleSearch: (value) => {
    set({ searchText: value });
    get().fetchProducts(value.trim() || undefined);
  },

  handleReset: () => {
    set({ searchText: "" });
    get().fetchProducts();
  },
})
