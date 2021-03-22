import React from 'react';
import './styles.css';
import {BsX} from 'react-icons/bs';

const ModalView = ({visible, closeModal, children, title}) => {

    //todo fazer transições no modal
    return (
        visible && (
            <div className={`modal ${visible ? 'show' : ''} `}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title"> {title} </h4>
                        <BsX className="modal-close-btn"/>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button className="modal-back-btn" onClick={closeModal}> Back
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default ModalView;