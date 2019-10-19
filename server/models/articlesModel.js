// 数据模型--物品模块
const mongoose = require("./dbConn");

//创建schema
let schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  categories: [
    {
      type: mongoose.SchemaTypes.ObjectId, //注意此处type的用法，必须是ObjectId，相当于联表查询的id
      ref: "categories"
    } //相当于关联的表}
  ],
  pub_date: {
    type: Date
  },
  content: {
    type: String,
    required: true
  }
});

// 创建数据模型
let model = mongoose.model("articles", schema);

// 导出数据模型
module.exports = model;
