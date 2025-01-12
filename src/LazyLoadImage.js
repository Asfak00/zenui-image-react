import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const LazyLoadImage = ({
                           src,
                           alt,
                           placeholder,
                           className,
                           style,
                           onLoad,
                           onError,
                           placeholderEffect,
                           customSkeleton,
                           offset,
                           useIntersectionObserver,
                           scroll,
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

    const placeholderStyle = placeholderEffect === 'blur' ? { filter: 'blur(10px)' } : placeholderEffect === 'opacity' ? { opacity: 0.5 } : {};

    return (
        <div
            ref={imageRef}
            className={className}
            style={{ ...style, position: 'relative' }}
            {...props}
        >
            {isLoaded ? (
                <img src={src} alt={alt} onLoad={onLoad} onError={onError} style={{ width: '100%', height: 'auto' }} />
            ) : (
                customSkeleton ? customSkeleton : <img src={placeholder} alt="placeholder" style={{ width: '100%', height: 'auto', ...placeholderStyle }} />
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
};

export default LazyLoadImage;