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
        parser: 'babel-eslint',
        ecmaVersion: 6,
        sourceType: 'module'
    },
    extends: [
        //
        'plugin:vue/recommended',
        'eslint:recommended',
        'prettier',
        'prettier/vue'
    ],
    rules: {
        'no-unused-vars': 'off',
        'no-var': 'warn',
        eqeqeq: 'warn'
    }
};
