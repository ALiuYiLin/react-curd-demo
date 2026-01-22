import type { StateCreator } from "zustand";
import { ModalMode, type Options, type Base, type UI } from "../types";

export const createOptionSlice: StateCreator<
  Options & Base & UI,
  [],
  [],
  Options
> = (set, get) => ({
  handleAdd: () => {
    // TODO: 实现 handleAdd - 打开添加模态框
  },
  handleView: (user) => {
    // TODO: 实现 handleView - 打开查看模态框
  },
  handleEdit: (user) => {
    // TODO: 实现 handleEdit - 打开编辑模态框
  },
  handleCancel: () => {
    // TODO: 实现 handleCancel - 关闭模态框
  },
  handleSearch: (value) => {
    // TODO: 实现 handleSearch - 搜索
  },
  handleReset: () => {
    // TODO: 实现 handleReset - 重置搜索
  },
})
