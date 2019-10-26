// 数据模型--英雄模块
const mongoose = require("../middleware/dbConn");

//创建schema
let schema = new mongoose.Schema({
  name: {
    //如“秦始皇”
    type: String,
    required: true,
    unique: true
  },
  icon: {
    //英雄图标
    type: String
  },
  title: {
    //标签(称号)，如“和平守望”
    type: String
  },
  categories: [
    //英雄所属分类，如“法师”
    {
      type: mongoose.SchemaTypes.ObjectId, //注意此处type的用法，必须是ObjectId，相当于联表查询的id
      ref: "categories" //相当于关联的表
    }
  ],
  scores: {
    //英雄评分
    diffcut: { type: Number }, //难度
    technicl: { type: Number }, //技能
    attack: { type: Number }, //攻击
    live: { type: Number } //生存
  },
  skills: [
    //英雄技能（招式）
    {
      name: { type: String },
      icon: { type: String },
      describs: { type: String },
      tips: { type: String }
    }
  ],
  goods: {
    //出装推荐（装备）
    good: {
      //顺风出装
      tips: { type: String },
      items: [{ type: mongoose.SchemaTypes.ObjectId, ref: "goods" }]
    },
    bad: {
      //逆风出装
      tips: { type: String },
      items: [{ type: mongoose.SchemaTypes.ObjectId, ref: "goods" }]
    }
  },
  useage_skills: { type: String }, //使用技巧
  battle_skills: { type: String }, //对抗技巧
  team_skills: { type: String } //团战思路
});

// 创建数据模型
let model = mongoose.model("heros", schema);

// 导出数据模型
module.exports = model;
