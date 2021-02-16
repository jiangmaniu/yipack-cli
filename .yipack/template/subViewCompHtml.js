module.exports = `<template>
    <div class="comp-<%= page.kebabCaseName %>_<%= sub.kebabCaseName %>_<%= comp.kebabCaseName %>">
        page-<%= page.kebabCaseName %> sub-view-<%= sub.kebabCaseName %> comp-<%= comp.kebabCaseName %>
    </div>
</template>

<script>
export default {
    name: "<%= comp.startCaseName %>",
    data(){
        return {};
    },
    created(){},
    mounted(){},
    methods:{}
};
</script>

<style lang="scss" scoped>
.comp-<%= page.kebabCaseName %>_<%= sub.kebabCaseName %>_<%= comp.kebabCaseName %> {
}
</style>
`;
