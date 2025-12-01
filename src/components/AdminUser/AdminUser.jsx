import React, { useEffect, useState } from "react";
import { Button, Form } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import * as UserService from "../../services/UserService";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AdminUser = () => {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [rowSelected, setRowSelected] = useState("");

  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user);

  // ===================== STATE ==========================
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    isAdmin: false,
  });

  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    isAdmin: false,
  });

  // ===================== GET ALL USERS ==========================
  const fetchAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token);
    return res;
  };

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });

  const dataTable =
    users?.data?.map((item) => ({
      ...item,
      key: item._id,
    })) || [];

  // ===================== GET DETAIL USER ==========================
  const fetchUserDetail = async (id) => {
    const res = await UserService.getDetailsUser(id, user?.access_token);
    if (res?.data) {
      setStateUserDetail(res.data);
      form.setFieldsValue(res.data);
    }
  };

  useEffect(() => {
    if (rowSelected) {
      fetchUserDetail(rowSelected);
    }
  }, [rowSelected]);

  // ===================== CREATE USER ==========================
  const mutationCreate = useMutationHooks((body) =>
    UserService.signupUser(body)
  );

  const handleCreate = () => {
    mutationCreate.mutate(stateUser, {
      onSuccess: () => {
        message.success("Tạo user thành công!");
        queryClient.invalidateQueries(["users"]);
        setIsOpenCreate(false);
        setStateUser({
          name: "",
          email: "",
          phone: "",
          address: "",
          isAdmin: false,
        });
      },
    });
  };

  // ===================== UPDATE USER ==========================
  const mutationUpdate = useMutationHooks((data) =>
    UserService.updateUser(data.id, data.body, data.token)
  );

  const handleUpdate = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        body: stateUserDetail,
        token: user?.access_token,
      },
      {
        onSuccess: () => {
          message.success("Cập nhật thông tin thành công!");
          queryClient.invalidateQueries(["users"]);
          setIsOpenDrawer(false);
        },
      }
    );
  };

  // ===================== DELETE USER ==========================
  const mutationDelete = useMutationHooks((data) =>
    UserService.deleteUser(data.id, {}, data.token)
  );

  const handleDelete = () => {
    mutationDelete.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
      },
      {
        onSuccess: () => {
          message.success("Xóa user thành công!");
          queryClient.invalidateQueries(["users"]);
          setIsOpenDelete(false);
        },
      }
    );
  };
  const mutationDeleteMany = useMutationHooks((data) =>
  UserService.deleteManyUser(data.ids, data.token) 
);

const { isSuccess: isSuccessDeleteMany, isError: isErrorDeleteMany } = mutationDeleteMany;

// Xử lý thông báo và invalidate cache sau khi xóa thành công
useEffect(() => {
    if (isSuccessDeleteMany) {
        message.success("Xóa nhiều user thành công!");
        queryClient.invalidateQueries(["users"]);
    } else if (isErrorDeleteMany) {
        message.error("Xóa nhiều user thất bại!");
    }
}, [isSuccessDeleteMany, isErrorDeleteMany, queryClient]);

  const handleDeleteManyUsers = (ids) => {
    mutationDeleteMany.mutate({
        ids: ids, // Mảng ID được chọn từ TableComponent
        token: user?.access_token,
    });
};


  // ===================== INPUT HANDLERS ==========================
  const handleChange = (e) => {
    setStateUser({ ...stateUser, [e.target.name]: e.target.value });
  };

  const handleChangeDetail = (e) => {
    setStateUserDetail({ ...stateUserDetail, [e.target.name]: e.target.value });
  };

  // ===================== TABLE COLUMNS ==========================
  const columns = [
    { title: "Tên", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Address", dataIndex: "address" },
    { title: "Admin", dataIndex: "isAdmin", render: (v) => (v ? "Yes" : "No") },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div>
          <DeleteOutlined
            style={{ color: "red", fontSize: 22, cursor: "pointer" }}
            onClick={() => {
              setRowSelected(record._id);
              setIsOpenDelete(true);
            }}
          />
          <EditOutlined
            style={{ color: "orange", fontSize: 22, marginLeft: 12, cursor: "pointer" }}
            onClick={() => {
              setRowSelected(record._id);
              setIsOpenDrawer(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý người dùng</h2>

      <Button
        icon={<PlusOutlined />}
        style={{ marginBottom: 15 }}
        onClick={() => setIsOpenCreate(true)}
      >
        Thêm người dùng
      </Button>

      {/* ===================== TABLE ===================== */}
      <TableComponent
        columns={columns}
        data={dataTable}
        onRow={(record) => ({
          onClick: () => setRowSelected(record._id),
        })}
        handleDeleteManyUsers={handleDeleteManyUsers}
      />

      {/* ===================== CREATE MODAL ===================== */}
      <ModalComponent
        open={isOpenCreate}
        onCancel={() => setIsOpenCreate(false)}
        footer={null}
        title="Tạo người dùng"
      >
        <Form layout="vertical" onFinish={handleCreate}>
          <Form.Item label="Tên" required>
            <InputComponent name="name" value={stateUser.name} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Email" required>
            <InputComponent name="email" value={stateUser.email} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Phone">
            <InputComponent name="phone" value={stateUser.phone} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Address">
            <InputComponent name="address" value={stateUser.address} onChange={handleChange} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>

      {/* ===================== DELETE MODAL ===================== */}
      <ModalComponent
        open={isOpenDelete}
        onCancel={() => setIsOpenDelete(false)}
        onOk={handleDelete}
        title="Xóa người dùng"
      >
        Bạn có chắc muốn xóa người dùng này?
      </ModalComponent>

      {/* ===================== UPDATE DRAWER ===================== */}
      <DrawerComponent
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="50%"
        title="Cập nhật thông tin"
      >
        <Form layout="vertical" form={form} onFinish={handleUpdate}>
          <Form.Item label="Tên" name="name" required>
            <InputComponent name="name" value={stateUserDetail.name} onChange={handleChangeDetail} />
          </Form.Item>

          <Form.Item label="Email" name="email" required>
            <InputComponent name="email" value={stateUserDetail.email} onChange={handleChangeDetail} />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <InputComponent
              name="phone"
              value={stateUserDetail.phone}
              onChange={handleChangeDetail}
            />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <InputComponent
              name="address"
              value={stateUserDetail.address}
              onChange={handleChangeDetail}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
            Cập nhật
          </Button>
        </Form>
      </DrawerComponent>
    </div>
  );
};

export default AdminUser;
