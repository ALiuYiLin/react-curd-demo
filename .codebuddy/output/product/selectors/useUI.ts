import type { UI } from "../types";
import { useAppStore } from "../productStore";

export const useUI = (): UI => {
  return {
    modalMode: useAppStore((state) => state.modalMode),
    searchText: useAppStore((state) => state.searchText),
    currentProduct: useAppStore((state) => state.currentProduct),
    loading: useAppStore((state) => state.loading),
    error: useAppStore((state) => state.error),
    setCurrentProduct: useAppStore((state) => state.setCurrentProduct),
  };
};
