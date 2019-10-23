import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main/Main";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/Main"
    },
    {
      path: "/Main",
      name: "Main",
      component: Main
    }
  ]
});
