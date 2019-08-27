<template>
  <div class="CategoriesEdit">
    <h1>创建分类</h1>
    <el-form @submit.native.prevent>
      <el-form-item label="名称">
        <el-input placeholder="输入分类名称" v-model="name" @focus="isShowAlert=false"></el-input>
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
      name: "",
      isShowAlert: false,
      alertMsg: ""
    };
  },
  methods: {
    // 添加分类
    add() {
      // 判断分类名是否合法
      let { name } = this;
      name = name.trim();
      if (!name) {
        this.alertMsg = "分类名称不合法";
        this.isShowAlert = true;
        return;
      }
      // 发送ajax请求
      this.$http
        .post("/categories", { name })
        .then(res => {
          // 添加成功
          this.$message("分类添加成功！");
          this.$router.push("/categories/list");
        })
        .catch(err => {
          // 添加失败
          this.alertMsg = `分类添加失败！${err}`;
          this.isShowAlert = true;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>