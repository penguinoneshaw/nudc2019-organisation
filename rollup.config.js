const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

module.exports = {
    input: './framework/index.js',
    output: {
        file: 'public/framework.bundle.js',
        format: 'esm'
    },
    plugins: [
        resolve({}),
        production && terser({}),
        commonjs(),
        postcss({
            plugins: [],
            inject: false
        })
    ],
};
