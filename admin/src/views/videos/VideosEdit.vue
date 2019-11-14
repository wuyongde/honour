<template>
  <div class="VideosEdit">
    <h1>{{$route.params._id?'编辑':'创建'}}视频</h1>
    <el-form @submit.native.prevent>
      <el-form-item label="选择视频分类">
        <el-select v-model="video.category" placeholder="请选择">
          <el-option
            v-for="category in categories"
            :key="category._id"
            :label="category.name"
            :value="category._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="视频标题">
        <el-input placeholder="输入视频标题" v-model="video.title" @focus="isShowAlert=false"></el-input>
      </el-form-item>
      <el-form-item label="播放次数">
        <el-input placeholder="输入视频播放次数" v-model="video.playSort" @focus="isShowAlert=false"></el-input>
      </el-form-item>
      <el-form-item label="上传日期">
        <el-date-picker v-model="video.createdAt" type="date" placeholder="选择上传日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="封面图片">
        <el-upload
          class="avatar-uploader"
          :action="fileUploadAction"
          :show-file-list="false"
          :on-success="afterUploadImg"
          :on-error="errorUpload"
          :headers="addHeaders"
        >
          <img v-if="video.imgUrl" :src="video.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="视频">
        <el-upload
          class="avatar-uploader"
          :action="fileUploadAction"
          :show-file-list="false"
          :on-success="afterUploadVideo"
          :on-error="errorUpload"
          :headers="addHeaders"
        >
          <!-- <img v-if="video.url" :src="video.url" class="avatar" /> -->
          <video controls v-if="video.url" class="avatar">
            <source :src="video.url" type="video/mp4" />
            <source :src="video.url" type="video/ogg" />您的浏览器不支持Video标签。
          </video>
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
  name: "VideosEdit",
  data() {
    return {
      video: {
        _id: "",
        title: "",
        url: "",
        imgUrl: "",
        category: "",
        playSort: 0,
        createdAt: new Date()
      },
      isShowAlert: false,
      alertMsg: "",
      categories: []
    };
  },
  methods: {
    // 图片上传成功后的操作
    afterUploadImg(res) {
      this.$set(this.video, "imgUrl", res.imgUrl);
    },
    // 视频上传成功后的操作
    afterUploadVideo(res) {
      this.$set(this.video, "url", res.imgUrl);
    },
    // 文件上传失败的操作
    errorUpload(err) {
      // 判断：如果返回的状态码为401，说明是token校验失败，则跳转到登录页
      if (err.status === 401) {
        this.$message({
          type: "error",
          message: "token校验失败，请重新登录"
        });
        this.$router.push("/Login");
      }
    },

    // 添加视频
    add() {
      // 判断视频名是否合法
      let { title, url, imgUrl, category } = this.video;
      title = title.trim();
      if (!title) {
        this.alertMsg = "视频标题不合法";
        this.isShowAlert = true;
        return;
      }
      // 判断是添加视频还是编辑视频
      let { _id } = this.$route.params;
      if (!_id) {
        // 添加视频---发送ajax请求
        this.$http
          .post("/videos", { title, url, imgUrl, category })
          .then(res => {
            // 添加成功
            this.$message({
              type: "success",
              message: "视频添加成功！"
            });
            this.$router.push("/videos/list");
          })
          .catch(err => {
            // 添加失败
            this.alertMsg = `视频添加失败！${err}`;
            this.isShowAlert = true;
          });
      } else {
        // 编辑视频---发送ajax请求
        this.$http
          .put("/videos", { _id, title, url, imgUrl, category })
          .then(res => {
            // 修改成功
            this.$message({
              type: "success",
              message: "视频修改成功！"
            });
            this.$router.push("/videos/list");
          })
          .catch(err => {
            // 修改失败
            this.alertMsg = `视频修改失败！${err}`;
            this.isShowAlert = true;
          });
      }
    },
    // 根据_id请求视频
    async getvideoById() {
      let _id = this.$route.params._id;
      let res = await this.$http.get(`/videos?_id=${_id}`);
      this.video = res.data.data;
    },
    // 获取视频分类
    async getVideoCategories() {
      let parent = "5dca69e31cfca528dea00e5a";
      let result = await this.$http.get(`/categories?parent=${parent}`); //只取视频分类下面的子分类
      this.categories = result.data.data;
    }
  },
  created() {
    //在组件的created阶段
    this.$route.params._id && this.getvideoById(); //当路径参数中有_id时，才执行获取数据操作
    this.getVideoCategories();
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
  width: 378px;
  height: auto;
  display: block;
}
</style>