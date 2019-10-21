<template>
  <div class="Login">
    <el-container>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="model.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      //   用户登录
      let res = await this.$http.post("/login", this.model);
      localStorage.setItem('token',res.data.token)      //把token存起来
    //   登录成功后跳转
    this.$router.push('/')
    this.$message({
        type:'success',
        message:'登录成功！'
    })
    }
  }
};
</script>

<style lang="scss" scoped>
.Login {
  width: 50vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 5px;
}
</style>