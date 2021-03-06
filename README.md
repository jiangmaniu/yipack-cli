# yipack (易打包)

> 一个神奇的 vue.js 单页应用，项目开发脚手架

## 文档地址

[yipack-cli 文档](https://chensuiyi.com)

## 仓库

[gitee 仓库地址（https://gitee.com/banshiweichen/yipack-cli）](https://gitee.com/banshiweichen/yipack-cli)

[github 仓库地址（https://github.com/chenbimo/yipack-cli）](https://github.com/chenbimo/yipack-cli)

喜欢的同学请点个 star，您的支持就是我最大的动力。

## 概述

`yipack` 可以帮你快速生成项目开发骨架，不同于 `vue-cli`，`yipack` 不会给你太多选择。`yipack` 崇尚的是【约定大于配置】的开发理念，所有的一切，都已经准备好了。

## 定位

`yipack` 的定位，介于 `vue-cli` 这种没有明确的，比较自由的项目组织结构开发方式和 `vue-element-admin` 这种拿来就用，无需重头写页面代码和数据对接逻辑的项目成品之间的 vue 项目开发 `脚手架`,旨在提供规范度更高的开发方式和更为自由的代码管控工具。

## 声明

`yipack` 致力于解决中小型项目的快速开发和维护问题，大型项目请谨慎调研再做决定。

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
