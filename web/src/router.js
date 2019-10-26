import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main/Main";
import Home from './views/Home/Home'
import ArticleDetail from './views/Article/ArticleDetail'

Vue.use(Router);

export default new Router({
  mode: "history",
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
      children:[
        {path:'/Home',name:'Home',component:Home},
        {path:'/ArticleDetail/:_id',name:'ArticleDetail',component:ArticleDetail}
      ]
    }
  ]
});
