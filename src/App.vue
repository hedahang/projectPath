<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
@import "./assets/less/app.less";
html,
body {
  background-color: #f5f6f7;
}
</style>
