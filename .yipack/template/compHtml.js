module.exports = `<template>
    <div class="comp-<%= kebabCaseName %>">
        <%= kebabCaseName %>
    </div>
</template>

<script>
export default {
    name: "<%= startCaseName %>",
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
.comp-<%= kebabCaseName %> {
}
</style>
`;
