<template>
  <div class="Home">
    <swiper :options="swiperOption_ad" ref="mySwiper_ad" class="swiperBox_ad">
      <!-- slides -->
      <swiper-slide>
        <a href="http://www.baidu.com/">
          <img src="../../assets/images/home-ad-1.jpeg" alt class="w-100 h-100" />
        </a>
      </swiper-slide>
      <swiper-slide>
        <a href="http://www.baidu.com/">
          <img src="../../assets/images/home-ad-2.jpeg" alt class="w-100 h-100" />
        </a>
      </swiper-slide>
      <swiper-slide>
        <a href="http://www.baidu.com/">
          <img src="../../assets/images/home-ad-3.jpeg" alt class="w-100 h-100" />
        </a>
      </swiper-slide>

      <!-- Optional controls -->
      <div class="swiper-pagination-ad" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>

    <!-- navs  -->
    <div class="navs bg-white mt-3">
      <div class="nav-box d-flex flex-wrap">
        <div class="nav-item d-flex flex-column flex-ai-center my-3" v-for="n in 12" :key="n">
          <i class="sprites sprites-tipoff"></i>
          <span class="text-sm mt-2 text-dark-1">爆料站</span>
        </div>
      </div>
      <div class="packup text-center bg-light-1 py-2">
        <i class="sprites sprites-arrow"></i>
        <span class="text-sm text-dark-1 ml-1">收起</span>
      </div>
    </div>

    <!-- news -->
    <div class="news bg-white px-3 mt-3 bb-1">
      <div class="header d-flex py-3 flex-ai-center">
          <i class="sprites sprites-news"></i>
          <span class="flex-1 ml-2 text-xl">新闻资讯</span>
          <i class="sprites sprites-more"></i>
      </div>
      <div class="tabs-menu d-flex flex-jc-between flex-ai-center py-3 text-dark">
          <span :class="{active_news:news_curr_index===n}" v-for="n in 5" :key="n" @click="news_menu_click(n)">热门</span>
      </div>
      <swiper :options="swiperOption_news" ref="mySwiper_news" class="swiperBox_news">
        <!-- slides -->
        <swiper-slide v-for="m in 5" :key="m">
          <ul>
            <li class="mb-3 d-flex flex-ai-center text-dark-1" v-for="n in 5" :key="n">
                <span>[公告]</span>
                <span class="mx-1">|</span>
                <span class="flex-1 eclips">10月23日体验服停机更新公告 3日体验服停机更新公告</span>
                <span class="ml-2">10/23</span>
            </li>
          </ul>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      news_categray: ["热门", "新闻", "公告", "活动", "赛事"],
      news_curr_index:1,
      swiperOption_ad: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        autoplay: true, //可选选项，自动滑动
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination-ad",
          clickable: true,
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
       swiperOption_news: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        // 如果需要分页器
      },
    };
  },
  computed: {
      swiper_ad() {
        return this.$refs.mySwiper_ad.swiper
      },
       swiper_news() {
        return this.$refs.mySwiper_news.swiper
      },
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    //   this.swiper.slideTo(3, 1000, false)
    },
    methods: {
        news_menu_click(n){
            this.news_curr_index = n
            this.swiper_news.slideTo(n-1, 300, false)
        }
    },
};
</script>
<style lang="scss" scoped>
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
    }
    .swiper-button-prev {
      height: 20px;
      width: 25px;
    }
    .swiper-button-next {
      height: 20px;
      width: 25px;
    }
  }

  //   navs
  .navs {
    border-top: 1px solid map-get($colors, "grey-1");
    border-bottom: 1px solid map-get($colors, "grey-1");
    .nav-box {
      .nav-item {
        width: 25%;
        border-right: 1px solid map-get($colors, "light");
        &:nth-child(4n) {
          border-right: none;
        }
      }
    }
    .packup {
    }
  }

//   news
.news{

    .header{
        border-bottom: 1px solid map-get($colors, "light");
    }
    .tabs-menu{

        .active_news{
            border-bottom: 2px solid map-get($colors, 'primary' );
            color: map-get($colors, 'primary' );
        }
    }
    .swiperBox_news{

    }

}
}
</style>