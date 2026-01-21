import { useState } from 'react'
import { Form } from 'antd'
import { useAppStore } from '../../store'

// 定义用户类型
interface User {
  id: number  // 改为 number 类型
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

export function useOptions() {
  const [modalMode, setModalMode] = useState<ModalModeType>(ModalMode.CLOSED)
  const [currentUser, setCurrentUser] = useState<User | null>(null)  // 统一的用户状态
  const [searchText, setSearchText] = useState('')
  const [form] = Form.useForm()

  const { addUser, updateUser, deleteUser, fetchUsers } = useAppStore()

  // 计算属性
  const isModalOpen = modalMode !== ModalMode.CLOSED
  const isViewMode = modalMode === ModalMode.VIEW
  const isEditMode = modalMode === ModalMode.EDIT
  const isAddMode = modalMode === ModalMode.ADD
  const modalTitle = MODAL_TITLES[modalMode]

  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchText(value)
    // 调用API获取过滤后的数据
    fetchUsers(value.trim() || undefined)
  }

  // 处理重置
  const handleReset = () => {
    setSearchText('')
    // 重置时获取所有数据
    fetchUsers()
  }

  // 处理添加用户
  const handleAdd = () => {
    setCurrentUser(null)
    setModalMode(ModalMode.ADD)
    form.resetFields()
  }

  // 处理查看用户
  const handleView = (user: User) => {
    setCurrentUser(user)
    setModalMode(ModalMode.VIEW)
    form.setFieldsValue(user)
  }

  // 处理编辑用户
  const handleEdit = (user: User) => {
    setCurrentUser(user)
    setModalMode(ModalMode.EDIT)
    form.setFieldsValue(user)
  }

  // 处理删除用户
  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id)
    } catch (error) {
      // 错误处理已在 store 中处理
    }
  }

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      
      if (isEditMode && currentUser) {
        // 更新用户
        await updateUser(currentUser.id, values)
      } else if (isAddMode) {
        // 添加用户
        await addUser(values)
      }
      
      setModalMode(ModalMode.CLOSED)
      setCurrentUser(null)
      form.resetFields()
    } catch (error) {
      // 表单验证失败或 API 调用失败
      console.error('操作失败:', error)
    }
  }

  // 处理取消
  const handleCancel = () => {
    setModalMode(ModalMode.CLOSED)
    setCurrentUser(null)
    form.resetFields()
  }

  return {
    // 状态
    modalMode,
    currentUser,
    isModalOpen,
    isViewMode,
    isEditMode,
    isAddMode,
    modalTitle,
    searchText,
    form,
    
    // 操作函数
    handleSearch,
    handleReset,
    handleAdd,
    handleView,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
  }
}