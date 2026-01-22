import type { Base } from "../types";
import { useAppStore } from "../userStore";

export const useBase = (): Base => {
  return {
    users: useAppStore((state) => state.users),
    fetchUsers: useAppStore((state) => state.fetchUsers),
    addUser: useAppStore((state) => state.addUser),
    updateUser: useAppStore((state) => state.updateUser),
    deleteUser: useAppStore((state) => state.deleteUser),
  }
}
