// 管理员相关路由
const express = require("express");
const router = express.Router();

// 引入数据模型
let adminUsersModel = require("../../models/adminUsersModel");

// 添加管理员
router.post("/", async (req, res) => {
  let { username, password } = req.body;
  // 判断参数是否上传
  if (!username || !password) {
    return res.status(400).json({
      err: "用户名或密码未上传"
    });
  }
  let result;
  // 操作数据库
  try {
    result = await adminUsersModel.create({ username, password });
  } catch (error) {
    return res.status(500).json({
      err: "添加失败：服务器错误"
    });
  }
  // 响应
  res.status(201).json({
    //post方法：添加成功，用201 code
    msg: "添加成功",
    data: {
      result
    }
  });
});

// 查询管理员
router.get("/", async (req, res) => {
  // 判断：查询类型
  let { _id } = req.query;
  let result;
  if (!_id) {
    //查询所有
    try {
      result = await adminUsersModel.find();
    } catch (error) {
      return res.status(500).json({
        err: "查询失败：服务器错误"
      });
    }
  } else {
    //查询一个
    try {
      result = await adminUsersModel.findById(_id);
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

// 修改管理员
router.put("/", async (req, res) => {
  let { _id, username, password } = req.body;
  // 校验参数是否上传
  if (!_id || !username || !password) {
    return res.status(400).json({
      err: "客户端参数不正确"
    });
  }
  // 操作数据库
  let result;
  try {
    result = await adminUsersModel.findByIdAndUpdate(_id, {
      username,
      password
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

// 删除管理员
router.delete("/", async (req, res) => {
  let { _id } = req.query;
  // 判断_id是否上传
  if (!_id) {
    return res.status(400).json({
      err: "_id必须上传"
    });
  }
  // 操作数据库
  let result;
  try {
    result = await adminUsersModel.findByIdAndRemove(_id);
  } catch (error) {
    return res.status(500).json({
      err: "删除失败：服务器错误"
    });
  }
  // 响应
  res.status(204).end(); //DELETE方法: 204 No Content； delete方法的204代码无需返回数据，写了也无效！
});

module.exports = router;
