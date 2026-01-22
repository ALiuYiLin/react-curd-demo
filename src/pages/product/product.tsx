import { useEffect } from "react";
import { STORE } from "@/store";
import { ProductFormModal } from "./form";
import { Filter } from "./filter";
import { Action } from "./action";
import { Table } from "./table";

export function Product() {
  const { fetchProducts } = STORE.ProductStore.useBase();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="Product flex-1 p-6">
      <div className="mb-4 flex justify-between items-center gap-4">
        <Filter />
        <Action />
      </div>
      <Table />
      <ProductFormModal />
    </div>
  );
}
