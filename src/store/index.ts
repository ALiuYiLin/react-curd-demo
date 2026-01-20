import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UserApi } from '../api'
import { executeApiAction } from '../utils/api'

// 用户状态接口
interface User {
  id: number  // 改为 number 类型，与 API 保持一致
  name: string
  email: string
  age?: number
  created_at?: string
  updated_at?: string
}

// 应用状态接口
interface AppState {
  // 用户相关状态
  users: User[]
  currentUser: User | null
  loading: boolean
  error: string | null
  
  // 用户操作
  addUser: (user: Omit<User, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  updateUser: (id: number, updates: Partial<User>) => Promise<void>
  deleteUser: (id: number) => Promise<void>
  setCurrentUser: (user: User | null) => void
  
  // 异步操作
  fetchUsers: (searchName?: string) => Promise<void>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

// 创建 Zustand store
export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // 初始状态
      users: [],
      currentUser: null,
      loading: false,
      error: null,

      // 用户操作
      addUser: async (userData) => {
        const { setLoading, setError, fetchUsers } = get()
        await executeApiAction(
          () => UserApi.createUser(userData),
          '用户创建成功',
          '创建用户失败',
          setLoading,
          setError,
          fetchUsers
        )
      },

      updateUser: async (id, updates) => {
        const { setLoading, setError, fetchUsers } = get()
        await executeApiAction(
          () => UserApi.updateUser(id, updates),
          '用户更新成功',
          '更新用户失败',
          setLoading,
          setError,
          fetchUsers
        )
      },

      deleteUser: async (id) => {
        const { setLoading, setError, fetchUsers } = get()
        await executeApiAction(
          () => UserApi.deleteUser(id),
          '用户删除成功',
          '删除用户失败',
          setLoading,
          setError,
          async () => {
            // 删除用户的特殊逻辑：如果删除的是当前用户，清空当前用户
            const { currentUser } = get()
            if (currentUser?.id === id) {
              set({ currentUser: null })
            }
            // 重新获取用户列表
            await fetchUsers()
          }
        )
      },

      setCurrentUser: (user) => {
        set({ currentUser: user }, false, 'setCurrentUser')
      },

      setLoading: (loading) => {
        set({ loading }, false, 'setLoading')
      },

      setError: (error) => {
        set({ error }, false, 'setError')
      },

      // 获取用户数据
      fetchUsers: async (searchName) => {
        const { setLoading, setError } = get()
        setLoading(true)
        setError(null)
        
        try {
          const response = await UserApi.getUsers(searchName ? { name: searchName } : undefined)
          if (response.code === 200) {
            set({ users: response.data }, false, 'fetchUsers')
          } else {
            throw new Error(response.msg || '获取用户列表失败')
          }
        } catch (error: any) {
          const errorMsg = error.response?.data?.msg || error.message || '获取用户列表失败'
          setError(errorMsg)
          console.warn('API 调用失败，使用模拟数据:', errorMsg)
          
          // 如果是网络错误，使用模拟数据
          const mockUsers: User[] = [
            { id: 1, name: '张三', email: 'zhangsan@example.com', age: 25, created_at: '2026-01-20 08:56:34', updated_at: '2026-01-20 08:56:34' },
            { id: 2, name: '李四', email: 'lisi@example.com', age: 30, created_at: '2026-01-20 08:56:34', updated_at: '2026-01-20 08:56:34' },
            { id: 3, name: '王五', email: 'wangwu@example.com', age: 28, created_at: '2026-01-20 08:56:34', updated_at: '2026-01-20 08:56:34' },
          ]
          
          // 如果有搜索条件，过滤模拟数据
          const filteredUsers = searchName 
            ? mockUsers.filter(user => user.name.includes(searchName))
            : mockUsers
            
          set({ users: filteredUsers }, false, 'fetchUsers')
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