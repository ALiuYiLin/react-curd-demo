import { Flex } from 'antd'
import './App.css'
import { User } from './pages/user'
import { UserStats } from './components/UserStats'

function App() {
  return (
    <Flex className="App h-screen w-screen">
      <Flex className='w-75 h-full bg-gray-50 border-r'>
        <UserStats />
      </Flex>
      <User />
    </Flex>
  )
}

export default App
