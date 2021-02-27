module.exports = `export default {
    path: "tv-<%= tail.kebabCaseName %>",
    component: () => import("@src/pages/<%= page.camelCaseName %>/<%= options.subType %>/<%= sub.camelCaseName %>/tailViews/<%= tail.camelCaseName %>/index.vue"),
}`;
