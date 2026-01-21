import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { type UserSlice } from './slices/userSlice'
import { createUISlice, type UISlice } from './slices/uiSlice'
import { ModalMode, MODAL_TITLES } from './types'
import  { type ActionSlice, createActionSlice } from './slices/actionSlice'
import { createBaseSlice } from './slices/baseSlice'

export type AppState = UserSlice & UISlice & ActionSlice

export const useAppStore = create<AppState>()(
  devtools(
    (...args) => ({
      ...createBaseSlice(...args),
      ...createUISlice(...args),
      ...createActionSlice(...args),
    }),
    { name: 'app-store' }
  )
)

// 私有选择器 hooks
const useUsers = () => useAppStore((state) => state.users)
const useCurrentUser = () => useAppStore((state) => state.currentUser)
const useLoading = () => useAppStore((state) => state.loading)
const useModalMode = () => useAppStore((state) => state.modalMode)
const useSearchText = () => useAppStore((state) => state.searchText)

// 计算属性选择器
const useIsModalOpen = () => useAppStore((state) => state.modalMode !== ModalMode.CLOSED)
const useIsViewMode = () => useAppStore((state) => state.modalMode === ModalMode.VIEW)
const useIsEditMode = () => useAppStore((state) => state.modalMode === ModalMode.EDIT)
const useIsAddMode = () => useAppStore((state) => state.modalMode === ModalMode.ADD)
const useModalTitle = () => useAppStore((state) => MODAL_TITLES[state.modalMode])

// 导出的聚合 hooks
export const useBase = () => {
  return {
    users: useUsers(),
  }
}

export const useUI = () => {
  return {
    loading: useLoading(),
    currentUser: useCurrentUser(),
    modalMode: useModalMode(),
    searchText: useSearchText(),
  }
}

export const useDerived = () => {
  return {
    isModalOpen: useIsModalOpen(),
    isViewMode: useIsViewMode(),
    isEditMode: useIsEditMode(),
    isAddMode: useIsAddMode(),
    modalTitle: useModalTitle(),
  }
}

export const useOptions = () => {
  return {
    fetchUsers: useAppStore((state) => state.fetchUsers),
    addUser: useAppStore((state) => state.addUser),
    updateUser: useAppStore((state) => state.updateUser),
    deleteUser: useAppStore((state) => state.deleteUser),
    setCurrentUser: useAppStore((state) => state.setCurrentUser),
    handleAdd: useAppStore((state) => state.handleAdd),
    handleView: useAppStore((state) => state.handleView),
    handleEdit: useAppStore((state) => state.handleEdit),
    handleCancel: useAppStore((state) => state.handleCancel),
    handleSearch: useAppStore((state) => state.handleSearch),
    handleReset: useAppStore((state) => state.handleReset),
  }
}
