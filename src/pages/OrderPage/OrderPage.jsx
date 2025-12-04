import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Checkbox, Input, Button, Form } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons'; 
import { WrapperHeader, WrapperLeft, WrapperRight, WrapperProduct, WrapperInfo, WrapperTotal, WrapperCountOrder } from './style'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { updateOrderQuantity, removeOrderProduct } from '../../redux/slides/orderSlide'; 
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import * as UserService from "../../services/UserService";
import { useMutationHooks } from '../../hooks/useMutationHook';
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';


// PRODUCT COMPONENT
const ProductComponent = ({ item, handleChangeCount, handleRemove, handleCheckboxChange, isChecked }) => {
    const quantity = item.amount || 0; 
    const price = item.price || 0;
    const subTotalPrice = (price * quantity);

    return (
        <WrapperProduct>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '390px' }}>
                <Checkbox 
                    checked={isChecked} 
                    onChange={() => handleCheckboxChange(item.product)} 
                /> 
                <img 
                    src={item.image || 'https://placehold.co/77x79/eeeeee/333333?text=Product'} 
                    style={{ width: '77px', height: '79px', objectFit: 'cover' }} 
                    alt={item.name}
                />
                <div style={{ width: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                </div>
            </div>
            
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                
                <span style={{ fontSize: '13px', color: '#242424', width: '100px', textAlign: 'center' }}>
                    {price.toLocaleString('vi-VN')}
                </span>
                
                <WrapperCountOrder style={{ width: '100px' }}>
                    <button 
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} 
                        onClick={() => handleChangeCount(item.product, 'decrease')} 
                    >
                        <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                    
                    <Input 
                        min={1} 
                        value={quantity} 
                        style={{ width: '40px', textAlign: 'center', border: '1px solid #ccc', borderRadius: 0, margin: '0 4px', height: '24px', padding: '0 4px' }} 
                        readOnly 
                    />
                    
                    <button 
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} 
                        onClick={() => handleChangeCount(item.product, 'increase')} 
                    >
                        <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                </WrapperCountOrder>

                <span style={{ color: 'red', fontWeight: 500, width: '100px', textAlign: 'center' }}>
                    {subTotalPrice.toLocaleString('vi-VN')} 
                </span>
                
                <DeleteOutlined 
                    style={{ cursor: 'pointer', color: '#999', fontSize: '14px', width: '50px', textAlign: 'center' }} 
                    onClick={() => handleRemove(item.product)} 
                />
            </div>
        </WrapperProduct>
    )
}


// ORDER PAGE COMPONENT
const OrderPage = () => {
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user)
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetail, setStateUserDetail] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.address || "",
        city: user?.city || ""
    });
    const [listChecked, setListChecked] = useState([]);
    const [form] = Form.useForm()
    const navigate = useNavigate()
    
    const productsToRender = order?.orderItems || [];
    const isCartEmpty = productsToRender.length === 0;

    useEffect(() => {
        const initialCheckedIds = productsToRender.map(item => item.product);
        setListChecked(initialCheckedIds);
    }, [productsToRender.length]);

    useEffect(()=>{
        form.setFieldsValue(stateUserDetail)
    }, [form, stateUserDetail])

    useEffect(()=>{
        if(isOpenModalUpdateInfo){
            setStateUserDetail({
                city: user?.city || "",
                name: user?.name || "",
                address: user?.address || "",
                phone: user?.phone || ""
            })
        }
    }, [isOpenModalUpdateInfo, user])

    // Handlers
    const handleCheckboxChange = (idProduct) => {
        const isChecked = listChecked.includes(idProduct);
        if (isChecked) {
            setListChecked(listChecked.filter(id => id !== idProduct));
        } else {
            setListChecked([...listChecked, idProduct]);
        }
    }

    const handleOnchangeAllCheckbox = (e) => {
        if (e.target.checked) {
            const allCheckedIds = productsToRender.map(item => item.product);
            setListChecked(allCheckedIds);
        } else {
            setListChecked([]);
        }
    }

    const handleQuantityChange = (id, type) => {
        const currentItem = productsToRender.find(item => item.product === id);
        
        if (!currentItem || typeof currentItem.amount !== 'number') return; 

        let newQuantity = currentItem.amount;
        
        if (type === 'increase') {
            newQuantity = currentItem.amount + 1;
        } else if (type === 'decrease' && currentItem.amount > 1) {
            newQuantity = currentItem.amount - 1;
        } else {
            return; 
        }

        dispatch(updateOrderQuantity({ productId: id, quantity: newQuantity }));
    }

    const handleRemoveProduct = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
        setListChecked(listChecked.filter(id => id !== idProduct));
    }


    // Calculations
    const itemsChecked = useMemo(() => {
        return productsToRender.filter(item => listChecked.includes(item.product));
    }, [productsToRender, listChecked]);

    const totalOrder = useMemo(() => {
        return itemsChecked.reduce((sum, item) => sum + (item.price * item.amount), 0);
    }, [itemsChecked]);
    
    const shippingPrice = totalOrder > 1000000 ? 0 : 30000;
    const taxPrice = 0; // Tùy thuộc vào luật thuế, giữ 0 nếu không áp dụng VAT
    const finalTotal = totalOrder + shippingPrice + taxPrice;

    const isCheckedAll = listChecked.length === productsToRender.length && productsToRender.length > 0;

    const handleAddCard = (user) => {
        if (!listChecked.length) {
            alert('Vui lòng chọn sản phẩm để mua hàng.');
            return;
        }

        if (!user?.phone || !user?.address || !user?.name || !user?.city) {
            setIsOpenModalUpdateInfo(true)
        } else {
            navigate('/payment')
        }
    }

    const mutationUpdate = useMutationHooks((data) =>
        UserService.updateUser(data.id, data.body, data.token)
    );

    const handelCancelUpdate =()=>{
        setStateUserDetail({
            name: user?.name || "",
            phone: user?.phone || "",
            address: user?.address || "",
            city: user?.city || ""
        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
    }
    
    const handleUpdateInfoUser = async () => {
        console.log("User ID being sent:", user?.id);
        try {
            await form.validateFields();
            
            const bodyUpdate = {
                name: stateUserDetail.name,
                address: stateUserDetail.address,
                city: stateUserDetail.city,
                phone: stateUserDetail.phone
            };
            
            // SỬA LỖI: Truyền ID, Token và Body riêng biệt
            mutationUpdate.mutate({ 
                id: user?.id, 
                token: user?.access_token, 
                body: bodyUpdate 
            }, {
                onSuccess: () => {
                    // Cập nhật Redux state sau khi API thành công
                    dispatch(updateUser(bodyUpdate)) 
                    setIsOpenModalUpdateInfo(false)
                }
            })
        } catch (errorInfo) {
            console.log('Validation Failed:', errorInfo);
        }
    }

    const handleChangeDetail = (e) => {
        setStateUserDetail({ ...stateUserDetail, [e.target.name]: e.target.value });
    };

    const deliveryAddress = `${user?.address}, ${user?.city}`;
    const userHasAddress = user?.address && user?.city;
    
    return (
        <div style={{ background: '#efefef', padding: '20px 0', minHeight: '100vh' }}>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <h1 style={{ fontWeight: 300 }}>Giỏ hàng</h1>
                
                {isCartEmpty ? (
                    <div style={{ padding: '50px', border: '1px solid #ccc', borderRadius: '4px', textAlign: 'center', background: '#fff' }}>
                        <p style={{ fontSize: '18px', color: '#666' }}>
                            Không có sản phẩm nào trong giỏ hàng.
                        </p>
                    </div>
                ) : (
                    <Row style={{ flexWrap: 'nowrap' }}>
                        
                        <WrapperLeft>
                            <WrapperHeader>
                                <span style={{ width: '50px' }}>
                                    <Checkbox 
                                        onChange={handleOnchangeAllCheckbox} 
                                        checked={isCheckedAll} 
                                        disabled={productsToRender.length === 0}
                                    />
                                </span>
                                <span style={{ flex: 1, textAlign: 'left', paddingLeft: '10px' }}>
                                    Tất cả ({productsToRender.length} sản phẩm)
                                </span> 
                                
                                <span style={{ width: '100px', textAlign: 'center' }}>Đơn giá</span>
                                <span style={{ width: '100px', textAlign: 'center' }}>Số lượng</span>
                                <span style={{ width: '100px', textAlign: 'center' }}>Thành tiền</span>
                                
                                <span style={{ width: '50px', textAlign: 'center' }}><DeleteOutlined /></span>
                            </WrapperHeader>
                            
                            <WrapperInfo style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px 0' }}>
                                {productsToRender.map(item => (
                                    <ProductComponent 
                                        key={item.product} 
                                        item={item}
                                        handleChangeCount={handleQuantityChange}
                                        handleRemove={handleRemoveProduct} 
                                        handleCheckboxChange={handleCheckboxChange}
                                        isChecked={listChecked.includes(item.product)}
                                    />
                                ))}
                            </WrapperInfo>
                        </WrapperLeft>
                        
                        <WrapperRight>
                            {/* Address Info */}
                            <WrapperInfo style={{ marginBottom: '10px', padding: '10px', background: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '5px' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                        Địa chỉ giao hàng
                                    </span>
                                    <Button 
                                        type="link" 
                                        onClick={() => setIsOpenModalUpdateInfo(true)}
                                        style={{ padding: 0, height: 'auto', fontSize: '14px' }}
                                    >
                                        <EditOutlined style={{marginRight: '4px'}} />
                                        {userHasAddress ? 'Thay đổi' : 'Thêm địa chỉ'}
                                    </Button>
                                </div>

                                <div>
                                    {user?.name ? (
                                        <span style={{ fontWeight: 500, marginRight: '8px' }}>{user.name}</span>
                                    ) : (
                                        <span style={{ color: 'red' }}>Chưa có tên</span>
                                    )}
                                    | 
                                    {user?.phone ? (
                                        <span style={{ marginLeft: '8px' }}>{user.phone}</span>
                                    ) : (
                                        <span style={{ color: 'red', marginLeft: '8px' }}>Chưa có SĐT</span>
                                    )}
                                </div>
                                <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                                    {userHasAddress ? deliveryAddress : <span style={{ color: 'red' }}>Vui lòng cập nhật địa chỉ giao hàng</span>}
                                </div>
                            </WrapperInfo>

                            {/* Total Calculation */}
                            <WrapperInfo> 
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Tạm tính ({itemsChecked.length} sản phẩm)</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                        {totalOrder.toLocaleString('vi-VN')}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                        0
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Phí giao hàng</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                        {shippingPrice.toLocaleString('vi-VN')}
                                    </span>
                                </div>
                            </WrapperInfo>
                            
                            <WrapperTotal>
                                <span>Tổng tiền</span>
                                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <span style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>
                                        {finalTotal.toLocaleString('vi-VN')} 
                                    </span>
                                    <span style={{ color: '#ccc', fontSize: '11px' }}>
                                        (Đã bao gồm VAT nếu có: {taxPrice.toLocaleString('vi-VN')})
                                    </span>
                                </span>
                            </WrapperTotal>

                            <Button 
                                onClick={()=> handleAddCard(user)}
                                style={{ background: '#fe3834', height: '48px', width: '100%', border: 'none', borderRadius: '4px', color: '#fff', fontWeight: 500, fontSize: '18px' }}
                                disabled={listChecked.length === 0}
                            >
                                Mua hàng
                            </Button>
                        </WrapperRight>
                    </Row>
                )}
            </div>
            
            {/* Modal Update Info */}
            <ModalComponent 
                title="Cập nhật thông tin giao hàng" 
                open={isOpenModalUpdateInfo} 
                onCancel={handelCancelUpdate} 
                onOk={handleUpdateInfoUser}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item 
                        label="Tên" 
                        name="name" 
                        required 
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <InputComponent name="name" value={stateUserDetail.name} onChange={handleChangeDetail} />
                    </Form.Item>

                    <Form.Item 
                        label="Thành phố" 
                        name="city" 
                        required 
                        rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}
                    >
                        <InputComponent name="city" value={stateUserDetail.city} onChange={handleChangeDetail} />
                    </Form.Item>

                    <Form.Item 
                        label="Phone" 
                        name="phone"
                        required
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <InputComponent
                        name="phone"
                        value={stateUserDetail.phone}
                        onChange={handleChangeDetail}
                        />
                    </Form.Item>

                    <Form.Item 
                        label="Address" 
                        name="address"
                        required
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <InputComponent
                        name="address"
                        value={stateUserDetail.address}
                        onChange={handleChangeDetail}
                        />
                    </Form.Item>
                </Form>
            </ModalComponent>
        </div>
    );
}

export default OrderPage;