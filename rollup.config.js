import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

import {
    preprocess,
    createEnv,
    readConfigFile,
} from '@pyoner/svelte-ts-preprocess'

const production = !process.env.ROLLUP_WATCH

const env = createEnv()
const compilerOptions = readConfigFile(env)
const opts = {
    env,
    compilerOptions: {
        ...compilerOptions,
        allowNonTsExtensions: true,
    },
}

export default {
    input: 'src/main.ts',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js',
    },
    plugins: [
        svelte({
            dev: !production,
            css: css => {
                css.write('public/build/bundle.css')
            },
            preprocess: preprocess(opts),
            onwarn: (warning, handler) => {
                if ((warning.code = 'a11y-missing-attribute')) return
                handler(warning)
            },
        }),
        resolve({
            browser: true,
            dedupe: importee =>
                importee === 'svelte' || importee.startsWith('svelte/'),
        }),
        commonjs(),
        typescript(),
        !production && serve(),
        !production && livereload('public'),
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
}

function serve() {
    let started = false

    return {
        writeBundle() {
            if (!started) {
                started = true

                require('child_process').spawn(
                    'npm',
                    ['run', 'start', '--', '--dev'],
                    {
                        stdio: ['ignore', 'inherit', 'inherit'],
                        shell: true,
                    }
                )
            }
        },
    }
}
