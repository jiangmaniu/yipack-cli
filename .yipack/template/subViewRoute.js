module.exports = `export default {
    path: "sv-<%= sub.kebabCaseName %>",
    component: () => import("@src/pages/<%= page.camelCaseName %>/subViews/<%= sub.camelCaseName %>/index.vue"),
}`;
