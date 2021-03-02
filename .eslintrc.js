let path = require('path');
let myConfig = require('./.yipack/webpack.config.my.js');
module.exports = {
    // 找到当前目录就不往上找了
    root: true,
    parser: 'vue-eslint-parser',
    env: {
        es6: true,
        browser: true,
        node: true,
        es2017: true
    },
    parserOptions: {
        parser: path.join(myConfig.cliDir, 'node_modules', '@babel/eslint-parser'),
        ecmaVersion: 6,
        sourceType: 'module',
        // 指定babel的参数 https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser#additional-parser-configuration
        babelOptions: {
            configFile: path.join(myConfig.cliDir, 'babel.config.js')
        }
    },
    plugins: ['@babel'],
    extends: [
        //
        'plugin:vue/recommended',
        'eslint:recommended',
        'plugin:prettier/recommended'
    ],
    rules: {
        'no-unused-vars': 'off',
        'no-var': 'warn',
        eqeqeq: 'warn',
        'vue/component-tags-order': [
            'warn',
            {
                order: ['template', 'script', 'style']
            }
        ],
        'vue/html-end-tags': 'warn',
        'vue/html-self-closing': [
            'warn',
            {
                html: {
                    void: 'never',
                    normal: 'never',
                    component: 'never'
                },
                svg: 'never',
                math: 'never'
            }
        ],
        'vue/prop-name-casing': ['warn', 'camelCase'],
        'vue/require-default-prop': 'warn',
        'vue/order-in-components': [
            'warn',
            {
                order: [
                    //
                    'el',
                    'name',
                    'key',
                    'parent',
                    'functional',
                    'delimiters',
                    'comments',
                    'components',
                    'directives',
                    'filters',
                    'extends',
                    'mixins',
                    'provide',
                    'inject',
                    'ROUTER_GUARDS',
                    'layout',
                    'middleware',
                    'validate',
                    'scrollToTop',
                    'transition',
                    'loading',
                    'inheritAttrs',
                    'model',
                    'props',
                    'propsData',
                    'emits',
                    'setup',
                    'asyncData',
                    'data',
                    'fetch',
                    'head',
                    'computed',
                    'watch',
                    'watchQuery',
                    'LIFECYCLE_HOOKS',
                    'methods',
                    'template',
                    'render',
                    'renderError'
                ]
            }
        ]
    }
};
