import React, {useState, useEffect} from 'react';
import {Form, Input, Modal, Select} from 'antd';

const {Option} = Select;

const AddPersonForm = (
    {
        visible,
        handleClose,
        handleSubmit,
        isLoadingAddPerson
    }
) => {
    const [organizations, setOrganizations] = useState([]);
    const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false);

    useEffect(() => {
        getOrganizations();
    }, []);

    const getOrganizations = () => {
        setIsLoadingOrganizations(true);

        const token = 'c3e6b60ccb63ae0250796d80b091545351776f0b';
        const url = `https://api.pipedrive.com/v1/organizations?start=0&sort=name&api_token=${token}`;

        const requestOptions = {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            },
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                setOrganizations(data.data);
                console.log('Get organizations with success!');
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
            })
            .finally(() => {
                setIsLoadingOrganizations(false);
            })
    };

    const [form] = Form.useForm();


    return (
        <Modal
            visible={visible}
            title="Add a new person"
            okText="Create"
            cancelText="Cancel"
            onCancel={handleClose}
            confirmLoading={isLoadingAddPerson || isLoadingOrganizations}
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
                            max: 40,
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
                            max: 40,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="organization"
                    label="Organization"
                >
                    <Select placeholder="Select an organization">
                        {organizations.map((org) => {
                            return <Option key={org.id}
                                           value={org.id}>{org.name}</Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            max: 40,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );

};

export default AddPersonForm;