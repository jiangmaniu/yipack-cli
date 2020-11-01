module.exports = `export default {
    path: "/<%= kebabCaseName %>",
    component: () => import("@src/layout/default/index.vue"),
    children: [
        {
            path: "/",
            component: () => import("@src/pages/<%= camelCaseName %>/index.vue"),
        },
    ],
};`;
