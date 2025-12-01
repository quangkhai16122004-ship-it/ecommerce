import { Modal } from 'antd'
import React from 'react'

const ModalComponent = ({title='Modal', isOpen=false, childrend, ...rests}) => {
  return (
    <Modal title={title} open={isOpen} {...rests}>
        {childrend}
    </Modal>
  )
}

export default ModalComponent