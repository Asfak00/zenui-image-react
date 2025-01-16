# ZenUI Lazy Image React

A highly customizable, performance-focused React component for lazy loading images with advanced features like placeholder effects, image optimization, and responsive loading.

![cover image](https://i.ibb.co.com/35xc2K3/package-cover.png "cover image")

### Try it with our [Playground]()

## Features

- 🎯 **Lazy Loading**: Load images only when they enter the viewport
- 🖼 **Placeholder Support**: Multiple placeholder types while images load
- 🎨 **Effect Transitions**: Smooth transitions with blur, opacity, or color effects
- 📱 **Responsive Images**: Automatic srcset and sizes generation
- ⚡ **Performance Optimized**: Intersection Observer for efficient lazy loading
- 🛠 **Highly Customizable**: Extensive props for fine-tuning behavior
- 📦 **Lightweight**: Small bundle size.

## Installation

```bash
npm install zenui-lazy-image-react
```

## Basic Usage

```jsx
import { LazyLoadImage } from 'zenui-lazy-image-react';

function MyComponent() {
  return (
    <LazyLoadImage
      src="https://example.com/image.jpg"
      alt="Example"
      placeholderType="effect"
      effectType="blur"
    />
  );
}
```

## Advanced Features

### 1. Placeholder Types

Choose from multiple placeholder types while your image loads:

```jsx
// Effect Placeholder (blur, opacity, or color)
<LazyLoadImage
  src="image.jpg"
  placeholderType="effect"
  effectType="blur"
  effectAmount={10}
/>

// Custom Image Placeholder
<LazyLoadImage
  src="image.jpg"
  placeholderType="image"
  placeholderImage="placeholder.jpg"
/>

// Custom Component Placeholder
<LazyLoadImage
  src="image.jpg"
  placeholderType="custom"
  customPlaceholder={<MyCustomLoader />}
/>
```

### 2. Image Optimization

Enable automatic responsive image optimization:

```jsx
<LazyLoadImage
  src="image.jpg"
  optimize
  quality={80}
  breakpoints={{
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }}
  imageWidths={{
    sm: [576, 640],
    md: [768, 828],
    lg: [992, 1080],
    xl: [1200, 1280]
  }}
/>
```

### 3. Custom Loading Behavior

Control the intersection observer and loading offset:

```jsx
<LazyLoadImage
  src="image.jpg"
  useIntersectionObserver={true}
  offset={200} // Start loading 200px before entering viewport
  onLoad={() => console.log('Image loaded')}
  onError={(e) => console.error('Load failed:', e)}
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | Required | Image source URL |
| `alt` | string | `''` | Alt text for the image |
| `className` | string | `''` | CSS class name |
| `style` | object | `{}` | Inline styles |
| `placeholderType` | enum | `'none'` | Type of placeholder (`'none'`, `'effect'`, `'image'`, `'custom'`) |
| `effectType` | enum | `'blur'` | Effect type (`'blur'`, `'opacity'`, `'color'`) |
| `effectAmount` | number | `10` | Intensity of the effect |
| `placeholderImage` | string | - | URL for placeholder image |
| `customPlaceholder` | element | - | Custom React component as placeholder |
| `optimize` | boolean | `false` | Enable responsive image optimization |
| `quality` | number | `80` | Image quality (1-100) when optimize is true |
| `breakpoints` | object | - | Custom breakpoints for responsive loading |
| `imageWidths` | object | - | Width configurations for each breakpoint |
| `sizes` | string | - | Custom sizes attribute for responsive images |
| `useIntersectionObserver` | boolean | `true` | Enable/disable intersection observer |
| `offset` | number | `0` | Loading offset in pixels |
| `onLoad` | function | - | Callback when image loads |
| `onError` | function | - | Callback when image fails to load |

### Default Breakpoints

```javascript
{
  xs: 320,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}
```

### Default Image Widths

```javascript
{
  xs: [320, 375],
  sm: [576, 640],
  md: [768, 828],
  lg: [992, 1080],
  xl: [1200, 1280],
  xxl: [1400, 1536]
}
```

## Performance Tips

1. **Use WebP Format**: Provide WebP images when possible for better compression
2. **Optimize Image Dimensions**: Use appropriate image sizes for different breakpoints
3. **Enable Optimization**: Use the `optimize` prop for automatic responsive handling
4. **Adjust Loading Offset**: Set an appropriate `offset` based on your use case
5. **Choose Appropriate Quality**: Balance quality and file size with the `quality` prop

## License

MIT © Asfak Ahmed ( rahi )