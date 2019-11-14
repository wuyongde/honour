// 文件上传路由模块
let express=require('express')
let router=express.Router()

// 引入上传文件处理插件multer
let multer  = require('multer')
let upload = multer({ dest: './uploads/' })         //配置multer



// 图片上传处理
router.post('/',upload.single('file'),(req,res)=>{          //upload.single('file')是中间件，即客户端文件上传时先经过此中间件处理，'file'是客户端上传的文件标识码，必须与客户端的一致！！
    // （中间件处理后，会将文件相关信息放到req.file上面）
    // let imgUrl='/admin/api/uploads/' + req.file.filename           //正式服务器上的地址！！！
    let imgUrl='http://localhost:3000/admin/api/uploads/' + req.file.filename           //取得刚刚上传的文件在web访问地址
    req.file.imgUrl =imgUrl         //将该图片访问地址放到req.file上面
    // 响应
    res.send(req.file)
})


// 导出路由
module.exports=router