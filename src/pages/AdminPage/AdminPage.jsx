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

// Hàm tiện ích để tạo item
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const AdminPage = () => {
  // Cấu hình các menu item
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />)
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
