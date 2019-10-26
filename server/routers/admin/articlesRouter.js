// 文章相关路由
const express = require("express");
const router = express.Router();

// 引入数据模型
let articlesModel = require("../../models/articlesModel");

// 添加文章
router.post("/", async (req, res) => {
  let { title, categories,content } = req.body;
  let result;
  try {
    result = await articlesModel.create({ title, categories,content});
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

// 查询文章
router.get("/", async (req, res) => {
  // 判断：是查询所有还是查询某一个文章
  let { _id } = req.query;
  let result;
  if (!_id) {
    //查询所有
    result = await articlesModel.find(); //
  } else {
    //查询某一文章
    result = await articlesModel.findById(_id);
  }
  // 响应
  res.json({
    code: 0,
    msg: "查询成功",
    data: result
  });
});

// 修改文章
router.put("/", async (req, res) => {
  let { title, categories,content,_id } = req.body;
  let result = await articlesModel.findByIdAndUpdate(_id, { title, categories,content});
  // 响应
  res.json({
    code: 0,
    msg: "修改成功",
    data: result
  });
});

// 删除文章
router.delete("/", async (req, res) => {
  let { _id } = req.query;
  let result = await articlesModel.findByIdAndRemove(_id);
  // 响应
  res.json({
    code: 0,
    msg: "删除成功",
    data: result
  });
});

// 图片上传



module.exports = router;
