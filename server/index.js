// 入口js
const express = require("express");
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



// 引入categories相关路由
let categoriesRouter=require('./routers/admin/categoriesRouter')
app.use('/admin/api/categories',categoriesRouter)



app.listen(3000, () => {
  console.log("http://localhost:3000");
});
