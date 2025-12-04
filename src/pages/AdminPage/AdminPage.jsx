import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAdmin';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const AdminPage = () => {
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />),
    getItem('Quản lý đơn hàng', 'orderAdmin')
  ];

  const [keySelected, setKeySelected] = useState('')

  const renderPage = (key) =>{
    switch(key){
      case 'user' :
        return (
          <AdminUser/>
        )
      case 'product' :
        return(
          <AdminProduct/>
        )
        case 'orderAdmin' :
        return(
          <OrderAdmin/>
        )
      default:
        return <></>
    }
  }

  const handleOnCLick=({key}) =>{
    setKeySelected(key)
    
  }
console.log('key', keySelected)
  return (

    <>
    <HeaderComponent isHiddenSearch isHiddenCart/>
    <div style={{display:'flex'}}>
      <Menu
      mode="inline"
      style={{ 
        width: 256,
        boxShadow: '1px 1px 1px #ccc',
        height:'100vh'

        }}
      items={items}
      onClick={handleOnCLick}
    />
      <div style={{flex:1, padding:'15px'}}>
        {renderPage(keySelected)}
      </div>
    </div>
    </>
  );
};

export default AdminPage;
