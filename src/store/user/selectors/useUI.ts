import type { UI } from "../types";
import { useAppStore } from "../userStore";

export const useUI = (): UI => {
  return {
    loading: useAppStore((state) => state.loading),
    currentUser: useAppStore((state) => state.currentUser),
    modalMode: useAppStore((state) => state.modalMode),
    searchText: useAppStore((state) => state.searchText),
    error: useAppStore((state) => state.error),
    setCurrentUser: useAppStore((state) => state.setCurrentUser),
  };
};
