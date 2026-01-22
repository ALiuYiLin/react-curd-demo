import type { UI } from "../types";
import { useAppStore } from "../userStore";

export const useUI = (): UI => {
  return {
    modalMode: useAppStore((state) => state.modalMode),
    searchText: useAppStore((state) => state.searchText),
    currentUser: useAppStore((state) => state.currentUser),
    loading: useAppStore((state) => state.loading),
    error: useAppStore((state) => state.error),
    setCurrentUser: useAppStore((state) => state.setCurrentUser),
  };
};
