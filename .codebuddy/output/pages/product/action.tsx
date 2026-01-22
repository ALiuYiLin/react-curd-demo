import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { STORE } from '@/store'

interface ActionProps {
  buttonText?: string
  buttonType?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
  showIcon?: boolean
}

export function Action({ 
  buttonText = "添加产品",
  buttonType = "primary",
  showIcon = false
}: ActionProps) {
  const { handleAdd } = STORE.ProductStore.useOptions()

  return (
    <Button 
      type={buttonType} 
      onClick={handleAdd}
      icon={showIcon ? <PlusOutlined /> : undefined}
    >
      {buttonText}
    </Button>
  )
}
