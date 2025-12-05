import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo-signin.png'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import {  useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { useEffect } from 'react'
import * as messages from '../../components/Message/Message'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'


const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const localtion= useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )

    const {data, isSuccess}= mutation;

    useEffect(() => {
        console.log("📦 mutation full:", mutation)

        // Reset lỗi chỉ khi có dữ liệu mới từ mutation để tránh lỗi flash
        if (data) {
            setErrorEmail('');
            setErrorPassword('');
        }
        
        // 1. Xử lý THÀNH CÔNG (status: 'OK')
        if (mutation.isSuccess && data?.status === 'OK') {
            messages.success('Đăng nhập thành công!');
            
            // Xử lý chuyển hướng
            if(localtion?.state){
                navigate(localtion?.state)
            }else{
                navigate('/')
            }
            
            // Xử lý lưu token và lấy chi tiết người dùng
            localStorage.setItem('access_token', JSON.stringify (data?.access_token))
            if(data?.access_token){
                const decoded = jwtDecode(data?.access_token)
                console.log('decoded', decoded)
                if(decoded?.id){
                    handleGetDetailsUser(decoded?.id, data?.access_token)
                }
            }
            console.log("✅ mutation success:", mutation.data)
        }

        // 2. Xử lý THẤT BẠI (status: 'ERR') HOẶC LỖI HỆ THỐNG
        if (mutation.isError || (mutation.data && mutation.data.status === 'ERR')) {
            console.error("❌ mutation error:", mutation.error || mutation.data)
            
            // Chỉ hiển thị pop-up thất bại tại đây
            messages.error('Đăng nhập thất bại.');

            // Phân tích và hiển thị lỗi dưới input
            if (mutation.data?.type === 'EMAIL_NOT_FOUND') {
                setErrorEmail(mutation.data.message);
            } else if (mutation.data?.type === 'WRONG_PASSWORD') {
                setErrorPassword(mutation.data.message);
            } else if (mutation.data?.message) {
                 // Trường hợp lỗi khác không có type cụ thể
                 setErrorEmail(mutation.data.message);
            }
        }
    }, [mutation.isSuccess, mutation.isError, data]) // Sửa dependency thành `data` thay vì `mutation.data`

    const handleGetDetailsUser = async  (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({...res?.data, access_token: token}))
    }

    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }

    const handleOnChangeEmail = (value) => {
        setEmail(value)
        setErrorEmail('')
    }

    const handleOnChangePassword = (value) => {
        setPassword(value)
        setErrorPassword('')
    }

    const handleSignIn = () => {
        mutation.mutate({
            email, 
            password
        })
        console.log('signin', email, password)
    }

    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.53)', height:'100vh'}}>
            <div style={{width:'800px', height:'445px', borderRadius:'6px', background:'#fff',display:'flex'}}>
            <WrapperContainerLeft>
                <h1>Xin chào</h1>
                <p>Đăng nhập, tao tk</p>
                
                <InputForm 
                    style={{marginBottom:'4px'}} 
                    placeholder="abc@gmail.com" 
                    value={email} 
                    onChange={handleOnChangeEmail}
                />
                
                {errorEmail && <span style={{color:'red', fontSize: '12px', marginBottom:'10px', display:'block'}}>{errorEmail}</span>}
                
                <div style={{marginTop: errorEmail ? '0' : '10px'}}>
                    <div style={{position:'relative'}}>
                        <span
                            style={{
                            zIndex:'10',
                            position:'absolute',
                            top:'4px',
                            right:'8px',
                            cursor:'pointer',
                            }}
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            >{
                                isShowPassword ?(
                                    <EyeFilled/>
                                ):(
                                    <EyeInvisibleFilled/>
                                )
                            }
                        </span>
                    </div>
                    <InputForm 
                        placeholder="password" 
                        type={isShowPassword ? "text":"password"} 
                        value={password} 
                        onChange={handleOnChangePassword}
                    />
                    
                    {errorPassword && <span style={{color:'red', fontSize: '12px', display:'block', marginTop:'4px'}}>{errorPassword}</span>}
                </div>
                
                
                <ButtonComponent
                    disabled={!email.length || !password.length }
                    onClick={handleSignIn}
                    size={40}
                    styleButton={{background:'rgb(255,67,69)',
                                    height:'48px',
                                    width:'100%',
                                    margin:'26px 0 10px'}}
                    textButton={'Đăng nhập'}
                    styleTextButton={{color:'#fff', fontSize:'15px', fontWeight:'700'}}
                ></ButtonComponent>
                <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản</WrapperTextLight></p>
            </WrapperContainerLeft>
            <WrapperContainerRight>
                <Image src={imageLogo} preview={false} alt='img-logo' height='203px' width='203px'/>
                <h4>Mua sắm tại Siêu thị Quang Khải</h4>
            </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignInPage