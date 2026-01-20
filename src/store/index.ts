import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// 用户状态接口
interface User {
  id: string
  name: string
  email: string
  age?: number
}

// 应用状态接口
interface AppState {
  // 用户相关状态
  users: User[]
  currentUser: User | null
  loading: boolean
  
  // 用户操作
  addUser: (user: Omit<User, 'id'>) => void
  updateUser: (id: string, updates: Partial<User>) => void
  deleteUser: (id: string) => void
  setCurrentUser: (user: User | null) => void
  
  // 异步操作
  fetchUsers: () => Promise<void>
  setLoading: (loading: boolean) => void
}

// 创建 Zustand store
export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // 初始状态
      users: [],
      currentUser: null,
      loading: false,

      // 用户操作
      addUser: (userData) => {
        const newUser: User = {
          ...userData,
          id: Date.now().toString(), // 简单的 ID 生成
        }
        set(
          (state) => ({
            users: [...state.users, newUser],
          }),
          false,
          'addUser'
        )
      },

      updateUser: (id, updates) => {
        set(
          (state) => ({
            users: state.users.map((user) =>
              user.id === id ? { ...user, ...updates } : user
            ),
          }),
          false,
          'updateUser'
        )
      },

      deleteUser: (id) => {
        set(
          (state) => ({
            users: state.users.filter((user) => user.id !== id),
            currentUser: state.currentUser?.id === id ? null : state.currentUser,
          }),
          false,
          'deleteUser'
        )
      },

      setCurrentUser: (user) => {
        set({ currentUser: user }, false, 'setCurrentUser')
      },

      setLoading: (loading) => {
        set({ loading }, false, 'setLoading')
      },

      // 模拟异步获取用户数据
      fetchUsers: async () => {
        const { setLoading } = get()
        setLoading(true)
        
        try {
          // 模拟 API 调用
          await new Promise((resolve) => setTimeout(resolve, 500))
          
          const mockUsers: User[] = [
            { id: '1', name: '张三', email: 'zhangsan@example.com', age: 25 },
            { id: '2', name: '李四', email: 'lisi@example.com', age: 30 },
            { id: '3', name: '王五', email: 'wangwu@example.com', age: 28 },
          ]
          
          set({ users: mockUsers }, false, 'fetchUsers')
        } catch (error) {
          console.error('获取用户数据失败:', error)
        } finally {
          setLoading(false)
        }
      },
    }),
    {
      name: 'app-store', // DevTools 中显示的名称
    }
  )
)

// 导出选择器 hooks（可选，用于性能优化）
export const useUsers = () => useAppStore((state) => state.users)
export const useCurrentUser = () => useAppStore((state) => state.currentUser)
export const useLoading = () => useAppStore((state) => state.loading)