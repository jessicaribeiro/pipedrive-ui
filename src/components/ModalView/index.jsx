import React from 'react';
import './styles.css';
import { DeleteOutlined } from '@ant-design/icons';
import {Modal, Button} from "antd";


const ModalView = ({title, handleClose, children, visible, handleDelete, personId}) => {

    //tmeter proptypes
    return (
            <Modal
                title={title}
                visible={visible}
                onCancel={handleClose}
                onOk={handleClose}
                footer={[
                    <Button key="delete" type="primary" danger onClick={() => handleDelete(personId)} style={{float: 'left'}} icon={<DeleteOutlined />} size="medium" />,
                    <Button key="back" onClick={handleClose}>Back</Button>
                ]}
            >
                {children}
            </Modal>
    );
};

export default ModalView;