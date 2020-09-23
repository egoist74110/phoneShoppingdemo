<template>
  <div class="detail">
    <header>
      <div>
        <router-link
          to="/home/index"
          class="iconfont icon-fanhui router-link-active"
        ></router-link>
        <strong>商品详情</strong>
        <router-link
          to
          class="iconfont icon-gengduo router-link-active"
        ></router-link>
      </div>
    </header>
    <nav class="imgtitle">
      <img :src="'http://localhost:3000' + detail.img" alt />
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
            <van-button   type="primary" @click="jian"
              >-</van-button
            >
            <input type="number" name="" id="" v-model="count" />
            <van-button   type="primary" @click="jia"
              >+</van-button
            >
          </div>
        </div>
        <div class="specs-box">
          <strong>规格属性</strong>
          <div>
            <span class="specs-title">规格</span>
            <span
              :class="['specs-specsname', { active: flag }]"
              @click="changeSpec"
              >{{ detail.specsattr }}</span
            >
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="cart" @click="goCart">
        <i class="iconfont icon-gouwuche"></i>
        <p>购物车</p>
      </div>
      <div class="btns">
        <button @click="addcart" class="addCart">加入购物车</button>
        <button class="buy">立即购买</button>
      </div>
    </footer>
  </div>
</template>

<script>
import { Toast } from 'vant';
import {mapState} from 'vuex'
export default {
  data() {
    return {
      detail: {},
      count: 1,
      flag: false,
    };
  },
  methods: {
    changeSpec() {
      this.flag = !this.flag;
    },
    jia() {
      this.count++;
    },
    jian() {
      if (this.count <= 1) return;
      this.count--;
    },
    goCart() {
      this.$router.push("/home/cart")
    },
    addcart() {
      if(!this.flag){
        Toast.fail('请选择一个规格');
        return;
      }
      if(!this.user.token){
        Toast.fail('您还未登录，即将跳转到登录界面！')
        setTimeout(() => {
          this.$rotuer.push('/login');
        }, 2500);
        return
      }
      this.$http.post("/cartadd",{
        uid:this.user.uid,
        goodsid:this.$route.query.id,
        num:this.count
      }).then(res=>{
        if(res.data.code==200){
          Toast.fail('添加成功！');
          setTimeout(() => {
            this.$router.push('/home/cart');
          }, 1000);
          return
        }else{
          Toast.fail('添加失败，网络错误！');
        }
      })
    },
  },
  computed:{
    ...mapState(['user']),
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
      height: 2.05rem
      width: 7.04rem
      margin: auto
      margin-right: 0.15rem
      display: flex
      flex-direction: column
      justify-content: space-evenly
      strong
        font-size: 0.42rem
      p
        color: color
    .specs
      .count-box
        width: 7.04rem
        height: 1.1rem
        line-height: 1.1rem
        margin: auto
        display: flex
        justify-content: space-between
        border-top: 0.01rem solid #eee
        border-bottom: 0.01rem solid #eee
        div
          display: flex
          align-items: center
          button
            height: 0.6rem
            width: 0.65rem
            font-size: 0.42rem
          input
            height: 0.6rem
            width: 0.8rem
            border-radius: 0
            border: 0.05rem solid #8AE2B4
            text-align: center
      .specs-box
        width: 7.04rem
        height: 1.9rem
        margin: auto
        display: flex
        flex-direction: column
        justify-content: space-evenly
        border-bottom: 0.01rem solid #eee
        div
          .specs-title
            color: #d5d5d5
            margin-right: 0.7rem
          .specs-specsname
            width: 1.5rem
            height: 0.6rem
            display: inline-block
            line-height: 0.6rem
            text-align: center
            background: #e1e1e3
            color: #fff
            font-size: 0.32rem
            &.active
              background: color
  footer
    height: 1rem
    display: flex
    align-items: center
    display: flex
    .cart
      width: 1rem
      height: 100%
      text-align: center
      display: flex
      flex-direction: column
      justify-content: center
      .icon-gouwuche
        font-size: 0.42rem
      p
        font-size: 0.24rem
    .btns
      display: flex
      flex: 1
      height 100%
      button
        flex : 1
        color: #fff
        &.addCart
          background: color
        &.buy
          background: #e43a3d
</style>
