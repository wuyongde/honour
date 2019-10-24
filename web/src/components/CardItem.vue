<template>
  <div class="CardItem bg-white px-3">
    <my-card :icon="icon" :title="title"></my-card>
    <div class="body">
      <div class="tabs-menu d-flex flex-jc-between flex-ai-center py-3 text-dark">
        <span
          :class="{active:curr_index===index}"
          v-for="(content, index) in contents"
          :key="index"
          @click="menu_click(index)"
        >{{content.name}}</span>
      </div>
      <swiper :options="swiperOption" ref="mySwiper" class="swiperBox">

        <!-- slides -->
        <slot name="slide_item" :contents="contents"></slot>

      </swiper>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardItem",
  props: {
    theme: { type: String, required: true },
    icon: { type: String, required: true },
    title: { type: String, required: true },
    contents: { type: Array, required: true }
  },
  data() {
    return {
      curr_index: 0,
      swiperOption: {}
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
    menu_click(index) {
      this.curr_index = index;
      this.swiper.slideTo(index, 300, false);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";
.CardItem {
  .tabs-menu {
    .active {
      border-bottom: 2px solid map-get($colors, "primary");
      color: map-get($colors, "primary");
    }
  }
}
</style>