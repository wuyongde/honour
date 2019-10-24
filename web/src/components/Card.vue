<template>

    <div class="Card bg-white mt-3 bb-1">
      <div class="Card-header d-flex py-3 flex-ai-center">
        <i class="sprites" :class="`sprites-${icon}`"></i>
        <span class="flex-1 ml-2 text-xl">{{title}}</span>
        <i class="sprites sprites-more"></i>
      </div>
    </div>
 
</template>
<script>
export default {
  name: "Card",
  props:{
      icon:{type:String,required:true},
      title:{type:String,required:true}
  }
};
</script>
<style lang="scss" scoped>
</style>