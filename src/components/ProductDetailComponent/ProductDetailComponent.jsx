import { Col, Image, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/test.webp'
import imageSmall from '../../assets/images/imagesmall.webp'

const ProductDetailComponent = () => {
  return (
    <Row style={{padding:'16px'}}>
        <Col span={10}>
            <Image src={imageProduct} alt="product-image" preview={false}/>
            <Row style={{paddingTop:'10px'}}>
                <Col span={4}> 
                    <Image src={imageSmall} alt="image-small" preview={false}/>
                </Col>
                <Col span={4}> 
                    <Image src={imageSmall} alt="image-small" preview={false}/>
                </Col>
                <Col span={4}> 
                    <Image src={imageSmall} alt="image-small" preview={false}/>
                </Col>
                <Col span={4}> 
                    <Image src={imageSmall} alt="image-small" preview={false}/>
                </Col>
                <Col span={4}> 
                    <Image src={imageSmall} alt="image-small" preview={false}/>
                </Col>
                <Col span={4}> 
                    <Image src={imageSmall} alt="image-small" preview={false}/>
                </Col>
            </Row>
        </Col>
        <Col span={14}>14</Col>
    </Row>
  )
}

export default ProductDetailComponent