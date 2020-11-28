<template>
  <div id="app">
    <!--路由view-->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({
    name: "App",
  })
  export default class extends Vue {

    private mounted(){

      // 定位
      // this.$jsonp('https://restapi.amap.com/v3/ip', {
      //   key: process.env.VUE_APP_GAODE_KEY,
      //   output: 'JSON'
      // }).then(res => {
      //   console.log('定位成功',res)
      //   sessionStorage.setItem('province',res.province)
      //   sessionStorage.setItem('city',res.city)
      //   sessionStorage.setItem('adcode',res.adcode)
      // })

    }

  };

</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
    background: #f1f1f1;
  }

  .main-page {

    display: flex;
    flex-direction: column;

  }
</style>
