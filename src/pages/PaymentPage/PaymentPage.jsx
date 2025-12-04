import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Row, Radio, Button, message } from 'antd';
import { WrapperLeft, WrapperRight, WrapperInfo, WrapperTotal, WrapperStyleHeader } from './style'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as OrderService from '../../services/OrderService';
import { removeAllOrderProduct } from '../../redux/slides/orderSlide'; 
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const [deliveryMethod, setDeliveryMethod] = useState('fast'); 
    const [paymentMethod, setPaymentMethod] = useState('later_money'); 
    // Ngăn vòng lặp vô hạn khi dispatch Redux
    const [isOrderPlaced, setIsOrderPlaced] = useState(false); 

    // ✅ FIX: Dùng useRef để giữ dữ liệu ổn định cho navigate
    const orderDataRef = useRef({});

    const mutationAddOrder = useMutationHooks((data) =>
        OrderService.createOrder(data.body, data.token) 
    );

    const { data, isSuccess, isError, isPending } = mutationAddOrder;

    const handleDeliveryChange = (e) => {
        setDeliveryMethod(e.target.value);
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const itemsChecked = order?.orderItems || []; 

    const totalOrder = useMemo(() => {
        return itemsChecked.reduce((sum, item) => sum + (item.price * item.amount), 0);
    }, [itemsChecked]);
    
    let shippingPrice = 0;
    if (deliveryMethod === 'fast') {
        shippingPrice = totalOrder > 1000000 ? 0 : 30000; 
    } else if (deliveryMethod === 'go_jek') {
        shippingPrice = totalOrder > 500000 ? 10000 : 20000; 
    }

    const taxPrice = totalOrder * 0.1;
    const finalTotal = totalOrder + shippingPrice + taxPrice;

    const deliveryAddress = `${user?.address}, ${user?.city}`;
    
    // Cập nhật Ref.current mỗi khi dữ liệu tính toán thay đổi
    orderDataRef.current = {
        deliveryMethod, 
        paymentMethod, 
        totalPrice: finalTotal,
        itemsPrice: totalOrder,
        shippingPrice: shippingPrice,
        orderItems: itemsChecked,
        fullName: user?.name,
        address: user?.address,
        city: user?.city,
        phone: user?.phone,
    };

    // Logic xử lý đặt hàng thành công (chỉ chạy 1 lần)
    // ✅ FIX: Rút gọn dependency array
    useEffect(() => {
        if (isSuccess && data?.status === 'OK' && !isOrderPlaced) {
            
            setIsOrderPlaced(true); 
            message.success('Đặt hàng thành công!');
            dispatch(removeAllOrderProduct()); 
            
            // Dùng dữ liệu ổn định từ Ref
            navigate('/orderSuccess', { 
                state: orderDataRef.current
            }); 

        } else if (isError || (isSuccess && data?.status === 'ERR')) {
            message.error(data?.message || 'Đặt hàng thất bại. Vui lòng thử lại.');
        }
        
    }, [isSuccess, isError, data, dispatch, isOrderPlaced, navigate]); 
    
    // Reset cờ khi API call thay đổi trạng thái
    useEffect(() => {
        if (!isSuccess && isOrderPlaced) {
            setIsOrderPlaced(false);
        }
    }, [isSuccess, isOrderPlaced]);


    const handleAddOrder = () => {
        if (
            !user?.name || 
            !user?.address || 
            !user?.phone || 
            !user?.city || 
            itemsChecked.length === 0
        ) {
            message.error('Vui lòng kiểm tra lại thông tin giao hàng và giỏ hàng.');
            return;
        }

        const orderItemsPayload = itemsChecked.map(product => ({
            product: product.product, 
            amount: product.amount,
            price: product.price
        }));

        const orderData = {
            orderItems: orderItemsPayload, 
            fullName: user?.name, 
            address: user?.address, 
            city: user?.city, 
            phone: user?.phone, 
            paymentMethod: paymentMethod, 
            itemsPrice: totalOrder, 
            shippingPrice: shippingPrice, 
            totalPrice: finalTotal, 
            user: user?.id, 
            email: user?.email, 
            deliveryMethod: deliveryMethod, 
        };
        
        // Reset cờ trước khi gọi API
        setIsOrderPlaced(false); 
        
        mutationAddOrder.mutate({ 
            token: user?.access_token, 
            body: orderData 
        });
    };

    return (
        <div style={{ background: '#efefef', padding: '20px 0', minHeight: '100vh' }}>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <h1 style={{ fontWeight: 300 }}>Thanh toán</h1>
                
                <Row style={{ flexWrap: 'nowrap' }}>
                    
                    <WrapperLeft>
                        
                        <WrapperInfo>
                            <WrapperStyleHeader>Chọn phương thức giao hàng</WrapperStyleHeader>
                            <Radio.Group onChange={handleDeliveryChange} value={deliveryMethod}>
                                <Radio value="fast" style={{ display: 'block', padding: '10px 0' }}>
                                    <span style={{ fontWeight: 500 }}>FAST</span>: Giao hàng tiết kiệm 
                                    <span style={{ color: '#aaa', marginLeft: '10px' }}>({deliveryMethod === 'fast' ? shippingPrice.toLocaleString('vi-VN') + ' VNĐ' : '...'})</span>
                                </Radio>
                                <Radio value="go_jek" style={{ display: 'block', padding: '10px 0' }}>
                                    <span style={{ fontWeight: 500 }}>GO_JEK</span>: Giao hàng tiết kiệm
                                    <span style={{ color: '#aaa', marginLeft: '10px' }}>({deliveryMethod === 'go_jek' ? shippingPrice.toLocaleString('vi-VN') + ' VNĐ' : '...'})</span>
                                </Radio>
                            </Radio.Group>
                        </WrapperInfo>

                        <WrapperInfo>
                            <WrapperStyleHeader>Chọn phương thức thanh toán</WrapperStyleHeader>
                            <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
                                <Radio value="later_money" style={{ display: 'block', padding: '10px 0' }}>
                                    Thanh toán tiền mặt khi nhận hàng
                                </Radio>
                                <Radio value="online_money" style={{ display: 'block', padding: '10px 0' }} disabled>
                                    Thanh toán Online (Đang phát triển)
                                </Radio>
                            </Radio.Group>
                        </WrapperInfo>
                        
                    </WrapperLeft>
                    
                    
                    <WrapperRight>
                        <WrapperInfo style={{ padding: '10px', background: '#fff', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '5px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                    Địa chỉ: <span style={{ fontWeight: 'normal' }}>{deliveryAddress || '---'}</span>
                                </span>
                            </div>
                            <div style={{ fontSize: '14px', color: '#666' }}>
                                Người nhận: {user?.name || '---'} | SĐT: {user?.phone || '---'}
                            </div>
                        </WrapperInfo>

                        <WrapperInfo>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Tạm tính ({itemsChecked.length} sản phẩm)</span>
                                <span style={{ color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                    {totalOrder.toLocaleString('vi-VN')} VNĐ
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Giảm giá</span>
                                <span style={{ color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                    0 VNĐ
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Phí giao hàng</span>
                                <span style={{ color: '#000', fontSize: '14px', fontWeight: 500 }}>
                                    {shippingPrice.toLocaleString('vi-VN')} VNĐ
                                </span>
                            </div>
                        </WrapperInfo>
                        
                        <WrapperTotal>
                            <span>Tổng tiền</span>
                            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <span style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>
                                    {finalTotal.toLocaleString('vi-VN')} VNĐ
                                </span>
                                <span style={{ color: '#ccc', fontSize: '11px' }}>
                                    (Đã bao gồm VAT nếu có: {taxPrice.toLocaleString('vi-VN')} VNĐ)
                                </span>
                            </span>
                        </WrapperTotal>

                        <Button 
                            onClick={handleAddOrder}
                            style={{ background: '#fe3834', height: '48px', width: '100%', border: 'none', borderRadius: '4px', color: '#fff', fontWeight: 500, fontSize: '18px' }}
                            disabled={itemsChecked.length === 0 || isPending || isOrderPlaced}
                            loading={isPending}
                        >
                            {isPending ? 'Đang Đặt Hàng...' : 'Đặt hàng'}
                        </Button>
                    </WrapperRight>
                </Row>
            </div>
        </div>
    );
}

export default PaymentPage;