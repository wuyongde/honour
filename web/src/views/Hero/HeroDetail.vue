<template>
  <div class="HeroDetail">
    <!-- topBar -->
    <div class="topBar bg-black py-2 px-3 d-flex flex-ai-center text-white">
      <img :src="model.icon" alt style="width:2.0769rem;height:2.0769rem;border-radius:0.3846rem;" />
      <span class="mx-3">王者荣耀</span>
      <span class="flex-1">攻略站</span>
      <router-link to="/Home" tag="div" class="text-xs d-flex flex-ai-center">
        <span class="mr-1">更多英雄</span>
        <i class="iconfont iconicondayu"></i>
      </router-link>
    </div>
    <!-- hero intro -->
    <div class="intros text-white px-3 py-2" :style="{backgroundImage:`url(${model.bg_img})`}">
      <div class="d-flex flex-column flex-jc-start">
        <span class="text-xs">{{model.title}}</span>
        <span class="text-xl">{{model.name}}</span>
        <span class="text-xs">{{model.categories.map(item=>item.name).join('/')}}</span>
        <div class="d-flex flex-ai-center" v-if="model.scores">
          <div class="scores flex-1 text-sm d-flex flex-ai-center">
            <span>难度</span>
            <span class="bradge bg-primary">{{model.scores.diffcut}}</span>
            <span>技能</span>
            <span class="bradge bg-blue">{{model.scores.technicl}}</span>
            <span>攻击</span>
            <span class="bradge bg-primary">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="bradge bg-blue">{{model.scores.live}}</span>
          </div>
          <div class="right text-grey text-xs d-flex flex-ai-center">
            <span>皮肤：7</span>
            <i class="iconfont iconicondayu"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- hero main intro -->
    <div class="main px-2 bg-white">
      <!-- nav -->
      <div class="nav d-flex flex-jc-around pt-3 pb-2 text-sm bb-1">
        <div class="nav-item" :class="{active:curr_index===0}" @click="nav_item_click(0)">
          <div class="nav-link">英雄初始</div>
        </div>
        <div class="nav-item" :class="{active:curr_index===1}" @click="nav_item_click(1)">
          <div class="nav-link">进阶攻略</div>
        </div>
      </div>
      <!-- swiper -->
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide>
            <div class="skills py-2">
                <div class="btns d-flex text-md">
                    <router-link to="/Home" tag="div" class="flex-1 py-2 d-flex flex-ai-center flex-jc-center">
                        <i class="iconfont iconqicheqianlian- text-primary "></i>
                        <span class="ml-2">英雄介绍视频</span>
                    </router-link>
                    <router-link to="/Home" tag="div" class="flex-1 ml-2 py-2 d-flex flex-ai-center flex-jc-center">
                        <i class="iconfont iconqicheqianlian- text-primary "></i>
                        <span class="ml-2">一图识英雄</span>
                    </router-link>
                </div>
                <div class="pics d-flex flex-jc-around mt-4 mb-3">
                    <img :class="{active:curr_skill_index===index}" @click="curr_skill_index=index" :src="skill.icon" :alt="skill.name" v-for="(skill, index) in model.skills" :key="index" width="63" height="63">
                </div>
                <div class="contents px-1">
                    <div class="item" v-for="(skill, index) in model.skills" :key="index" v-show="curr_skill_index===index">
                        <div class="d-flex pt-3 pb-2">
                            <h4 class="text-lg">{{skill.name}}</h4>
                            <span class="text-grey text-sm ml-3">(冷却值：{{skill.cold}} 消耗值：{{skill.cost}})</span>
                        </div>
                        <p class="py-3 text-md text-dark-1">{{skill.describs}}</p>
                        <p class="tips bt-1 py-3 text-sm text-grey">小提示：{{skill.tips}}</p>
                    </div>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>I'm Slide 2</swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeroDetail",
  props: {
    _id: { type: String }
  },
  data() {
    return {
      model: {
        name: "",
        icon: "",
        title: "",
        categories: [],
        scores: {
          diffcut: 0,
          technicl: 0,
          attack: 0,
          live: 0
        },
        skills: [],
        goods: {
          good: {
            items: [],
            tips: ""
          },
          bad: {
            items: [],
            tips: ""
          }
        },
        useage_skills: "",
        battle_skills: "",
        team_skills: "",
        bg_img: ""
      },
      curr_index: 0,
      swiperOption: {},
      curr_skill_index:0
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // 监听swiper切换事件
    this.swiper.on("slideChange", () => {
      this.curr_index = this.swiper.activeIndex;
    });
  },
  methods: {
    async fetch() {
      let res = await this.$http.get(`/hero?_id=${this._id}`);
      this.model = res.data;
    },
    nav_item_click(index) {
      this.curr_index = index;
      this.swiper.slideTo(index, 1000, false);
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/_variables.scss";
.HeroDetail {
  .topBar {
    position: sticky;
    top: 0;
  }
  // 概要
  .intros {
    width: 100vw;
    height: 50vw;
    background: #000 linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    background-repeat: no-repeat;
    background-size: 100% 50vw;
    background-position: top center;
    padding-top: 100px;

    .scores {
      span {
        margin-right: 5px;
      }
    }
  }

  .bradge {
    border-radius: 50%;
    font-size: 8px;
    width: 10px;
    height: 10px;
    line-height: 12px;
    text-align: center;
    display: inline-block;
  }

  .main {
    .nav {
      .nav-item {
        border-bottom: 2px solid rgba(0, 0, 0, 0);
        &.active {
          color: map-get($colors, "primary");
          border-bottom-color: map-get($colors, "primary");
        }
      }
    }
  }
  
  .btns{

      &>div{
          border: 1px solid map-get($colors,'light' );
          border-radius: 0.3846rem;
          background-color:#fcfcfc;
        i{
            font-size: 1.5385rem;
        }
      }
  }

  .skills{

      img{
          border-radius: 50%;
          border: 0.1538rem solid rgba(0,0,0,0);
          &.active{
              border-color:  map-get($colors, 'primary')
          }
      }
  }
}
</style>