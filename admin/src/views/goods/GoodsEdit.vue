<template>
  <div class="GoodsEdit">
    <h1>{{$route.params._id?'编辑':'创建'}}物品</h1>
    <el-form @submit.native.prevent>
      <el-form-item label="名称">
        <el-input placeholder="输入物品名称" v-model="good.name" @focus="isShowAlert=false"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input placeholder="输入图标名称" v-model="good.icon" @focus="isShowAlert=false"></el-input>
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
      // 判断_id是否存在
      let _id = this.$route.params._id;
      if (!_id) {
        return;
      }
      let res = await this.$http.get(`/goods?_id=${_id}`);
      this.good = res.data.data;
    }
  },
  created() {
    this.getgoodById();
  }
};
</script>
<style lang="scss" scoped>
</style>