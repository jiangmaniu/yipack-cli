module.exports = `
export default {
    path: '<%= lowerCaseNameRoutePath %>',
    component: () => import('@src/layout/default/index.vue'),
    children: [
        {
            path: '/',
            component: () => import('@src/pages/<%= lowerCaseNameRouteBackslash %>/index.vue')
        }
    ]
};
`;
