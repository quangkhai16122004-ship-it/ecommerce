import React, { useEffect, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Modal } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { useSearchParams } from 'react-router-dom'
import { WrapperUploadFile } from '../../pages/Profile/style'
import { getBase64 } from '../../untils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct] = useState({
        name:'',
        price:'',
        description:'',
        rating:'',
        image:'',
        type:'',
        countInstock:''
    })

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const {name,
                    price,
                    description,
                    rating,
                    image,
                    type,
                    countInstock : countInStock}= data;
            return ProductService.crateProduct({name,
                    price,
                    description,
                    rating,
                    image,
                    type,
                    countInStock})
        }
    )


    const {data, isSuccess, isError} = mutation

    useEffect(()=>{
        if(isSuccess && data?.status==='OK'){
            message.success()
            handleCancel()
        } else if(isError) {
            message.error()
        }
    },[isSuccess])

    const handleCancel =()=>{
        setIsModalOpen(false);
        setStateProduct({
            name:'',
            price:'',
            description:'',
            rating:'',
            image:'',
            type:'',
            countInstock:''
        })
        form.resetFields()
    }

    const onFinish =()=>{
        mutation.mutate(stateProduct)
    }

    const handleOnchange = (e) =>{
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleOnChangeAvatar = async (info) => {
        const file = info.file;
    
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }
  return (
    <div>
        <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
        <div style={{marginTop:'10px'}}>
            <Button style={{height:'150px', width:'150px', borderRadius:'6px', borderStyle:'dashed'}} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{fontSize:'60px'}}/></Button>
        </div>
        <div style={{marginTop:'20px'}}>
            <TableComponent/>
        </div>
        <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null} okButtonProps={{display:'none'}}>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
            <Form.Item
                label="Name"
                name="Name"
                rules={[{ required: true, message: 'Please input your Name!' }]}
            >
                <InputComponent 
                style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}
                value={stateProduct.name} onChange={handleOnchange} name="name"
                />
            </Form.Item>

            <Form.Item
                label="Type"
                name="Type"
                rules={[{ required: true, message: 'Please input your Type!' }]}
            >
                <InputComponent 
                style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}
                value={stateProduct.name} onChange={handleOnchange} name="type" />
            </Form.Item>
            <Form.Item
                label="count InStock"
                name="countInStock"
                rules={[{ required: true, message: 'Please input your count InStock!' }]}
            >
                <InputComponent 
                style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}
                value={stateProduct.name} onChange={handleOnchange} name="countInstock" />
            </Form.Item>
            <Form.Item
                label="Price"
                name="Price"
                rules={[{ required: true, message: 'Please input your Price!' }]}
            >
                <InputComponent 
                style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}
                value={stateProduct.name} onChange={handleOnchange} name="price" />
            </Form.Item>
            <Form.Item
                label="Rating"
                name="Rating"
                rules={[{ required: true, message: 'Please input your Rating!' }]}
            >
                <InputComponent
                 style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}
                 value={stateProduct.name} onChange={handleOnchange} name="rating" />
            </Form.Item>
            <Form.Item
                label="Description"
                name="Description"
                rules={[{ required: true, message: 'Please input your Description!' }]}
            >
                <InputComponent
                 style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}
                 value={stateProduct.name} onChange={handleOnchange} name="description" />
            </Form.Item>

            <Form.Item
                label="Image"
                name="image"
                rules={[{ required: true, message: 'Please input your image!' }]}
            >
                <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                    <Button icon={<UploadOutlined/>}> select file </Button>
                    {stateProduct?.image && (
                    <img
                        src={stateProduct?.image}
                        style={{
                            height:'60px',
                            width:'60px',
                            borderRadius:'50%',
                            objectFit: 'cover',
                            marginLeft:'10px'
                        }}
                        alt="avatar"
                    />
                )}
                </WrapperUploadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
        </Modal>
        

    </div>
  )
}

export default AdminProduct