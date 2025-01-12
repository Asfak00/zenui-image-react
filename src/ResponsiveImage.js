import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageLoader from './ImageLoader';
import Placeholder from './Placeholder';

const defaultBreakpoints = {
    small: 576,
    medium: 768,
    large: 992,
    xlarge: 1200,
};

const ResponsiveImage = ({
   src,
   alt,
   placeholder,
   placeholderEffect,
   customSkeleton,
   optimize,
   breakpoints,
   onLoad,
   onError,
}) => {

    const [currentBreakpoint, setCurrentBreakpoint] = useState('large');
    const mergedBreakpoints = { ...defaultBreakpoints, ...breakpoints };

    const updateBreakpoint = () => {
        const width = window.innerWidth;
        if (width < mergedBreakpoints.small) {
            setCurrentBreakpoint('small');
        } else if (width < mergedBreakpoints.medium) {
            setCurrentBreakpoint('medium');
        } else if (width < mergedBreakpoints.large) {
            setCurrentBreakpoint('large');
        } else {
            setCurrentBreakpoint('xlarge');
        }
    };

    useEffect(() => {
        updateBreakpoint();
        window.addEventListener('resize', updateBreakpoint);
        return () => window.removeEventListener('resize', updateBreakpoint);
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <ImageLoader
                src={src}
                alt={alt}
                onLoad={onLoad}
                onError={onError}
                optimize={optimize}
                currentBreakpoint={currentBreakpoint}
            />
            <Placeholder
                placeholder={placeholder}
                placeholderEffect={placeholderEffect}
                customSkeleton={customSkeleton}
            />
        </div>
    );
};

ResponsiveImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    placeholderEffect: PropTypes.oneOf(['blur', 'opacity', 'none']),
    customSkeleton: PropTypes.element,
    optimize: PropTypes.bool,
    breakpoints: PropTypes.object,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
};

ResponsiveImage.defaultProps = {
    alt: '',
    placeholderEffect: 'none',
    customSkeleton: null,
    optimize: false,
    breakpoints: {},
    onLoad: () => {},
    onError: () => {},
};

export default ResponsiveImage;