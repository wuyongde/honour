<template>
  <div class="MyPagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="currPageChange"
      class="pagination"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "MyPagination",
  data() {
    return {
      total: 0,
      currPage: 1
    };
  },
  props: {
    pageSize: {
      type: Number,
      required: true
    },
    apiName: {
      type: String,
      required: true
    },
    changeDatas: {
      type: Function,
      required: true
    },
    changeTotal: {
      type: Function,
      required: true
    },
    changeCurrPage: {
      type: Function,
      required: true
    }
  },
  methods: {
    async currPageChange(currPage) {
      // 当前页改变时，重新获取对应数据
      let result = await this.$http.get(
        `/${this.apiName}?pageSize=${this.pageSize}&currPage=${currPage}`
      );
      //   this.heros = result.data.data.result;
      this.changeDatas(result.data.data.result);
      this.currPage !== currPage ? (this.currPage = currPage) : null;
      this.changeCurrPage(this.currPage);
    },
    async getheros() {
      // 获取总条数
      let res = await this.$http.get(`/${this.apiName}`);
      this.total = res.data.data.result;
      this.changeTotal(this.total);
    }
  },
  created() {
    this.getheros(); //获取总条数
    this.currPageChange(this.currPage); //获取第一页数据
  }
};
</script>