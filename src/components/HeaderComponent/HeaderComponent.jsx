import React, { useEffect, useState } from 'react';
import { Badge, Col, Popover } from 'antd';
import { 
  WarpperHeader, 
  WarpperTextHeader, 
  WarpperHeaderAccount, 
  WarpperTextHeaderSmall, 
  WrapperContentPopup 
} from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slides/userSlide';

const HeaderComponent = ({isHiddenSearch = false, isHiddenCart=false}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    setUserAvatar(user?.avatar);
  },[user?.avatar])

  const handleLogout = async () => {
    await UserService.logoutUser();
    dispatch(resetUser());
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/profile-user')}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
      <WrapperContentPopup onClick={() => navigate('/system/admin')}>
        Quản lý hệ thống
      </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const handleNavigatLogin = () => {
    navigate('/sign-in');
  };

  return (
    <div style={{ width: '100%', backgroundColor: 'rgb(26,148,255)', display: 'flex', justifyContent: 'center' }}>
      <WarpperHeader style={{justifyContent : isHiddenCart && isHiddenSearch ? 'space-between' : 'unset'}}>
        <Col span={5}>
          <WarpperTextHeader>SIÊU THỊ QUANG KHẢI</WarpperTextHeader>
        </Col>
        {!isHiddenSearch &&(
          <Col span={13}>
            <ButtonInputSearch
              size="large"
              textbutton="Tìm kiếm"
              placeholder="nhập từ khóa cần tìm kiếm"
            />
          </Col>
        )}
        

        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <WarpperHeaderAccount>
            {userAvatar ? (
              <img
                src={userAvatar} alt="avatar"
                style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
            <UserOutlined style={{ fontSize: '30px' }} />
            )}
            {user?.access_token ? (
              <Popover content={content} trigger="click">
                <div style={{ cursor: 'pointer' }}>
                  {user?.name || user?.email}
                </div>
              </Popover>
            ) : (
              <div onClick={handleNavigatLogin} style={{ cursor: 'pointer' }}>
                <WarpperTextHeaderSmall>Đăng ký/Đăng nhập</WarpperTextHeaderSmall>
                <div>
                  <WarpperTextHeaderSmall>Tài khoản</WarpperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WarpperHeaderAccount>
          {!isHiddenCart &&(
            <div>
              <Badge count={5} size="small">
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              </Badge>
              <WarpperTextHeaderSmall>Giỏ hàng</WarpperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WarpperHeader>
    </div>
  );
};

export default HeaderComponent;
