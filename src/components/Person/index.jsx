import React, {useState} from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import {BsBuilding} from 'react-icons/bs';
import ModalView from "../ModalView";
import PersonDetail from "../PersonDetail";

const Person = ({person}) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const {name, org_name, phone} = person;

    const handleShowModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div className="person-box" onClick={handleShowModal}>
                <div className="person-info">
                    <p> {name} </p>
                    <p className="person-organization">
                        <BsBuilding className="org-icon"/>
                        {org_name}
                    </p>
                </div>
                <div className="person-avatar">
                    <img src="img_avatar.png" alt="avatar"/>
                </div>
                {/*    imagem da pessoa */}
            </div>

            <ModalView
                closeModal={handleCloseModal}
                visible={isModalVisible}
                title="Person Information"
            >
                <div className="modal-person-info-basic">
                    <div className="modal-person-avatar">
                        <img/>
                    </div>
                    <p> {person.name} </p>
                    <p style={{color: '#47D48C'}}> 123 </p>
                </div>

                <div className="divider"/>

                {/*<div className="modal-person-info-details">*/}
                    {/*for each detail*/}
                    <PersonDetail title="Email" description="gmail"/>
                    <PersonDetail title="Email" description="gmail"/>
                {/*</div>*/}

            </ModalView>
        </>
    );
};

Person.propTypes = {
    person: PropTypes.shape({
        name: PropTypes.string,
        org_name: PropTypes.string,
        phone: PropTypes.arrayOf({})
    }).isRequired,
};

export default Person;