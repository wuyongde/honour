import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main/Main";
import Home from "./views/Home/Home";
import ArticleDetail from "./views/Article/ArticleDetail";
import VideoDetail from "./views/Video/VideoDetail";
import HeroDetail from "./views/Hero/HeroDetail";


Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/Home"
    },
    {
      path: "/Main",
      name: "Main",
      component: Main,
      children: [
        { path: "/Home", name: "Home", component: Home },
        {
          path: "/ArticleDetail/:_id",
          name: "ArticleDetail",
          component: ArticleDetail
        },
        {
          path: "/VideoDetail/:_id",
          name: "VideoDetail",
          component: VideoDetail,
          props:true
        },
      ]
    },
    {
      path: "/HeroDetail/:_id",
      name: "HeroDetail",
      component: HeroDetail,
      props: true
    }
  ]
});
