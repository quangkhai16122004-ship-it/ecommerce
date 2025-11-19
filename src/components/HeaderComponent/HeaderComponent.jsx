import React from 'react';
import { Col } from 'antd';
import { WarpperHeader, WarpperTextHeader, WarpperHeaderAccount, WarpperTextHeaderSmall } from './style';
// import Search from 'antd/es/transfer/search';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
const HeaderComponent = () => {
  return (
    <div>
    <WarpperHeader>
      <Col span={6}>
        <WarpperTextHeader>SIÊU THỊ QUANG KHẢI</WarpperTextHeader>
      </Col>
      <Col span={12}>
       <ButtonInputSearch
       size="large" 
       textbutton="Tìm kiếm"
        placeholder="nhập từ khóa cần tìm kiếm" 
    //    onSearch={onSearch}
        />
      </Col>
      <Col span={6} style={{display:'flex', gap:'20px', alignItems:'center'}}>
      <WarpperHeaderAccount>
        <UserOutlined style={{fontSize:'30px'}}/>
        <div>
            <div>
                <WarpperTextHeaderSmall>Đăng ký/Đăng nhập</WarpperTextHeaderSmall>
                <div>
                <WarpperTextHeaderSmall>Tài khoản</WarpperTextHeaderSmall>
                <CaretDownOutlined />
                </div>
            </div>
        </div>
        </WarpperHeaderAccount>
        <div>
                <ShoppingCartOutlined style={{fontSize:'30px', color:'#fff'}} />
                <WarpperTextHeaderSmall>Giỏ hàng</WarpperTextHeaderSmall>
        </div>
      </Col>
    </WarpperHeader>
    </div>
  )
}

export default HeaderComponent