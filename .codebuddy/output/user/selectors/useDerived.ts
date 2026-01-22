import { MODAL_TITLES, ModalMode, type Derived } from "../types";
import { useAppStore } from "../userStore";

export const useDerived = (): Derived => {
  return {
    isModalOpen: useAppStore((state) => false /* TODO: 实现 isModalOpen - 模态框是否打开 */),
    isViewMode: useAppStore((state) => false /* TODO: 实现 isViewMode - 是否查看模式 */),
    isEditMode: useAppStore((state) => false /* TODO: 实现 isEditMode - 是否编辑模式 */),
    isAddMode: useAppStore((state) => false /* TODO: 实现 isAddMode - 是否添加模式 */),
    isElderly: useAppStore((state) => false /* TODO: 实现 isElderly - 是否为年长的：年龄大于60岁 */),
    modalTitle: useAppStore((state) => '' /* TODO: 实现 modalTitle - 模态框标题 */),
  };
};
