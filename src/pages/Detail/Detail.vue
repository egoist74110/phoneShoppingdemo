<template>
  <div class="detail">
    <header>
      <div>
        <router-link to="/home/index" class="iconfont icon-fanhui router-link-active"></router-link>
        <strong>商品详情</strong>
        <router-link to class="iconfont icon-gengduo router-link-active"></router-link>
      </div>
    </header>
    <nav class="imgtitle">
      <img :src="'http://localhost:3000'+detail.img" alt />
    </nav>
    <main>
      <div class="content">
        <strong>{{ detail.goodsname }}</strong>
        <p>￥{{ detail.price }}</p>
      </div>
      <div class="specs">
        <div class="count-box">
          <p>购买数量</p>
          <div>
            <button>-</button>
            <input type="text" name="" id="" v-model="count">
            <button>+</button>
          </div>
        </div>
        <div class="specs-box">
          <p>规格属性</p>
          <div>
            <span>规格</span></span><span>{{detail.specsattr}}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      count:1,
    };
  },
  mounted() {
    this.$http
      .get("/getgoodsinfo", { id: this.$route.query.id })
      .then((res) => {
        this.detail = res.data.list[0];
      });
  },
};
</script>

<style lang="stylus" scoped>
.detail
  header
    height: 0.88rem
    color: #fff
    background: color
    div
      width: 7.04rem
      line-height: 0.88rem
      margin: auto
      display: flex
      justify-content: space-between
    .router-link-active
      text-decoration: none
  .imgtitle
    height: 7.5rem
  main
    .content
      height 2.05rem
      width: 7.04rem
      margin: auto
      margin-right 0.15rem
      display flex
      flex-direction column
      justify-content space-evenly
      strong
        font-size .42rem
      p
        color color
    .specs
      .count-box
        width 7.04rem
        height 1.1rem
        line-height 1.1rem
        margin auto
        display flex
        justify-content space-between
        border-top .01rem solid #eee
        border-bottom .01rem solid #eee
        div
          display flex
          align-items center
          button
            height .6rem
            width .65rem
            background #fff
            border .01rem solid #000
            border-radius 0
            font-size .42rem
          input
            height .6rem
            width .8rem
            border-radius 0
            border .01rem solid #000
            text-align center
</style>
