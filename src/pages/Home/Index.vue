<template>
  <div class="index">
    <header>
      <router-link to="/home" id="logo"><img src="../../../static/img/index_images/logo.jpg" alt=""></router-link>
      <input type="text" placeholder="寻找商品">
      <router-link to="/home" class="iconfont icon-gengduo"></router-link>
    </header>
    <main>
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :key="index" v-for="(banner,index) in banners">
            <img :src="banner" alt="">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </main>
  </div>
</template>

<script>
  import {
    Swiper,
    SwiperSlide,
    directive
  } from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'
  export default {
    data() {
      return {
        banners: ['../../../static/img/index_images/banner.jpg', '../../../static/img/index_images/banner - 副本 (3).jpg', '../../../static/img/index_images/banner - 副本 (2).jpg'],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          loop:true,
          // ...
        }
      }
    },
    mounted() {
      this.mySwiper.slideTo(3, 1000, false)
    }
  }

</script>

<style lang="stylus" scoped>
.index
  .router-link-active
    text-decoration none
  header
    width 7.1rem
    height .88rem
    margin auto
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    input
      width 3rem
      height .3rem
      background #eeeeee
      padding-left .2rem
      &::-webkit-input-placeholder
        font-size .1rem
        color #c0c0c0
        text-align center
    #logo
      display inline-block
      width 1.47rem
      height .3rem
  main
      .banner
        height 2.9rem
</style>
