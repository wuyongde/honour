<template>
  <div class="AdvertsEdit">
    <h1>{{$route.params._id?'编辑':'创建'}}广告位</h1>
    <el-form @submit.native.prevent>
      <el-form-item label="名称">
        <el-input placeholder="输入广告位名称" v-model="advert.name" @focus="isShowAlert=false"></el-input>
      </el-form-item>

      <!-- 添加广告项 -->
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        plain
        @click.prevent="advert.items.push({img_url:'',link_url:'',title:''})"
      >添加广告</el-button>
      <div class="skills-box">
        <div class="item" v-for="(item, index) in advert.items" :key="index">
          <el-form-item label="广告标题">
            <el-input placeholder="输入广告标题" v-model="item.title" @focus="isShowAlert=false"></el-input>
          </el-form-item>
          <el-form-item label="广告图片">
            <el-upload
              class="avatar-uploader"
              :action="fileUploadAction"
              :headers="addHeaders"
              :show-file-list="false"
              :on-success="res=>item.img_url=res.data.result.imgUrl"
              :before-upload="beforeImageUpload"
            >
              <img v-if="item.img_url" :src="item.img_url" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="广告链接">
            <el-input
              placeholder="输入广告链接"
              type="text"
              v-model="item.link_url"
              @focus="isShowAlert=false"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              plain
              @click.prevent="advert.items.splice(index,1)"
            >删除</el-button>
          </el-form-item>
        </div>
      </div>

      <el-form-item style="margin-top:20px;">
        <el-button type="primary" @click.prevent="add">提交</el-button>
      </el-form-item>
    </el-form>
    <el-alert :title="alertMsg" type="error" show-icon v-show="isShowAlert"></el-alert>
  </div>
</template>
<script>
export default {
  name: "AdvertsEdit",
  data() {
    return {
      advert: {
        _id: "",
        name: "",
        items: []
      },
      isShowAlert: false,
      alertMsg: ""
    };
  },
  props: {
    _id: String
  },
  methods: {
    // 添加广告位
    async add() {
      // 判断广告位名是否合法
      let { name, items } = this.advert;
      name = name.trim();
      // 判断是添加广告位还是编辑广告位
      let { _id } = this;
      if (!_id) {
        // 添加广告位---发送ajax请求
        await this.$http.post("/adverts", { name, items });
        // 跳转
        this.$router.push("/adverts/list");
      } else {
        // 编辑广告位---发送ajax请求
        await this.$http.put("/adverts", { _id, name, items });
        // 跳转
        this.$router.push("/adverts/list");
      }
    },
    // 根据_id请求广告位
    async getadvertById() {
      let res = await this.$http.get(`/adverts?_id=${this._id}`);
      this.advert = res.data.data.result;
    }
  },
  created() {
    //在组件的created阶段
    this._id && this.getadvertById(); //当路径参数中有_id时，才执行获取数据操作
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