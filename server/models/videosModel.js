// 数据模型--视频模块
const mongoose = require("../middleware/dbConn");

//创建schema
let schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId, //注意此处type的用法，必须是ObjectId，相当于联表查询的id
      ref: "categories" //相当于关联的表
    },
    url: {
      type: String
    },
    imgUrl: {
      type: String
    },
    playSort: {
      type: Number,
      default: 0
    },
    likes:[
      {
        type: mongoose.SchemaTypes.ObjectId, //注意此处type的用法，必须是ObjectId，相当于联表查询的id
        ref: "videos" //相当于关联的表
      }
    ]
  },
  {
    timestamps: true //设定此参数后，数据生成时会自动加两个字段：创建时间与更新时间；
  }
);

// 创建数据模型
let model = mongoose.model("videos", schema);

// 导出数据模型
module.exports = model;
