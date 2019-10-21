// 专门用于token校验的路由模块

let express = require('express')
let router = express.Router()

router.post('/',(req,res)=>{
    res.send({
        msg:'token校验通过'
    })
})



// 导出路由
module.exports = router