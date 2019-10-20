<template>
  <div class="AdvertsEdit">
    <h1>{{$route.params._id?'编辑':'创建'}}广告位</h1>
    <el-form @submit.native.prevent>
      <el-form-item label="名称">
        <el-input placeholder="输入广告位名称" v-model="advert.name" @focus="isShowAlert=false"></el-input>
      </el-form-item>

    <!-- 添加广告项 -->
     <el-button size="small" type="primary" icon="el-icon-plus" plain @click.prevent="advert.items.push({img_url:'',link_url:'',title:''})">添加技能</el-button>
          <div class="skills-box">
            <div class="item" v-for="(item, index) in advert.items" :key="index">
              <el-form-item label="广告标题">
                <el-input placeholder="输入广告标题" v-model="item.title" @focus="isShowAlert=false"></el-input>
              </el-form-item>
              <el-form-item label="广告图片">
                 <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/uploads'"
              :show-file-list="false"
              :on-success="res=>item.img_url=res.imgUrl"
            >
              <img v-if="item.img_url" :src="item.img_url" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
              </el-form-item>
              <el-form-item label="广告链接">
                <el-input placeholder="输入广告链接" type="text" v-model="item.link_url" @focus="isShowAlert=false"></el-input>
              </el-form-item>             
             <el-form-item>
                <el-button size="small" type="danger" icon="el-icon-delete" plain @click.prevent="advert.items.splice(index,1)">删除</el-button>
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
  methods: {
    // 添加广告位
    add() {
      // 判断广告位名是否合法
      let { name, items } = this.advert;
      name = name.trim();
      if (!name) {
        this.alertMsg = "广告位名称不合法";
        this.isShowAlert = true;
        return;
      }
      // 判断是添加广告位还是编辑广告位
      let { _id } = this.$route.params;
      if (!_id) {
        // 添加广告位---发送ajax请求
        this.$http
          .post("/adverts", { name, items })
          .then(res => {
            // 添加成功
            this.$message({
              type: "success",
              message: "广告位添加成功！"
            });
            this.$router.push("/adverts/list");
          })
          .catch(err => {
            // 添加失败
            this.alertMsg = `广告位添加失败！${err}`;
            this.isShowAlert = true;
          });
      } else {
        // 编辑广告位---发送ajax请求
        this.$http
          .put("/adverts", { _id, name, items })
          .then(res => {
            // 修改成功
            this.$message({
              type: "success",
              message: "广告位修改成功！"
            });
            this.$router.push("/adverts/list");
          })
          .catch(err => {
            // 修改失败
            this.alertMsg = `广告位修改失败！${err}`;
            this.isShowAlert = true;
          });
      }
    },
    // 根据_id请求广告位
    async getadvertById() {
      let _id = this.$route.params._id;
      let res = await this.$http.get(`/adverts?_id=${_id}`);
      this.advert = res.data.data;
    }
  },
  created() {     //在组件的created阶段
   this.$route.params._id && this.getadvertById();     //当路径参数中有_id时，才执行获取数据操作
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