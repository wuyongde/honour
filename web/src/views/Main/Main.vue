<template>
    <div class="Main">
        <div class="topBar bg-black py-2 px-3 d-flex flex-ai-center text-white">
            <img src="./images/1235.jpg" alt="logo" width="27" height="27" style="border-radius:5px;">
            <div class="ml-2 flex-1 d-flex flex-column flex-jc-center">
                <span >王者荣耀</span>
                <span class="text-xxs text-grey" style="margin-top:-3px;">团队成就更多</span>
            </div>
            <button type="button" class="bg-primary text-xs py-1 px-2">立即下载</button>
        </div>
        <div class="topNav pb-2 pt-3 bg-primary text-white">
            <div class="nav d-flex flex-jc-around">
                <div class="navItem active">
                    <router-link tag="span" to="">首页</router-link>
                </div>
                <div class="navItem">
                    <router-link tag="span" to="">攻略中心</router-link>
                </div>
                <div class="navItem">
                    <router-link tag="span" to="">赛事中心</router-link>
                </div>
            </div>
        </div>
        <!-- <router-view></router-view> -->
        <!-- Home区域 -->
        <Home></Home>
    </div>
</template>
<script>
import Home from '../Home/Home.vue'
export default {
    name:'Main',
    components:{
        Home
    }
}
</script>
<style lang="scss" scoped>
    .Main{
        .topBar{                //吸顶效果，css3新增，要考虑浏览器兼容性
            position: sticky;
            top: 0;
            left: 0;
            z-index: 999;
        }
        button{
            border-radius: 3px;

        }
        .active{
            border-bottom: 3px solid #fff;
        }
    }
</style>