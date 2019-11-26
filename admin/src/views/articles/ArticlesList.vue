<template>
  <div class="ArticlesList">
    <h1>文章列表</h1>
    <el-table :data="articles" style="width: 100%" stripe fit>
      <el-table-column prop="_id" label="_id" style="width:220px;"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="pub_date" label="发表日期"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "ArticlesList",
  data() {
    return {
      articles: []
    };
  },
  methods: {
    async getarticles() {
      let res = await this.$http.get("/articles");
      this.articles = res.data.data.result;
    },
    del(row) {
      // 弹框确认是否删除
      this.$confirm(`是否真的删除："${row.title}" `, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 确认要删除，发ajax请求
          await this.$http.delete(`/articles?_id=${row._id}`);
          // 重新获取数据，刷新页面
          this.getarticles();
        })
        .catch(() => {
          // 点击了取消按钮
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getarticles();
  }
};
</script>
<style lang="scss" scoped>
</style>