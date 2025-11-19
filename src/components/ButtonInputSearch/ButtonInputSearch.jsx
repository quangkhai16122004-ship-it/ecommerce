import { SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react'

const ButtonInputSearch = (props) => {
    const {
            placeholder, size, 
            textbutton, bordered, 
            backgroundColorInput='#fff', 
            backgroundColorButton='rgb(26, 148, 225)',
            colorButton='#fff'} = props
  return (
    <div style={{display: 'flex', backgroundColor: '#fff'}}>
        <Input
            size={size} 
            placeholder={placeholder} 
            variant='borderless'
            style={{backgroundColor: backgroundColorInput}} 
        />
        <Button 
            size={size} 
            bordered={bordered} 
            style={{background: backgroundColorButton, border: bordered, borderRadius: '0px'}} 
            icon={<SearchOutlined color={colorButton}/>}
        ><span style={{color: colorButton}}>{textbutton}</span>
        </Button>
    </div>
  )
}

export default ButtonInputSearch