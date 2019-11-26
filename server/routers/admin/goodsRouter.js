// 物品相关路由
const express = require("express");
const router = express.Router();

// 引入数据模型
let goodsModel = require("../../models/goodsModel");

// 添加物品
router.post("/", async (req, res) => {
  let { name, icon } = req.body;
  // 检查参数是否上传
  if (!name || !icon) {
    return res.status(400).json({
      err: "参数不正确"
    });
  }
  let result;
  // 操作数据库
  try {
    result = await goodsModel.create({ name, icon });
  } catch (error) {
    return res.status(500).json({
      err: "添加失败：服务器错误"
    });
  }
  // 响应
  res.status(201).json({
    msg: "添加成功",
    data: {
      result
    }
  });
});

// 查询物品
router.get("/", async (req, res) => {
  // 判断：查询类型
  let { _id, pageSize, currPage } = req.query;
  let result;
  if (_id) {
    //查询某一英雄
    try {
      result = await goodsModel.findById(_id);
    } catch (error) {
      return res.status(500).json({
        err: "查询失败：服务器错误"
      });
    }
  } else if (pageSize && currPage) {
    // 分页查询
    try {
      result = await goodsModel
        .find({})
        .skip(pageSize * (currPage - 1))
        .limit(pageSize * 1); //不能直接写pageSize（会报错），pageSize * 1则会是个数字。
    } catch (error) {
      return res.status(500).json({
        err: "查询失败：服务器错误"
      });
    }
  } else {
    //查询总记录数
    try {
      result = await goodsModel.find().count();
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

// 修改物品
router.put("/", async (req, res) => {
  let { _id, name, icon } = req.body;
  // 检查参数是否上传
  if (!_id || !name || !icon) {
    return res.status(400).json({
      err: "参数不正确"
    });
  }
  // 操作数据库
  let result;
  try {
    result = await goodsModel.findByIdAndUpdate(_id, { name, icon });
  } catch (error) {
    return res.status(500).json({
      err: "修改失败：服务器错误"
    });
  }
  // 响应
  res.status(200).json({
    msg: "修改成功"
  });
});

// 删除物品
router.delete("/", async (req, res) => {
  let { _id } = req.query;
  // 判断参数是否上传
  if (!_id) {
    return res.status(400).json({
      err: "参数不正确"
    });
  }
  // 操作数据库
  let result;
  try {
    result = await goodsModel.findByIdAndRemove(_id);
  } catch (error) {
    return res.status(500).json({
      err: "删除失败：服务器错误"
    });
  }
  // 响应
  res.status(204).end();
});

// 图片上传

module.exports = router;
