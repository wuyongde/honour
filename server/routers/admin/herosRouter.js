// 英雄相关路由
const express = require("express");
const router = express.Router();

// 引入数据模型
let herosModel = require("../../models/herosModel");

// 添加英雄
router.post("/", async (req, res) => {
  let { name, icon,title,categories,scores,skills,goods,useage_skills,battle_skills,team_skills } = req.body;
  let result;
  try {
    result = await herosModel.create({ name, icon,title,categories,scores,skills,goods,useage_skills,battle_skills,team_skills });
  } catch (error) {
    return res.json({
      code: -1,
      msg: "添加失败",
      error: error
    });
  }
  res.json({
    code: 0,
    msg: "添加成功",
    data: result
  });
});

// 查询英雄
router.get("/", async (req, res) => {
  // 判断：是查询所有还是查询某一个英雄
  let { _id } = req.query;
  let result;
  if (!_id) {
    //查询所有
    result = await herosModel.find(); //
  } else {
    //查询某一英雄
    result = await herosModel.findById(_id);
  }
  // 响应
  res.json({
    code: 0,
    msg: "查询成功",
    data: result
  });
});

// 修改英雄
router.put("/", async (req, res) => {
  let {_id, name, icon,title,categories,scores,skills,goods,useage_skills,battle_skills,team_skills } = req.body;
  let result = await herosModel.findByIdAndUpdate(_id, { name, icon,title,categories,scores,skills,goods,useage_skills,battle_skills,team_skills });
  // 响应
  res.json({
    code: 0,
    msg: "修改成功",
    data: result
  });
});

// 删除英雄
router.delete("/", async (req, res) => {
  let { _id } = req.query;
  let result = await herosModel.findByIdAndRemove(_id);
  // 响应
  res.json({
    code: 0,
    msg: "删除成功",
    data: result
  });
});

// 图片上传



module.exports = router;
