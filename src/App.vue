<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  provide(){
    return{
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(()=>{
        this.isRouterAlive=true;
      })
    }
  }
};
</script>

<style>
</style>
