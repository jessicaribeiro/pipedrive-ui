import React from 'react';
import {Avatar, Button, Modal} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import PersonDetail from "../../PersonDetail";

const PersonDetails = ({visible, handleClose, handleDelete, person}) => {

    const {name, phone, email, org_id, id} = person;
    const assistantHash = 'bec1bf505237a7dae6dd393b24f2949d250842d1';
    const groupsHash = '004991c3346ebbb89c05c6c7827d90d2484b653c';

    const fullName = name.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0).toUpperCase();
    return (
        <Modal
            visible={visible}
            title="Add a new person"
            onCancel={handleClose}
            footer={[
                <Button key="delete" type="primary" danger onClick={() => handleDelete(id)} style={{float: 'left'}} icon={<DeleteOutlined />} size="medium" />,
                <Button key="back" onClick={handleClose}>Back</Button>
            ]}
        >
            <div className="modal-person-info-basic">
                <div className="modal-person-avatar">
                    <Avatar
                        style={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                        }}
                    >
                        {initials}
                    </Avatar>
                </div>
                <p> {person.name} </p>
                <p style={{color: '#47D48C'}}> {phone[0].value} </p>
            </div>
            <div className="divider"/>
            <PersonDetail title="Email" description={email[0].value}/>
            <PersonDetail title="Organization" description={org_id.name}/>
            <PersonDetail title="Assistant"
                          description={person[assistantHash]}/>
            <PersonDetail title="Groups"
                          description={person[groupsHash]}/>
            <PersonDetail title="Location" description={org_id.address}/>
        </Modal>
    );
};

export default PersonDetails;

