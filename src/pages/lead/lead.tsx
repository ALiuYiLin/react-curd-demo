import { useEffect } from "react";
import { STORE } from "@/store";
import { LeadFormModal } from "./form";
import { Filter } from "./filter";
import { Action } from "./action";
import { Table } from "./table";

export function Lead() {
  const { fetchLeads } = STORE.LeadStore.useBase();

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="Lead flex-1 p-6">
      <div className="mb-4 flex justify-between items-center gap-4">
        <Filter />
        <Action />
      </div>
      <Table />
      <LeadFormModal />
    </div>
  );
}
