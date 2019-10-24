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
    <my-card-item :contents="news_contents" icon="news" title="新闻资讯" theme="news">
      <template #slide_item="newsProps">
        <!-- solot传递值 ，理解！！-->
        <swiper-slide v-for="(content, index) in newsProps.contents" :key="index">
          <ul>
            <li
              class="mb-3 d-flex flex-ai-center text-dark-1"
              v-for="(item,i) in content.items"
              :key="i"
            >
              <span>[{{item.categray}}]</span>
              <span class="mx-1">|</span>
              <span class="flex-1 eclips">{{item.title}}</span>
              <span class="ml-2">{{item.cDate}}</span>
            </li>
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
      news_contents: new Array(5).fill({}).map((v, i) => {
        return {
          name: "热门" + i,
          items: new Array(5).fill({}).map((val, index) => {
            return {
              categray: "热门" + i,
              title: "10月23日体验服停机更新公告" + index,
              cDate: "10/23"
            };
          })
        };
      }),

      swiperOption_ad: {
        autoplay: true, //可选选项，自动滑动
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination-ad",
          clickable: true
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
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

  methods: {}
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
  }
}
</style>