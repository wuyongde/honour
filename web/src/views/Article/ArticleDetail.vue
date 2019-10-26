<template>
  <div class="ArticleDetail">
    <div class="header d-flex flex-ai-center px-2 bb-1 py-2">
      <i class="iconfont iconxiazai6 text-blue text-md" @click="$router.back()"></i>
      <span class="text-blue text-md flex-1 eclips ml-1 mr-2">{{article.title}}</span>
      <span class="text-xs text-grey">{{article.createdAt|formatDate}}</span>
    </div>
    <div class="content px-3 py-3 text-xl" v-html="article.content"></div>
    <div class="related px-3 py-3">
      <div class="header d-flex flex-ai-center mb-3">
        <i class="iconfont iconfaxian text-xl" style="font-size:30px;"></i>
        <span class="text-blue text-md ml-2">相关资讯</span>
      </div>
      <ul>
        <li
          @click="$router.push(`/ArticleDetail/${item._id}`)"
          v-for="(item, index) in article.related"
          :key="index"
          class="d-flex flex-ai-center my-1"
        >
          <span class="flex-1 eclips mr-3">{{item.title}}</span>
          <span class="text-grey">{{item.createdAt | formatDate}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "ArticleDetail",
  data() {
    return {
      article: {
        title: "",
        content: "",
        createdAt: new Date(),
        related: []
      }
    };
  },
  watch: {
    "$route.params._id"() {
      //监听路由中参数变化，然后重新获取文章数据：：难点，如果不这样，因为是同一个组件，它不会自动更新，切记！！！！！
      this.fetchArticleDetail();
    }
  },
  methods: {
    async fetchArticleDetail() {
      let res = await this.$http.get(`/articles?_id=${this.$route.params._id}`);
      this.article = res.data;
    }
  },
  created() {
    this.fetchArticleDetail();
  }
};
</script>
<style lang="scss" scoped>
</style>