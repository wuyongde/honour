// 视频相关路由
const express = require("express");
const router = express.Router();

// 引入数据模型
let videosModel = require("../../models/videosModel");

// 添加视频
router.post("/", async (req, res) => {
  let { title, url, imgUrl, category } = req.body;
  let result;
  // 操作数据库
  try {
    result = await videosModel.create({ title, url, imgUrl, category });
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

// 查询视频
router.get("/", async (req, res) => {
  // 判断：是查询所有还是查询某一个视频
  let { _id } = req.query;
  let result;
  if (!_id) {
    //查询所有
    try {
      result = await videosModel.find().populate("category");
    } catch (error) {
      return res.status(500).json({
        err: "查询失败：服务器错误"
      });
    }
  } else {
    //查询某一视频
    try {
      result = await videosModel.findById(_id);
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

// 修改视频
router.put("/", async (req, res) => {
  let { _id, title, url, imgUrl, category } = req.body;
  // 操作数据库
  let result;
  try {
    result = await videosModel.findByIdAndUpdate(_id, {
      title,
      url,
      imgUrl,
      category
    });
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

// 删除视频
router.delete("/", async (req, res) => {
  let { _id } = req.query;
  let result;
  // 操作数据库
  try {
    result = await videosModel.findByIdAndRemove(_id);
  } catch (error) {
    return res.status(500).json({
      err: "删除失败：服务器错误"
    });
  }
  // 响应
  res.status(204).end();
});

module.exports = router;
