import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, icon, ...rests }) => {
  return (
    <Button 
      size={size}
      style={styleButton}
      icon={icon}
      {...rests}
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  )
}

export default ButtonComponent
