module.exports = `<template>
    <div class="page-<%= kebabCaseName %>"></div>
</template>

<script>
export default {
    name: "<%= startCaseName %>",
};
</script>

<style lang="scss">
.page-<%= kebabCaseName %> {
}
</style>`;
