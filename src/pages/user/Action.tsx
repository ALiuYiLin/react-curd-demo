import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface ActionProps {
  onAdd: () => void
  buttonText?: string
  buttonType?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
  showIcon?: boolean
}

export function Action({ 
  onAdd, 
  buttonText = "添加用户",
  buttonType = "primary",
  showIcon = false
}: ActionProps) {
  return (
    <Button 
      type={buttonType} 
      onClick={onAdd}
      icon={showIcon ? <PlusOutlined /> : undefined}
    >
      {buttonText}
    </Button>
  )
}