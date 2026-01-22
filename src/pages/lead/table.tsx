import { Table as AntDTable, Button, Space, Popconfirm } from 'antd'
import { STORE } from '@/store'
import type { Lead } from '@/store/lead/types'

export function Table() {
  const { leads, deleteLead } = STORE.LeadStore.useBase()
  const { loading, setCurrentLead } = STORE.LeadStore.useUI()
  const { handleView, handleEdit } = STORE.LeadStore.useOptions()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '线索名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: '负责人',
      dataIndex: 'assigned_to',
      key: 'assigned_to',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_: any, record: Lead) => (
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
            title="确定要删除这个线索吗？"
            onConfirm={() => deleteLead(record.id)}
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
      dataSource={ leads }
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条记录`,
      }}
      onRow={(record) => ({
        onClick: () => setCurrentLead(record),
      })}
    />
  )
}
