import { Table as AntDTable, Button, Space, Popconfirm } from 'antd'
import { useBase, useUI, useOptions } from '../../store'

// 定义用户类型
interface User {
  id: number
  name: string
  email: string
  age?: number
  created_at?: string
  updated_at?: string
}

export function Table() {
  const { users } = useBase()
  const { loading } = useUI()
  const { handleView, handleEdit, deleteUser, setCurrentUser } = useOptions()

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
      width: 250,
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button 
            type="link" 
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button 
            type="link" 
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          
          <Popconfirm
            title="确定要删除这个用户吗？"
            onConfirm={() => deleteUser(record.id)}
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
    <AntDTable
      columns={columns}
      dataSource={users}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条记录`,
      }}
      onRow={(record) => ({
        onClick: () => setCurrentUser(record),
      })}
    />
  )
}
