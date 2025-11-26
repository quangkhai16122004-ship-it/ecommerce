import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperLabel, WrapperInput, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutation } from '@tanstack/react-query'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as messages from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../untils'

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')

    const mutation = useMutationHooks(
        (data) => {
            const {id,access_token, ...rest}= data;
            return UserService.updateUser(id, rest,    access_token)
        }
    )
    const {data, isSuccess, isError}= mutation;

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    },[user])
    
    useEffect(() => {
        if(isSuccess){
            messages.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if(isError){
            messages.error()
        }
    })

    const handleGetDetailsUser = async  (id, token) => {
      const res = await UserService.getDetailsUser(id, token)
      dispatch(updateUser({...res?.data, access_token: token}))
    }

    const handleOnChangeEmail =(value)=>{
        setEmail(value)
    }
    const handleOnChangeName =(value)=>{
        setName(value)
    }
    const handleOnChangePhone =(value)=>{
        setPhone(value)
    }
    const handleOnChangeAddress =(value)=>{
        setAddress(value)
    }
    const handleOnChangeAvatar = async (info) => {
    const file = info.file;

    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }

    setAvatar(file.preview);
};


    const handleUpdate = () => {
        mutation.mutate({id: user?.id, name, email, phone, address, avatar, access_token: user?.access_token})
        
    }
  return (
    <div style={{width:'1270px', margin:'0 auto', height:'500px'}}>
        <WrapperHeader>Thông tin người dùng</WrapperHeader>
        <WrapperContentProfile>
            <WrapperInput>
                <WrapperLabel htmlFor="name">Name</WrapperLabel>
                <InputForm style={{width:'300px'}} id="name" value={name} onChange={handleOnChangeName}/>
                <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                                height:'30px',
                                width:'fit-content',
                                border:'1px solid rgb(26, 148, 225)',
                                borderRadius:'4px',
                                padding:'2px 6px 6px'}}
                    textButton={'Cập nhật'}
                    styleTextButton={{color:'rgb(26, 148, 225)', fontSize:'15px', fontWeight:'700'}}
                ></ButtonComponent>
            </WrapperInput>
            <WrapperInput>
                <WrapperLabel htmlFor="email">Email</WrapperLabel>
                <InputForm style={{width:'300px'}} id="email" value={email} onChange={handleOnChangeEmail}/>
                <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                                height:'30px',
                                width:'fit-content',
                                border:'1px solid rgb(26, 148, 225)',
                                borderRadius:'4px',
                                padding:'2px 6px 6px'}}
                    textButton={'Cập nhật'}
                    styleTextButton={{color:'rgb(26, 148, 225)', fontSize:'15px', fontWeight:'700'}}
                ></ButtonComponent>
            </WrapperInput>
            <WrapperInput>
                <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                <InputForm style={{width:'300px'}} id="phone" value={phone} onChange={handleOnChangePhone}/>
                <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                                height:'30px',
                                width:'fit-content',
                                border:'1px solid rgb(26, 148, 225)',
                                borderRadius:'4px',
                                padding:'2px 6px 6px'}}
                    textButton={'Cập nhật'}
                    styleTextButton={{color:'rgb(26, 148, 225)', fontSize:'15px', fontWeight:'700'}}
                ></ButtonComponent>
            </WrapperInput>
            <WrapperInput>
                <WrapperLabel htmlFor="address">address</WrapperLabel>
                <InputForm style={{width:'300px'}} id="address" value={address} onChange={handleOnChangeAddress}/>
                <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                                height:'30px',
                                width:'fit-content',
                                border:'1px solid rgb(26, 148, 225)',
                                borderRadius:'4px',
                                padding:'2px 6px 6px'}}
                    textButton={'Cập nhật'}
                    styleTextButton={{color:'rgb(26, 148, 225)', fontSize:'15px', fontWeight:'700'}}
                ></ButtonComponent>
            </WrapperInput>
            <WrapperInput>
                <WrapperLabel htmlFor="avatar">avatar</WrapperLabel>
                <WrapperUploadFile onChange={handleOnChangeAvatar} showUploadList={false} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Select file</Button>
                </WrapperUploadFile>

                {avatar && (
                    <img
                        src={avatar}
                        style={{
                            height:'60px',
                            width:'60px',
                            borderRadius:'50%',
                            objectFit: 'cover'
                        }}
                        alt="avatar"
                    />
                )}

                {/* <InputForm style={{width:'300px'}} id="avatar" value={avatar} onChange={handleOnChangeAvatar}/> */}
                <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                                height:'30px',
                                width:'fit-content',
                                border:'1px solid rgb(26, 148, 225)',
                                borderRadius:'4px',
                                padding:'2px 6px 6px'}}
                    textButton={'Cập nhật'}
                    styleTextButton={{color:'rgb(26, 148, 225)', fontSize:'15px', fontWeight:'700'}}
                ></ButtonComponent>
            </WrapperInput>
        </WrapperContentProfile>
    </div>
  )
}

export default ProfilePage