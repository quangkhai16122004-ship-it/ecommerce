import React, { useState } from 'react'
import { WrapperInputStyle } from './style'

const InputForm = (props) => {
    const { placeholder = 'nhập text', ...rests } = props
    
    const handleOnChangeInput = (e) => {
        props.onChange(e.target.value)
    }

    return (
        <div>
            <WrapperInputStyle 
                placeholder={placeholder} 
                value={props.value} 
                {...rests} 
                onChange={handleOnChangeInput}
            />
        </div>
    )
}

export default InputForm