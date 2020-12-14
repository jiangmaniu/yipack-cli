module.exports = `<template>
    <div class="page-<%= page.kebabCaseName %>_<%= child.kebabCaseName %>"><%= page.kebabCaseName %>_<%= child.kebabCaseName %></div>
</template>

<script>
export default {
    name: "<%= page.startCaseName %><%= child.startCaseName %>",
};
</script>

<style lang="scss">
.page-<%= page.kebabCaseName %>_<%= child.kebabCaseName %> {
}
</style>`;
