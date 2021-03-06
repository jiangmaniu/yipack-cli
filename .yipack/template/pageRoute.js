module.exports = `
export default {
    path: '<%= route %>',
    component: () => import('@src/layout/default/index.vue'),
    children: [
        {
            path: '/',
            component: () => import('@src/pages/<%= relativePath %>/index.vue')
        }
    ]
};
`;
