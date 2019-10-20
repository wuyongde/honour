// axios模块
import axios from "axios";

// 引Vue
import Vue from "vue";

// 创建一个axios实例
const http = axios.create({
  baseURL: "http://127.0.0.1:3000/admin/api",
  timeout: 1000
});

// 配置响应--拦截器，以便统一处理错误
http.interceptors.response.use(
  res => {
    return Promise.resolve(res);
  },
  err => {
    Vue.prototype.$message({
      type: "error",
      message: err.response.data.msg
    });
    return Promise.reject(err);
  }
);

// 导出axios实例
export default http;
