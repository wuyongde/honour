// 分类相关路由
const express = require("express");
const router = express.Router();

// 引入数据模型
let categoriesModel = require("../../models/categoriesModel");

// 添加分类
router.post("/", async (req, res) => {
  let { name, parent } = req.body;
  // 判断参数是否上传
  if (!name) {
    return res.status(400).json({
      err: "参数不正确"
    });
  }
  let result;
  // 操作数据库
  try {
    result = await categoriesModel.create({ name, parent });
  } catch (error) {
    return res.status(500).json({
      err: "添加失败：服务器错误"
    });
  }
  // 添加成功，响应
  res.status(201).json({
    //添加数据：post， 201表示成功
    msg: "添加成功",
    data: {
      result
    }
  });
});

// 查询分类
router.get("/", async (req, res) => {
  // 判断：是查询所有还是查询某一个分类
  let { _id, parent } = req.query;
  let result;
  if (_id) {
    //查询某一分类
    try {
      result = await categoriesModel.findById(_id);
    } catch (error) {
      return res.status(500).json({
        err: "查询失败：服务器错误"
      });
    }
  }
  if (parent) {
    //查询某一父类下面的子分类
    try {
      result = await categoriesModel.find({ parent: parent });
    } catch (error) {
      return res.status(500).json({
        err: "查询失败：服务器错误"
      });
    }
  }
  if (!_id && !parent) {
    //查询所有
    try {
      result = await categoriesModel.find().populate("parent"); //populate表示把某个字段关联的数据提取过来！！
    } catch (error) {
      return res.status(500).json({
        err: "查询失败：服务器错误"
      });
    }
  }
  // 响应
  res.status(200).json({
    data: {
      result
    }
  });
});

// 修改分类
router.put("/", async (req, res) => {
  let { _id, name, parent } = req.body;
  // 检查参数是否上传
  if (!_id || !name || !parent) {
    return res.status(400).json({
      err: "参数不正确"
    });
  }
  // 操作数据库
  let result;
  try {
    result = await categoriesModel.findByIdAndUpdate(_id, { name, parent });
  } catch (error) {
    return res.status(500).json({
      err: "修改失败：服务器错误"
    });
  }
  // 响应
  res.status(200).json({
    msg: "修改成功",
    data: {
      result
    }
  });
});

// 删除分类
router.delete("/", async (req, res) => {
  let { _id } = req.query;
  // 检查参数是否上传
  if (!_id) {
    return res.status(400).json({
      err: "参数不正确"
    });
  }
  // 操作数据库
  let result;
  try {
    result = await categoriesModel.findByIdAndRemove(_id);
  } catch (error) {
    return res.status(500).json({
      err: "删除失败：服务器错误"
    });
  }
  // 响应
  res.status(204).end();
});

module.exports = router;
