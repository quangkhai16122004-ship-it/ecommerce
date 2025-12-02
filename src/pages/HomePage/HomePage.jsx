import React, { useEffect, useRef, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProduct, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const searchProduct = useSelector((state)=>state?.product?.search)
  const [stateProduct, setStateProduct] = useState([])
  const [limit,setLimit] = useState(6)
  const [typeProduct, setTypeProduct]= useState([])

  const fetchProductAll = async ({ queryKey }) => {
  const [, limit, search] = queryKey
  const res = await ProductService.getAllProduct(search, limit)
  return res
}

  const fetchAllTypeProduct = async ()=>{
    const res = await ProductService.getAllTypeProduct()
    if(res.status ==='OK'){
      setTypeProduct(res?.data)
    }
  }

  useEffect(()=>{
    fetchAllTypeProduct()
  },[])
    

  const { data: products , isPreviousData } = useQuery({
  queryKey: ['products', limit, searchProduct],
  queryFn: fetchProductAll,
  retry: 3,
  retryDelay: 1000,
  keepPreviousData: true
})


useEffect(() => {
   if (products?.data?.length > 0) {
    setStateProduct(products.data)
   } else if (products?.data && searchProduct !== '') {
    setStateProduct([]);
  }
}, [products, searchProduct])



  return (
    <>
    <div style={{width:'1270px', margin:'0 auto'}}>
      <WrapperTypeProduct>
      {typeProduct.map((item)=>{
      return(
        <TypeProduct name={item} key={item}/>
      )}
    )}
    </WrapperTypeProduct>
    </div>
    <div className='body' style={{width:'100%', background:'#efefef'}}>
      <div id="container" style={{ height:'1000px', width:'1270px', margin:'0 auto'}}> 
    <SliderComponent arrImages={[slider1,slider2,slider3]}/>
    <WrapperProduct>
      {stateProduct?.map((product)=>{
        return (
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
      <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'10px'}}>
        <WrapperButtonMore textButton="Xem thêm" type="outline" styleButton={{
        border: '1px solid rgb(11,116,229)',
        color: 'rgb(11,116,229)',
        width: '240px', height: '38px', borderRadius: '4px',
      }}
      disabled={products?.total === products?.data?.length || products?.totalPage===1}
      styleTextButton={{fontWeight: 500}}
      onClick={()=> setLimit((prev)=> prev+6)}
      />
      </div>
    </div>
    </div>
    </>
  )
}

export default HomePage