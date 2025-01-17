export const generateSrcSet = (src, widths, quality) => {
    const allWidths = [...new Set(
        Object.values(widths)
            .flat()
            .sort((a, b) => a - b)
    )];

    return allWidths
        .map(width => `${src}?w=${width}&q=${quality} ${width}w`)
        .join(', ');
};

export const generateSizes = (breakpoints, customSizes) => {
    if (customSizes) return customSizes;

    return Object.entries(breakpoints)
        .sort(([, a], [, b]) => b - a)
        .map(([, width], index) =>
            index === 0 ? `${width}px` : `(max-width: ${width}px) ${width}px`
        )
        .join(', ');
};

export const getOptimalImageWidth = (deviceWidth, mergedBreakpoints, mergedWidths) => {
    if (!deviceWidth || !mergedBreakpoints || !mergedWidths) {
        console.warn('Missing parameters:', { deviceWidth, mergedBreakpoints, mergedWidths });
        return 640;
    }

    try {
        const breakpointEntries = Object.entries(mergedBreakpoints)
            .sort((a, b) => b[1] - a[1]);

        for (const [breakpoint, width] of breakpointEntries) {
            if (deviceWidth >= width && mergedWidths[breakpoint]?.[0]) {
                return mergedWidths[breakpoint][0];
            }
        }

        const smallestBreakpoint = breakpointEntries[breakpointEntries.length - 1]?.[0];
        return mergedWidths[smallestBreakpoint]?.[0] || 640;
    } catch (error) {
        console.error('Error calculating optimal width:', error);
        return 640;
    }
};