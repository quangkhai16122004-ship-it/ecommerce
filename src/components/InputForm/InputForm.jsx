import React, { useState } from 'react'
import { WrapperInputStyle } from './style'

const InputForm = (props) => {
    const [valueInput, setValueInput] = useState('')
    const { placeholder = 'nhập text', ...rests } = props
    
    const handleOnChangeInput = (e) => {
        setValueInput(e.target.value)
    }

    return (
        <div>
            <WrapperInputStyle 
                placeholder={placeholder} 
                value={valueInput} 
                onChange={handleOnChangeInput}
                {...rests} 
            />
        </div>
    )
}

export default InputForm