// 文件上传路由模块
let express = require("express");
let router = express.Router();

// 引入adminUsers数据模型
let adminUsersModel = require("../../models/adminUsersModel");

// 用户登录验证
router.post("/", async (req, res) => {
  let { username, password } = req.body;
  // 判断username或password是否上传
  if(!username || !password){
    return res.status(400).json({   //400：请求参数有误
      err:'用户名或密码未填写'
    })
  }
  // 查用户名
  let result
  try {
     result = await adminUsersModel.findOne({ username });    //查数据库是一个异步操作，可能会出错，所以要有异常处理
  } catch (error) {
    return res.status(500).json({   //500：服务器错误
      err:'服务器错误'
    })
  }
  // 验证用户名是否存在
  if (!result) {
    // 用户不存在
    return res.status(422).json({   //422:
      err: "用户不存在"
    });
  }
  // 验证密码是否正确
  let isPassValid = require("bcrypt").compareSync(password, result.password);
  if (!isPassValid) {
    //密码不正确
    return res.status(422).json({   //422:
      err: "密码不正确"
    });
  }

  // 到此，说明用户密码都正确
  // 响应--token
  const jwt = require("jsonwebtoken"); //引入jsonwebtoken
  const {SECRET} = require('../../middleware/config'); //加密字符(注意：加密字符串应该写在全局配置文件里)
  const token = jwt.sign({ _id: result._id }, SECRET); //生成token
  res.status(200).json({
    msg:'登录成功',
    data:{
      token: token,
      username: result.username
    }
  });
});

// 导出路由
module.exports = router;
