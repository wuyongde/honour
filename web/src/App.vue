<template>
  <div id="App">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    // 判断移动端还是pc端
    _isMobile() {
      //_开头的变量或函数是供程序内部使用（约定俗成）
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  },
  mounted() {
    // App组件挂载(为何用mounted？)渲染到页面时，判断客户端是移动端还是pc端
    if (!this._isMobile()) {
      // 弹窗提示
      this.$alert('您的浏览器不是移动端浏览器，请使用手机端浏览器访问','提示',{})
    }
  }
};
</script>

<style>
</style>
