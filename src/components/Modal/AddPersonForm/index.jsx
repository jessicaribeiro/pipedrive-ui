import React from 'react';
import ModalView from "../../ModalView";
import {Button, Form, Input, Modal, Row, Col} from 'antd';

const PersonForm = ({visible, handleClose, handleSubmit, isLoadingAddPerson}) => {

    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title="Add a new person"
            okText="Create"
            cancelText="Cancel"
            onCancel={handleClose}
            confirmLoading={isLoadingAddPerson}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        handleSubmit(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the name!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Organization"
                    name="org_id"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="phone"
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );

};

export default PersonForm;