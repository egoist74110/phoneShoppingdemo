<template>
  <div class="index">
    <header>
      <router-link to="/home" id="logo">
        <img src="../../../static/img/index_images/logo.jpg" alt />
      </router-link>
      <input type="text" placeholder="寻找商品" />
      <router-link to="/home" class="iconfont icon-gengduo"></router-link>
    </header>
    <main>
      <div class="banner">
        <swiper :options="swiperOption" ref="mySwiper" v-if="banners.length">
          <swiper-slide v-for="(item,index) in banners" :key="item.id">
            <img :src="'http://localhost:3000'+item.img" :alt="item.title" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <!-- <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>-->
        </swiper>
      </div>
      <div class="goodsclass">
        <div class="goodsicon">
          <i class="iconfont icon-icon-test"></i>
          <p>限时抢购</p>
        </div>
        <div class="goodsicon">
          <i class="iconfont icon-shangcheng"></i>
          <p>积分商城</p>
        </div>
        <div class="goodsicon">
          <i class="iconfont icon-lianxiwomen"></i>
          <p>联系我们</p>
        </div>
        <div class="goodsicon" @click="goCategory">
          <i class="iconfont icon-leimupinleifenleileibie"></i>
          <p>商品分类</p>
        </div>
      </div>
      <div class="goodslist">
        <ul>
          <li v-for="(item,index) in goodslisttitile" :key="index" :class="{active: index == ind}">
            <strong @click="change(index)" :class="{active: index == ind}">{{item}}</strong>
          </li>
        </ul>
        <Goodslist v-if="goodslist.length > 0" :goodslist="goodslist[ind].content"></Goodslist>
      </div>
    </main>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import Goodslist from "@/components/Goodslist";
export default {
  components: {
    swiper,
    swiperSlide,
    Goodslist,
  },
  data() {
    return {
      banners: [],
      goodslisttitile: ["最热商品", "最新商品", "全部商品"],
      goodslist: [],
      ind: 0,
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: false, //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          // nextEl: ".swiper-button-next",
          // prevEl: ".swiper-button-prev"
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
    this.$http.get("/getbanner").then((res) => {
      this.banners = res.data.list;
    });
    this.getlist();
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // this.swiper.slideTo(3, 1000, false);
  },
  methods: {
    getlist() {
      this.$http.get("/getindexgoods").then((res) => {
        this.goodslist = res.data.list;
      });
    },
    change(i) {
      this.ind = i;
    },
    goCategory(){
      this.$router.push('/category')
    }
  },
};
</script>

<style lang="stylus" scoped>
.index
  .router-link-active
    text-decoration: none
  header
    width: 7.1rem
    height: 0.88rem
    margin: auto
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    input
      width: 3rem
      height: 0.3rem
      background: #eeeeee
      padding-left: 0.2rem
      &::-webkit-input-placeholder
        font-size: 0.1rem
        color: #c0c0c0
        text-align: center
    #logo
      display: inline-block
      width: 1.5rem
      height: 0.3rem
  main
    .banner
      height: 2.9rem
      margin-bottom: 0.15rem
    .goodsclass
      height: 1.8rem
      width: 7.1rem
      display: flex
      margin: auto
      flex-direction: row
      .goodsicon
        flex: 1
        text-align: center
        &:active
          color: color
      .iconfont
        font-size: 0.6rem
    .goodslist
      ul
        width: 7.1rem
        height: 0.7rem
        margin: auto
        display: flex
        flex-direction: row
        li
          flex: 1
          line-height: 0.7rem
          border: 0.01rem solid #eee
          text-align: center
          &.active
            background: color
          strong
            &.active
              color: #fff
</style>
