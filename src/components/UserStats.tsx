import { Card, Statistic, Avatar } from 'antd'
import  { UserOutlined, TeamOutlined } from '@ant-design/icons'
import { STORE } from '../store'

export function UserStats() {
    const { users } = STORE.UserStore.useBase()
    const { currentUser } = STORE.UserStore.useUI()

    const totalUsers = users.length
    const averageAge = users.length > 0 
        ? Math.round(users.reduce((sum, user) => sum + (user.age || 0), 0) / users.length)
        : 0

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold mb-4">用户统计</h2>
            
            <div className="grid grid-cols-1 gap-4">
                <Card>
                    <Statistic
                        title="总用户数"
                        value={totalUsers}
                        prefix={<TeamOutlined />}
                    />
                </Card>
                
                <Card>
                    <Statistic
                        title="平均年龄"
                        value={averageAge}
                        suffix="岁"
                    />
                </Card>
            </div>

            {currentUser && (
                <Card title="当前选中用户" className="mt-4">
                    <div className="flex items-center space-x-3">
                        <Avatar size={48} icon={<UserOutlined />} />
                        <div>
                            <div className="font-medium">{currentUser.name}</div>
                            <div className="text-gray-500">{currentUser.email}</div>
                            {currentUser.age && (
                                <div className="text-sm text-gray-400">{currentUser.age} 岁</div>
                            )}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    )
}