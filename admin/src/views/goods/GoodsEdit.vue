<template>
  <div class="GoodsEdit">
    <h1>{{$route.params._id?'编辑':'创建'}}物品</h1>
    <el-form @submit.native.prevent>
      <el-form-item label="名称">
        <el-input
          placeholder="输入物品名称"
          v-model.trim="good.name"
          @focus="isShowAlert=false"
          @blur="isShowAlert=true"
        ></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="fileUploadAction"
          :show-file-list="false"
          :on-success="afterUpload"
          :on-error="errorUpload"
          :headers="addHeaders"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="good.icon" :src="good.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
  props: {
    _id: String
  },
  computed: {
    // 表单校验
    formCheckFlag() {
      // 定义正则
      const regGoodName = /^([a-zA-Z]|[\u4E00-\u9FA5]){2,16}$/;
      // 取表单值
      let { name ,icon} = this.good;
      // 校验
      if (!regGoodName.test(name)) {      //校验物品名称合法性
        this.alertMsg = "物品名必须是2-16位的英文字母及汉字的组合";
        return true;
      }
      if(!icon){
        this.alertMsg = "图标不能为空";
        return true;
      }
      // 校验都通过
      return false;
    }
  },
  methods: {
    // 图片上传成功的hander
    afterUpload(res) {
      //res是文件上传成功后服务端的返回数据
      this.good.icon = res.data.result.imgUrl;
    },
    // 添加物品
    async add() {
      // 判断物品名是否合法
      let { name, icon } = this.good;
      // 判断是添加还是修改
      let { _id } = this;
      if (!_id) {
        // 添加物品---发送ajax请求
        await this.$http.post("/goods", { name, icon });
        // 跳转
        this.$router.push("/goods/list");
      } else {
        // 编辑物品---发送ajax请求
        await this.$http.put("/goods", { _id, name, icon });
        // 跳转
        this.$router.push("/goods/list");
      }
    },
    // 根据_id请求物品
    async getgoodById() {
      let res = await this.$http.get(`/goods?_id=${this._id}`);
      this.good = res.data.data.result;
    }
  },
  created() {
    //在组件的created阶段
    this._id && this.getgoodById(); //当路径参数中有_id时，才执行获取数据操作
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