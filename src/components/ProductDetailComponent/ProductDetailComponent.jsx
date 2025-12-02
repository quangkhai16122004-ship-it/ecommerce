import { Col, Image, Rate, Row } from 'antd'
import React, { useState } from 'react'
import imageProduct from '../../assets/images/test.webp'
import imageSmall from '../../assets/images/imagesmall.webp'
import { WrapperAddressProduct,  WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuantityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { MinusOutlined, StarFilled, PlusOutlined  } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct } from '../../redux/slides/orderSlide'
const ProductDetailComponent = ({idProduct}) => {
    const [numProduct, setNumProduct]= useState(1)
    const user=useSelector((state)=> state.user)
    const navigate = useNavigate()
    const location= useLocation()
    const dispatch = useDispatch()

    const onChange = (value) => {
        setNumProduct(Number(value))
    }
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if(id){
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }

    const handleChangeCount =(type)=>{
        if(type==='increase'){
            setNumProduct(numProduct+1)
        }else{
            setNumProduct(numProduct-1)
        }
    }

    const { data: productDetails } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct,
        placeholderData: keepPreviousData,
        })

    const handleAddOrderProduct=()=>{
        if(!user?.id){
            navigate('/sign-in', {state:location?.pathname})
        }else{
            dispatch(addOrderProduct({
                orderItem:{
                    name: productDetails?.name,
                    amount: numProduct,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id
                    
                }
            }))
        }
    }

  return (
    <Row style={{padding:'16px', background:'#fff', borderRadius:'4px'}}>
        <Col span={10} style={{borderRight:'1px solid rgb(240,240,240)', paddingRight:'10px'}}>
            <Image src={productDetails?.image} alt="product-image" preview={false}/>
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
            <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
            <div>
                <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating}/>
                <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
            </div>
            <WrapperPriceProduct>
                <WrapperPriceTextProduct>{productDetails?.price}</WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <WrapperAddressProduct>
                <span>Giao đến</span>
                <span className='address'> {user?.address}</span>-
                <span className='change-address'>Đổi địa chỉ</span>
            </WrapperAddressProduct>
            <div style={{margin:'10px 0 20px', padding:'10px 0', borderTop:'1px solid rgb(240,240,240)', borderBottom:'1px solid rgb(240,240,240)'}}>
                <div style={{marginBottom:'6px'}}>Số lượng: </div>
                <WrapperQuantityProduct>
                    <button style={{border:'none', background:'transparent'}}  onClick={()=> handleChangeCount('decrease')}>
                        <MinusOutlined style={{color:'#000', fontSize:'20px'}}/>
                    </button>
                    <WrapperInputNumber onChange={onChange} defaultValue={1} value={numProduct} size='small'/>
                    <button style={{border:'none', background:'transparent'}}  onClick={()=> handleChangeCount('increase')}>
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
                    onClick={handleAddOrderProduct}
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