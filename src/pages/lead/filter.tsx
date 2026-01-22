import { Input, Button, Space } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { STORE } from '@/store'

const { Search } = Input

interface FilterProps {
  placeholder?: string
  style?: React.CSSProperties
  showResetButton?: boolean
}

export function Filter({ 
  placeholder = "搜索线索名称或电话或公司名称或来源或状态或优先级或负责人",
  style = { maxWidth: 400 },
  showResetButton = true
}: FilterProps) {
  const { searchText } = STORE.LeadStore.useUI()
  const { handleSearch, handleReset } = STORE.LeadStore.useOptions()

  return (
    <Space.Compact style={style}>
      <Search
        value={searchText}
        placeholder={placeholder}
        allowClear
        enterButton="搜索"
        size="large"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
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
