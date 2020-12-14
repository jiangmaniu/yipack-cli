module.exports = `export default {
    path: "<%= child.kebabCaseName %>",
    component: () => import("@src/pages/<%= page.camelCaseName %>/children/<%= child.camelCaseName %>/index.vue"),
}`;
