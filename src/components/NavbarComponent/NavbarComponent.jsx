import React from 'react'
import { WrapperLabelText } from './style'

const NavbarComponent = () => {
    const renderContent = (type,option) => {
        switch(type){
            case 'text':
                return option.map((option)=> {
                    return <h1>{option}</h1>
                })
            default:
                return {}
        }
    }   
  return (
    <div>
    <WrapperLabelText>Label</WrapperLabelText>
    {renderContent('text' ,['Tu Lanh','TV','May Giat'])}
    </div>
  )
}

export default NavbarComponent