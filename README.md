# yipack (易打包)

> 一个神奇的项目开发脚手架，一个强大的 yipack 生态。

## 文档地址

[yipack-cli 文档](https://yipack-cli.com)

## 仓库

| 项目代号           | 项目名称                | github 仓库地址                                               | gitee 仓库地址                                                   |
| ------------------ | ----------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| yipack-cli 脚手架  | yipack-cli              | [github](https://github.com/chenbimo/yipack-cli)              | [gitee](https://gitee.com/banshiweichen/yipack-cli)              |
| web 项目初始化模板 | yipack-template-init    | [github](https://github.com/chenbimo/yipack-template-init)    | [gitee](https://gitee.com/banshiweichen/yipack-template-init)    |
| web 后台管理模板   | yipack-template-admin   | [github](https://github.com/chenbimo/yipack-template-admin)   | [gitee](https://gitee.com/banshiweichen/yipack-template-admin)   |
| web 博客模板       | yipack-template-blog    | [github](https://github.com/chenbimo/yipack-template-blog)    | [gitee](https://gitee.com/banshiweichen/yipack-template-blog)    |
| uniapp 项目模板    | yipack-template-uniapp  | [github](https://github.com/chenbimo/yipack-template-uniapp)  | [gitee](https://gitee.com/banshiweichen/yipack-template-uniapp)  |
| uniapp 项目插件    | yipack-plugin-uniapp    | [github](https://github.com/chenbimo/yipack-template-uniapp)  | [gitee](https://gitee.com/banshiweichen/yipack-template-uniapp)  |
| phalapi 接口模板   | yipack-template-phalapi | [github](https://github.com/chenbimo/yipack-template-phalapi) | [gitee](https://gitee.com/banshiweichen/yipack-template-phalapi) |
| utils 项目工具函数 | yipack-plugin-utils     | [github](https://github.com/chenbimo/yipack-template-utils)   | [gitee](https://gitee.com/banshiweichen/yipack-template-utils)   |

喜欢的同学请点个 star，您的支持就是我最大的动力。

## 概述

`yipack` 是一个以 `yipack-cli` 脚手架为核心驱动的快速、便捷，强大的软件项目开发生态。

## 定位

`yipack` 致力于提高中小企业、外包公司、软件工作室/团队、个人接单的开发效率，稳定性和可维护性。

## 声明

`yipack` 致力于解决中小型项目的快速开发和维护问题，大型项目请谨慎调研再做决定！！！

## 特性

-   约定大于配置，尽量减少选择，提高开发效率、团队合作效率、后期维护效率
-   路由、组件、插件等全面自动加载，免除手动导入
-   命令式一键生成页面和组件相关的文件，无需繁琐且容易出错的手动创建
-   默认多实例`ajax`请求封装，满足多个接口服务器需求，横向扩展更方便
-   精心优化的`webpack`配置，编译项目更快，更高，更强，比`vue-cli`搭建同类型项目编译时间快 10 倍
-   自带编译后打包模块分析选项，可快速直观排查发布项目打包问题
-   项目只需安装`vue`,`vue-router`,`vuex`等项目依赖模块，无需引入 webpack babel 等开发依赖，项目安装启动更快速
-   解决了 vue-cli 二级目录部署相关的一系列问题

## 功能

-   [x] 路由自动导入
-   [x] 全局组件自动导入
-   [x] JavaScript 可选链，双问号语法
-   [x] yipack.config.js 配置文件
-   [x] 多环境编译方案 env
-   [x] 浏览器 css 默认重置
-   [x] 默认浏览器本地存储方案 basil
-   [x] 默认配置淘宝镜像地址
-   [x] 子页面、子视图（已废弃，使用目录结构的路由）
-   [x] 插件和插件自动导入
-   [x] eslint 规范
-   [x] git 提交代码格式化
-   [ ] 提供 nodejs 版本切换功能
-   [x] 页面级组件功能
-   [ ] 保留函数的顶层 that
-   [ ] 设置参数，控制是否 build 去除 console
-   [x] 设置常量文件
-   [ ] rename 命令（完成 50%）
-   [ ] format 命令（排序 vue 组件的生命周期和属性）
-   [x] 页面级接口和通用接口文件 apis
-   [ ] 基于 element-ui 定制 ypack-ui 框架
-   [x] 统一 404 跳转问题
-   [x] 国际化方案和国际化自动导入
-   [ ] yipack vscode 插件
-   [ ] 更换主题
-   [ ] 实现 yipack update 命令，更新项目结构等
-   [x] 项目模板的 commit 标准化
-   [x] css 模块化方案 (采用双层 style 方案)
-   [ ] css 验证检查方案
-   [ ] 多页面方案
-   [ ] 自动化测试
-   [x] 默认提供 path 模块（path-browserify）
-   [x] build 输出美化
-   [ ] 进一步优化打包输出文件
-   [ ] yipack readme 命令，一键生成说明文档
-   [ ] yipack-lib 工具库
-   [ ] 通过摇树可以把 yipack-cli 所有依赖摇出来变成一个库吗？

## 社区

项目相关讨论交流，请添加作者微信 `c91374286` 入群。

## 捐赠

本项目完全开源，用爱发电。如有公司想进行赞助合作并进行广告曝光，请添加作者微信 `c91374286` 详谈。

如本项目对同学们的开发和公司的业务开发有帮助，想对作者进行捐助，支持本项目创作的，请添加作者微信 `c91374286` 或扫下方二维码。

## 支付宝收款码

![支付宝](https://chensuiyi-com-1251319172.cos.ap-guangzhou.myqcloud.com/alipay2.png)

## 微信收款码

![微信](https://chensuiyi-com-1251319172.cos.ap-guangzhou.myqcloud.com/wechat2.png)

## 捐赠列表

感谢大家对 yipack 开源项目的支持！

| 捐赠者               | 捐赠金额 |
| -------------------- | -------- |
| 音乐符号             | 1 元     |
| Rs                   | 1 元     |
| Taloys（三维可视化） | 68 元    |
