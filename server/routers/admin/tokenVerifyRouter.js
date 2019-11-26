// 专门用于token校验的路由模块

let express = require("express");
let router = express.Router();

router.post("/", (req, res) => {
  res.status(200).json({
    data: {
      username: req.username
    }
  });
});

// 导出路由
module.exports = router;
