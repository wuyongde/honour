// 管理员相关路由
const express = require("express");
const router = express.Router();

// 引入数据模型
let adminUsersModel = require("../../models/adminUsersModel");

// 添加管理员
router.post("/", async (req, res) => {
  let { username, password } = req.body;
  let result;
  try {
    result = await adminUsersModel.create({ username, password });
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

// 查询管理员
router.get("/", async (req, res) => {
  // 判断：是查询所有还是查询某一个管理员
  let { _id } = req.query;
  let result;
  if (!_id) {
    //查询所有
    result = await adminUsersModel.find(); //
  } else {
    //查询某一管理员
    result = await adminUsersModel.findById(_id);
  }
  // 响应
  res.json({
    code: 0,
    msg: "查询成功",
    data: result
  });
});

// 修改管理员
router.put("/", async (req, res) => {
  let { _id, username, password } = req.body;
  let result = await adminUsersModel.findByIdAndUpdate(_id, { username, password });
  // 响应
  res.json({
    code: 0,
    msg: "修改成功",
    data: result
  });
});

// 删除管理员
router.delete("/", async (req, res) => {
  let { _id } = req.query;
  let result = await adminUsersModel.findByIdAndRemove(_id);
  // 响应
  res.json({
    code: 0,
    msg: "删除成功",
    data: result
  });
});

// 图片上传



module.exports = router;
