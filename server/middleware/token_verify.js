// 模块：专门用于校验客户端token
// 引入jsonwebtoken
const jwt = require("jsonwebtoken"); //引入jsonwebtoken
const secret = "kkdhlwl2ihgh;nznjl"; //加密字符(注意：：：加密字符串其实应该写在全局配置文件里，理解！！！)
// 引入adminUsers数据模型
let adminUsersModel = require('../models/adminUsersModel')


module.exports = opt =>{                    //opt方便以后传入参数，以适应不同的环境
    return   async (req, res, next) => {
        // 取得token
        let token = req.headers.authorization;
        if (!token) {
          return res.status(401).send({
            msg: "未上传token"
          });
        }
        // 解密token并校验
        jwt.verify(token, secret, async (err, decoded) => {
          if (err) {
            return res.status(401).send({
              msg: "token校验失败"
            });
          }
          // token校验成功后，查数据库，判断用户是否存在
          let _id = decoded._id;
          let result = await adminUsersModel.findOne({ _id });
          if (!result) {
            return res.status(401).send({
              msg: "未找到用户"
            });
          }
          // 客户端token校验通过，表示用户请求合法，走下一流程
          next();
        });
      }
}