import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import { StarFilled } from '@ant-design/icons'


const CardComponent = (props) => {
  const {countInStock, description, image, name, price, rating, type, disount, selled }=props

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
    <StyleNameProduct>{name}</StyleNameProduct>
    <WrapperReportText>
        <span style={{marginRight:'4px'}}>
            <span>{rating}</span> <StarFilled style={{fontSize:'12px', color:'yellow'}}/>
        </span>
        <WrapperStyleTextSell>| Đã bán { selled ||1000}+</WrapperStyleTextSell>
    </WrapperReportText>
    <WrapperPriceText>
        <span style={{marginRight:'8px'}}>{price}₫</span>
        <WrapperDiscountText>-{disount || 5}%</WrapperDiscountText>
    </WrapperPriceText>
  </WrapperCardStyle>
  )
}

export default CardComponent