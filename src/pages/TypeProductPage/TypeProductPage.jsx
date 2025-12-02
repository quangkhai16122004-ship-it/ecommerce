import React, { useEffect, useState } from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import {  Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProduct } from './style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
const TypeProductPage = () => {
    const searchProduct = useSelector((state)=>state?.product?.search)
    const {state} = useLocation()
    const [products, setProducts] = useState([])
    const [panigate, setPanigate] = useState({
        page: 0,
        limit:10,
        total: 1
    })
    const fetchProductType=async (type, page, limit)=>{
        const res = await ProductService.getProductType(type, page, limit)
        if(res?.status =='OK'){
            setProducts(res?.data)
            setPanigate({...panigate, total: res?.totalPage})
        }else{

        }
    }


    useEffect(()=>{
        if(state){
            fetchProductType(state, panigate.page, panigate.limit)
        }
    },[state, panigate.page, panigate.limit])

    const onChange=(current, pageSize) => {
        setPanigate({...panigate, page:current-1, limit: pageSize})
     }
      return (
    <div style={{width:'100%', background:'#efefef', height:'calc(100vh-64px)'}}>
        <div style={{width:'1270px', margin:'0 auto', height:'100%'}}>
        <Row style={{ flexWrap:'nowrap', paddingTop:'10px', height:'calc(100%-20px)' }}>
            <WrapperNavbar span={4}>
                <NavbarComponent/>
            </WrapperNavbar>
            <Col span={20} style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <WrapperProduct>
                    {products?.map((product)=>{
                        return(
                             <CardComponent 
                                key={product._id} 
                                countInStock={product.countInStock}
                                description={product.description}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                                type={product.type}
                                discount={product.discount}
                                selled={product.selled}
                                id={product._id}
                                />
                        )
                    })}
                </WrapperProduct>
                <Pagination  defaultCurrent={panigate.page+1} total={panigate?.total} onChange={onChange} style={{justifyContent:'center', marginTop:'10px'}} />
            </Col>
        </Row>
        </div>
    </div>
  )
}

export default TypeProductPage