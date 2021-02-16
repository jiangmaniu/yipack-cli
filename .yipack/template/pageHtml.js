module.exports = `<template>
    <div class="page-<%= kebabCaseName %>">
        <%= kebabCaseName %>
    </div>
</template>

<script>
export default {
    name: "<%= startCaseName %>",
    data(){
        return {};
    },
    created(){},
    mounted(){},
    methods:{}
};
</script>

<style lang="scss" scoped>
.page-<%= kebabCaseName %> {
}
</style>
`;
