import api from './config'
import type { 
  ApiResponse, 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  GetUsersParams 
} from './types'

/**
 * 用户管理 API
 */
export class UserApi {
  /**
   * 获取所有用户
   * @param params 查询参数
   * @returns 用户列表
   */
  static async getUsers(params?: GetUsersParams): Promise<ApiResponse<User[]>> {
    const response = await api.get('/users', { params })
    return response.data
  }

  /**
   * 根据ID获取指定用户
   * @param id 用户ID
   * @returns 用户信息
   */
  static async getUserById(id: number): Promise<ApiResponse<User>> {
    const response = await api.get(`/users/${id}`)
    return response.data
  }

  /**
   * 创建用户
   * @param userData 用户数据
   * @returns 创建的用户信息
   */
  static async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    const response = await api.post('/users', userData)
    return response.data
  }

  /**
   * 更新用户
   * @param id 用户ID
   * @param userData 更新的用户数据
   * @returns 更新后的用户信息
   */
  static async updateUser(id: number, userData: UpdateUserRequest): Promise<ApiResponse<User>> {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  }

  /**
   * 删除用户
   * @param id 用户ID
   * @returns 删除结果
   */
  static async deleteUser(id: number): Promise<ApiResponse<null>> {
    const response = await api.delete(`/users/${id}`)
    return response.data
  }

  /**
   * 按姓名搜索用户
   * @param name 用户姓名
   * @returns 匹配的用户列表
   */
  static async searchUsersByName(name: string): Promise<ApiResponse<User[]>> {
    return this.getUsers({ name })
  }
}