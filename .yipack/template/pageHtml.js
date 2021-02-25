module.exports = `<template>
    <div class="page-<%= page.kebabCaseName %>">
        <%= page.kebabCaseName %>
    </div>
</template>

<script>
export default {
    name: "<%= page.startCaseName %>",
    data(){
        return {};
    },
    created(){},
    mounted(){},
    methods:{
        // 页面初始化操作
        on_init(){

        },
        // 增加
        on_insert(){
            this.$Apis.<%= page.camelCaseName %>.insert().then(res => {

            }).catch(err => {

            })
        },
        // 删除
        on_delete(){
            this.$Apis.<%= page.camelCaseName %>.delete().then(res => {

            }).catch(err => {

            })
        },
        // 修改
        on_update(){
            this.$Apis.<%= page.camelCaseName %>.update().then(res => {

            }).catch(err => {

            })
        },
        // 查询
        on_select(){
            this.$Apis.<%= page.camelCaseName %>.select().then(res => {

            }).catch(err => {

            })
        }
    }
};
</script>

<style lang="scss" scoped>
.page-<%= page.kebabCaseName %> {
}
</style>
`;
