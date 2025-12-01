import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import InputComponent from '../InputComponent/InputComponent'

const ButtonInputSearch = (props) => {
  const {
    placeholder,
    size,
    textbutton,
    bordered,
    backgroundColorInput = '#fff',
    backgroundColorButton = 'rgb(26, 148, 225)',
    colorButton = '#fff'
  } = props

  return (
    <div style={{ display: 'flex', backgroundColor: '#fff' }}>
      <Input
        size={size}
        placeholder={placeholder}
        variant='borderless'
        style={{ backgroundColor: backgroundColorInput }}
        {...props}
      />

      <ButtonComponent
        size={size}
        bordered={bordered}
        textButton={textbutton}
        icon={<SearchOutlined style={{ color: colorButton }} />}
        style={{
          background: backgroundColorButton,
          border: bordered ? '1px solid #ccc' : 'none',
          borderRadius: '0px',
          color: colorButton
        }}
      />
    </div>
  )
}

export default ButtonInputSearch
