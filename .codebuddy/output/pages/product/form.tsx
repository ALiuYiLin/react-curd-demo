import { useEffect } from 'react'
import { Form as AntdForm, Input, InputNumber, Modal, Button } from 'antd'
import { STORE } from '@/store'
import { ModalMode } from '@/store/product/types'

export function ProductFormModal() {
  const { currentProduct, modalMode } = STORE.ProductStore.useUI()
  const { isModalOpen, isViewMode, modalTitle } = STORE.ProductStore.useDerived()
  const { handleCancel } = STORE.ProductStore.useOptions()
  const { addProduct, updateProduct } = STORE.ProductStore.useBase()

  const [form] = AntdForm.useForm()

  useEffect(() => {
    if (modalMode === ModalMode.VIEW || modalMode === ModalMode.EDIT) {
      form.setFieldsValue(currentProduct)
    } else if (modalMode === ModalMode.ADD) {
      form.resetFields()
    }
  }, [modalMode, currentProduct, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      
      if (modalMode === ModalMode.EDIT && currentProduct) {
        await updateProduct(currentProduct.id, values)
      } else if (modalMode === ModalMode.ADD) {
        await addProduct(values)
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
        name="productForm"
        disabled={isViewMode}
      >
        <AntdForm.Item
          label="产品名称"
          name="name"
          rules={ [{"required":true,"message":"请输入产品名称"}] }
        >
          <Input placeholder="请输入产品名称" />
        </AntdForm.Item>

        <AntdForm.Item
          label="类型"
          name="type"
          rules={ [{"required":true,"message":"请输入类型"}] }
        >
          <Input placeholder="请输入类型" />
        </AntdForm.Item>

        <AntdForm.Item
          label="描述"
          name="description"
        >
          <Input placeholder="请输入描述" />
        </AntdForm.Item>

        <AntdForm.Item
          label="价格"
          name="price"
          rules={ [{"required":true,"message":"请输入价格"}] }
        >
          <InputNumber 
            placeholder="请输入价格" 
            style={{ width: '100%' }}
          />
        </AntdForm.Item>

        <AntdForm.Item
          label="库存"
          name="stock"
          rules={ [{"required":true,"message":"请输入库存"}] }
        >
          <InputNumber 
            placeholder="请输入库存" 
            style={{ width: '100%' }}
          />
        </AntdForm.Item>

        <AntdForm.Item
          label="状态"
          name="status"
        >
          <Input placeholder="请输入状态" />
        </AntdForm.Item>

        <AntdForm.Item
          label="图片地址"
          name="image_url"
        >
          <Input placeholder="请输入图片地址" />
        </AntdForm.Item>

      </AntdForm>
    </Modal>
  )
}
