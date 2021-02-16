module.exports = `<template>
    <div class="page-<%= page.kebabCaseName %>_<%= sub.kebabCaseName %>">
        page-<%= page.kebabCaseName %> sub-view-<%= sub.kebabCaseName %>
    </div>
</template>

<script>
export default {
    name: "<%= page.startCaseName %><%= sub.startCaseName %>",
    data(){
        return {};
    },
    created(){},
    mounted(){},
    methods:{}
};
</script>

<style lang="scss" scoped>
.page-<%= page.kebabCaseName %>_<%= sub.kebabCaseName %> {
}
</style>
`;
