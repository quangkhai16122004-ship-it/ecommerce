import styled from 'styled-components';

export const MainContainer = styled.div`
    width: 100%;
    min-height: 80vh; /* Đảm bảo chiều cao tối thiểu */
    background-color: #f0f2f5;
    display: flex;
    justify-content: center;
    padding: 40px 0;
`;

export const Wrapper = styled.div`
    width: 90%;
    max-width: 900px;
    background-color: #ffffff;
    padding: 30px 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const SuccessTitle = styled.h1`
    color: #4CAF50; /* Màu xanh lá cây biểu thị thành công */
    font-size: 2.2em;
    font-weight: 700;
    text-align: center;
    margin-bottom: 5px;
`;

export const SubTitle = styled.p`
    color: #555555;
    font-size: 1.1em;
    text-align: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 15px;
`;

// --- Phần Chi tiết Đơn hàng (Thông tin giao hàng & Thanh toán) ---
export const OrderDetails = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin-bottom: 30px;
`;

export const OrderSection = styled.div`
    flex: 1 1 45%; /* Chia thành 2 cột */
    padding: 15px;
    background-color: #fafafa;
    border-radius: 6px;
    border: 1px solid #e0e0e0;

    @media (max-width: 768px) {
        flex: 1 1 100%; /* Trên màn hình nhỏ chỉ còn 1 cột */
    }
`;

export const SectionTitle = styled.h2`
    font-size: 1.2em;
    color: #333333;
    margin-bottom: 15px;
    border-bottom: 2px solid #4CAF50;
    padding-bottom: 5px;
`;

export const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
`;

export const InfoLabel = styled.span`
    font-weight: 500;
    color: #777777;
`;

export const InfoValue = styled.span`
    font-weight: 600;
    color: #333333;
    text-align: right;
`;


// --- Phần Danh sách Sản phẩm ---
export const OrderItemsList = styled.div`
    border-top: 1px solid #dddddd;
    padding-top: 20px;
`;

export const Item = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr 1.5fr;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px dotted #cccccc;
    font-size: 0.95em;

    &:last-child {
        border-bottom: none;
    }

    span:nth-child(2) {
        text-align: center;
        color: #888888;
    }
    span:nth-child(3) {
        text-align: right;
        font-weight: 600;
        color: #E91E63; /* Màu đỏ cho giá */
    }
`;