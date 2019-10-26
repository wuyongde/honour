// 数据模型--物品模块
const mongoose = require("../middleware/dbConn");

//创建schema
let schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required:true,
    // select:false,       //表示客户端查询时，不输出此字段
    set(val) {      //将密码存入数据库时加密
      return require("bcrypt").hashSync(val, 10);
    }
  }
});

// 创建数据模型
let model = mongoose.model("adminUsers", schema);

// 导出数据模型
module.exports = model;
