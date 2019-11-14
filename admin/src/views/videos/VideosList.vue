<template>
  <div class="VideosList">
    <h1>视频列表</h1>
    <el-table :data="videos" style="width: 100%" stripe fit>
      <el-table-column prop="_id" label="_id" style="width:220px;"></el-table-column>
      <el-table-column prop="category.name" label="视频分类"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="playSort" label="播放次数"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/videos/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  name: "VideosList",
  data() {
    return {
      videos: []
    };
  },
  computed: {
   
  },
  methods: {
    async getvideos() {
      let res = await this.$http.get("/videos");
      this.videos = res.data.data;
      this.videos.map(video=>{
        video.createdAt = dayjs(video.createdAt).format('YYYY-MM-DD')
      })
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
          let res = await this.$http.delete(`/videos?_id=${row._id}`);
          if (res.data.code === 0) {
            //删除成功
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            // 重新获取数据，刷新页面
            this.getvideos();
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
    this.getvideos();
  }
};
</script>
<style lang="scss" scoped>
</style>