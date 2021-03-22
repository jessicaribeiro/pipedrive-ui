import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const PersonDetail = ({title, description}) => {
    return (
        <div className="row">
            <div className="column title">
                {title}
            </div>
            <div className="column description">
                {description}
            </div>
        </div>
    );
};

// ou entao passar o objecto todo
PersonDetail.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default PersonDetail;