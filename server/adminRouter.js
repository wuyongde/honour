// 路由模块
const express = require("express");
const router = express.Router();

// 引入admin相关数据模型
let { categoryModel } = require("./adminModels");

// 路由项

// 添加分类
router.post("/categories", async (req, res) => {
  let { name } = req.body;
  let result;
  try {
    result = await categoryModel.create({ name });
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

module.exports = router;
