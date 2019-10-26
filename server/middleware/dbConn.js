// 数据库连接模块
const mongoose = require("mongoose");


// 数据库连接字符串
const db_url = "mongodb://127.0.0.1:27017/honour";
// 连接数据库
mongoose
  .connect(db_url, { useNewUrlParser: true })
  .then(() => {
    console.log("数据库连接成功！");
  })
  .catch(err => {
    console.log("数据库连接失败！" + err);
  });

// 引入全部的数据模型
// require('require-all')(__dirname + '/../models')


// 导出
module.exports=mongoose
 