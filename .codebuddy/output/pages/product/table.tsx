import { Table as AntDTable, Button, Space, Popconfirm } from 'antd'
import { STORE } from '@/store'
import type { Product } from '@/store/product/types'

export function Table() {
  const { products, deleteProduct } = STORE.ProductStore.useBase()
  const { loading, setCurrentProduct } = STORE.ProductStore.useUI()
  const { handleView, handleEdit } = STORE.ProductStore.useOptions()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_: any, record: Product) => (
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
            title="确定要删除这个产品吗？"
            onConfirm={() => deleteProduct(record.id)}
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
      dataSource={ products }
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条记录`,
      }}
      onRow={(record) => ({
        onClick: () => setCurrentProduct(record),
      })}
    />
  )
}
