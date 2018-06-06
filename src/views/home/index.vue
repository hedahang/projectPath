<template>
  <div class="home-container">
    <div class="home-text">name:{{getName}}</div>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    getName: function() {
      return "zhangs";
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.home-container {
  margin: 30px;
  .home-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
