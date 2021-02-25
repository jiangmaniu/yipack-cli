module.exports = `<template>
    <div class="page-<%= page.kebabCaseName %>_<%= sub.kebabCaseName %>">
        page-<%= page.kebabCaseName %>
        sub-page-<%= sub.kebabCaseName %>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "<%= page.startCaseName %><%= sub.startCaseName %>",
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
            this.$Apis.<%= page.camelCaseName %>.sp.<%= sub.camelCaseName %>.insert().then(res => {

            }).catch(err => {

            })
        },
        // 删除
        on_delete(){
            this.$Apis.<%= page.camelCaseName %>.sp.<%= sub.camelCaseName %>.delete().then(res => {

            }).catch(err => {

            })
        },
        // 修改
        on_update(){
            this.$Apis.<%= page.camelCaseName %>.sp.<%= sub.camelCaseName %>.update().then(res => {

            }).catch(err => {

            })
        },
        // 查询
        on_select(){
            this.$Apis.<%= page.camelCaseName %>.sp.<%= sub.camelCaseName %>.select().then(res => {

            }).catch(err => {

            })
        }
    }
};
</script>

<style lang="scss" scoped>
.page-<%= page.kebabCaseName %>_<%= sub.kebabCaseName %> {
}
</style>
`;
