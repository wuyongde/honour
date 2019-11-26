<template>
  <div class="HerosList">
    <h1>英雄列表</h1>
    <el-table :data="heros" style="width: 100%" stripe fit>
      <el-table-column type="index" :index="fnIndex" label="序号" style="width:100px;"></el-table-column>
      <el-table-column prop="_id" label="_id" style="width:220px;"></el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt style="height:50px;width:50px;border-radius:5px;" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/heros/edit/${scope.row._id}`)"
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
  name: "HerosList",
  data() {
    return {
      heros: [],
      total: 0,
      pageSize: 8,
      currPage: 1,
      apiName: "heros"
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
      this.heros = datas;
    },
    changeTotal(total) {
      this.total = total;
    },
    changeCurrPage(currPage) {
      this.currPage = currPage;
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
          await this.$http.delete(`/heros?_id=${row._id}`);
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
  }
};
</script>
<style lang="scss" scoped>
</style>