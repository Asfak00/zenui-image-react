# ZenUI Lazy Image React

A React component for lazy loading optimized responsive images with placeholder and effects support.

## Installation

You can install the package using npm:

```sh
npm install zenui-lazy-image-react
```

## Features

- Lazy loading images using Intersection Observer API
- Fallback to scroll event listening
- Customizable placeholder
- Built-in placeholder effects (blur, opacity)
- Custom skeleton support
- Offset configuration for pre-loading
- Image optimization based on breakpoints
- Responsive images with custom breakpoints

## Usage

Here's a basic usage example of the `LazyLoadImage` component:

```jsx
import React from 'react';
import LazyLoadImage from 'zenui-lazy-image-react';

function App() {
  return (
    <LazyLoadImage
      src="your-image-url.jpg"
      placeholder="placeholder-image-url.jpg"
      alt="Description"
      placeholderEffect="blur"
      offset={100}
      optimize={true}
      breakpoints={{ small: 480, medium: 768, large: 1024 }}
    />
  );
}

export default App;
```

## Props

| Prop                     | Type                              | Default | Description                                      |
|--------------------------|-----------------------------------|---------|--------------------------------------------------|
| `src`                    | `string`                          | required| The source URL of the image                      |
| `alt`                    | `string`                          | ''      | Alt text for the image                           |
| `placeholder`            | `string`                          | ''      | URL of the placeholder image                     |
| `className`              | `string`                          | ''      | CSS class name (also tailwind classes supported) |
| `style`                  | `object`                          | {}      | Inline styles                                    |
| `placeholderEffect`      | `'blur' \| 'opacity' \| 'none'`   | 'none'  | Effect to apply to placeholder                   |
| `customSkeleton`         | `element`                         | null    | Custom skeleton component                        |
| `offset`                 | `number`                          | 0       | Offset in pixels for pre-loading                 |
| `useIntersectionObserver`| `boolean`                         | true    | Use Intersection Observer API                    |
| `scroll`                 | `boolean`                         | false   | Use scroll event instead                         |
| `onLoad`                 | `function`                        | () => {}| Called when image loads                          |
| `onError`                | `function`                        | () => {}| Called on load error                             |
| `optimize`               | `boolean`                         | false   | Optimize image loading based on breakpoints      |
| `breakpoints`            | `object`                          | {}      | Custom breakpoints for responsive images         |

### Prop Descriptions

- **`src`**: The URL of the image to be loaded. This prop is required.
- **`alt`**: The alt text for the image.
- **`placeholder`**: The URL of the placeholder image to display while the main image is loading.
- **`className`**: A CSS class name to apply to the image container. you can write here tailwind classes.
- **`style`**: Inline styles to apply to the image container.
- **`placeholderEffect`**: The effect to apply to the placeholder image. Can be `'blur'`, `'opacity'`, or `'none'`.
- **`customSkeleton`**: A custom skeleton component to display while the main image is loading.
- **`offset`**: The offset in pixels to start loading the image before it enters the viewport.
- **`useIntersectionObserver`**: Whether to use the Intersection Observer API for lazy loading. Defaults to `true`.
- **`scroll`**: Whether to use the scroll event for lazy loading. Defaults to `false`.
- **`onLoad`**: A callback function to be called when the main image loads successfully.
- **`onError`**: A callback function to be called if there is an error loading the main image.
- **`optimize`**: Whether to optimize image loading based on breakpoints. Defaults to `false`.
- **`breakpoints`**: Custom breakpoints for responsive images. For example: `{ small: 480, medium: 768, large: 1024 }`.

### Example with All Props

Here's an example demonstrating the use of all props:

```jsx
import React from 'react';
import LazyLoadImage from 'zenui-lazy-image-react';

function App() {
  const handleImageLoad = () => {
    console.log('Image loaded');
  };

  const handleImageError = () => {
    console.log('Failed to load image');
  };

  return (
    <LazyLoadImage
      src="your-image-url.jpg"
      alt="Description"
      placeholder="placeholder-image-url.jpg"
      className="custom-class"
      style={{ borderRadius: '8px' }}
      placeholderEffect="blur"
      customSkeleton={<div className="skeleton-loader">Loading...</div>}
      offset={100}
      useIntersectionObserver={true}
      scroll={false}
      onLoad={handleImageLoad}
      onError={handleImageError}
      optimize={true}
      breakpoints={{ small: 480, medium: 768, large: 1024 }}
    />
  );
}

export default App;
```

## Advanced Features

### Image Optimization

By setting the `optimize` prop to `true`, the component will load different image versions based on the current breakpoint. This helps in reducing the loading time and improving performance.

```jsx
<LazyLoadImage
  src="your-image-url.jpg"
  placeholder="placeholder-image-url.jpg"
  alt="Description"
  optimize={true}
  breakpoints={{ small: 480, medium: 768, large: 1024 }}
/>
```

### Responsive Images with Custom Breakpoints

You can provide custom breakpoints using the `breakpoints` prop. The component will automatically adjust the image source based on these breakpoints.

```jsx
<LazyLoadImage
  src="your-image-url.jpg"
  placeholder="placeholder-image-url.jpg"
  alt="Description"
  breakpoints={{ small: 480, medium: 768, large: 1024, xlarge: 1200 }}
/>
```

## License

MIT © Asfak00