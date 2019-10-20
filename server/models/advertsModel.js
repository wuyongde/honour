// 数据模型--物品模块
const mongoose = require("./dbConn");

//创建schema
let schema = new mongoose.Schema({
  name: {
    //广告位名称，如“首页-顶部-广告位”
    type: String,
    required: true,
    unique: true
  },
  items: [
    //广告项目列表
    {
      img_url: { type: String },      //广告图片地址
      link_url: { type: String },     //广告链接地址
      title: { type: String }         //广告标题
    }
  ]
});

// 创建数据模型
let model = mongoose.model("adverts", schema);

// 导出数据模型
module.exports = model;
