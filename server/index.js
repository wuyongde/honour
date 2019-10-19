// 入口js
const express = require("express");
const path=require('path')
const app = express();


// 解决跨域
const cors=require('cors')
app.use(cors())

// 处理post请求体
let bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 开放静态资源
app.use('/admin/api/uploads',express.static(path.join(__dirname,'./uploads/')))


// 引入categories相关路由
let categoriesRouter=require('./routers/admin/categoriesRouter')
app.use('/admin/api/categories',categoriesRouter)

// 引入goods相关路由
let goodsRouter=require('./routers/admin/goodsRouter')
app.use('/admin/api/goods',goodsRouter)

// 引入文件上传路由
let fileUploadRouter=require('./routers/admin/fileUploadRouter')
app.use('/admin/api/uploads',fileUploadRouter)

// 引入heros相关路由
let herosRouter=require('./routers/admin/herosRouter')
app.use('/admin/api/heros',herosRouter)


app.listen(3000, () => {
  console.log("http://localhost:3000");
});
