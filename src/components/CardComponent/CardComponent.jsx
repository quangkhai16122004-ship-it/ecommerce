import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import { StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'


const CardComponent = (props) => {
  const {countInStock, description, image, name, price, rating, type, disount, selled, id }=props
  const navigate=useNavigate()
  const handleDetailsProduct =(id)=>{
      navigate(`/product-details/${id}`)
  }
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
          src={image}
        />
      }
      onClick={()=>handleDetailsProduct(id)}
    >
    <StyleNameProduct>{name}</StyleNameProduct>
    <WrapperReportText>
        <span style={{marginRight:'4px'}}>
            <span>{rating}</span> <StarFilled style={{fontSize:'12px', color:'yellow'}}/>
        </span>
        <WrapperStyleTextSell>| Đã bán { selled ||1000}+</WrapperStyleTextSell>
    </WrapperReportText>
    <WrapperPriceText>
        <span style={{marginRight:'8px'}}>{Number(price).toLocaleString('vi-VN')}₫</span>
        <WrapperDiscountText>-{disount || 5}%</WrapperDiscountText>
    </WrapperPriceText>
  </WrapperCardStyle>
  )
}

export default CardComponent