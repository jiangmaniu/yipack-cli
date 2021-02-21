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
    created(){
        this.on_init();
    },
    mounted(){},
    methods:{
        // 页面初始化操作
        on_init(){

        }
    }
};
</script>

<style lang="scss" scoped>
.comp-<%= kebabCaseName %> {
}
</style>
`;
