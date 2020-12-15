module.exports = `<template>
    <div class="comp-<%= kebabCaseName %>"><%= kebabCaseName %></div>
</template>

<script>
export default {
    name: "<%= startCaseName %>",
};
</script>

<style lang="scss">
.comp-<%= kebabCaseName %> {
}
</style>`;
