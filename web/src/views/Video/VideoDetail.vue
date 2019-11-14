<template>
  <div class="VideoDetail">
    <!-- 注意！！此处要注意video标签中视频的加载方式：读到video标签就加载视频 -->
    <div class="videoBox" v-if="video.url">
      <video controls ref="video" @play="sumPlay">
        <source :src="video.url" type="video/mp4" />
        <source :src="video.url"  type="video/ogg" />
        您的浏览器不支持Video标签。
      </video>
    </div>
    <!-- 描述 -->
    <div class="descri d-flex mx-1 mt-3 py-1 flex-ai-start" style="border:1px solid #ddd;">
      <img :src="video.imgUrl" alt="" style="width:4.3077rem;height:5rem;">
      <div class="d-flex flex-column flex-ai-start ml-3 flex-jc-center">
        <p class="text-sm">{{video.title}}</p>
        <span class="text-xs text-grey">投稿：79 粉丝：212</span>
        <span class="text-xs text-grey">个性签名：</span>
      </div>
    </div>
    <!-- 猜您喜欢 -->
    <div class="likes">
      <div class="my-2 text-sm d-flex flex-ai-center mx-2">
        <i class="iconfont iconclose"></i>
        <span>猜您喜欢</span>
      </div>

      <div class="box  mx-2" style="overflow:auto;" v-if="video.likes">
        <ul :style="{width:(video.likes.length * 140)+'px'}" class="d-flex">
        <router-link tag="li" :to="`/VideoDetail/${item._id}`" style="width:137px;height:140px;" class="mr-2 " v-for="(item) in video.likes" :key="item._id">
          <img :src="item.imgUrl" alt="" style="height:96px;width:100%;border-radius:5px;">
          <p class="text-sm text-dark">{{item.title}}</p>
        </router-link>
      </ul>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "VideoDetail",
  data() {
    return {
      video: {
        
      },
      
    };
  },
  props: {
    _id: { type: String }
  },
  watch: {
    "$route.params._id"() {
      //监听路由中参数变化，然后重新获取视频数据：：难点，如果不这样，因为是同一个组件，它不会自动更新，切记！！！！！
      this.fetchvideoDetail();
      this.$refs.video.load()       //重新加载视频
    }
  },
  methods: {
    async fetchvideoDetail() {
      let res = await this.$http.get(`/videos?_id=${this.$route.params._id}`);
      this.video = res.data;
    },
   async sumPlay(){
      // 播放计数增加
      let num = this.video.playSort
      num ++
      const res = await this.$http.patch('/videos',{
        _id:this._id,
        playSort:num
      })
      this.fetchvideoDetail()
    }
  },
  created() {
    this.fetchvideoDetail();
  }
};
</script>
<style lang="scss" scoped>
.VideoDetail {

  video{
    width: 100%;
  }
  .descri{
    span{
      line-height: 1.5em;
    }
  }
}

</style>