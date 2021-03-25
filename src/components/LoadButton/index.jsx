import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

//todo passar função para onclick

// todo ajeitar sombra do botão

const LoadButton = ({triggerLoad}) => {
    return (
        <div className="btn-wrapper">
            <button
                onClick={triggerLoad}
                className="btn-load">
              Load more
            </button>
        </div>
    );
};

// LoadButton.propTypes = {
//     triggerLoad: PropTypes.func.isRequired,
// };

export default LoadButton;