module.exports = `
// 自动导入二级页面路由（勿动）
// =====================================================
let routeList = [];
let importAll = require.context("@src/pages/<%= camelCaseName %>/children", true, /route2\\.js$/);
importAll.keys().map((path) => {
    let router = importAll(path).default || importAll(path);
    routeList.push(router);
});
// =====================================================

export default {
    path: '/<%= kebabCaseName %>',
    component: () => import("@src/layout/default/index.vue"),
    children: [
        {
            path: '/',
            component: () => import('@src/pages/<%= camelCaseName %>/index.vue')
        },
        ...routeList
    ]
};`;
