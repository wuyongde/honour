// 文件上传路由模块
let express = require("express");
let router = express.Router();

// 引入adminUsers数据模型
let adminUsersModel = require("../../models/adminUsersModel");

// 用户登录验证
router.post("/", async (req, res) => {
  let { username, password } = req.body;
  // 验证用户名是否存在
  let result = await adminUsersModel.findOne({ username });
  if (!result) {
    //用户不存在
    return res.status(422).send({
      msg: "用户名不存在"
    });
  }
  // 验证密码是否正确
  let isValid = require("bcrypt").compareSync(password, result.password);
  if (!isValid) {
    //密码不正确
    return res.status(422).send({
      msg: "密码不正确"
    });
  }
  // 返回响应--token
  const jwt = require("jsonwebtoken"); //引入jsonwebtoken
  const secret = "kkdhlwl2ihgh;nznjl"; //加密字符(注意：：：加密字符串其实应该写在全局配置文件里，理解！！！)
  const token = jwt.sign({ _id: result._id }, secret); //生成token
  res.send({
    token: token,
    username: result.username
  });
});

// 导出路由
module.exports = router;
