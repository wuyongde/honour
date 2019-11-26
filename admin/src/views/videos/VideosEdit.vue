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
          :before-upload="beforeImageUpload"
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
          :before-upload="beforeVideoUpload"
        >
          <!-- <img v-if="video.url" :src="video.url" class="avatar" /> -->
          <video controls v-if="video.url" class="avatar" ref="videoObj">
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
import { videoParent } from "../../plugins/config";
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
  props: {
    _id: String
  },
  methods: {
    // 图片上传成功后的操作
    afterUploadImg(res) {
      this.$set(this.video, "imgUrl", res.data.result.imgUrl);
    },
    // 视频上传成功后的操作
    afterUploadVideo(res) {
      this.$set(this.video, "url", res.data.result.imgUrl); //重新设置video视频地址
      this.$refs.videoObj.load(); //重新加载video
    },

    // 添加视频
    async add() {
      // 判断视频名是否合法
      let { title, url, imgUrl, category } = this.video;
      title = title.trim();

      // 判断是添加视频还是编辑视频
      let { _id } = this;
      if (!_id) {
        // 添加视频---发送ajax请求
        await this.$http.post("/videos", { title, url, imgUrl, category });
        // 跳转
        this.$router.push("/videos/list");
      } else {
        // 编辑视频---发送ajax请求
        await this.$http.put("/videos", { _id, title, url, imgUrl, category });
        // 跳转
        this.$router.push("/videos/list");
      }
    },
    // 根据_id请求视频
    async getvideoById() {
      let res = await this.$http.get(`/videos?_id=${this._id}`);
      this.video = res.data.data.result;
    },
    // 获取视频分类
    async getVideoCategories() {
      let result = await this.$http.get(`/categories?parent=${videoParent}`); //只取视频分类下面的子分类
      this.categories = result.data.data.result;
    }
  },
  created() {
    //在组件的created阶段
    this._id && this.getvideoById(); //当路径参数中有_id时，才执行获取数据操作
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