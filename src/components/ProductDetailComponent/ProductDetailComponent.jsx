import { Col, Image, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/test.webp'
import imageSmall from '../../assets/images/imagesmall.webp'
import { WrapperAddressProduct,  WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuantityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { MinusOutlined, StarFilled, PlusOutlined  } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
const ProductDetailComponent = () => {
    const onChange = () => {}
  return (
    <Row style={{padding:'16px', background:'#fff', borderRadius:'4px'}}>
        <Col span={10} style={{borderRight:'1px solid rgb(240,240,240)', paddingRight:'10px'}}>
            <Image src={imageProduct} alt="product-image" preview={false}/>
            <Row style={{paddingTop:'10px', justifyContent:'space-between'}}>
                <WrapperStyleColImage span={4}> 
                    <WrapperStyleImageSmall src={imageSmall} alt="image-small" preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}> 
                    <WrapperStyleImageSmall src={imageSmall} alt="image-small" preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}> 
                    <WrapperStyleImageSmall src={imageSmall} alt="image-small" preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}> 
                    <WrapperStyleImageSmall src={imageSmall} alt="image-small" preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}> 
                    <WrapperStyleImageSmall src={imageSmall} alt="image-small" preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}> 
                    <WrapperStyleImageSmall src={imageSmall} alt="image-small" preview={false}/>
                </WrapperStyleColImage>
            </Row>
        </Col>
        <Col span={14} style={{paddingLeft:'10px'}}>
            <WrapperStyleNameProduct>Tiểu thuyết kinh điển tiếng Anh: All the Light We Cannot See</WrapperStyleNameProduct>
            <div>
                <StarFilled style={{fontSize:'12px', color:'rgb(253,216,54)'}}/>
                <StarFilled style={{fontSize:'12px', color:'rgb(253,216,54)'}}/>
                <StarFilled style={{fontSize:'12px', color:'rgb(253,216,54)'}}/>
                <StarFilled style={{fontSize:'12px', color:'rgb(253,216,54)'}}/>
                <StarFilled style={{fontSize:'12px', color:'rgb(204,204,204)'}}/>
                <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
            </div>
            <WrapperPriceProduct>
                <WrapperPriceTextProduct>200.000</WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <WrapperAddressProduct>
                <span>Giao đến</span>
                <span className='address'> 123 Đường ABC, Phường XYZ, Quận 1, Thành phố Hồ Chí Minh</span>-
                <span className='change-address'>Đổi địa chỉ</span>
            </WrapperAddressProduct>
            <div style={{margin:'10px 0 20px', padding:'10px 0', borderTop:'1px solid rgb(240,240,240)', borderBottom:'1px solid rgb(240,240,240)'}}>
                <div style={{marginBottom:'6px'}}>Số lượng: </div>
                <WrapperQuantityProduct>
                    <button style={{border:'none', background:'transparent'}}>
                        <MinusOutlined style={{color:'#000', fontSize:'20px'}}/>
                    </button>
                    <WrapperInputNumber defaultValue={3} onChange={onChange} size='small'/>
                    <button style={{border:'none', background:'transparent'}}>
                        <PlusOutlined style={{color:'#000', fontSize:'20px'}}/>
                    </button>
                </WrapperQuantityProduct>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <ButtonComponent
                    size={40}
                    styleButton={{background:'rgb(255,67,69)',
                                 height:'48px',
                                  width:'220px'}}
                    textButton={'Chọn mua'}
                    styleTextButton={{color:'#fff', fontSize:'15px', fontWeight:'700'}}
                ></ButtonComponent>
                <ButtonComponent
                    size={40}
                    styleButton={{background:'#fff',
                                 height:'48px',
                                  width:'220px'}}
                    textButton={'Mua trả sau'}
                    styleTextButton={{color:'rgb(13,92,182)',
                                    fontSize:'15px'
                    }}
                ></ButtonComponent>
            </div>
        </Col>
    </Row>
  )
}

export default ProductDetailComponent