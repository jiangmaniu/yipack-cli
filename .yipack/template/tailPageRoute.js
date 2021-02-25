module.exports = `export default {
    path: "tp-<%= tail.kebabCaseName %>",
    component: () => import("@src/pages/<%= page.camelCaseName %>/<%= subType %>/<%= sub.camelCaseName %>/tailPages/<%= tail.camelCaseName %>/index.vue"),
}`;
