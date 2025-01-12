import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ImageLoader = ({ src, alt, onLoad, onError, optimize, currentBreakpoint }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        if (imageRef.current.complete) {
            setIsLoaded(true);
        }
    }, []);

    const handleLoad = (event) => {
        setIsLoaded(true);
        onLoad(event);
    };

    const optimizedSrc = optimize ? `${src}?size=${currentBreakpoint}` : src;

    return (
        <img
            ref={imageRef}
            src={optimizedSrc}
            alt={alt}
            onLoad={handleLoad}
            onError={onError}
            style={{ width: '100%', height: 'auto' }}
            className={isLoaded ? 'loaded' : 'loading'}
        />
    );
};

ImageLoader.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    optimize: PropTypes.bool,
    currentBreakpoint: PropTypes.string,
};

ImageLoader.defaultProps = {
    alt: '',
    onLoad: () => {},
    onError: () => {},
    optimize: false,
    currentBreakpoint: 'large',
};

export default ImageLoader;