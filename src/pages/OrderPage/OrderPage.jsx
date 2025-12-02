import React from 'react';
import { Row, Col, Checkbox, Input, Button } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'; 
import { WrapperHeader, WrapperLeft, WrapperRight, WrapperProduct, WrapperInfo, WrapperTotal, WrapperCountOrder } from './style'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { updateOrderQuantity, removeOrderProduct } from '../../redux/slides/orderSlide'; 


// ******************************************************
// 1. COMPONENT CON: ProductComponent
// ******************************************************

const ProductComponent = ({ item, handleChangeCount, handleRemove }) => {
    
    const quantity = item.amount || 0; 
    const price = item.price || 0;

    const subTotalPrice = (price * quantity).toLocaleString('vi-VN');

    return (
        <WrapperProduct>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '390px' }}>
                <Checkbox checked={true} /> 
                <img 
                    src={item.image || 'placeholder_image_url'} 
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
                    {subTotalPrice} 
                </span>
                
                <DeleteOutlined 
                    style={{ cursor: 'pointer', color: '#999', fontSize: '14px', width: '50px', textAlign: 'center' }} 
                    onClick={() => handleRemove(item.product)} 
                />
            </div>
        </WrapperProduct>
    )
}


// ******************************************************
// 2. COMPONENT CHA: OrderPage
// ******************************************************

const OrderPage = () => {
    const order = useSelector((state) => state.order)
    const dispatch = useDispatch();
    
    const productsToRender = order?.orderItems || [];
    const isCartEmpty = productsToRender.length === 0;

    const totalOrder = order?.itemsPrice || 0;
    const finalTotal = order?.totalPrice || 0;
    const shippingPrice = order?.shippingPrice || 0;
    const taxPrice = order?.taxPrice || 0;


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
    }

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
                                <span style={{ width: '50px' }}><Checkbox checked={true} /></span>
                                <span style={{ flex: 1, textAlign: 'left', paddingLeft: '10px' }}>Tất cả ({productsToRender.length} sản phẩm)</span> 
                                
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
                                    />
                                ))}
                            </WrapperInfo>
                        </WrapperLeft>
                        
                        <WrapperRight>
                            <WrapperInfo>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Tạm tính</span>
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
                                style={{ background: '#fe3834', height: '48px', width: '100%', border: 'none', borderRadius: '4px', color: '#fff', fontWeight: 500, fontSize: '18px' }}
                            >
                                Mua hàng
                            </Button>
                        </WrapperRight>
                    </Row>
                )}
            </div>
        </div>
    );
}

export default OrderPage;