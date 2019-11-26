<template>
  <div class="ArticlesList">
    <h1>文章列表</h1>
    <el-table :data="articles" style="width: 100%" stripe fit>
      <el-table-column type="index" :index="fnIndex" label="序号" style="width:100px;"></el-table-column>
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

    <!-- 分页显示 -->
    <MyPagination
      :changeDatas="changeDatas"
      :changeTotal="changeTotal"
      :changeCurrPage="changeCurrPage"
      :pageSize="pageSize"
      ref="pagination"
      :apiName="apiName"
    ></MyPagination>
  </div>
</template>
<script>
import MyPagination from "../../components/MyPagination.vue";
export default {
  name: "ArticlesList",
  data() {
    return {
      articles: [],
       total: 0,
      pageSize: 8,
      currPage: 1,
      apiName: "articles"
    };
  },
   components: {
    MyPagination
  },
  methods: {
    fnIndex(index) {
      let { pageSize, currPage } = this;
      return 1 + (currPage - 1) * pageSize + index;
    },
     changeDatas(datas) {
      this.articles = datas;
    },
    changeTotal(total) {
      this.total = total;
    },
    changeCurrPage(currPage) {
      this.currPage = currPage;
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
          this.$refs.pagination.currPageChange(this.currPage);
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
};
</script>
<style lang="scss" scoped>
</style>