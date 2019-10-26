// 数据模型--分类模块
const mongoose = require("../middleware/dbConn");

//创建schema
let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId, //注意此处type的用法，必须是ObjectId，相当于联表查询的id
    ref: "categories" //相当于关联的表
  }
});

// 创建数据模型
let model = mongoose.model("categories", schema);

// 导出数据模型
module.exports = model;
