import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo-signin.png'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const navigate = useNavigate();
  const handleNaivigateSignIn = () => {
    navigate('/sign-in')
  }

  const handleSignUp = () => {
    console.log('signup', email, password, confirmPassword)
  }
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.53)', height:'100vh'}}>
      <div style={{width:'800px', height:'445px', borderRadius:'6px', background:'#fff',display:'flex'}}>
      <WrapperContainerLeft>
        <h1>Xin chào</h1>
        <p>Đăng nhập, tao tk</p>
        
        {/* ✅ SỬA Ở ĐÂY: handleOnchange → handleOnChange */}
        <InputForm 
          style={{marginBottom:'10px'}} 
          placeholder="abc@gmail.com" 
          value={email} 
          onChange={handleOnChangeEmail} 
        />
        
        <div style={{position:'relative'}}>
          <span style={{
            zIndex:'10',
            position:'absolute',
            top:'4px',
            right:'8px',
            cursor:'pointer',
          }}
          onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <EyeFilled/> : <EyeInvisibleFilled/>}
          </span>
          {/* ✅ Thêm handleOnChange cho password */}
          <InputForm 
            placeholder="password" 
            type={isShowPassword ? "text":"password"} 
            style={{marginBottom:'10px'}}
            value={password}
            onChange={handleOnChangePassword}
          />
        </div>
        
        <div style={{position:'relative'}}>
          <span style={{
            zIndex:'10',
            position:'absolute',
            top:'4px',
            right:'8px',
            cursor:'pointer',
          }}
          onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
          >
            {isShowConfirmPassword ? <EyeFilled/> : <EyeInvisibleFilled/>}
          </span>
          {/* ✅ Thêm handleOnChange cho confirm password */}
          <InputForm 
            placeholder="confirm password" 
            type={isShowConfirmPassword ? "text":"password"}
            value={confirmPassword}
            onChange={handleOnChangeConfirmPassword}
          />
        </div>
        
        <ButtonComponent
        disabled={!email.length || !password.length || !confirmPassword.length}
        onClick={handleSignUp}
          size={40}
          styleButton={{
            background:'rgb(255,67,69)',
            height:'48px',
            width:'100%',
            margin:'26px 0 10px'
          }}
          textButton={'Dang ky'}
          styleTextButton={{color:'#fff', fontSize:'15px', fontWeight:'700'}}
        />
        
        <p>Đã có tài khoản? 
          <WrapperTextLight onClick={handleNaivigateSignIn}> 
            Đăng nhập
          </WrapperTextLight>
        </p>
      </WrapperContainerLeft>
      
      <WrapperContainerRight>
        <Image src={imageLogo} preview={false} alt='img-logo' height='203px' width='203px'/>
        <h4>Mua sắm tại Siêu thị Quang Khải</h4>
      </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage