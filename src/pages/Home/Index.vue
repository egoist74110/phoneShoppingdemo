<template>
  <div class="index">
    <header>
      <router-link to="/home" id="logo"><img src="@/img/index_images/logo.jpg" alt=""></router-link>
      <input type="text" placeholder="寻找商品">
      <router-link to="/home" class="iconfont icon-gengduo"></router-link>
    </header>
    <main>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- 如果需要滚动条 -->
        <div class="swiper-scrollbar"></div>
      </div>
    </main>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  export default {
    mounted() {
      new Swiper('.swiper-container', {
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        // 如果需要滚动条
        scrollbar: '.swiper-scrollbar',
        //如果需要自动切换海报
        autoplay: {
          delay: 3000, //时间 毫秒
          disableOnInteraction: true, //用户操作之后是否停止自动轮播
          //默认true
        },
        loop: true
      })
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
</style>
