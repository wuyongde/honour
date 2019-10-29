// vue-cli中针对vue的相关配置：
module.exports = {
    // 定义编译后输出的目录，默认是dist，这里改了
  outputDir: __dirname + "/../server/public/web",
//   定义编译出来的相关引用的目录，比如在html中相关css js的链接地址目录，默认是/,这里改了
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/"
};
