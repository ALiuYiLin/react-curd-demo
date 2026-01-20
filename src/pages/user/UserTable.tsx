import { Table, Button, Space, Popconfirm, message } from 'antd'

// 定义用户类型
interface User {
  id: string
  name: string
  email: string
  age?: number
}

interface UserTableProps {
  dataSource: User[]
  loading: boolean
  searchText: string
  totalUsers: number
  onEdit: (user: User) => void
  onDelete: (id: string) => void
  onRowClick: (user: User) => void
}

export function UserTable({
  dataSource,
  loading,
  searchText,
  totalUsers,
  onEdit,
  onDelete,
  onRowClick
}: UserTableProps) {
  
  // 处理删除用户
  const handleDelete = (id: string) => {
    onDelete(id)
    message.success('用户删除成功')
  }

  // 表格列定义
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button 
            type="link" 
            onClick={() => onEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => 
          searchText 
            ? `搜索到 ${total} 条记录 (共 ${totalUsers} 条)`
            : `共 ${total} 条记录`,
      }}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  )
}