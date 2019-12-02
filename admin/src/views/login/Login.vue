<template>
  <div class="Login">
    <el-container>
      <el-form label-width="80px" :rules="form_login" :model="model" ref="form_login">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="model.username"
            placeholder="请输入用户名"
            clearable
            @keyup.native.enter="login"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="model.password"
            placeholder="请输入密码"
            type="password"
            @keyup.native.enter="login"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="login">登录</el-button>
        </el-form-item>
        <el-form-item label="提示：">
          <template>
            <p>用户名： demo 密码： demo</p>
          </template>
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
      },
      form_login:{        //表单校验规则
        username:[
          {required:true,message:'用户名必须填写',trigger:'blur'},
          { min: 3, max: 20, message: "用户名必须是3-15位之间", trigger: "blur" }
        ],
        password:[
           {required:true,message:'密码必须填写',trigger:'blur'},
          {min:4,max:20,message:'密码长度必须在4-20个字符之间',trigger:'blur'}
        ]
      }
    };
  },

  methods: {
     login() {
      // 测试表单校验是否全部通过
      this.$refs.form_login.validate(async isValid=>{
        // 只有当校验通过后，才发现ajax请求
        if(isValid){
          //   用户登录
          let res;
          try {
            res = await this.$http.post("/login", this.model);
            localStorage.setItem("token", res.data.data.token); //把token存起来
            localStorage.setItem("username", res.data.data.username); //把用户名存起来
            //   登录成功后跳转
            this.$router.push("/adminUsers/list");
            
          } catch (error) {
            this.model.username = this.model.password = ""
          }
        }
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
p {
  margin: 0;
  color: #999;
}
</style>