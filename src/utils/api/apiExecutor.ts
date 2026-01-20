import { message } from 'antd'

/**
 * 通用API执行器
 * 统一处理API调用的loading状态、错误处理和成功消息
 */
export const executeApiAction = async (
  apiCall: () => Promise<any>,
  successMsg: string,
  errorMsg: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  onSuccess?: () => void | Promise<void>
): Promise<void> => {
  setLoading(true)
  setError(null)
  
  try {
    const response = await apiCall()
    if (response.code === 200) {
      message.success(response.msg || successMsg)
      // 执行成功后的自定义逻辑
      if (onSuccess) {
        await onSuccess()
      }
    } else {
      throw new Error(response.msg || errorMsg)
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.msg || error.message || errorMsg
    setError(errorMessage)
    message.error(errorMessage)
    throw error
  } finally {
    setLoading(false)
  }
}