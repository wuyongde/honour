// 文章相关路由
const express = require("express");
const router = express.Router();

// 引入数据模型
let articlesModel = require("../../models/articlesModel");

// 添加文章
router.post("/", async (req, res) => {
  let { title, categories,content } = req.body;
  let result;
  // 操作数据库
  try {
    result = await articlesModel.create({ title, categories,content});
  } catch (error) {
    return res.status(500).json({
      err:'添加失败：服务器错误'
    })
  }
  // 响应
  res.status(201).json({
    msg:'添加成功',
    data:{
      result
    }
  })
});

// 查询文章
router.get("/", async (req, res) => {
  // 判断：是查询所有还是查询某一个文章
  let { _id } = req.query;
  let result;
  if (!_id) {
    //查询所有
    try {
      result = await articlesModel.find(); 
    } catch (error) {
      return res.status(500).json({
        err:'查询失败：服务器错误'
      })
    }
  } else {
    //查询某一文章 
    try {
      result = await articlesModel.findById(_id);
    } catch (error) {
      return res.status(500).json({
        err:'查询失败：服务器错误'
      })
    }
  }
  // 响应
  res.status(200).json({
    data:{
      result
    }
  })
});

// 修改文章
router.put("/", async (req, res) => {
  let { title, categories,content,_id } = req.body;
  // 操作数据库
  let result
  try {
    result = await articlesModel.findByIdAndUpdate(_id, { title, categories,content});
  } catch (error) {
    return res.status(500).json({
      err:'修改失败：服务器错误'
    })
  }
  // 响应
  res.status(200).json({
    msg:'修改成功',
    data:{
      result
    }
  })
});

// 删除文章
router.delete("/", async (req, res) => {
  let { _id } = req.query;
  let result
  //  操作数据库
   try {
    result = await articlesModel.findByIdAndRemove(_id);
  } catch (error) {
    return res.status(500).json({
      err:'删除失败：服务器错误'
    })
  }
  // 响应
  res.status(204).end()
});


module.exports = router;
