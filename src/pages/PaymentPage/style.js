import styled from 'styled-components';

// ------------------------------------
// COMMON WRAPPERS (Sử dụng cho cả OrderPage và PaymentPage)
// ------------------------------------

export const WrapperHeader = styled.div`
    display: flex;
    align-items: center;
    background: #fff;
    padding: 9px 12px;
    border-radius: 4px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
`;

export const WrapperStyleHeader = styled.div`
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 500;
`;

export const WrapperLeft = styled.div`
    width: 910px;
    margin-right: 20px;
    /* Dùng flex-grow: 1 nếu muốn nó chiếm phần lớn không gian */
`;

export const WrapperRight = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const WrapperInfo = styled.div`
    padding: 17px 20px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 0 0 1px #eee;
`;

// ------------------------------------
// ORDER/CART PAGE SPECIFIC
// ------------------------------------

export const WrapperProduct = styled.div`
    display: flex;
    align-items: center;
    border-top: 1px solid #ccc;
    padding: 15px 0;
    
    &:first-child {
        border-top: none;
    }
`;

export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 80px;
    height: 24px;

    input {
        text-align: center;
        border: none !important;
        outline: none;
        padding: 0;
    }
`;


// ------------------------------------
// PAYMENT/TOTAL SPECIFIC
// ------------------------------------

export const WrapperTotal = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-weight: 500;
`;