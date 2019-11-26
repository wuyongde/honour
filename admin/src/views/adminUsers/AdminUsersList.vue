<template>
  <div class="AdminUsersList">
    <h1>管理员列表</h1>
    <el-table :data="adminUsers" style="width: 100%" stripe fit>
      <el-table-column prop="_id" label="_id" style="width:220px;"></el-table-column>

      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope" v-if="scope.row.username !== 'admin'">
          <el-button
            :disabled="scope.row.username === 'admin'"
            type="primary"
            size="small"
            @click="$router.push(`/adminUsers/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "AdminUsersList",
  data() {
    return {
      adminUsers: []
    };
  },
  methods: {
    async getAdminUsers() {
      let res = await this.$http.get("/adminUsers");
      this.adminUsers = res.data.data.result;
    },
    del(row) {
      // 弹框确认是否删除
      this.$confirm(`是否真的删除："${row.username}" `, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 确认要删除，发ajax请求
          let res = await this.$http.delete(`/adminUsers?_id=${row._id}`);
          // 重新获取数据，刷新页面
          this.getAdminUsers();
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
    this.getAdminUsers();
  }
};
</script>
<style lang="scss" scoped>
</style>