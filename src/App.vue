<template>
  <div id="app">
    <div id="nav">
      <NavHeader :loginState="this.$parent.state.loginState">
        <!-- <template v-slot:top>
          <Top></Top>
        </template> -->
      </NavHeader>
    </div>
    <div class="app-main">
      <router-view></router-view>
    </div>
    <!-- <router-view name="body"></router-view> -->
  </div>
</template>
<script>
  import NavHeader from '@/components/NavHeader.vue'
  export default{
    name:"app",
    components:{
      NavHeader,
    },
    data(){
      return{
        isShowSearchItem:{
          isShow:false
        }
      }
    }
  }
</script>
<style>
body{
  margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 0;
  
}
.app-main{
  position: relative;
}
/* body{
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
} */
/* #nav a {
  font-weight: bold;
  color: #2c3e50;
} */

/* #nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
