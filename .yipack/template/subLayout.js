module.exports = `
<template>
    <div class="sub-layout-<%= page.kebabCaseName %>_<%= subType %>_<%= sub.kebabCaseName %>">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'SubLayout<%= page.startCaseName %><%= subType %><%= sub.startCaseName %>'
};
</script>
<style lang="scss" scoped>
.sub-layout-<%= page.kebabCaseName %>_<%= subType %>_<%= sub.kebabCaseName %>{

}
</style>

`;
