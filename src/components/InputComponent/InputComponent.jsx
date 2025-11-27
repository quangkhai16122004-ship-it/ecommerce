import { Input } from 'antd'
import React from 'react'

const InputComponent = ({size, placeholder,style, ...rests}) => {
  return (
    <div>
        <Input
          size={size}
          placeholder={placeholder}
          style={{ border: "1px solid #d9d9d9", borderRadius: "4px" }}
          {...rests}
        />

    </div>
  )
}

export default InputComponent