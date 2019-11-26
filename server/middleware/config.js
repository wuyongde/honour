// 一些环境变量(变量名不要改，只改值)
const SECRET = 'kkdhlwl2ihgh;nznjl'         //jwt密钥：正式服务器同？
const baseImgUrl ='http://localhost:3000/admin/api/uploads/'                //图片基本地址---本地测试服务器
// const baseImgUrl ='/admin/api/uploads/'         //图片基本地址----正式服务器
const db_url = "mongodb://127.0.0.1:27017/honour";   //mongodb数据库连接字符串


// 导出
module.exports = {
    SECRET,
    baseImgUrl,
    db_url
}
