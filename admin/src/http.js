// axios模块
import axios from "axios";

// 创建一个axios实例
const http = axios.create({
  baseURL: "http://127.0.0.1:3000/admin/api",
  timeout: 1000
});

// 导出axios实例
export default http;
