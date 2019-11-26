<template>
  <div class="AdvertsList">
    <h1>广告位列表</h1>
    <el-table :data="adverts" style="width: 100%" stripe fit>
      <el-table-column prop="_id" label="_id" style="width:220px;"></el-table-column>
      <el-table-column prop="name" label="广告位名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/adverts/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "AdvertsList",
  data() {
    return {
      adverts: []
    };
  },
  methods: {
    async getadverts() {
      let res = await this.$http.get("/adverts");
      this.adverts = res.data.data.result;
    },
    del(row) {
      // 弹框确认是否删除
      this.$confirm(`是否真的删除："${row.name}" `, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 确认要删除，发ajax请求
          await this.$http.delete(`/adverts?_id=${row._id}`);
          // 重新获取数据，刷新页面
          this.getadverts();
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
    this.getadverts();
  }
};
</script>
<style lang="scss" scoped>
</style>