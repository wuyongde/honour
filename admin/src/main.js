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
  methods: {
    // 图标或头像上传前的handler
    beforeAvatarUpload(file) {
      const isFileTypeOk = /^image\/(jpeg|jpg|png)$/i.test(file.type);
      const isFileSizeOk = file.size / 1024 < 100;

      if (!isFileTypeOk) {
        this.$message.error("上传头像或图标只能是 jpeg|jpg|png 格式!");
      }
      if (!isFileSizeOk) {
        this.$message.error("上传头像或图标大小不能超过 100KB!");
      }
      return isFileTypeOk && isFileSizeOk;
    },
    // 背景图或一般图片上传前的handler
    beforeImageUpload(file) {
      const isFileTypeOk = /^image\/(jpeg|jpg|png)$/i.test(file.type);
      const isFileSizeOk = file.size / 1024 / 1024 < 2;

      if (!isFileTypeOk) {
        this.$message.error("上传图片只能是 jpeg|jpg|png 格式!");
      }
      if (!isFileSizeOk) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isFileTypeOk && isFileSizeOk;
    },
    // 视频上传前的handler
    beforeVideoUpload(file) {
      const isFileTypeOk = /^video\/mp4$/i.test(file.type);
      const isFileSizeOk = file.size / 1024 / 1024 < 20;

      if (!isFileTypeOk) {
        this.$message.error("上传视频只能是 mp4 格式!");
      }
      if (!isFileSizeOk) {
        this.$message.error("上传视频大小不能超过 20MB!");
      }
      return isFileTypeOk && isFileSizeOk;
    },
    // 文件上传失败的handler
    errorUpload(err) {
      this.$message({
        type: "error",
        message: `文件上传失败，请重新上传 (错误代码：${err.status})`
      });
    }
  }
});

// 创建Vue根实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
