import React from 'react';
import {Avatar, Button, Modal} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import PersonDetail from "../../PersonDetail";
import './styles.css';

const PersonDetails = ({visible, handleClose, handleDelete, person}) => {

    const phone = person.phone ? person.phone[0].value : '';
    const email = person.email ? person.email[0].value : '';

    const assistantHash = 'bec1bf505237a7dae6dd393b24f2949d250842d1';
    const groupsHash = '004991c3346ebbb89c05c6c7827d90d2484b653c';

    const fullName = person.name.split(' ');
    const initials = fullName.shift()?.charAt(0) + fullName.pop()?.charAt(0).toUpperCase();
    return (
        <Modal
            visible={visible}
            title="Person Information"
            onCancel={handleClose}
            footer={[
                <Button key="delete" type="primary" danger
                        onClick={() => handleDelete(person.id)} style={{float: 'left'}}
                        icon={<DeleteOutlined/>} size="medium"/>,
                <Button key="back" onClick={handleClose}>Back</Button>
            ]}
        >
            <div className="modal-container">
                <div className="modal-person-avatar">
                    <Avatar
                        size={64}
                        style={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                            marginBottom: 10,
                        }}
                    >
                        {initials}
                    </Avatar>
                </div>
                <p style={{marginBottom: 1}}> {person.name} </p>
                <p style={{color: '#47D48C'}}> {phone} </p>
            </div>
            <div className="divider"/>
            <div className="modal-person-details">
                <PersonDetail title="Email" description={email}/>
                <PersonDetail title="Organization" description={person.org_id?.name}/>
                <PersonDetail title="Assistant"
                              description={person[assistantHash]}/>
                <PersonDetail title="Groups"
                              description={person[groupsHash]}/>
                <PersonDetail title="Location" description={person.org_id?.address}/>
            </div>
        </Modal>
    );
};

export default PersonDetails;

