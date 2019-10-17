<template>
  <div class="GoodsList">
    <h1>物品列表</h1>
    <el-table :data="goods" style="width: 100%" stripe fit>
      <el-table-column prop="_id" label="_id" style="width:220px;"></el-table-column>
      <el-table-column prop="icon" label="图标"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/goods/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "GoodsList",
  data() {
    return {
      goods: []
    };
  },
  methods: {
    async getgoods() {
      let res = await this.$http.get("/goods");
      this.goods = res.data.data;
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
          let res = await this.$http.delete(`/goods?_id=${row._id}`);
          if (res.data.code === 0) {
            //删除成功
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            // 重新获取数据，刷新页面
            this.getgoods();
          }
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
    this.getgoods();
  }
};
</script>
<style lang="scss" scoped>
</style>