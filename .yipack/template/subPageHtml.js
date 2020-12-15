module.exports = `<template>
    <div class="page-<%= page.kebabCaseName %>_<%= sp.kebabCaseName %>"><%= page.kebabCaseName %>_sub-page-<%= sp.kebabCaseName %></div>
</template>

<script>
export default {
    name: "<%= page.startCaseName %><%= sp.startCaseName %>",
};
</script>

<style lang="scss">
.page-<%= page.kebabCaseName %>_<%= sp.kebabCaseName %> {
}
</style>`;
