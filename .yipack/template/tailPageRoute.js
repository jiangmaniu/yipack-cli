module.exports = `export default {
    path: "tp-<%= tail.kebabCaseName %>",
    component: () => import("@src/pages/<%= page.camelCaseName %>/<%= options.subName %>/<%= sub.camelCaseName %>/tailPages/<%= tail.camelCaseName %>/index.vue"),
}`;
