# React Lazy Load Image

A React component for lazy loading images with placeholder and effects support.

## Installation

```bash
npm install your-package-name
# or
yarn add your-package-name
```

## Features

- Lazy loading images using Intersection Observer API
- Fallback to scroll event listening
- Customizable placeholder
- Built-in placeholder effects (blur, opacity)
- Custom skeleton support
- Offset configuration for pre-loading

## Usage

```jsx
import LazyLoadImage from 'your-package-name';

function App() {
  return (
    <LazyLoadImage
      src="your-image-url.jpg"
      placeholder="placeholder-image-url.jpg"
      alt="Description"
      placeholderEffect="blur"
      offset={100}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | required | The source URL of the image |
| alt | string | '' | Alt text for the image |
| placeholder | string | '' | URL of the placeholder image |
| className | string | '' | CSS class name |
| style | object | {} | Inline styles |
| placeholderEffect | 'blur' \| 'opacity' \| 'none' | 'none' | Effect to apply to placeholder |
| customSkeleton | element | null | Custom skeleton component |
| offset | number | 0 | Offset in pixels for pre-loading |
| useIntersectionObserver | boolean | true | Use Intersection Observer API |
| scroll | boolean | false | Use scroll event instead |
| onLoad | function | () => {} | Called when image loads |
| onError | function | () => {} | Called on load error |

## License

MIT © [Your Name]