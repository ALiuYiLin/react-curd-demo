import { useEffect } from "react";
import { Modal, Button } from "antd";
import { useAppStore, useUsers, useLoading } from "../../store";
import { Form } from "./form";
import { Filter } from "./filter";
import { Action } from "./action";
import { Table } from "./table";
import { useOptions } from "./useOptions";

export function User() {
  // 使用自定义 Hook
  const ops = useOptions();

  // 使用 Zustand store
  const users = useUsers();
  const loading = useLoading();
  const { fetchUsers, setCurrentUser } = useAppStore();

  // 组件挂载时获取用户数据
  useEffect(() => {
    fetchUsers();
  }, []); // 移除 fetchUsers 依赖，只在组件挂载时执行一次

  return (
    <div className="User flex-1 p-6">
      <div className="mb-4 flex justify-between items-center gap-4">
        <Filter
          value={ops.searchText}
          onSearch={ops.handleSearch}
          onReset={ops.handleReset}
        />
        <Action onAdd={ops.handleAdd} />
      </div>

      <Table
        dataSource={users}
        loading={loading}
        onView={ops.handleView}
        onEdit={ops.handleEdit}
        onDelete={ops.handleDelete}
        onRowClick={setCurrentUser}
      />

      <Modal
        title={ops.modalTitle}
        open={ops.isModalOpen}
        onOk={ops.isViewMode ? ops.handleCancel : ops.handleSubmit}
        onCancel={ops.handleCancel}
        okText={ops.isViewMode ? "关闭" : "确定"}
        cancelText={ops.isViewMode ? undefined : "取消"}
        footer={ops.isViewMode ? [
          <Button key="close" onClick={ops.handleCancel}>
            关闭
          </Button>
        ] : undefined}
      >
        <Form form={ops.form} disabled={ops.isViewMode} />
      </Modal>
    </div>
  );
}
