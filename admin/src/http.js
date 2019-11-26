// axios模块
import axios from "axios";

// 引Vue
import Vue from "vue";

// 引入router
import router from "./router";

import { baseURL } from "./plugins/config";

// 创建一个axios实例
const http = axios.create({
  baseURL: baseURL,
  timeout: 1000
});

// 配置路由导航卫士---全局前置卫士 (处理前端路由)
router.beforeEach(async (to, from, next) => {
  // 判断：若访问的是可以公开访问（即无需身份验证）的页面时，
  if (to.meta.isPublic === true) {
    next();
  } else {
    // 校验token
    let token = localStorage.getItem("token");
    if (!token) {
      return next("/Login");
    }
    // token存在，则上传token校验
    await http.post("/tokenVerify");
    next();
  }
});

// 配置请求--拦截器，以便统一处理身份信息发送问题
http.interceptors.request.use(
  config => {
    if (config.url === "/login") {
      //如果是登录页面，则无需拦截处理
      return config;
    }
    // 其它api接口访问需要拦截处理：其实就是把token传到服务端校验
    // 取token
    let token = localStorage.getItem("token"); //当取一个东西的时候，一定要注意，如果是取对象的属性，一定要考虑前面的对象有没有可能为空（空会报错）
    // 如果token不存在，则直接跳转到登录页
    if (!token) {
      return router.push("/Login");
    }
    // token存在，上传校验
    config.headers.Authorization = token;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 配置响应--拦截器，以便统一处理错误
http.interceptors.response.use(
  res => {
    // console.log(res)
    // 若响应中带msg，则弹出提示: status为200的响应中通常带有msg
    if (res.data.msg) {
      Vue.prototype.$message({
        type: "success",
        message: res.data.msg
      });
    }
    // 若响应代码为204---delete方法的成功响应
    if (res.status === 204) {
      Vue.prototype.$message({
        type: "success",
        message: "删除成功"
      });
    }

    return Promise.resolve(res);
  },
  err => {
    // console.log(err.response);
    //统一处理错误
    Vue.prototype.$message({
      type: "error",
      message: err.response.data.err
    });
    // 判断：如果状态码为401，则表明是用户校验失败，便跳转到登录页
    if (err.response.status === 401) {
      router.push("/Login");
    }
    return Promise.reject(err);
  }
);

// 导出axios实例
export default http;
