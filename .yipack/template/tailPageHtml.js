module.exports = `<template>
    <div class="page-<%= page.kebabCaseName %>_<%= sub.kebabCaseName %>_<%= tail.kebabCaseName %>">
        page-<%= page.kebabCaseName %>
        sub-page-<%= sub.kebabCaseName %>
        tail-page-<%= tail.kebabCaseName %>
    </div>
</template>

<script>
export default {
    name: "<%= page.startCaseName %><%= sub.startCaseName %><%= tail.startCaseName %>",
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

        },
        // 增加
        on_insert(){
            this.$Apis.<%= page.camelCaseName %>.<%= options.subType %>.<%= sub.camelCaseName %>.tp.<%= tail.camelCaseName %>.insert().then(res => {

            }).catch(err => {

            })
        },
        // 删除
        on_delete(){
            this.$Apis.<%= page.camelCaseName %>.<%= options.subType %>.<%= sub.camelCaseName %>.tp.<%= tail.camelCaseName %>.delete().then(res => {

            }).catch(err => {

            })
        },
        // 修改
        on_update(){
            this.$Apis.<%= page.camelCaseName %>.<%= options.subType %>.<%= sub.camelCaseName %>.tp.<%= tail.camelCaseName %>.update().then(res => {

            }).catch(err => {

            })
        },
        // 查询
        on_select(){
            this.$Apis.<%= page.camelCaseName %>.<%= options.subType %>.<%= sub.camelCaseName %>.tp.<%= tail.camelCaseName %>.select().then(res => {

            }).catch(err => {

            })
        }
    }
};
</script>

<style lang="scss" scoped>
.page-<%= page.kebabCaseName %>_<%= sub.kebabCaseName %>_<%= tail.kebabCaseName %> {
}
</style>
`;
