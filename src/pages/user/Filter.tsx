import { Input, Button, Space } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

const { Search } = Input

interface FilterProps {
  onSearch: (value: string) => void
  onReset?: () => void
  value?: string  // 新增：外部传入的值
  placeholder?: string
  style?: React.CSSProperties
  showResetButton?: boolean
}

export function Filter({ 
  onSearch, 
  onReset,
  value = '',  // 新增：接收外部值
  placeholder = "搜索用户名或邮箱",
  style = { maxWidth: 400 },
  showResetButton = true
}: FilterProps) {
  const [inputValue, setInputValue] = useState(value)

  // 当外部值变化时，同步内部状态
  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleSearch = (searchValue: string) => {
    setInputValue(searchValue)
    onSearch(searchValue)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onSearch(newValue)
  }

  const handleReset = () => {
    setInputValue('') // 清空内部状态
    onSearch('') // 清空搜索内容
    onReset?.() // 调用外部重置回调（如果有的话）
  }

  return (
    <Space.Compact style={style}>
      <Search
        value={inputValue}  // 受控组件
        placeholder={placeholder}
        allowClear
        enterButton="搜索"
        size="large"
        onSearch={handleSearch}
        onChange={handleChange}
        style={{ flex: 1 }}
      />
      {showResetButton && (
        <Button
          size="large"
          icon={<ReloadOutlined />}
          onClick={handleReset}
          title="重置过滤条件"
        >
          重置
        </Button>
      )}
    </Space.Compact>
  )
}