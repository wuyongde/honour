<template>
  <div class="GoodsEdit">
    <h1>{{$route.params._id?'编辑':'创建'}}物品</h1>
    <el-form @submit.native.prevent>
      <el-form-item label="名称">
        <el-input placeholder="输入物品名称" v-model="good.name" @focus="isShowAlert=false"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/uploads'"     
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="good.icon" :src="good.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
  name: "GoodsEdit",
  data() {
    return {
      good: {
        _id: "",
        name: "",
        icon: ""
      },
      isShowAlert: false,
      alertMsg: ""
    };
  },
  methods: {
    // 图片上传成功后的操作
    afterUpload(res){   //res是文件上传成功后服务端的返回数据
      this.good.icon=res.imgUrl
    },

    // 添加物品
    add() {
      // 判断物品名是否合法
      let { name, icon } = this.good;
      name = name.trim();
      if (!name) {
        this.alertMsg = "物品名称不合法";
        this.isShowAlert = true;
        return;
      }
      // 判断是添加物品还是编辑物品
      let { _id } = this.$route.params;
      if (!_id) {
        // 添加物品---发送ajax请求
        this.$http
          .post("/goods", { name, icon })
          .then(res => {
            // 添加成功
            this.$message({
              type: "success",
              message: "物品添加成功！"
            });
            this.$router.push("/goods/list");
          })
          .catch(err => {
            // 添加失败
            this.alertMsg = `物品添加失败！${err}`;
            this.isShowAlert = true;
          });
      } else {
        // 编辑物品---发送ajax请求
        this.$http
          .put("/goods", { _id, name, icon })
          .then(res => {
            // 修改成功
            this.$message({
              type: "success",
              message: "物品修改成功！"
            });
            this.$router.push("/goods/list");
          })
          .catch(err => {
            // 修改失败
            this.alertMsg = `物品修改失败！${err}`;
            this.isShowAlert = true;
          });
      }
    },
    // 根据_id请求物品
    async getgoodById() {
      let _id = this.$route.params._id;
      let res = await this.$http.get(`/goods?_id=${_id}`);
      this.good = res.data.data;
    }
  },
  created() {     //在组件的created阶段
   this.$route.params._id && this.getgoodById();     //当路径参数中有_id时，才执行获取数据操作
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