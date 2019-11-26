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
  // 判断：查询类型
  let { _id, parent,pageSize, currPage,all } = req.query;
  let result;
  if (_id) {
    //查询某一个
    try {
      result = await categoriesModel.findById(_id);
    } catch (error) {
      return res.status(500).json({
        err: "查询失败：服务器错误"
      });
    }
  } else if (pageSize && currPage) {
    // 分页查询
    try {
      result = await categoriesModel
        .find({})
        .populate('parent')
        .skip(pageSize * (currPage - 1))
        .limit(pageSize * 1); //不能直接写pageSize（会报错），pageSize * 1则会是个数字。
    } catch (error) {
      return res.status(500).json({
        err: "查询失败：服务器错误"
      });
    }
  } else if(parent){
    //查询某一父类下面的子分类
    try {
      result = await categoriesModel.find({ parent: parent });
    } catch (error) {
      return res.status(500).json({
        err: "查询失败：服务器错误"
      });
    }
  }else if(all){
    // 查询所有分类
    try {
      result = await categoriesModel.find();
    } catch (error) {
      return res.status(500).json({
        err: "查询失败：服务器错误"
      });
    }
  }else{
     //查询总记录数
     try {
      result = await categoriesModel.find().count();
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
  if (!_id || !name) {
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
