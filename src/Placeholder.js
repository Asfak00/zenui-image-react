import React from 'react';
import PropTypes from 'prop-types';

const Placeholder = ({ placeholder, placeholderEffect, customSkeleton }) => {
    const placeholderStyle = placeholderEffect === 'blur' ? { filter: 'blur(10px)' } : placeholderEffect === 'opacity' ? { opacity: 0.5 } : {};

    return (
        customSkeleton ? (
            customSkeleton
        ) : (
            <img src={placeholder} alt="placeholder" style={{ width: '100%', height: 'auto', ...placeholderStyle }} />
        )
    );
};

Placeholder.propTypes = {
    placeholder: PropTypes.string.isRequired,
    placeholderEffect: PropTypes.oneOf(['blur', 'opacity', 'none']),
    customSkeleton: PropTypes.element,
};

Placeholder.defaultProps = {
    placeholderEffect: 'none',
    customSkeleton: null,
};

export default Placeholder;