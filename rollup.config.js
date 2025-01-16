import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

const extensions = ['.js', '.jsx'];

// Exclude peer dependencies from the bundle
const external = [
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.dependencies || {}),
    'react/jsx-runtime'
];

// Babel configuration
const babelOptions = {
    exclude: 'node_modules/**',
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-transform-runtime'],
    babelHelpers: 'runtime',
    extensions
};

// Common plugins
const plugins = [
    resolve({ extensions }),
    commonjs(),
    babel(babelOptions),
    json()
];

export default [
    // CommonJS (for Node) and ES module (for bundlers) build
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true
            }
        ],
        plugins,
        external
    },
    // UMD build (for CDN/browser)
    {
        input: 'src/index.js',
        output: {
            name: 'ReactLazyLoadImage',
            file: 'dist/index.umd.js',
            format: 'umd',
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM'
            },
            sourcemap: true
        },
        plugins: [
            ...plugins,
            terser() // Minify UMD build
        ],
        external: ['react', 'react-dom']
    }
];