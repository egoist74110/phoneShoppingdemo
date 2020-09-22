<template>
  <div class="index">
    <header>
      <router-link to="/home" id="logo"><img src="../../../static/img/index_images/logo.jpg" alt=""></router-link>
      <input type="text" placeholder="寻找商品">
      <router-link to="/home" class="iconfont icon-gengduo"></router-link>
    </header>
    <main>
      <div class="banner">
        <swiper :options="swiperOption" ref="mySwiper" v-if="banners.length">
          <swiper-slide v-for="(item,index) in banners" :key="item.id"><img :src="'http://localhost:3000'+item.img" :alt="item.title"></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <!-- <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div> -->
        </swiper>
      </div>
    </main>
  </div>
</template>

<script>
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  import "swiper/dist/css/swiper.css";
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        banners:[],
        swiperOption: {
          loop: true,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          // 显示分页
          pagination: {
            el: ".swiper-pagination",
            clickable: false //允许分页点击跳转
          },
          // 设置点击箭头
          navigation: {
            // nextEl: ".swiper-button-next",
            // prevEl: ".swiper-button-prev"
          }
        }
      };
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    mounted() {
      this.$http.get('/getbanner').then(res=>{
        this.banners = res.data.list;
      })
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      // this.swiper.slideTo(3, 1000, false);
    }
  };

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
      width 1.5rem
      height .3rem
  main
      .banner
        height 2.9rem
</style>
