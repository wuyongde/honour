// 入口js
import Vue from "vue";
import App from "./App.vue"; //引根组件
import router from "./router"; //引路由
import store from "./store"; //引状态管理
import "./plugins/element.js";

// 引入通用样式
import "./assets/css/common.scss";

// 引入axios实例并添加到Vue原型中
import http from "./http";
Vue.prototype.$http = http;

Vue.config.productionTip = false;

// 使用mixin  ---谨慎使用，这里用全局的话会影响后面所有的组件及子组件（包括第三方组件），这里只是演示
Vue.mixin({
  computed: {
    fileUploadAction() {
      //文件上传时的目标地址
      return http.defaults.baseURL + "/uploads";
    },
    addHeaders() {
      //文件上传时加headers
      return { Authorization: localStorage.getItem("token") };
    }
  },
  methods: {}
});

// 创建Vue根实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
