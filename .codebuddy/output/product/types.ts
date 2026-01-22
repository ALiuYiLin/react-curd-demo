// 实体类型
export interface Product {
  id: number;
  // TODO: 定义实体字段
}

// 模态框模式
export const ModalMode = {
  CLOSED: "closed",
  ADD: "add",
  EDIT: "edit",
  VIEW: "view",
} as const;

export type ModalModeType = (typeof ModalMode)[keyof typeof ModalMode];

// 模态框标题映射
export const MODAL_TITLES: Record<ModalModeType, string> = {
  [ModalMode.CLOSED]: "",
  [ModalMode.ADD]: "添加product",
  [ModalMode.EDIT]: "编辑product",
  [ModalMode.VIEW]: "查看product",
};

export type Base = {
  products: Product[];
  fetchProducts: (searchName?: string) => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateProduct: (id: number, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
};

export type UI = {
  modalMode: ModalModeType;
  searchText: string;
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  setCurrentProduct: (product: Product | null) => void;
};

export type Derived = {
  isModalOpen: boolean;
  isViewMode: boolean;
  isEditMode: boolean;
  isAddMode: boolean;
  isOutOfStock: boolean;
  isLowStock: boolean;
  modalTitle: string;
};

export type Options = {
  handleAdd: () => void;
  handleView: (product: Product) => void;
  handleEdit: (product: Product) => void;
  handleCancel: () => void;
  handleSearch: (value: string) => void;
  handleReset: () => void;
};
