import React from 'react';
import PropTypes from 'prop-types';
import { PlaceholderTypes, EffectTypes } from '../../constants/types';
import { baseStyles, getEffectStyles } from './styles';

const Placeholder = ({
   type,
   isLoaded,
   placeholderImage,
   customPlaceholder,
   effectType,
   effectAmount,
   backgroundColor
}) => {
    if (isLoaded) return null;

    switch (type) {
        case PlaceholderTypes.IMAGE:
            if (!placeholderImage) return null;
            return (
                <img
                    src={placeholderImage}
                    alt="loading placeholder"
                    style={baseStyles}
                />
            );

        case PlaceholderTypes.CUSTOM:
            if (!customPlaceholder) return null;
            return (
                <div style={baseStyles}>
                    {customPlaceholder}
                </div>
            );

        case PlaceholderTypes.EFFECT:
            return (
                <div
                    style={{
                        ...baseStyles,
                        ...getEffectStyles(effectType, effectAmount, backgroundColor)
                    }}
                />
            );

        default:
            return null;
    }
};

Placeholder.propTypes = {
    type: PropTypes.oneOf(Object.values(PlaceholderTypes)).isRequired,
    isLoaded: PropTypes.bool.isRequired,
    placeholderImage: PropTypes.string,
    customPlaceholder: PropTypes.element,
    effectType: PropTypes.oneOf(Object.values(EffectTypes)),
    effectAmount: PropTypes.number,
    backgroundColor: PropTypes.string,
};

export default Placeholder;