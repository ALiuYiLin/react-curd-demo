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

export function useOptions() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchText, setSearchText] = useState('')
  const [form] = Form.useForm()

  const { addUser, updateUser, deleteUser } = useAppStore()

  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  // 处理重置
  const handleReset = () => {
    setSearchText('')
  }

  // 处理添加用户
  const handleAdd = () => {
    setEditingUser(null)
    setIsModalOpen(true)
    form.resetFields()
  }

  // 处理编辑用户
  const handleEdit = (user: User) => {
    setEditingUser(user)
    setIsModalOpen(true)
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
      
      if (editingUser) {
        // 更新用户
        await updateUser(editingUser.id, values)
      } else {
        // 添加用户
        await addUser(values)
      }
      
      setIsModalOpen(false)
      form.resetFields()
    } catch (error) {
      // 表单验证失败或 API 调用失败
      console.error('操作失败:', error)
    }
  }

  // 处理取消
  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  return {
    // 状态
    isModalOpen,
    editingUser,
    searchText,
    form,
    
    // 操作函数
    handleSearch,
    handleReset,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
  }
}