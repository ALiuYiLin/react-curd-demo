import { MODAL_TITLES, ModalMode, type Derived } from "../types";
import { useAppStore } from "../productStore";

export const useDerived = (): Derived => {
  return {
    isModalOpen: useAppStore((state) => false /* TODO: 实现 isModalOpen - 模态框是否打开 */),
    isViewMode: useAppStore((state) => false /* TODO: 实现 isViewMode - 是否查看模式 */),
    isEditMode: useAppStore((state) => false /* TODO: 实现 isEditMode - 是否编辑模式 */),
    isAddMode: useAppStore((state) => false /* TODO: 实现 isAddMode - 是否添加模式 */),
    isOutOfStock: useAppStore((state) => false /* TODO: 实现 isOutOfStock - 是否缺货：库存为0 */),
    isLowStock: useAppStore((state) => false /* TODO: 实现 isLowStock - 是否低库存：库存小于10 */),
    modalTitle: useAppStore((state) => '' /* TODO: 实现 modalTitle - 模态框标题 */),
  };
};
