<template>
  <div class="CategoriesEdit">
    <h1>{{$route.params._id?'编辑':'创建'}}分类</h1>
    <el-form @submit.native.prevent>
      <el-form-item label="选择父类">
        <el-select v-model="category.parent" placeholder="请选择">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input placeholder="输入分类名称" v-model="category.name" @focus="isShowAlert=false"></el-input>
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
  name: "CategoriesEdit",
  data() {
    return {
      category: {
        _id: "",
        name: ""
      },
      parents: [],
      isShowAlert: false,
      alertMsg: ""
    };
  },
  methods: {
    // 添加分类
    add() {
      // 判断分类名是否合法
      let { name, parent } = this.category;
      name = name.trim();
      if (!name) {
        this.alertMsg = "分类名称不合法";
        this.isShowAlert = true;
        return;
      }
      // 判断是添加分类还是编辑分类
      let { _id } = this.$route.params;
      if (!_id) {
        // 添加分类---发送ajax请求
        this.$http
          .post("/categories", { name, parent })
          .then(res => {
            // 添加成功
            this.$message({
              type: "success",
              message: "分类添加成功！"
            });
            this.$router.push("/categories/list");
          })
          .catch(err => {
            // 添加失败
            this.alertMsg = `分类添加失败！${err}`;
            this.isShowAlert = true;
          });
      } else {
        // 编辑分类---发送ajax请求
        this.$http
          .put("/categories", { _id, name,parent })
          .then(res => {
            // 修改成功
            this.$message({
              type: "success",
              message: "分类修改成功！"
            });
            this.$router.push("/categories/list");
          })
          .catch(err => {
            // 修改失败
            this.alertMsg = `分类修改失败！${err}`;
            this.isShowAlert = true;
          });
      }
    },
    // 根据_id请求分类
    async getCategoryById() {
      // 判断_id是否存在
      let _id = this.$route.params._id;
      if (!_id) {
        return;
      }
      let res = await this.$http.get(`/categories?_id=${_id}`);
      this.category = res.data.data;
    },
    // 获取所有父级分类
    async getParents() {
      let res = await this.$http.get(`/categories`);
      this.parents = res.data.data;
    }
  },
  created() {
    this.getParents();
    this.getCategoryById();
  }
};
</script>
<style lang="scss" scoped>
</style>