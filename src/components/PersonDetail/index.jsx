import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const PersonDetail = ({title, description}) => {
    return (
        description ?
            (<div className="row">
                <div className="column title">
                    {title}
                </div>
                <div className="column description">
                    {description}
                </div>
            </div>) : null
    );
};

PersonDetail.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

export default PersonDetail;