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