module.exports = `export default {
    path: "sv-<%= sv.kebabCaseName %>",
    component: () => import("@src/pages/<%= page.camelCaseName %>/subViews/<%= sv.camelCaseName %>/index.vue"),
}`;
