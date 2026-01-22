import type { Base } from "../types";
import { useAppStore } from "../leadStore";

export const useBase = (): Base => {
  return {
    leads: useAppStore((state) => state.leads),
    fetchLeads: useAppStore((state) => state.fetchLeads),
    addLead: useAppStore((state) => state.addLead),
    updateLead: useAppStore((state) => state.updateLead),
    deleteLead: useAppStore((state) => state.deleteLead),
  }
}
