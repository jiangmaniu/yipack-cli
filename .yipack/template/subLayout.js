module.exports = `
<template>
    <div class="sub-layout-<%= page.kebabCaseName %>_<%= options.subType %>_<%= sub.kebabCaseName %>">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'SubLayout<%= page.startCaseName %><%= options.subType %><%= sub.startCaseName %>'
};
</script>
<style lang="scss" scoped>
.sub-layout-<%= page.kebabCaseName %>_<%= options.subType %>_<%= sub.kebabCaseName %>{

}
</style>
`;
