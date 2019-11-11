// 分类相关路由
const express = require("express");
const router = express.Router();

// 引入数据模型
let categoriesModel = require("../../models/categoriesModel");

// 添加分类
router.post("/", async (req, res) => {
  let { name, parent } = req.body;
  let result;
  try {
    result = await categoriesModel.create({ name, parent });
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

// 查询分类
router.get(
  "/",       //加入token校验的中间件
  async (req, res) => {
    // 判断：是查询所有还是查询某一个分类
    let { _id ,parent} = req.query;
    let result;
    if(_id){
      //查询某一分类
      result = await categoriesModel.findById(_id);
    }
    if(parent){
      //查询某一父类下面的子分类
      result = await categoriesModel.find({parent:parent})
    }
    if(!_id && !parent){
      //查询所有
      result = await categoriesModel.find().populate("parent"); //populate表示把某个字段关联的数据提取过来！！
    }

    // 响应
    res.json({
      code: 0,
      msg: "查询成功",
      data: result
    });
  }
);

// 修改分类
router.put("/", async (req, res) => {
  let { _id, name, parent } = req.body;
  let result = await categoriesModel.findByIdAndUpdate(_id, { name, parent });
  // 响应
  res.json({
    code: 0,
    msg: "修改成功",
    data: result
  });
});

// 删除分类
router.delete("/", async (req, res) => {
  let { _id } = req.query;
  let result = await categoriesModel.findByIdAndRemove(_id);
  // 响应
  res.json({
    code: 0,
    msg: "删除成功",
    data: result
  });
});

module.exports = router;
