module.exports = `<template>
    <div class="page-<%= page.kebabCaseName %>_<%= sv.kebabCaseName %>"><%= page.kebabCaseName %>_sub-view-<%= sv.kebabCaseName %></div>
</template>

<script>
export default {
    name: "<%= page.startCaseName %><%= sv.startCaseName %>",
};
</script>

<style lang="scss">
.page-<%= page.kebabCaseName %>_<%= sv.kebabCaseName %> {
}
</style>`;
