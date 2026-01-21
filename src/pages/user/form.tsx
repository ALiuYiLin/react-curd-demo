import { Form as AntdForm, Input, InputNumber } from 'antd'
import type { FormInstance } from 'antd/es/form'

interface FormProps {
  form: FormInstance
  disabled?: boolean  // 新增禁用属性
}

export function Form({ form, disabled = false }: FormProps) {
  return (
    <AntdForm
      form={form}
      layout="vertical"
      name="userForm"
      disabled={disabled}  // 应用禁用状态
    >
      <AntdForm.Item
        label="姓名"
        name="name"
        rules={[{ required: true, message: '请输入姓名' }]}
      >
        <Input placeholder="请输入姓名" />
      </AntdForm.Item>

      <AntdForm.Item
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' }
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </AntdForm.Item>

      <AntdForm.Item
        label="年龄"
        name="age"
        rules={[{ type: 'number', min: 1, max: 120, message: '年龄必须在1-120之间' }]}
      >
        <InputNumber 
          placeholder="请输入年龄" 
          style={{ width: '100%' }}
          min={1}
          max={120}
        />
      </AntdForm.Item>
    </AntdForm>
  )
}