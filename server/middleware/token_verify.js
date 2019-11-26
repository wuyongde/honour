// 模块：专门用于校验客户端token的中间件
// 引入jsonwebtoken
const jwt = require("jsonwebtoken"); //引入jsonwebtoken
const { SECRET } = require("./config"); //加密字符串
// 引入adminUsers数据模型
let adminUsersModel = require("../models/adminUsersModel");

module.exports = opts => {
  //opts方便以后传入参数，以适应不同的环境
  return async (req, res, next) => {
    // 取得token
    let token = req.headers.authorization;
    // 判断token是否上传
    if (!token) {
      return res.status(401).json({
        err: "用户未登录：未上传token"
      });
    }
    // 解密token并校验合法性
    jwt.verify(token, SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          err: "用户未登录：不合法的token"
        });
      }
      //查数据库，判断用户是否存在
      let _id = decoded._id;
      let result;
      try {
        result = await adminUsersModel.findById(_id);
      } catch (error) {
        return res.status(401).json({
          err: "用户未登录：服务器错误，请稍候再试"
        });
      }
      if (!result) {
        return res.status(401).json({
          err: "用户未登录：未找到用户"
        });
      }
      // token校验通过，走下一流程
      req.username = result.username;
      next();
    });
  };
};
