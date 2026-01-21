import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UserApi } from "../api";
import { message } from "antd";

// 用户状态接口
interface User {
  id: number; // 改为 number 类型，与 API 保持一致
  name: string;
  email: string;
  age?: number;
  created_at?: string;
  updated_at?: string;
}

// 应用状态接口
interface AppState {
  // 用户相关状态
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;

  // 用户操作
  addUser: (
    user: Omit<User, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updateUser: (id: number, updates: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  setCurrentUser: (user: User | null) => void;

  // 异步操作
  fetchUsers: (searchName?: string) => Promise<void>;
}

// 创建 Zustand store
export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // 初始状态
      users: [],
      currentUser: null,
      loading: false,

      // 获取用户列表
      fetchUsers: async (searchName?: string) => {
        set({ loading: true });
        try {
          const response = await UserApi.getUsers({ name: searchName });
          if (response.code !== 200) {
            throw new Error(response.msg);
          }
          set({ users: response.data, loading: false });
        } catch (error: any) {
          const errorMsg = error.response?.data?.msg || error.message || '获取用户列表失败';
          set({ loading: false });
          message.error(errorMsg);
          throw error;
        }
      },

      // 创建用户
      addUser: async (userData: Omit<User, "id" | "created_at" | "updated_at">) => {
        set({ loading: true });
        try {
          const response = await UserApi.createUser(userData);
          if (response.code !== 200) {
            throw new Error(response.msg);
          }
          message.success(response.msg || '用户创建成功');
          // 重新获取用户列表
          await get().fetchUsers();
        } catch (error: any) {
          const errorMsg = error.response?.data?.msg || error.message || '创建用户失败';
          set({ loading: false });
          message.error(errorMsg);
          throw error;
        }
      },

      // 更新用户
      updateUser: async (id: number, updates: Partial<User>) => {
        set({ loading: true });
        try {
          const response = await UserApi.updateUser(id, updates);
          if (response.code !== 200) {
            throw new Error(response.msg);
          }
          message.success(response.msg || '用户更新成功');
          // 重新获取用户列表
          await get().fetchUsers();
        } catch (error: any) {
          const errorMsg = error.response?.data?.msg || error.message || '更新用户失败';
          set({ loading: false });
          message.error(errorMsg);
          throw error;
        }
      },

      // 删除用户
      deleteUser: async (id: number) => {
        set({ loading: true });
        try {
          const response = await UserApi.deleteUser(id);
          if (response.code !== 200) {
            throw new Error(response.msg);
          }
          message.success(response.msg || '用户删除成功');
          // 如果删除的是当前用户，清空当前用户
          const { currentUser } = get();
          if (currentUser?.id === id) {
            set({ currentUser: null });
          }
          // 重新获取用户列表
          await get().fetchUsers();
        } catch (error: any) {
          const errorMsg = error.response?.data?.msg || error.message || '删除用户失败';
          set({ loading: false });
          message.error(errorMsg);
          throw error;
        }
      },

      // 辅助方法
      setCurrentUser: (user: User | null) => set({ currentUser: user }),
    }),
    {
      name: "app-store", // DevTools 中显示的名称
    }
  )
);

// 导出选择器 hooks（可选，用于性能优化）
export const useUsers = () => useAppStore((state) => state.users);
export const useCurrentUser = () => useAppStore((state) => state.currentUser);
export const useLoading = () => useAppStore((state) => state.loading);
