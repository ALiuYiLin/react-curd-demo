import { Flex } from 'antd'
import { Outlet } from 'react-router-dom'
import { UserStats } from '@/components/UserStats'

export const Layout = () => {
  return (
    <Flex className="h-screen w-screen">
      <Flex className="w-75 h-full bg-gray-50 border-r">
        <UserStats />
      </Flex>
      <Outlet />
    </Flex>
  )
}
