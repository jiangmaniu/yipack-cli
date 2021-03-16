module.exports = `
<template>
    <<%= aliasNames.tag %> class="comp-<%= names.lowerCaseName %>">
        comp-<%= names.lowerCaseName %>
    </<%= aliasNames.tag %>>
</template>

<script>
export default {
    name: "<%= names.startCaseName %>",
    data(){
        return {};
    },
    created(){
        this.on_init();
    },
    mounted(){},
    methods:{
        // 页面初始化操作
        on_init(){}
    }
};
</script>

<style lang="scss" scoped>
.comp-<%= names.lowerCaseName %> {
}
</style>
`;
