import { Flex, Menu } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { UserOutlined, ContactsOutlined } from '@ant-design/icons'

export const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { key: '/', icon: <UserOutlined />, label: '用户管理' },
    { key: '/lead', icon: <ContactsOutlined />, label: '线索管理' },
  ]

  return (
    <Flex className="h-screen w-screen">
      <Flex vertical className="w-50 h-full bg-gray-50 border-r">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ border: 'none', background: 'transparent' }}
        />
      </Flex>
      <Outlet />
    </Flex>
  )
}
