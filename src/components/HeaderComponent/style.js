import { Row } from "antd";
import styled from "styled-components";

export const WarpperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(26,148,225);
    align-items: center;
    flex-wrap: nowrap;
    gap: 16px;
`
export const WarpperTextHeader = styled.span`
    font-size: 18px;
    color: white;
    font-weight: bold;
    text-align: left;
`
export const WarpperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: white;
    gap: 10px;
`
export const WarpperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: white;
    white-space: nowrap;
`