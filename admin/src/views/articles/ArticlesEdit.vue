<template>
  <div class="ArticlesEdit">
    <h1>{{$route.params._id?'编辑':'创建'}}文章</h1>
    <el-form @submit.native.prevent>
      <el-form-item label="标题">
        <el-input placeholder="输入文章标题" v-model="article.title" @focus="isShowAlert=false"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="article.categories" multiple placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内容">
        <vue-editor
          v-model="article.content"
          useCustomImageHandler
          @image-added="handleImageAdded"
          id="editor"
        ></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.prevent="add">提交</el-button>
      </el-form-item>
    </el-form>
    <el-alert :title="alertMsg" type="error" show-icon v-show="isShowAlert"></el-alert>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor"; //引入富文本编辑器组件
import { articleParent } from "../../plugins/config";
export default {
  name: "ArticlesEdit",
  data() {
    return {
      article: {
        _id: "",
        title: "",
        categories: [],
        content: ""
      },
      isShowAlert: false,
      alertMsg: "",
      categories: []
    };
  },
  props: {
    _id: String
  },
  components: {
    VueEditor
  },
  methods: {
    // 添加文章
    async add() {
      // 判断文章名是否合法
      let { title, categories, content } = this.article;
      title = title.trim();
      // 判断是添加文章还是编辑文章
      let { _id } = this;
      if (!_id) {
        // 添加文章---发送ajax请求
        await this.$http.post("/articles", { title, categories, content });
        // 跳转
        this.$router.push("/articles/list");
      } else {
        // 编辑文章---发送ajax请求
        await this.$http.put("/articles", { title, categories, content, _id });
        // 跳转
        this.$router.push("/articles/list");
      }
    },
    // 根据_id请求文章
    async getarticleById() {
      let res = await this.$http.get(`/articles?_id=${this._id}`);
      this.article = res.data.data.result;
    },
    // 获取新闻资讯下的所有子分类
    async getCategories() {
      let result = await this.$http.get(`/categories?parent=${articleParent}`);
      this.categories = result.data.data.result;
    },

    // 自定义富文本编辑器中图片上传的处理函数
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //  校验上传图片大小与格式:校验失败，则直接return，后面代码不再执行
      if (!this.beforeImageUpload(file)) {
        return;
      }
      // 代码执行到此，说明图片校验成功。
      var formData = new FormData();
      formData.append("file", file);
      // 发ajax请求
      let res = await this.$http.post(this.fileUploadAction, formData);
      // console.log(res.data.imgUrl)
      Editor.insertEmbed(cursorLocation, "image", res.data.data.result.imgUrl);
      resetUploader();
    }
  },
  created() {
    //在组件的created阶段
    this.getCategories(); //获取文章分类列表
    this._id && this.getarticleById(); //当路径参数中有_id时，才执行获取数据操作
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