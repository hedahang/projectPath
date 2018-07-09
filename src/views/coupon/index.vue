<template>
  <div class="my-setting container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
  </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "home",
  data() {
    return {
      pageTitle: "优惠券",
    };
  },
  components: {
    XHeader
  },
  created() {},
  methods: {
  },
  computed: {
    getName: function() {
      return "zhangsww";
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.my-setting {
  padding: 46px 0 94px;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
}
</style>
