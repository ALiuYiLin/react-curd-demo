import { Input, Button, Space } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useUI, useOptions } from '../../store'

const { Search } = Input

interface FilterProps {
  placeholder?: string
  style?: React.CSSProperties
  showResetButton?: boolean
}

export function Filter({ 
  placeholder = "搜索用户名或邮箱",
  style = { maxWidth: 400 },
  showResetButton = true
}: FilterProps) {
  const { searchText } = useUI()
  const { handleSearch: onSearch, handleReset: onReset } = useOptions()
  
  const [inputValue, setInputValue] = useState(searchText)

  useEffect(() => {
    setInputValue(searchText)
  }, [searchText])

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
    setInputValue('')
    onReset()
  }

  return (
    <Space.Compact style={style}>
      <Search
        value={inputValue}
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
