import { useEffect, useMemo } from 'react'
import { Modal } from 'antd'
import { useAppStore, useUsers, useLoading } from '../../store'
import { UserForm } from './UserForm'
import { Filter } from './Filter'
import { Action } from './Action'
import { UserTable } from './UserTable'
import { useOptions } from './useOptions'

export function User() {
    // 使用自定义 Hook
    const ops = useOptions()

    // 使用 Zustand store
    const users = useUsers()
    const loading = useLoading()
    const { fetchUsers, setCurrentUser } = useAppStore()

    // 过滤用户数据
    const filteredUsers = useMemo(() => {
        if (!ops.searchText.trim()) {
            return users
        }
        return users.filter(user => 
            user.name.toLowerCase().includes(ops.searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(ops.searchText.toLowerCase())
        )
    }, [users, ops.searchText])

    // 组件挂载时获取用户数据
    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    return (
        <div className="User flex-1 p-6">
            <div className="mb-4 flex justify-between items-center gap-4">
                <Filter 
                    value={ops.searchText}
                    onSearch={ops.handleSearch} 
                    onReset={ops.handleReset}
                />
                <Action onAdd={ops.handleAdd} />
            </div>

            <UserTable
                dataSource={filteredUsers}
                loading={loading}
                searchText={ops.searchText}
                totalUsers={users.length}
                onEdit={ops.handleEdit}
                onDelete={ops.handleDelete}
                onRowClick={setCurrentUser}
            />

            <Modal
                title={ops.editingUser ? '编辑用户' : '添加用户'}
                open={ops.isModalOpen}
                onOk={ops.handleSubmit}
                onCancel={ops.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <UserForm form={ops.form} />
            </Modal>
        </div>
    )
}