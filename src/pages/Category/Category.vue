<template>
    <div class="category">
      <header>
        <i class="iconfont icon-fanhui" @click="returnindex"></i>
        <strong>商品分类</strong>
        <i class="iconfont icon-gengduo"></i>
      </header>
      <main>
        <div class="first-cate">
          <ul>
            <li v-for="(item,index) in firstCateList" :key="item.id" :class="{active:index==ind}"><span @click="changeCate(index)">{{item.catename}}</span></li>
          </ul>
        </div>
        <div class="second-cate">
          <ul v-if="firstCateList.length > 0">
            <li v-for="(item,index) in firstCateList[ind].children" :key="item.id" @click="jump(item.id)">
              <img :src="'http://localhost:3000'+item.img" alt="">
              <span>{{item.catename}}</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          firstCateList:[],
          ind:0
        }
      },
      methods:{
        jump(i){
          this.$router.push("/home/index?id="+i)
        },
        changeCate(i){
          this.ind = i;
        },
        returnindex(){
          this.$router.push('/home/index')
        },
        getFirstCate(){
          this.$http.get("/getcatetree").then(res=>{
            this.firstCateList = res.data.list
          })
        }
      },
      mounted(){
        this.getFirstCate()
      }
    }
</script>

<style lang="stylus" scoped>
.category
  height 100%
  width 100%
  header
    height .88rem
    background color
    display flex
    justify-content space-between
    align-items center
    color #fff
  main
    height 100%
    display flex
    .first-cate
      height 100%
      width 1.65rem
      border-right .01rem solid #eee
      ul
        li
          height .52rem
          margin .4rem 0
          text-align center
          &.active
            border-left .18rem solid color
          span
            font-size 0.16rem
    .second-cate
      flex 1
      ul
        display flex
        li
          width 1.5rem
          height 1.5rem
          margin 0 .25rem
          text-align center
</style>
