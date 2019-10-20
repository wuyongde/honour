// 物品相关路由
const express = require("express");
const router = express.Router();

// 引入数据模型
let advertsModel = require("../../models/advertsModel");

// 添加物品
router.post("/", async (req, res) => {
  let { name, items } = req.body;
  let result;
  try {
    result = await advertsModel.create({ name, items } );
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

// 查询物品
router.get("/", async (req, res) => {
  // 判断：是查询所有还是查询某一个物品
  let { _id } = req.query;
  let result;
  if (!_id) {
    //查询所有
    result = await advertsModel.find(); //
  } else {
    //查询某一物品
    result = await advertsModel.findById(_id);
  }
  // 响应
  res.json({
    code: 0,
    msg: "查询成功",
    data: result
  });
});

// 修改物品
router.put("/", async (req, res) => {
  let { _id, name, items } = req.body;
  let result = await advertsModel.findByIdAndUpdate(_id, { name, items });
  // 响应
  res.json({
    code: 0,
    msg: "修改成功",
    data: result
  });
});

// 删除物品
router.delete("/", async (req, res) => {
  let { _id } = req.query;
  let result = await advertsModel.findByIdAndRemove(_id);
  // 响应
  res.json({
    code: 0,
    msg: "删除成功",
    data: result
  });
});

// 图片上传



module.exports = router;
