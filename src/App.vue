<template>
  <div id="app">

        <!-- <router-link :to="{ path: 'login' }">登录</router-link>   
        <router-link :to="{ path: 'machineList' }">机器列表</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
