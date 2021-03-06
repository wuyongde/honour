// 入口js
const express = require("express");
const path = require("path");
const app = express();

// 解决跨域
const cors = require("cors");
app.use(cors());

// 处理post请求体
app.use(express.json()); //默认只能处理：application/json数据，对于application/x-www-form-urlencoded这种表单数据无法解析；其本质也是调用body-parser处理；

// 开放静态资源
app.use(
  "/admin/api/uploads",
  express.static(path.join(__dirname, "./uploads/"))
);

// 开放静态资源---admin(管理端前端页面)
app.use("/admin", express.static(path.join(__dirname, "./public/admin")));
// 开放静态资源---web(web移动前端页面)
app.use("/", express.static(path.join(__dirname, "./public/web")));

// 引入中间件---token校验
const token_verify = require("./middleware/token_verify");

// 引入categories相关路由
let categoriesRouter = require("./routers/admin/categoriesRouter");
app.use("/admin/api/categories", token_verify(), categoriesRouter);

// 引入goods相关路由
let goodsRouter = require("./routers/admin/goodsRouter");
app.use("/admin/api/goods", token_verify(), goodsRouter);

// 引入文件上传路由
let fileUploadRouter = require("./routers/admin/fileUploadRouter");
app.use("/admin/api/uploads", token_verify(), fileUploadRouter);

// 引入heros相关路由
let herosRouter = require("./routers/admin/herosRouter");
app.use("/admin/api/heros", token_verify(), herosRouter);

// 引入articles相关路由
let articlesRouter = require("./routers/admin/articlesRouter");
app.use("/admin/api/articles", token_verify(), articlesRouter);

// 引入adverts相关路由
let advertsRouter = require("./routers/admin/advertsRouter");
app.use("/admin/api/adverts", token_verify(), advertsRouter);

// 引入adminUsers相关路由
let adminUsersRouter = require("./routers/admin/adminUsersRouter");
app.use("/admin/api/adminUsers", token_verify(), adminUsersRouter);

// 引入videos相关路由
let videosRouter = require("./routers/admin/videosRouter");
app.use("/admin/api/videos", token_verify(), videosRouter);

// 引入login相关路由
let loginRouter = require("./routers/admin/loginRouter");
app.use("/admin/api/login", loginRouter);

// 引入tokenVerify相关路由
let tokenVerifyRouter = require("./routers/admin/tokenVerifyRouter");
app.use("/admin/api/tokenVerify", token_verify(), tokenVerifyRouter);

// 引入客户端web路由
let webRouter = require("./routers/web/index");
app.use("/web/api", webRouter);

// 统一处理错误
// app.use(async (err, req, res, next) => {
//   res.status(err.statusCode).send({
//     msg: err.message
//   });
// });

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
