// 实体类型
export interface Lead {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  source?: string;
  status?: string;
  priority?: string;
  assigned_to?: string;
  remark?: string;
  followed_at?: string;
  created_at?: string;
  updated_at?: string;
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
  [ModalMode.ADD]: "添加线索",
  [ModalMode.EDIT]: "编辑线索",
  [ModalMode.VIEW]: "查看线索",
};

export type Base = {
  leads: Lead[];
  fetchLeads: (searchName?: string) => Promise<void>;
  addLead: (lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateLead: (id: number, updates: Partial<Lead>) => Promise<void>;
  deleteLead: (id: number) => Promise<void>;
};

export type UI = {
  modalMode: ModalModeType;
  searchText: string;
  currentLead: Lead | null;
  loading: boolean;
  error: string | null;
  setCurrentLead: (lead: Lead | null) => void;
};

export type Derived = {
  isModalOpen: boolean;
  isViewMode: boolean;
  isEditMode: boolean;
  isAddMode: boolean;
  modalTitle: string;
};

export type Options = {
  handleAdd: () => void;
  handleView: (lead: Lead) => void;
  handleEdit: (lead: Lead) => void;
  handleCancel: () => void;
  handleSearch: (value: string) => void;
  handleReset: () => void;
};
