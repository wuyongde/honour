<template>
  <div class="AdminUsersEdit">
    <h1>{{$route.params._id?'编辑':'创建'}}管理员</h1>
    <el-form @submit.native.prevent>
      <el-form-item label="用户名">
        <el-input placeholder="输入管理员名称" v-model="adminUser.username" @focus="isShowAlert=false"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input clearable show-password placeholder="输入管理员密码" type="password" v-model="adminUser.password" @focus="isShowAlert=false"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="add">提交</el-button>
      </el-form-item>
    </el-form>
    <el-alert :title="alertMsg" type="error" show-icon v-show="isShowAlert"></el-alert>
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
      isShowAlert: false,
      alertMsg: ""
    };
  },
  methods: {
    // 添加管理员
    add() {
      // 判断管理员名是否合法
      let { username, password } = this.adminUser;
      username = username.trim();
      if (!username) {
        this.alertMsg = "管理员名称不合法";
        this.isShowAlert = true;
        return;
      }
      // 判断是添加管理员还是编辑管理员
      let { _id } = this.$route.params;
      if (!_id) {
        // 添加管理员---发送ajax请求
        this.$http
          .post("/adminUsers", { username, password })
          .then(res => {
            // 添加成功
            this.$message({
              type: "success",
              message: "管理员添加成功！"
            });
            this.$router.push("/adminUsers/list");
          })
          .catch(err => {
            // 添加失败
            this.alertMsg = `管理员添加失败！${err}`;
            this.isShowAlert = true;
          });
      } else {
        // 编辑管理员---发送ajax请求
        this.$http
          .put("/adminUsers", { _id, username, password })
          .then(res => {
            // 修改成功
            this.$message({
              type: "success",
              message: "管理员修改成功！"
            });
            this.$router.push("/adminUsers/list");
          })
          .catch(err => {
            // 修改失败
            this.alertMsg = `管理员修改失败！${err}`;
            this.isShowAlert = true;
          });
      }
    },
    // 根据_id请求管理员
    async getadminUserById() {
      let _id = this.$route.params._id;
      let res = await this.$http.get(`/adminUsers?_id=${_id}`);
      this.adminUser = res.data.data;
    }
  },
  created() {
    //在组件的created阶段
    this.$route.params._id && this.getadminUserById(); //当路径参数中有_id时，才执行获取数据操作
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