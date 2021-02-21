module.exports = `<template>
    <div class="comp-<%= page.kebabCaseName %>_<%= sub.kebabCaseName %>_<%= comp.kebabCaseName %>">
        page-<%= page.kebabCaseName %> sub-page-<%= sub.kebabCaseName %> comp-<%= comp.kebabCaseName %>
    </div>
</template>

<script>
export default {
    name: "<%= comp.startCaseName %>",
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
.comp-<%= page.kebabCaseName %>_<%= sub.kebabCaseName %>_<%= comp.kebabCaseName %> {
}
</style>
`;
