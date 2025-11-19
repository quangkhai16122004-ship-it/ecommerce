import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons'


const CardComponent = () => {
  return (
    <WrapperCardStyle
  hoverable
  styles={{
    body: { padding: 10 },
    header: { width: 200, height: 200 }
  }}
  style={{ width: 200 }}
  cover={
    <img
      draggable={false}
      alt="example"
      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    />
  }
>
    <StyleNameProduct>Card Product</StyleNameProduct>
    <WrapperReportText>
        <span style={{marginRight:'4px'}}>
            <span> 4.96</span> <StarFilled style={{fontSize:'12px', color:'yellow'}}/>
        </span>
        <span>| Đã bán 1000+</span>
    </WrapperReportText>
    <WrapperPriceText>
        ₫ 120.000
        <WrapperDiscountText>-5%</WrapperDiscountText>
    </WrapperPriceText>
  </WrapperCardStyle>
  )
}

export default CardComponent