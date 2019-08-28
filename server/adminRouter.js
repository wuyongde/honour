// 路由模块
const express = require("express");
const router = express.Router();

// 引入admin相关数据模型
let { categoryModel } = require("./adminModels");

// 路由项

// 添加分类
router.post("/categories", async (req, res) => {
  let { name, parent } = req.body;
  let result;
  try {
    result = await categoryModel.create({ name, parent });
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

// 查询分类
router.get("/categories", async (req, res) => {
  // 判断：是查询所有还是查询某一个分类
  let { _id } = req.query;
  let result;
  if (!_id) {
    //查询所有
    result = await categoryModel.find().populate("parent");     //populate表示把某个字段关联的数据提取过来！！
  } else {
    //查询某一分类
    result = await categoryModel.findById(_id);
  }
  // 响应
  res.json({
    code: 0,
    msg: "查询成功",
    data: result
  });
});

// 修改分类
router.put("/categories", async (req, res) => {
  let { _id, name, parent } = req.body;
  let result = await categoryModel.findByIdAndUpdate(_id, { name, parent });
  // 响应
  res.json({
    code: 0,
    msg: "修改成功",
    data: result
  });
});

// 删除分类
router.delete("/categories", async (req, res) => {
  let { _id } = req.query;
  let result = await categoryModel.findByIdAndRemove(_id);
  // 响应
  res.json({
    code: 0,
    msg: "删除成功",
    data: result
  });
});

module.exports = router;
