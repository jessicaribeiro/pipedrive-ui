import React, {useState} from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import ModalView from "../ModalView";
import PersonDetail from "../PersonDetail";
import {SortableElement} from 'react-sortable-hoc';
import {BsBuilding} from 'react-icons/bs';
import { Avatar, Image } from 'antd';

const Person = ({person}) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [personDetails, setPersonDetails] = useState(null);
    const [error, setError] = useState(null);

    const {id, name, org_id, phone, email} = person;

    const fullName = name.split(' ');
    const initials = fullName.shift()?.charAt(0) + fullName.pop()?.charAt(0).toUpperCase();




    const handleClose = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        getPersonDetails(id);
        setIsModalVisible(true);
    };


    const getPersonDetails = (personId) => {
        setIsLoading(true);

        const token = 'c3e6b60ccb63ae0250796d80b091545351776f0b';
        const endpoint = `persons/${personId}`;
        const url = `https://api.pipedrive.com/v1/${endpoint}?api_token=${token}`;

        const requestOptions = {
            method: 'GET',
            headers: {"Accept": "application/json"},
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(data => {
                setPersonDetails(data.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
                setError(err);
                setIsLoading(false);
            })
    };




    if (isLoading) {
        return null;
    }

    return (
        <>
            <div key={id} >
                <div className="person-box" onClick={showModal}>
                    <div className="person-info">
                        <p> {name} </p>
                        <p className="person-organization">
                            <BsBuilding className="org-icon"/>
                            {org_id.name}
                        </p>
                    </div>
                    {/*<div className="person-avatar">*/}
                        <Avatar
                            style={{
                                color: '#f56a00',
                                backgroundColor: '#fde3cf',
                            }}
                        >
                            {initials}
                        </Avatar>
                    {/*</div>*/}
                    {/*    imagem da pessoa */}
                </div>
                {/*<p>{person.name}</p>*/}
            </div>

            {/*{isModalVisible &&*/}
            {/*<ModalView visible={isModalVisible} handleClose={handleClose} title="Person Information" personId={id} handleDelete={deletePerson}>*/}
            {/*    <div className="modal-person-info-basic">*/}
            {/*        <div className="modal-person-avatar">*/}
            {/*            <Avatar*/}
            {/*                style={{*/}
            {/*                    color: '#f56a00',*/}
            {/*                    backgroundColor: '#fde3cf',*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                {initials}*/}
            {/*            </Avatar>*/}
            {/*        </div>*/}
            {/*        <p> {person.name} </p>*/}
            {/*        <p style={{color: '#47D48C'}}> {phone[0].value} </p>*/}
            {/*    </div>*/}
            {/*    <div className="divider"/>*/}
            {/*    <PersonDetail title="Email" description={email[0].value}/>*/}
            {/*    <PersonDetail title="Organization" description={org_id.name}/>*/}
            {/*    <PersonDetail title="Assistant"*/}
            {/*                  description={personDetails[assistantHash]}/>*/}
            {/*    <PersonDetail title="Groups"*/}
            {/*                  description={personDetails[groupsHash]}/>*/}
            {/*    <PersonDetail title="Location" description={org_id.address}/>*/}

            {/*</ModalView>*/}
            {/*}*/}
        </>

    )
};

// Person.propTypes = {
//     person: PropTypes.shape({
//         name: PropTypes.string,
//         org_name: PropTypes.string,
//         phone: PropTypes.array,
//     }).isRequired,
// };

export default Person;
// export default SortableElement(Person);