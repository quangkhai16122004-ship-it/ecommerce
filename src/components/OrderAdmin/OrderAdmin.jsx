import React, { useEffect, useState, useMemo } from 'react';
import { Table, Button, Space, Tag, message, Spin, Modal } from 'antd'; 
import { EyeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import * as OrderService from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query'; 

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const OrderAdmin = () => {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null); 

    const fetchAllOrder = async () => {
        setLoading(true);
        try {
            const res = await OrderService.getAllOrder(user?.access_token);
            setLoading(false);
            return res.data;
        } catch (error) {
            setLoading(false);
            console.error("Lỗi khi fetch đơn hàng:", error);
            message.error('Không thể tải dữ liệu đơn hàng.');
            return [];
        }
    };

    const { isLoading, data: orders, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchAllOrder,
        enabled: !!user?.access_token, 
    });

    const dataTable = useMemo(() => {
        return orders?.length ? orders.map((order) => {
            let statusText = 'Đang chờ xác nhận';
            let statusColor = 'default';

            if (order.isDelivered) {
                statusText = 'Đã giao hàng';
                statusColor = 'green';
            } else if (order.isPaid) {
                statusText = 'Đã thanh toán, chờ giao';
                statusColor = 'processing';
            } else if (order.isDelivered === false) {
                 statusText = 'Đang xử lý';
                 statusColor = 'volcano';
            }
            
            return { 
                ...order, 
                key: order._id, 
                userName: order.shippingAddress?.fullName || 'N/A', 
                totalPrice: order.totalPrice,
                paymentMethod: order.paymentMethod === 'later_money' ? 'Tiền mặt (COD)' : 'Thanh toán Online',
                deliveryMethod: order.deliveryMethod === 'fast' ? 'Giao nhanh' : 'Vận chuyển tiêu chuẩn',
                status: statusText,
                statusColor: statusColor,
            };
        }) : [];
    }, [orders]);

    const handleDetailOrder = (record) => {
        const fullOrder = orders.find(o => o._id === record.key);
        setSelectedOrder(fullOrder); 
        setIsDetailModalOpen(true);
    };

    const handleEditStatus = (record) => {
        message.warning(`Đã chọn sửa trạng thái cho đơn hàng ID: ${record.key.substring(record.key.length - 8)}. Vui lòng triển khai Modal/Drawer chỉnh sửa trạng thái.`);
    }

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            key: '_id',
            width: 100,
            render: (text) => <Tag color="blue">{text.substring(text.length - 8)}</Tag>,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'userName',
            key: 'userName',
            width: 150,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width: 120,
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            render: (text) => formatCurrency(text),
        },
        {
            title: 'Thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            width: 130,
            render: (text) => <Tag color={text.includes('COD') ? 'orange' : 'green'}>{text}</Tag>,
        },
        {
            title: 'Vận chuyển',
            dataIndex: 'deliveryMethod',
            key: 'deliveryMethod',
            width: 130,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (_, record) => <Tag color={record.statusColor}>{record.status}</Tag>,
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button 
                        type="primary" 
                        icon={<EyeOutlined />} 
                        onClick={() => handleDetailOrder(record)}
                        title="Xem chi tiết"
                    />
                    <Button 
                        type="default" 
                        onClick={() => handleEditStatus(record)}
                        title="Chỉnh sửa trạng thái"
                    >
                        Sửa TT
                    </Button>
                </Space>
            ),
        },
    ];
    
    const renderDetailModal = () => {
        if (!selectedOrder) return null;

        const { shippingAddress, paymentMethod, deliveryMethod, orderItems, totalPrice } = selectedOrder;
        
        const orderItemsList = orderItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0 5px 10px', borderBottom: '1px dotted #eee' }}>
                <div style={{ flex: 1 }}>
                    <strong>{item.product?.name || 'Sản phẩm không rõ tên'}</strong> 
                </div>
                <div style={{ width: '100px', textAlign: 'center' }}>
                    x{item.amount || 0}
                </div>
                <div style={{ width: '120px', textAlign: 'right', fontWeight: 'bold', paddingRight: '10px' }}>
                    {formatCurrency((item.price || 0) * (item.amount || 0))}
                </div>
            </div>
        ));

        return (
            <Modal
                title={`Chi tiết đơn hàng: ${selectedOrder._id.substring(selectedOrder._id.length - 8)}`}
                open={isDetailModalOpen}
                onCancel={() => setIsDetailModalOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setIsDetailModalOpen(false)}>
                        Đóng
                    </Button>
                ]}
                width={700}
            >
                <div style={{ padding: '10px 0' }}>
                    <h3>Thông tin Giao hàng</h3>
                    <p><strong>Người nhận:</strong> {shippingAddress?.fullName || 'N/A'}</p>
                    <p><strong>Số điện thoại:</strong> {shippingAddress?.phone || 'N/A'}</p>
                    <p><strong>Địa chỉ:</strong> {shippingAddress?.address || 'N/A'}, {shippingAddress?.city || 'N/A'}</p>

                    <h3 style={{ marginTop: '15px' }}>Phương thức</h3>
                    <p><strong>Thanh toán:</strong> {paymentMethod === 'later_money' ? 'Thanh toán khi nhận hàng (COD)' : 'Thanh toán Online'}</p>
                    <p><strong>Vận chuyển:</strong> {deliveryMethod === 'fast' ? 'Giao hàng nhanh' : 'Vận chuyển tiêu chuẩn'}</p>

                    <h3 style={{ marginTop: '15px' }}>Danh sách sản phẩm ({orderItems.length})</h3>
                    
                    {/* KHỐI ĐÃ SỬA: Thêm header và cấu trúc lại để dễ nhìn hơn */}
                    <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            padding: '10px', 
                            fontWeight: 'bold', 
                            backgroundColor: '#fafafa',
                            borderBottom: '1px solid #ddd'
                        }}>
                            <div style={{ flex: 1 }}>Tên sản phẩm</div>
                            <div style={{ width: '100px', textAlign: 'center' }}>Số lượng</div>
                            <div style={{ width: '120px', textAlign: 'right' }}>Thành tiền</div>
                        </div>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {orderItemsList.length > 0 ? orderItemsList : <p style={{ textAlign: 'center', margin: '10px' }}>Không có sản phẩm nào trong đơn hàng này.</p>}
                        </div>
                    </div>
                    {/* KẾT THÚC KHỐI SỬA */}


                    <h3 style={{ marginTop: '20px', color: '#ff4d4f', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                        Tổng giá trị đơn hàng: {formatCurrency(totalPrice)}
                    </h3>
                </div>
            </Modal>
        );
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#fff', minHeight: 'calc(100vh - 80px)' }}>
            <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 600 }}>Quản Lý Đơn Hàng</h1>
            
            <Spin spinning={isLoading || loading}>
                <Table
                    columns={columns}
                    dataSource={dataTable}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 900 }} 
                    bordered
                    locale={{ emptyText: 'Không có đơn hàng nào.' }}
                />
            </Spin>
            
            {renderDetailModal()}
        </div>
    );
}

export default OrderAdmin;