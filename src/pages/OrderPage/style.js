// style.js

import { InputNumber } from 'antd';
import styled from 'styled-components';

export const WrapperHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 9px 16px;
    background: #fff;
    margin-top: 12px;
    border-radius: 4px;
    font-size: 14px;
    color: #000;
    font-weight: 500;
`;

export const WrapperLeft = styled.div`
    width: 910px;
    padding: 0 10px;
`;

export const WrapperRight = styled.div`
    flex: 1;
    padding: 0 10px;
`;

export const WrapperProduct = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #efefef;
    padding: 10px 0;
    &:last-child {
        border-bottom: none;
    }
`;

export const WrapperInfo = styled.div`
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
`;

export const WrapperTotal = styled.div`
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 14px;
`;

export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const WrapperPriceDiscount = styled.span`
    // Thêm style cho giá giảm/giá gốc
    font-size: 11px;
    color: #999;
    text-decoration: line-through;
    margin-left: 8px;
`;

export const WrapperInputNumber = styled(InputNumber)`
    // Thêm style nếu bạn muốn custom InputNumber
    width: 40px !important;
    text-align: center;
    border-radius: 0;
    margin: 0 4px;
    height: 24px;
`;