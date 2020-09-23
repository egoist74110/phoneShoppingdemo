<template>
  <div>
    <div class="goods" v-for="(item,index) in goodslist" :key="item.id">
      <img :src="'http://localhost:3000'+item.img" alt />
      <div class="good">
        <strong>{{item.goodsname}}</strong>
        <p>{{item.price}}</p>
        <button @click="jump(item.id)">立即抢购</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods:{
    jump(i){
      this.$router.push("/detail?id="+i);
    }
  },
  props: {
    goodslist: {
      required: true,
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
.goods
  width: 7.1rem
  height: 2rem
  margin: auto
  margin-top .22rem
  margin-bottom .34rem
  display: flex
  .good
    display: flex
    justify-content: space-around
    flex-direction: column
    strong
      font-size: 0.32rem
    p
      color color
    button
      color #fff
      width 1.65rem
      height .52rem
      background color
  img
    width: 2.25rem
</style>
