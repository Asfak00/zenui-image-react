import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { PlaceholderTypes, EffectTypes } from '../../constants/types';
import { defaultBreakpoints, defaultImageWidths } from '../../config/defaults';
import { generateSrcSet, generateSizes } from '../../utils/imageUtils';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import Placeholder from '../Placeholder/Placeholder';

const LazyLoadImage = ({
   src,
   alt,
   className,
   style,
   onLoad,
   onError,
   offset,
   useIntersectionObserver: enableIntersectionObserver,
   optimize,
   breakpoints,
   imageWidths,
   sizes,
   quality,
   placeholderType,
   placeholderImage,
   customPlaceholder,
   effectType,
   effectAmount,
   backgroundColor,
   ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef(null);

    const mergedBreakpoints = useMemo(
        () => ({ ...defaultBreakpoints, ...breakpoints }),
        [breakpoints]
    );

    const mergedWidths = useMemo(
        () => ({ ...defaultImageWidths, ...imageWidths }),
        [imageWidths]
    );

    const isInView = useIntersectionObserver(imageRef, {
        enabled: enableIntersectionObserver,
        offset
    });

    const srcSet = useMemo(
        () => optimize ? generateSrcSet(src, mergedWidths, quality) : '',
        [src, optimize, mergedWidths, quality]
    );

    const sizeAttribute = useMemo(
        () => generateSizes(mergedBreakpoints, sizes),
        [mergedBreakpoints, sizes]
    );

    const handleImageLoad = (e) => {
        setIsLoaded(true);
        onLoad?.(e);
    };

    const handleImageError = (e) => {
        console.error('Image failed to load:', e);
        onError?.(e);
    };

    return (
        <div
            ref={imageRef}
            className={className}
            style={{
                ...style,
                position: 'relative',
                overflow: 'hidden'
            }}
            {...props}
        >
            <Placeholder
                type={placeholderType}
                isLoaded={isLoaded}
                placeholderImage={placeholderImage}
                customPlaceholder={customPlaceholder}
                effectType={effectType}
                effectAmount={effectAmount}
                backgroundColor={backgroundColor}
            />
            {isInView && (
                <img
                    src={optimize ? `${src}?w=${mergedWidths.md[0]}&q=${quality}` : src}
                    srcSet={srcSet}
                    sizes={sizeAttribute}
                    alt={alt}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out'
                    }}
                    loading="lazy"
                    decoding="async"
                />
            )}
        </div>
    );
};

LazyLoadImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    offset: PropTypes.number,
    useIntersectionObserver: PropTypes.bool,
    optimize: PropTypes.bool,
    breakpoints: PropTypes.object,
    imageWidths: PropTypes.object,
    sizes: PropTypes.string,
    quality: PropTypes.number,
    placeholderType: PropTypes.oneOf(Object.values(PlaceholderTypes)),
    placeholderImage: PropTypes.string,
    customPlaceholder: PropTypes.element,
    effectType: PropTypes.oneOf(Object.values(EffectTypes)),
    effectAmount: PropTypes.number,
    backgroundColor: PropTypes.string,
};

LazyLoadImage.defaultProps = {
    alt: '',
    className: '',
    style: {},
    onLoad: () => {},
    onError: () => {},
    offset: 0,
    useIntersectionObserver: true,
    optimize: false,
    quality: 80,
    placeholderType: PlaceholderTypes.NONE,
    effectType: EffectTypes.BLUR,
    effectAmount: 10,
};

export default LazyLoadImage;