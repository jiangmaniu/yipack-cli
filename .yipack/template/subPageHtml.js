module.exports = `<template>
    <div class="page-<%= page.kebabCaseName %>_<%= sub.kebabCaseName %>">
        <%= page.kebabCaseName %>_sub-page-<%= sub.kebabCaseName %>
    </div>
</template>

<script>
export default {
    name: "<%= page.startCaseName %><%= sub.startCaseName %>",
    data(){
        return {

        }
    },
    created(){

    },
    mounted(){

    },
    methods:{

    }
};
</script>

<style lang="scss" scoped>
// 作用域样式，不影响下级元素
.page-<%= page.kebabCaseName %>_<%= sub.kebabCaseName %> {
}
</style>
`;
