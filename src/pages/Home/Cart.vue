<template>
  <div class="cart">
    <header>
      <i class="iconfont icon-fanhui" @click="returnindex"></i>
      <strong>购物车</strong>
      <i class="iconfont icon-gengduo"></i>
    </header>
    <main>
      <ul>
        <li v-for="(item, index) in cartList" :key="item.id" ref="lis">
          <div
            class="content"
            @touchstart="start"
            @touchend="end(index, $event)"
          >
            <i
              @click="checkOne(index)"
              :class="['iconfont', 'icon-duoxuan', { active: item.isChecked }]"
            ></i>
            <div class="img-box">
              <img :src="'http://localhost:3000' + item.img" alt="" />
            </div>
            <div class="goods-title">
              <p>{{ item.goodsname }}</p>
              <p>{{ item.price }}</p>
            </div>
            <div class="count-box">
              <van-button type="primary" @click="jian(index)">-</van-button>
              <input type="number" name="" id="" :value="item.num" />
              <van-button type="primary" @click="jia(index)">+</van-button>
            </div>
          </div>
          <div class="del" @click="del(item.id)"><span>删除</span></div>
        </li>
      </ul>
    </main>
    <footer>
      <div class="checkAll-box">
        <i
          @click="checkAll"
          :class="['iconfont', 'icon-duoxuan', { active: isCheckAll }]"
        ></i>
        全选
      </div>
      <div class="total-box">
        <div class="total-price">总计：{{ totalPrice }}元</div>
        <div class="total-count">去结算({{ totalCount }}件)</div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      totalCount: 0,
      totalPrice: 0,
      isCheckAll: false,
      cartList: [],
    };
  },
  inject: ["reload"],
  watch: {
    cartList: {
      deep: true,
      handler(newVal) {
        this.isCheckAll = newVal.every((item) => {
          return item.isChecked;
        });
        let arr = newVal.filter((item) => {
          return item.isChecked;
        });
        this.totalPrice = 0;
        this.totalCount = 0;
        arr.forEach((item) => {
          this.totalPrice += item.num * item.price;
          this.totalCount += item.num;
        });
      },
    },
  },
  methods: {
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.cartList.forEach((item) => {
        item.isChecked = this.isCheckAll;
      });
    },
    start(e) {
      this.startX = e.touches[0].clientX;
    },
    end(i, e) {
      var endX = e.changedTouches[0].clientX;
      if (this.startX - endX > 15) {
        // 将整个li进行移动
        this.$refs.lis[i].style.transform = "translateX(-1rem)";
      }
      if (this.startX - endX < 15) {
        // 将整个li进行移动
        this.$refs.lis[i].style.transform = "translateX(0rem)";
      }
    },
    jian(i) {
      if (this.cartList[i].num <= 1) return;
      this.cartList[i].num--;
      if (this.cartList[i].isChecked) {
        this.totalCount--;
        this.totalPrice -= this.cartList[i].price;
      }
    },
    jia(i) {
      this.cartList[i].num++;
      if (this.cartList[i].isChecked) {
        this.totalCount++;
        this.totalPrice += this.cartList[i].price;
      }
    },
    del(id) {
      this.$http.post("/cartdelete", { id }).then((res) => {
        if (res.data.code == 200) {
          Toast.fail("删除成功！");
          this.reload();
          return;
        } else {
          Toast.fail("删除失败," + res.data.msg);
        }
      });
    },
    returnindex() {
      this.$router.back();
    },
    checkOne(i) {
      this.cartList[i].isChecked = !this.cartList[i].isChecked;
      if (this.cartList[i].isChecked) {
        this.totalPrice += this.cartList[i].price * this.cartList[i].num;
        this.totalCount += this.cartList[i].num;
      } else {
        this.totalPrice -= this.cartList[i].price * this.cartList[i].num;
        this.totalCount -= this.cartList[i].num;
      }
    },
  },
  mounted() {
    if (!this.user.token) {
      Toast.fail("您还未登录，即将跳转到登录界面！");
      setTimeout(() => {
        this.$rotuer.push("/login");
      }, 2500);
      return;
    }
    this.$http.get("/cartlist", { uid: this.user.uid }).then((res) => {
      this.cartList = res.data.list.map((item) => {
        return { ...item, isChecked: false };
      });
    });
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="stylus" scoped>
.cart
  height: 100%
  width: 100%
  display: flex
  flex-direction: column
  header
    height: 0.88rem
    background: color
    display: flex
    justify-content: space-between
    align-items: center
    color: #fff
  main
    flex: 1
    ul
      overflow: hidden
      height: 100%
      li
        transition: transform 1s
        height: 1.7rem
        margin: 0.26rem 0rem
        border-top: 0.01rem solid #eee
        position: relative
        .del
          width: 1rem
          height: 1.7rem
          background-color: #e43a3d
          color: #fff
          text-align: center
          line-height: 1.7rem
          position: absolute
          top: 0
          right: -1rem
        .content
          display: flex
          justify-content: space-between
          align-items: center
          padding: 0.3rem
          .count-box
            display: flex
            align-items: center
            button
              width: 0.65rem
              height: 0.6rem
            input
              height: 0.6rem
              width: 0.8rem
              border-radius: 0
              border: 0.05rem solid #8AE2B4
              text-align: center
          .img-box
            width: 1.3rem
            height: 1.3rem
          .icon-duoxuan
            &.active
              color: color
  footer
    height: 1rem
    display: flex
    text-align: center
    line-height: 1rem
    .checkAll-box
      width: 2rem
      i
        &.active
          color: color
    .total-box
      flex: 1
      display: flex
      div
        flex: 1
        &.total-count
          background-color: color
          color: #fff
</style>
