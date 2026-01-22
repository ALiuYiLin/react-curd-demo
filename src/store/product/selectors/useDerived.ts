import { MODAL_TITLES, ModalMode, type Derived } from "../types";
import { useAppStore } from "../productStore";

export const useDerived = (): Derived => {
  return {
    isModalOpen: useAppStore((state) => state.modalMode !== ModalMode.CLOSED),
    isViewMode: useAppStore((state) => state.modalMode === ModalMode.VIEW),
    isEditMode: useAppStore((state) => state.modalMode === ModalMode.EDIT),
    isAddMode: useAppStore((state) => state.modalMode === ModalMode.ADD),
    isOutOfStock: useAppStore((state) => state.currentProduct?.stock === 0),
    isLowStock: useAppStore((state) => (state.currentProduct?.stock ?? 0) > 0 && (state.currentProduct?.stock ?? 0) < 10),
    modalTitle: useAppStore((state) => MODAL_TITLES[state.modalMode]),
  };
};
