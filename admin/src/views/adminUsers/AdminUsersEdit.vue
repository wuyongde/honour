<template>
  <div class="AdminUsersEdit">
    <h1>{{$route.params._id?'编辑':'创建'}}管理员</h1>
    <el-form @submit.native.prevent>
      <el-form-item label="用户名">
        <el-input placeholder="输入管理员名称" v-model.trim="adminUser.username" @blur="isShowAlert=true" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          clearable
          show-password
          placeholder="输入管理员密码"
          type="password"
          v-model.trim="adminUser.password"
          @blur="isShowAlert=true"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="add" :disabled="formCheckFlag">提交</el-button>
      </el-form-item>
    </el-form>
    <el-alert :title="alertMsg" type="error" show-icon v-show="formCheckFlag && isShowAlert"></el-alert>
  </div>
</template>
<script>
export default {
  name: "AdminUsersEdit",
  data() {
    return {
      adminUser: {
        _id: "",
        username: "",
        password: ""
      },
      alertMsg: "",
      isShowAlert:false
    };
  },
  props:{
    _id:{
      type:String
    }
  },
  computed: {
    // 表单校验
    formCheckFlag(){
      // 定义正则
      const regUser = /^[a-zA-Z0-9_-]{3,16}$/;
      const regPass = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$]).*$/;
      // 取表单值
      let { username, password } = this.adminUser;
      // 校验
      if(!regUser.test(username)){
        this.alertMsg = "用户名必须是3-16位字母、数字、_、-的组合";
        return true
      }
      if(!regPass.test(password)){
        this.alertMsg = "密码至少6位，且必须是数字、字母、特殊字符!@#$的组合";
        return true
      }
      return false
    }
  },
  methods: {
    // 添加或修改
    async add() {
      // 取表单数据
      let { username, password } = this.adminUser;
      // 判断是添加还是修改
      let { _id } = this
      if (!_id) {
        // 添加
        await this.$http.post("/adminUsers", { username, password });
        this.$router.push("/adminUsers/list");
      } else {
        // 修改
        await this.$http.put("/adminUsers", { _id, username, password });
        this.$router.push("/adminUsers/list");
      }
    },
    // 根据_id请求管理员
    async getAdminUserById() {
      let res = await this.$http.get(`/adminUsers?_id=${this._id}`);
      this.adminUser = res.data.data.result;
    }
  },
  created() {
    //在组件的created阶段
    this._id && this.getAdminUserById(); //当路径参数中有_id时，才执行获取数据操作
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>