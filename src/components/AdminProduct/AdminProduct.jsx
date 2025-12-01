import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { WrapperUploadFile } from "../../pages/Profile/style";
import { getBase64 } from "../../untils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
  });

  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user);

  // ========================= GET ALL PRODUCTS =========================
  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });

  // ========================= CREATE PRODUCT =========================
  const mutationCreate = useMutationHooks((data) =>
    ProductService.crateProduct(data)
  );

  // ========================= UPDATE PRODUCT =========================
  const mutationUpdate = useMutationHooks((data) =>
    ProductService.updateProduct(data.id, data.token, data.body)
  );

  // ========================= DELETE PRODUCT =========================
  const mutationDelete = useMutationHooks((data) =>
    ProductService.deleteProduct(data.id, data.token)
  );

  const mutationDeleteManyProducts = useMutationHooks(({ ids, token }) =>
    ProductService.deleteManyProduct(ids, token)
  );

  
  // Lấy ra kết quả của mutationDelete để kiểm tra loading và error (nếu cần)
  const { isSuccess: isSuccessDelete, isPending: isPendingDelete, isError: isErrorDelete } = mutationDelete;

  // Cập nhật giao diện sau khi xóa thành công
  useEffect(() => {
    if (isSuccessDelete) {
      message.success("Xóa sản phẩm thành công!");
      setIsModalOpenDelete(false);
      queryClient.invalidateQueries(["products"]);
    } else if (isErrorDelete) {
      message.error("Xóa sản phẩm thất bại.");
    }
  }, [isSuccessDelete, isErrorDelete, queryClient]);


  // ========================= GET DETAIL PRODUCT =========================
  const fetchGetDetailsProduct = async (id) => {
    const res = await ProductService.getDetailsProduct(id);
    if (res?.data) {
      setStateProductDetails(res.data);
      form.setFieldsValue(res.data);
    }
  };

  useEffect(() => {
    if (rowSelected && isOpenDrawer) fetchGetDetailsProduct(rowSelected);
  }, [rowSelected, isOpenDrawer]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  // ========================= XỬ LÝ XÓA SẢN PHẨM =========================
  const handleDeleteProduct = () => {
    if (rowSelected) {
      mutationDelete.mutate({
        id: rowSelected,
        token: user?.access_token,
      });
    } else {
        // Có thể thêm một thông báo lỗi nếu không có sản phẩm nào được chọn
        message.error("Vui lòng chọn sản phẩm để xóa.");
        setIsModalOpenDelete(false);
    }
  };

  const handleDeleteManyProducts = (ids) => {
    mutationDeleteManyProducts.mutate({
      ids,
      token: user?.access_token
    }, {
      onSuccess: () => {
        message.success("Đã xoá các sản phẩm đã chọn!");
        queryClient.invalidateQueries(["products"]);
      },
      onError: () => {
        message.error("Xoá thất bại!");
      }
    });
  };

  // ========================= TABLE =========================

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

 const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    // render: text =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });
  
  const columns = [
    { title: "Name", dataIndex: "name", sorter:(a,b)=>a.name.length - b.name.length, ...getColumnSearchProps('name') },
    { title: "Price", dataIndex: "price", sorter:(a,b)=>a.price - b.price },
    { title: "Rating", dataIndex: "rating", sorter:(a,b)=>a.rating - b.rating },
    { title: "Type", dataIndex: "type" },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div>
          <DeleteOutlined
            style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
            // Khi click, hiển thị Modal xóa
            onClick={() => setIsModalOpenDelete(true)}
          />
          <EditOutlined
            style={{ color: "orange", fontSize: "30px", cursor: "pointer", marginLeft: 10 }}
            onClick={() => setIsOpenDrawer(true)}
          />
        </div>
      ),
    },
  ];

  const dataTable =
    products?.data?.map((item) => ({
      ...item,
      key: item._id,
    })) || [];

  // ========================= CREATE SUBMIT =========================
  const onFinishCreate = () => {
    mutationCreate.mutate(stateProduct, {
      onSuccess: () => {
        message.success("Tạo sản phẩm thành công!");
        setIsModalOpen(false);
        queryClient.invalidateQueries(["products"]);
        setStateProduct({
          name: "",
          price: "",
          description: "",
          rating: "",
          image: "",
          type: "",
          countInStock: "",
        });
        form.resetFields();
      },
      onError: (error) => {
        message.error("Tạo sản phẩm thất bại!");
        console.error("Create Product Error:", error);
      }
    });
  };

  // ========================= UPDATE SUBMIT =========================
  const onFinishUpdate = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        body: stateProductDetails,
      },
      {
        onSuccess: () => {
          message.success("Cập nhật thành công!");
          queryClient.invalidateQueries(["products"]);
          setIsOpenDrawer(false);
        },
        onError: (error) => {
          message.error("Cập nhật thất bại!");
          console.error("Update Product Error:", error);
        }
      }
    );
  };

  // ========================= INPUT CHANGE =========================
  const handleChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  // ========================= IMAGE UPLOAD =========================
  const handleUpload = async (info) => {
    const file = info.file;
    file.preview = await getBase64(file.originFileObj);

    setStateProduct({ ...stateProduct, image: file.preview });
  };

  const handleUploadDetails = async (info) => {
    const file = info.file;
    file.preview = await getBase64(file.originFileObj);

    setStateProductDetails({ ...stateProductDetails, image: file.preview });
    form.setFieldsValue({ image: file.preview });
  };

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>

      <Button
        style={{
          height: "150px",
          width: "150px",
          borderRadius: "6px",
          borderStyle: "dashed",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <PlusOutlined style={{ fontSize: "60px" }} />
      </Button>

      <div style={{ marginTop: "20px" }}>
        <TableComponent
        handleDeleteManyProducts={handleDeleteManyProducts}
          columns={columns}
          data={dataTable}
          onRow={(record) => ({
            onClick: () => setRowSelected(record._id),
          })}
        />
      </div>

      {/* CREATE MODAL */}
      <ModalComponent
        forceRender
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onFinishCreate}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <InputComponent name="name" value={stateProduct.name} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <InputComponent name="type" value={stateProduct.type} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Count InStock" name="countInStock">
            <InputComponent
              name="countInStock"
              value={stateProduct.countInStock}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputComponent name="price" value={stateProduct.price} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Rating" name="rating">
            <InputComponent name="rating" value={stateProduct.rating} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <InputComponent
              name="description"
              value={stateProduct.description}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Image" name="image">
            {/* Giả sử WrapperUploadFile là một component Ant Design Upload đã tùy chỉnh */}
            <WrapperUploadFile onChange={handleUpload} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select file</Button>
              {stateProduct.image && (
                <img
                  src={stateProduct.image}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "10px",
                  }}
                  alt="avatar"
                />
              )}
            </WrapperUploadFile>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>

      {/* DELETE MODAL */}
      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
        // Thêm loading cho nút OK khi đang xóa
        confirmLoading={isPendingDelete} 
      >
        <div>
          Bạn chắc chắn muốn **xóa** sản phẩm này?
        </div>
      </ModalComponent>

      {/* UPDATE DRAWER */}
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
        <Form labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} onFinish={onFinishUpdate} form={form}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <InputComponent
              name="name"
              value={stateProductDetails.name}
              onChange={handleChangeDetails}
            />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <InputComponent
              name="type"
              value={stateProductDetails.type}
              onChange={handleChangeDetails}
            />
          </Form.Item>

          <Form.Item label="Count" name="countInStock">
            <InputComponent
              name="countInStock"
              value={stateProductDetails.countInStock}
              onChange={handleChangeDetails}
            />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <InputComponent
              name="price"
              value={stateProductDetails.price}
              onChange={handleChangeDetails}
            />
          </Form.Item>

          <Form.Item label="Rating" name="rating">
            <InputComponent
              name="rating"
              value={stateProductDetails.rating}
              onChange={handleChangeDetails}
            />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <InputComponent
              name="description"
              value={stateProductDetails.description}
              onChange={handleChangeDetails}
            />
          </Form.Item>

          <Form.Item label="Image" name="image">
            <WrapperUploadFile onChange={handleUploadDetails} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select file</Button>
              {stateProductDetails.image && (
                <img
                  src={stateProductDetails.image}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "10px",
                  }}
                  alt="avatar"
                />
              )}
            </WrapperUploadFile>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>
    </div>
  );
};

export default AdminProduct;