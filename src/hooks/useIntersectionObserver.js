import { useEffect, useState } from 'react';

export const useIntersectionObserver = (ref, options) => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!options.enabled) {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: `${options.offset}px` }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [options.enabled, options.offset, ref]);

    return isInView;
};
