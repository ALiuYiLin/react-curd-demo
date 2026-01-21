// 用户状态接口
export interface User {
  id: number
  name: string
  email: string
  age?: number
  created_at?: string
  updated_at?: string
}

// 定义模态框模式枚举
export const ModalMode = {
  CLOSED: 'closed',
  ADD: 'add',
  EDIT: 'edit',
  VIEW: 'view'
} as const

export type ModalModeType = typeof ModalMode[keyof typeof ModalMode]

// 模态框标题映射
export const MODAL_TITLES: Record<ModalModeType, string> = {
  [ModalMode.CLOSED]: '',
  [ModalMode.ADD]: '添加用户',
  [ModalMode.EDIT]: '编辑用户',
  [ModalMode.VIEW]: '查看用户'
}
