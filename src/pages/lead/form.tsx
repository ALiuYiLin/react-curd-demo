import { useEffect } from 'react'
import { Form as AntdForm, Input, InputNumber, Select, DatePicker, Modal, Button } from 'antd'
import { STORE } from '@/store'
import { ModalMode } from '@/store/lead/types'

export function LeadFormModal() {
  const { currentLead, modalMode } = STORE.LeadStore.useUI()
  const { isModalOpen, isViewMode, modalTitle } = STORE.LeadStore.useDerived()
  const { handleCancel } = STORE.LeadStore.useOptions()
  const { addLead, updateLead } = STORE.LeadStore.useBase()

  const [form] = AntdForm.useForm()

  useEffect(() => {
    if (modalMode === ModalMode.VIEW || modalMode === ModalMode.EDIT) {
      form.setFieldsValue(currentLead)
    } else if (modalMode === ModalMode.ADD) {
      form.resetFields()
    }
  }, [modalMode, currentLead, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      
      if (modalMode === ModalMode.EDIT && currentLead) {
        await updateLead(currentLead.id, values)
      } else if (modalMode === ModalMode.ADD) {
        await addLead(values)
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
        name="leadForm"
        disabled={isViewMode}
      >
        <AntdForm.Item
          label="线索名称"
          name="name"
          rules={ [{"required":true,"message":"请输入线索名称"}] }
        >
          <Input placeholder="请输入线索名称" />
        </AntdForm.Item>

        <AntdForm.Item
          label="电话"
          name="phone"
        >
          <Input placeholder="请输入电话" />
        </AntdForm.Item>

        <AntdForm.Item
          label="邮箱"
          name="email"
          rules={ [{"type":"email","message":"请输入有效的邮箱地址"}] }
        >
          <Input placeholder="请输入邮箱" />
        </AntdForm.Item>

        <AntdForm.Item
          label="公司名称"
          name="company"
        >
          <Input placeholder="请输入公司名称" />
        </AntdForm.Item>

        <AntdForm.Item
          label="来源"
          name="source"
        >
          <Select placeholder="请选择来源" allowClear>
            <Select.Option value="website">官网</Select.Option>
            <Select.Option value="referral">转介绍</Select.Option>
            <Select.Option value="advertisement">广告</Select.Option>
            <Select.Option value="exhibition">展会</Select.Option>
            <Select.Option value="cold_call">电销</Select.Option>
            <Select.Option value="social_media">社交媒体</Select.Option>
            <Select.Option value="other">其他</Select.Option>
          </Select>
        </AntdForm.Item>

        <AntdForm.Item
          label="状态"
          name="status"
        >
          <Select placeholder="请选择状态" allowClear>
            <Select.Option value="new">新线索</Select.Option>
            <Select.Option value="contacted">已联系</Select.Option>
            <Select.Option value="following">跟进中</Select.Option>
            <Select.Option value="converted">已转化</Select.Option>
            <Select.Option value="lost">已流失</Select.Option>
          </Select>
        </AntdForm.Item>

        <AntdForm.Item
          label="优先级"
          name="priority"
        >
          <Select placeholder="请选择优先级" allowClear>
            <Select.Option value="low">低</Select.Option>
            <Select.Option value="medium">中</Select.Option>
            <Select.Option value="high">高</Select.Option>
          </Select>
        </AntdForm.Item>

        <AntdForm.Item
          label="负责人"
          name="assigned_to"
        >
          <Input placeholder="请输入负责人" />
        </AntdForm.Item>

        <AntdForm.Item
          label="备注"
          name="remark"
        >
          <Input placeholder="请输入备注" />
        </AntdForm.Item>

        <AntdForm.Item
          label="跟进时间"
          name="followed_at"
        >
          <DatePicker 
            placeholder="请选择跟进时间" 
            style={{ width: '100%' }}
          />
        </AntdForm.Item>

      </AntdForm>
    </Modal>
  )
}
