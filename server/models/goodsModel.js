// 数据模型--物品模块
const mongoose = require("./dbConn");

//创建schema
let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String
  }
});

// 创建数据模型
let model = mongoose.model("goods", schema);

// 导出数据模型
module.exports = model;
