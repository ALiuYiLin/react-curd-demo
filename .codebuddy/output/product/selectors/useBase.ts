import type { Base } from "../types";
import { useAppStore } from "../productStore";

export const useBase = (): Base => {
  return {
    products: useAppStore((state) => state.products),
    fetchProducts: useAppStore((state) => state.fetchProducts),
    addProduct: useAppStore((state) => state.addProduct),
    updateProduct: useAppStore((state) => state.updateProduct),
    deleteProduct: useAppStore((state) => state.deleteProduct),
  }
}
