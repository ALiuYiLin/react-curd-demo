import type { Options } from "../types";
import { useAppStore } from "../leadStore";

export const useOptions = (): Options => {
  return {
    handleAdd: useAppStore((state) => state.handleAdd),
    handleView: useAppStore((state) => state.handleView),
    handleEdit: useAppStore((state) => state.handleEdit),
    handleCancel: useAppStore((state) => state.handleCancel),
    handleSearch: useAppStore((state) => state.handleSearch),
    handleReset: useAppStore((state) => state.handleReset),
  };
};
