import { EffectTypes } from '../../constants/types';

export const baseStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

export const getEffectStyles = (effectType, effectAmount, backgroundColor) => {
    switch (effectType) {
        case EffectTypes.BLUR:
            return {
                filter: `blur(${effectAmount}px)`,
                transform: 'scale(1.1)'
            };
        case EffectTypes.OPACITY:
            return {
                opacity: effectAmount
            };
        case EffectTypes.COLOR:
            return {
                backgroundColor: backgroundColor || '#f0f0f0'
            };
        default:
            return {};
    }
};
