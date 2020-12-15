module.exports = `export default {
    path: "sp-<%= sp.kebabCaseName %>",
    component: () => import("@src/pages/<%= page.camelCaseName %>/subPages/<%= sp.camelCaseName %>/index.vue"),
}`;
