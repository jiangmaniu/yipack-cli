module.exports = `
export default {
    path: '<%= routePath %>',
    component: () => import('@src/layout/default/index.vue'),
    children: [
        {
            path: '/',
            component: () => import('@src/pages/<%= routeBackslash %>/index.vue')
        }
    ]
};
`;
