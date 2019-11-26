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

// 引入文章组件
import ArticlesList from "./views/articles/ArticlesList";
import ArticlesEdit from "./views/articles/ArticlesEdit";

// 引入广告位组件
import AdvertsList from "./views/adverts/AdvertsList";
import AdvertsEdit from "./views/adverts/AdvertsEdit";

// 引入管理员组件
import AdminUsersList from "./views/adminUsers/AdminUsersList";
import AdminUsersEdit from "./views/adminUsers/AdminUsersEdit";

// 引入用户登录组件
import Login from "./views/login/Login";

// 引入视频组件
import VideosList from "./views/videos/VideosList";
import VideosEdit from "./views/videos/VideosEdit";

// 启用路由
Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/Login",
      name: "Login",
      component: Login,
      meta: {
        isPublic: true //定义此路由页面是可以公开访问，而无需校验token的
      }
    },
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
          component: CategoriesEdit,
          props:true
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
          component: GoodsEdit,
          props:true
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
          component: HerosEdit,
          props:true
        },
        {
          path: "/heros/list",
          name: "herosList",
          component: HerosList
        },
        // 文章管理相关路由项
        {
          path: "/articles/edit",
          name: "articlesAdd",
          component: ArticlesEdit
        },
        {
          path: "/articles/edit/:_id",
          name: "articlesEdit",
          component: ArticlesEdit,
          props:true
        },
        {
          path: "/articles/list",
          name: "articlesList",
          component: ArticlesList
        },
        // 广告位管理相关路由项
        {
          path: "/adverts/edit",
          name: "advertsAdd",
          component: AdvertsEdit
        },
        {
          path: "/adverts/edit/:_id",
          name: "advertsEdit",
          component: AdvertsEdit,
          props:true
        },
        {
          path: "/adverts/list",
          name: "advertsList",
          component: AdvertsList
        },
        // 管理员管理相关路由项
        {
          path: "/adminUsers/edit",
          name: "adminUsersAdd",
          component: AdminUsersEdit
        },
        {
          path: "/adminUsers/edit/:_id",
          name: "adminUsersEdit",
          component: AdminUsersEdit,
          props:true        //props:true，表示path上的参数可映射到props；这样可避免组件上通过this.$route.params._id去获取数据--太麻烦！
        },
        {
          path: "/adminUsers/list",
          name: "adminUsersList",
          component: AdminUsersList
        },
        // 视频管理相关路由项
        {
          path: "/videos/edit",
          name: "videosAdd",
          component: VideosEdit
        },
        {
          path: "/videos/edit/:_id",
          name: "videosEdit",
          component: VideosEdit,
          props:true
        },
        {
          path: "/videos/list",
          name: "videosList",
          component: VideosList
        }
      ]
    }
  ]
});
