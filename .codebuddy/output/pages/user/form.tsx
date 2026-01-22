import { useEffect } from 'react'
import { Form as AntdForm, Input, InputNumber, Modal, Button } from 'antd'
import { STORE } from '@/store'
import { ModalMode } from '@/store/user/types'

export function UserFormModal() {
  const { currentUser, modalMode } = STORE.UserStore.useUI()
  const { isModalOpen, isViewMode, modalTitle } = STORE.UserStore.useDerived()
  const { handleCancel } = STORE.UserStore.useOptions()
  const { addUser, updateUser } = STORE.UserStore.useBase()

  const [form] = AntdForm.useForm()

  useEffect(() => {
    if (modalMode === ModalMode.VIEW || modalMode === ModalMode.EDIT) {
      form.setFieldsValue(currentUser)
    } else if (modalMode === ModalMode.ADD) {
      form.resetFields()
    }
  }, [modalMode, currentUser, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      
      if (modalMode === ModalMode.EDIT && currentUser) {
        await updateUser(currentUser.id, values)
      } else if (modalMode === ModalMode.ADD) {
        await addUser(values)
      }
      
      handleCancel()
      form.resetFields()
    } catch (error) {
      console.error('操作失败:', error)
    }
  }

  const handleModalCancel = () => {
    handleCancel()
    form.resetFields()
  }

  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      onOk={isViewMode ? handleModalCancel : handleSubmit}
      onCancel={handleModalCancel}
      okText={isViewMode ? "关闭" : "确定"}
      cancelText={isViewMode ? undefined : "取消"}
      footer={isViewMode ? [
        <Button key="close" onClick={handleModalCancel}>
          关闭
        </Button>
      ] : undefined}
    >
      <AntdForm
        form={form}
        layout="vertical"
        name="userForm"
        disabled={isViewMode}
      >
        <AntdForm.Item
          label="姓名"
          name="name"
          rules={ [{"required":true,"message":"请输入姓名"}] }
        >
          <Input placeholder="请输入姓名" />
        </AntdForm.Item>

        <AntdForm.Item
          label="邮箱"
          name="email"
          rules={ [{"required":true,"message":"请输入邮箱"},{"type":"email","message":"请输入有效的邮箱地址"}] }
        >
          <Input placeholder="请输入邮箱" />
        </AntdForm.Item>

        <AntdForm.Item
          label="年龄"
          name="age"
          rules={ [{"type":"number","min":1,"max":120,"message":"年龄必须在1-120之间"}] }
        >
          <InputNumber 
            placeholder="请输入年龄" 
            style={{ width: '100%' }}
            min={ 1 }
            max={ 120 }
          />
        </AntdForm.Item>

      </AntdForm>
    </Modal>
  )
}
