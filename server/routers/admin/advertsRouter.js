// 广告位相关路由
const express = require("express");
const router = express.Router();

// 引入数据模型
let advertsModel = require("../../models/advertsModel");


// 添加广告位
router.post("/", async (req, res) => {
  let { name, items } = req.body;
  let result;
  // 操作数据库
  try {
    result = await advertsModel.create({ name, items } );
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

// 查询广告位
router.get("/", async (req, res) => {
  // 判断：是查询所有还是查询某一个广告位
  let { _id } = req.query;
  let result;
  if (!_id) {
    //查询所有
    try {
      result = await advertsModel.find(); 
    } catch (error) {
      return res.status(500).json({
        err:'查询失败：服务器错误'
      })
    }
  } else {
    //查询某一广告位 
    try {
      result = await advertsModel.findById(_id);
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

// 修改广告位
router.put("/", async (req, res) => {
  let { _id, name, items } = req.body;
  // 操作数据库
  let result
   try {
    result = await advertsModel.findByIdAndUpdate(_id, { name, items });
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

// 删除广告位
router.delete("/", async (req, res) => {
  let { _id } = req.query;
  // 操作数据库
  let result
   try {
    result = await advertsModel.findByIdAndRemove(_id);
   } catch (error) {
     return res.status(500).json({
       err:'删除失败：服务器错误'
     })
   }
  // 响应
  res.status(204).end()
});

module.exports = router;
