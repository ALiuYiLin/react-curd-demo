import { useEffect } from "react";
import { useOptions } from "../../store";
import { UserFormModal } from "./form";
import { Filter } from "./filter";
import { Action } from "./action";
import { Table } from "./table";

export function User() {
  const { fetchUsers } = useOptions();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="User flex-1 p-6">
      <div className="mb-4 flex justify-between items-center gap-4">
        <Filter />
        <Action />
      </div>
      <Table />
      <UserFormModal />
    </div>
  );
}
