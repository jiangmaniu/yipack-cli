module.exports = `import Vue from 'vue';
Vue.filter('<%= startCaseName %>', function (value) {
    return value;
});
`;
