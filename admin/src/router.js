// 路由模块
import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main";

// 引入分类组件
import CategoriesList from "./views/categories/CategoriesList";
import CategoriesEdit from "./views/categories/CategoriesEdit";

// 引入物品组件
import GoodsList from "./views/goods/GoodsList";
import GoodsEdit from "./views/goods/GoodsEdit";

// 引入英雄组件
import HerosList from "./views/heros/HerosList";
import HerosEdit from "./views/heros/HerosEdit";

// 启用路由
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/main",
      name: "main",
      component: Main,
      children: [
        // 分类管理相关路由项
        {
          path: "/categories/edit",
          name: "categoriesAdd",
          component: CategoriesEdit
        },
        {
          path: "/categories/edit/:_id",
          name: "categoriesEdit",
          component: CategoriesEdit
        },
        {
          path: "/categories/list",
          name: "categoriesList",
          component: CategoriesList
        },
        // 物品管理相关路由项
        {
          path: "/goods/edit",
          name: "goodsAdd",
          component: GoodsEdit
        },
        {
          path: "/goods/edit/:_id",
          name: "goodsEdit",
          component: GoodsEdit
        },
        {
          path: "/goods/list",
          name: "goodsList",
          component: GoodsList
        },
        // 英雄管理相关路由项
        {
          path: "/heros/edit",
          name: "herosAdd",
          component: HerosEdit
        },
        {
          path: "/heros/edit/:_id",
          name: "herosEdit",
          component: HerosEdit
        },
        {
          path: "/heros/list",
          name: "herosList",
          component: HerosList
        },
      ]
    }
  ]
});
