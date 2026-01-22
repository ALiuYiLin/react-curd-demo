import { MODAL_TITLES, ModalMode, type Derived } from "../types";
import { useAppStore } from "../userStore";

export const useDerived = (): Derived => {
  return {
    isModalOpen: useAppStore((state) => state.modalMode !== ModalMode.CLOSED),
    isViewMode: useAppStore((state) => state.modalMode === ModalMode.VIEW),
    isEditMode: useAppStore((state) => state.modalMode === ModalMode.EDIT),
    isAddMode: useAppStore((state) => state.modalMode === ModalMode.ADD),
    modalTitle: useAppStore((state) => MODAL_TITLES[state.modalMode]),
  };
};
