import type { UI } from "../types";
import { useAppStore } from "../leadStore";

export const useUI = (): UI => {
  return {
    modalMode: useAppStore((state) => state.modalMode),
    searchText: useAppStore((state) => state.searchText),
    currentLead: useAppStore((state) => state.currentLead),
    loading: useAppStore((state) => state.loading),
    error: useAppStore((state) => state.error),
    setCurrentLead: useAppStore((state) => state.setCurrentLead),
  };
};
