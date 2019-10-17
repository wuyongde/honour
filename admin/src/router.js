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
      ]
    }
  ]
});
