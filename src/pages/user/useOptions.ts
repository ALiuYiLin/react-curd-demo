import { useState } from 'react'
import { Form, message } from 'antd'
import { useAppStore } from '../../store'

// 定义用户类型
interface User {
  id: string
  name: string
  email: string
  age?: number
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
  const handleDelete = (id: string) => {
    deleteUser(id)
  }

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      
      if (editingUser) {
        // 更新用户
        updateUser(editingUser.id, values)
        message.success('用户更新成功')
      } else {
        // 添加用户
        addUser(values)
        message.success('用户添加成功')
      }
      
      setIsModalOpen(false)
      form.resetFields()
    } catch (error) {
      console.error('表单验证失败:', error)
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