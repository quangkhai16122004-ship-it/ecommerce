import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as L from './style'; 

const OrderSuccess = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);

    // Lấy data từ state được truyền từ trang Payment (thông tin vừa đặt hàng thành công)
    const location = useLocation();
    const { state } = location; 

    const { delivery, payment } = useMemo(() => {
        return {
            delivery: state?.deliveryMethod === 'fast' ? 'Giao hàng nhanh' : 'Giao hàng tiêu chuẩn',
            payment: state?.paymentMethod === 'later_money' ? 'Thanh toán khi nhận hàng' : 'Thanh toán online (Đã thanh toán)',
        };
    }, [state]);

    return (
        <L.MainContainer>
            <L.Wrapper>
                <L.SuccessTitle>
                    🎉 Đặt hàng thành công!
                </L.SuccessTitle>
                <L.SubTitle>
                    Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng chúng tôi.
                </L.SubTitle>

                <L.OrderDetails>
                    <L.OrderSection>
                        <L.SectionTitle>Thông tin giao hàng</L.SectionTitle>
                        <L.InfoRow>
                            <L.InfoLabel>Người nhận:</L.InfoLabel>
                            <L.InfoValue>{state?.fullName}</L.InfoValue>
                        </L.InfoRow>
                        <L.InfoRow>
                            <L.InfoLabel>Địa chỉ:</L.InfoLabel>
                            <L.InfoValue>{`${state?.address}, ${state?.city}`}</L.InfoValue>
                        </L.InfoRow>
                        <L.InfoRow>
                            <L.InfoLabel>Điện thoại:</L.InfoLabel>
                            <L.InfoValue>{state?.phone}</L.InfoValue>
                        </L.InfoRow>
                    </L.OrderSection>
                    
                    <L.OrderSection>
                        <L.SectionTitle>Hình thức thanh toán & giao hàng</L.SectionTitle>
                        <L.InfoRow>
                            <L.InfoLabel>Phương thức TT:</L.InfoLabel>
                            <L.InfoValue>{payment}</L.InfoValue>
                        </L.InfoRow>
                        <L.InfoRow>
                            <L.InfoLabel>Vận chuyển:</L.InfoLabel>
                            <L.InfoValue>{delivery}</L.InfoValue>
                        </L.InfoRow>
                        <L.InfoRow>
                            <L.InfoLabel>Tổng tiền:</L.InfoLabel>
                            <L.InfoValue style={{ color: 'red', fontWeight: 'bold' }}>
                                {state?.totalPrice?.toLocaleString()} VNĐ
                            </L.InfoValue>
                        </L.InfoRow>
                    </L.OrderSection>
                </L.OrderDetails>

                <L.OrderItemsList>
                    <L.SectionTitle>Sản phẩm đã đặt:</L.SectionTitle>
                    {state?.orderItems?.map((item) => (
                        <L.Item key={item.product}>
                            <span>{item.name}</span>
                            <span>x {item.amount}</span>
                            <span>{item.price?.toLocaleString()} VNĐ</span>
                        </L.Item>
                    ))}
                </L.OrderItemsList>
            </L.Wrapper>
        </L.MainContainer>
    );
};

export default OrderSuccess;