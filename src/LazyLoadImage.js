import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ResponsiveImage from './ResponsiveImage';

const LazyLoadImage = ({
   src,
   alt,
   placeholder,
   className,
   style,
   onLoad,
   onError,
   placeholderEffect = 'none',
   customSkeleton,
   offset,
   useIntersectionObserver = true,
   scroll = false,
   optimize = false,
   breakpoints,
   ...props
}) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        let observer;
        if (useIntersectionObserver) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsLoaded(true);
                            observer.disconnect();
                        }
                    });
                },
                {
                    rootMargin: `${offset}px`,
                }
            );

            if (imageRef.current) {
                observer.observe(imageRef.current);
            }
        } else if (scroll) {
            const handleScroll = () => {
                if (imageRef.current) {
                    const rect = imageRef.current.getBoundingClientRect();
                    if (rect.top + offset <= window.innerHeight) {
                        setIsLoaded(true);
                        window.removeEventListener('scroll', handleScroll);
                    }
                }
            };

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
        }

        return () => {
            if (observer && observer.disconnect) {
                observer.disconnect();
            }
            if (scroll) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [useIntersectionObserver, offset, scroll]);

    return (
        <div
            ref={imageRef}
            className={className}
            style={{ ...style, position: 'relative' }}
            {...props}
        >
            {isLoaded ? (
                <ResponsiveImage
                    src={src}
                    alt={alt}
                    placeholder={placeholder}
                    placeholderEffect={placeholderEffect}
                    customSkeleton={customSkeleton}
                    optimize={optimize}
                    breakpoints={breakpoints}
                    onLoad={onLoad}
                    onError={onError}
                />
            ) : (
                <Placeholder
                    placeholder={placeholder}
                    placeholderEffect={placeholderEffect}
                    customSkeleton={customSkeleton}
                />
            )}
        </div>
    );
};

LazyLoadImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    placeholderEffect: PropTypes.oneOf(['blur', 'opacity', 'none']),
    customSkeleton: PropTypes.element,
    offset: PropTypes.number,
    useIntersectionObserver: PropTypes.bool,
    scroll: PropTypes.bool,
    optimize: PropTypes.bool,
    breakpoints: PropTypes.object,
};

LazyLoadImage.defaultProps = {
    alt: '',
    placeholder: '',
    className: '',
    style: {},
    onLoad: () => {},
    onError: () => {},
    placeholderEffect: 'none',
    customSkeleton: null,
    offset: 0,
    useIntersectionObserver: true,
    scroll: false,
    optimize: false,
    breakpoints: {},
};

export default LazyLoadImage;