module.exports = `export default {
    path: "sp-<%= sub.kebabCaseName %>",
    component: () => import("@src/pages/<%= page.camelCaseName %>/subPages/<%= sub.camelCaseName %>/index.vue"),
}`;
