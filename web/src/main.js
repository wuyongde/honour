import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入通用样式
import "./assets/styles/reset.scss";
import "./assets/styles/common.scss";

// 引入阿里字体图标
import './assets/ali-icons/iconfont.css'

// 全局引入并启用vue-awesome-swiper插件
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css"; //swiper样式，必须
Vue.use(VueAwesomeSwiper /* { default global options } */);


// 全局引入卡片组件Card--
import Card from './components/Card'
Vue.component('my-card',Card)
import CardItem from './components/CardItem'
Vue.component('my-card-item',CardItem)



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
