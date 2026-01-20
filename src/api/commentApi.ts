import api from './config'
import type { ApiResponse, Comment } from './types'

/**
 * 评论管理 API
 */
export class CommentApi {
  /**
   * 获取评论列表
   * @returns 评论列表
   */
  static async getComments(): Promise<ApiResponse<Comment[]>> {
    const response = await api.get('/')
    return response.data
  }

  /**
   * 根据ID获取指定评论
   * @param id 评论ID
   * @returns 评论信息
   */
  static async getCommentById(id: number): Promise<ApiResponse<Comment>> {
    const response = await api.get(`/${id}`)
    return response.data
  }
}