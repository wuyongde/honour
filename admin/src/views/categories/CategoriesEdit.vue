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
        <el-input placeholder="输入分类名称" v-model.trim="category.name" @blur="isShowAlert=true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="add" :disabled="formCheckFlag">提交</el-button>
      </el-form-item>
    </el-form>
    <el-alert
      :title="alertMsg"
      type="error"
      show-icon
      v-show="formCheckFlag && isShowAlert"
    ></el-alert>
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
  props: {
    _id: String
  },
  computed: {
    // 表单校验
    formCheckFlag() {
      // 定义正则
      const regCategoryName = /^([a-zA-Z]|[\u4E00-\u9FA5]){2,16}$/;
      // 取表单值
      let { name } = this.category;
      // 校验
      if (!regCategoryName.test(name)) {
        this.alertMsg = "分类名必须是2-16位的英文字母及汉字的组合";
        return true;
      }
      return false;
    }
  },
  methods: {
    // 添加分类
    async add() {
      // 取表单数据
      let { name, parent } = this.category;
      // 判断是添加分类还是编辑分类
      let { _id } = this;
      if (!_id) {
        // 添加
        await this.$http.post("/categories", { name, parent }); //这里ajax出错的话会有统一的处理
        //  路由跳转
        this.$router.push("/categories/list");
      } else {
        // 修改
        await this.$http.put("/categories", { _id, name, parent });
        //  路由跳转
        this.$router.push("/categories/list");
      }
    },
    // 根据_id请求分类
    async getCategoryById() {
      // 判断_id是否存在
      if (!this._id) {
        return;
      }
      let res = await this.$http.get(`/categories?_id=${this._id}`);
      this.category = res.data.data.result;
    },
    // 获取所有父级分类
    async getParents() {
      let res = await this.$http.get(`/categories`);
      this.parents = res.data.data.result;
    }
  },
  created() {
    this.getParents();
    this._id && this.getCategoryById();
  }
};
</script>
<style lang="scss" scoped>
</style>