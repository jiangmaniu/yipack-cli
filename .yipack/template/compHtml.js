module.exports = `<template>
    <div class="comp-<%= kebabCaseName %>">
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
.comp-<%= kebabCaseName %> {
}
</style>
`;
