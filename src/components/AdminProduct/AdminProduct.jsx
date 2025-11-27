import React, { Children, useEffect, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { WrapperUploadFile } from '../../pages/Profile/style'
import { getBase64 } from '../../untils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: ''
    });

    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: ''
    });

    const [form] = Form.useForm();

    // CREATE PRODUCT
    const mutation = useMutationHooks((data) => {
        const { name, price, description, rating, image, type, countInStock } = data;
        return ProductService.crateProduct({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock,
        });
    });

    const fetchGetDetailsProduct =async ()=>{
        const res = await ProductService.getDetailsProduct(rowSelected)
        if(res?.data){
            setStateProductDetails({
                name: '',
                price: '',
                description: '',
                rating: '',
                image: '',
                type: '',
                countInStock: ''
            })
        }
        
    }

    const handleDetaisProduct = () =>{
        if(rowSelected){
            fetchGetDetailsProduct()
        }
        setIsOpenDrawer(true)
        console.log('rowSelected', rowSelected)
    }


    // GET ALL PRODUCTS
    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProduct
    });

    const renderAction =()=>{
        return(
            <div>
                <DeleteOutlined style={{color:'red', fontSize:'30px', cursor:'pointer'}}/>
                <EditOutlined style={{color:'orange', fontSize:'30px', cursor:'pointer'}} onClick={handleDetaisProduct}/>
            </div>
        )
    }

    // TABLE COLUMNS
    const columns = [
        { title: "Name", dataIndex: "name" },
        { title: "Price", dataIndex: "price" },
        { title: "Rating", dataIndex: "rating" },
        { title: "Type", dataIndex: "type" },
        { title: "Action", dataIndex: "action", render: renderAction },
    ];

    const dataTable =
        products?.data?.map((item) => ({
            ...item,
            key: item._id,
        })) || [];

    // MUTATION RESULT EFFECT
    useEffect(() => {
        if (mutation.isSuccess && mutation.data?.status === "OK") {
            message.success();
            handleCancel();
        } else if (mutation.isError) {
            message.error();
        }
    }, [mutation.isSuccess]);

    // CLOSE MODAL
    const handleCancel = () => {
        setIsModalOpen(false);
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
    };

    // SUBMIT FORM
    const onFinish = () => {
        mutation.mutate(stateProduct);
    };

    // HANDLE INPUT CHANGE
    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleOnchangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        });
    };
    // IMAGE UPLOAD
    const handleOnChangeAvatar = async (info) => {
        const file = info.file;

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };

    const handleOnChangeAvatarDetails = async (info) => {
        const file = info.file;

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview,
        });
    };

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>

            <div style={{ marginTop: "10px" }}>
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
            </div>

            <div style={{ marginTop: "20px" }}>
                <TableComponent columns={columns} data={dataTable} onRow={(record, rowIndex) =>{
                    return {
                        onClick:event=>{
                            setRowSelected(record._id)
                        }
                    }
                }} />
            </div>

            {/* MODAL */}
            <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    {/* NAME */}
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please input Name!" }]}
                    >
                        <InputComponent
                            value={stateProduct.name}
                            onChange={handleOnchange}
                            name="name"
                        />
                    </Form.Item>

                    {/* TYPE */}
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: "Please input Type!" }]}
                    >
                        <InputComponent
                            value={stateProduct.type}
                            onChange={handleOnchange}
                            name="type"
                        />
                    </Form.Item>

                    {/* COUNT IN STOCK */}
                    <Form.Item
                        label="Count InStock"
                        name="countInStock"
                        rules={[{ required: true, message: "Please input Count InStock!" }]}
                    >
                        <InputComponent
                            value={stateProduct.countInStock}
                            onChange={handleOnchange}
                            name="countInStock"
                        />
                    </Form.Item>

                    {/* PRICE */}
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please input Price!" }]}
                    >
                        <InputComponent
                            value={stateProduct.price}
                            onChange={handleOnchange}
                            name="price"
                        />
                    </Form.Item>

                    {/* RATING */}
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: "Please input Rating!" }]}
                    >
                        <InputComponent
                            value={stateProduct.rating}
                            onChange={handleOnchange}
                            name="rating"
                        />
                    </Form.Item>

                    {/* DESCRIPTION */}
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please input Description!" }]}
                    >
                        <InputComponent
                            value={stateProduct.description}
                            onChange={handleOnchange}
                            name="description"
                        />
                    </Form.Item>

                    {/* IMAGE */}
                    <Form.Item label="Image" name="image">
                        <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
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

                    {/* SUBMIT */}
                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <DrawerComponent title='chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={()=> setIsOpenDrawer(false)} width='90%'>
                <Form
                    name="basic"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 22 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    // form={form}
                >
                    {/* NAME */}
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please input Name!" }]}
                    >
                        <InputComponent
                            value={stateProduct.name}
                            onChange={handleOnchangeDetails}
                            name="name"
                        />
                    </Form.Item>

                    {/* TYPE */}
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: "Please input Type!" }]}
                    >
                        <InputComponent
                            value={stateProductDetails.type}
                            onChange={handleOnchangeDetails}
                            name="type"
                        />
                    </Form.Item>

                    {/* COUNT IN STOCK */}
                    <Form.Item
                        label="Count InStock"
                        name="countInStock"
                        rules={[{ required: true, message: "Please input Count InStock!" }]}
                    >
                        <InputComponent
                            value={stateProductDetails.countInStock}
                            onChange={handleOnchangeDetails}
                            name="countInStock"
                        />
                    </Form.Item>

                    {/* PRICE */}
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please input Price!" }]}
                    >
                        <InputComponent
                            value={stateProductDetails.price}
                            onChange={handleOnchangeDetails}
                            name="price"
                        />
                    </Form.Item>

                    {/* RATING */}
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: "Please input Rating!" }]}
                    >
                        <InputComponent
                            value={stateProductDetails.rating}
                            onChange={handleOnchangeDetails}
                            name="rating"
                        />
                    </Form.Item>

                    {/* DESCRIPTION */}
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please input Description!" }]}
                    >
                        <InputComponent
                            value={stateProductDetails.description}
                            onChange={handleOnchangeDetails}
                            name="description"
                        />
                    </Form.Item>

                    {/* IMAGE */}
                    <Form.Item label="Image" name="image">
                        <WrapperUploadFile onChange={handleOnChangeAvatarDetails} maxCount={1}>
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

                    {/* SUBMIT */}
                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerComponent>
        </div>
    );
};

export default AdminProduct;
