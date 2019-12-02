<template>
  <div class="Home">
    <swiper :options="swiperOption_ad" ref="mySwiper_ad" class="swiperBox_ad">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in top_ads" :key="index">
        <a :href="item.link_url">
          <img :src="item.img_url" alt class="w-100 h-100" />
        </a>
      </swiper-slide>

      <!-- Optional controls -->
      <div class="swiper-pagination-ad" slot="pagination"></div>
    </swiper>

    <!-- navs  -->
    <div class="navs bg-white mt-3">
      <div class="nav-box d-flex" :class="{'flex-wrap':!packup_flag}">
        <div
          class="nav-item d-flex flex-column flex-ai-center my-3"
          v-for="(item,n) in nav_items"
          :key="n"
        >
          <i class="sprites" :class="`sprites-${item.icon_class}`"></i>
          <span class="text-sm mt-2 text-dark-1">{{item.title}}</span>
        </div>
      </div>
      <div class="packup text-center bg-light-1 py-2" @click="packup_flag=!packup_flag">
        <i class="sprites sprites-arrow" :class="{reverse:packup_flag===true}"></i>
        <span class="text-sm text-dark-1 ml-1">{{packup_flag?'展开':'收起'}}</span>
      </div>
    </div>

    <!-- news -->
    <my-card-item :contents="news_contents" icon="news" title="新闻资讯" theme="news">
      <template #slide_item="newsProps">
        <!-- solot传递值 ，理解！！-->
        <swiper-slide v-for="(content, index) in newsProps.contents" :key="index">
          <ul>
            <router-link
              tag="li"
              :to="`/ArticleDetail/${item._id}`"
              class="mb-3 d-flex flex-ai-center text-dark-1"
              v-for="(item,i) in content.newsList"
              :key="i"
            >
              <span class="text-blue">[{{item.categoryName}}]</span>
              <span class="mx-1">|</span>
              <a class="flex-1 eclips">{{item.title}}</a>
              <span class="ml-2 text-sm text-grey">{{item.createdAt | formatDate}}</span>
            </router-link>
          </ul>
        </swiper-slide>
      </template>
    </my-card-item>

    <!-- heros -->
    <my-card-item :contents="heros_contents" icon="heros" title="英雄列表" theme="heros">
      <template #slide_item="newsProps">
        <!-- solot传递值 ，理解！！-->
        <swiper-slide v-for="(content, index) in newsProps.contents" :key="index">
          <ul class="d-flex flex-wrap">
            <router-link
              tag="li"
              :to="`/HeroDetail/${hero._id}`"
              v-for="(hero, index) in content.herosList"
              :key="index"
              style="width:20%;"
              class="d-flex flex-column flex-ai-center"
            >
              <img :src="hero.icon" alt style="width:4.3715rem;height:4.3715rem;" />
              <h3 class="text-xs text-dark-1 my-1" style="font-weight:400;">{{hero.name}}</h3>
            </router-link>
          </ul>
        </swiper-slide>
      </template>
    </my-card-item>

    <!-- videos -->
    <my-card-item :contents="videos_contents" icon="videos" title="精彩视频" theme="videos">
      <template #slide_item="newsProps">
        <!-- solot传递值 ，理解！！-->
        <swiper-slide v-for="(content, index) in newsProps.contents" :key="index">
          <ul class="d-flex flex-wrap flex-jc-between">
            <router-link
              tag="li"
              :to="`/VideoDetail/${video._id}`"
              v-for="(video, index) in content.videosList"
              :key="index"
              style="width:49%;"
              class="d-flex flex-column flex-ai-center"
            >
              <img :src="video.imgUrl" alt style="width:100%;height:7.3077rem;" />
              <h3
                class="text-sm text-dark-1 my-1"
                style="font-weight:400;height:2.7692rem;width:100%;overflow:hidden;"
              >{{video.title}}</h3>
              <div class="d-flex flex-ai-center text-xs text-grey px-1" style="width:100%;">
                <i class="sprites sprites-videos"></i>
                <span class="flex-1 mx-1">{{video.playSort}}</span>
                <span>{{video.createdAt | formatDate('MM-DD')}}</span>
              </div>
            </router-link>
          </ul>
        </swiper-slide>
      </template>
    </my-card-item>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      nav_items: [
        { title: "爆料站", icon_class: "tipoff" },
        { title: "故事站", icon_class: "story" },
        { title: "周边商城", icon_class: "shop" },
        { title: "体验服", icon_class: "taste" },
        { title: "新人专区", icon_class: "new" },
        { title: "荣耀.传承", icon_class: "inherit" },
        { title: "模拟战资料库", icon_class: "lib" },
        { title: "王者营地", icon_class: "lion" },
        { title: "公众号", icon_class: "public" },
        { title: "版本介绍", icon_class: "ver" },
        { title: "对局环境", icon_class: "fight" },
        { title: "无限王者团", icon_class: "infint" }
      ],
      top_ads: [], //顶部轮播图
      packup_flag: false,
      news_contents: [],
      heros_contents: [],
      videos_contents: [],
      swiperOption_ad: {
        autoplay: true,
        speed: 500,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination-ad",
          clickable: true
        }
      }
    };
  },
  computed: {
    swiper_ad() {
      return this.$refs.mySwiper_ad.swiper;
    }
  },
  mounted() {},
  created() {
    this.fetch_news();
    this.fetch_heros();
    this.fetch_top_ads();
    this.fetch_videos();
  },
  methods: {
    async fetch_news() {
      let result = await this.$http.get("/news");
      this.news_contents = result.data;
    },
    async fetch_heros() {
      let result = await this.$http.get("/heros");
      this.heros_contents = result.data;
    },
    async fetch_videos() {
      let result = await this.$http.get("/videos");
      this.videos_contents = result.data;
    },
    async fetch_top_ads() {
      // 获取顶部轮播图数据
      let result = await this.$http.get("/top_ads");
      this.top_ads = result.data;
    }
  }
};
</script>
<style lang="scss">
// 引scss变量
@import "../../assets//styles/_variables.scss";
.Home {
  .swiperBox_ad {
    position: relative;
    a {
      display: block;
      width: 100vw;
      height: 12.6923rem;
    }

    .swiper-pagination-ad {
      z-index: 999;
      position: absolute;
      right: 20px;
      bottom: 10px;
      background-color: rgba(0, 0, 0, 0);
      text-align: right;
      padding-right: 15px;
      & > span {
        &.swiper-pagination-bullet {
          border-radius: 2px;
          background-color: #fff;
        }
        &.swiper-pagination-bullet-active {
          background-color: map-get($colors, "primary");
        }
      }
    }
  }

  //   navs
  .navs {
    border-top: 1px solid map-get($colors, "grey-1");
    border-bottom: 1px solid map-get($colors, "grey-1");
    .nav-box {
      .nav-item {
        width: 25%;
        flex-shrink: 0;
        border-right: 1px solid map-get($colors, "light");
        &:nth-child(4n) {
          border-right: none;
        }
      }
      .packup {
      }
    }
  }
}
</style>


