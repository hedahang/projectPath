<template>
  <div class="my-setting-opinion container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <!-- 常见问题 -->
    <div class="opinion-title">
      <span>常见问题</span>
    </div>
    <div class="opinion-list">
      <router-link to="/opinion/detail" class="opinion-item ui acenter jbetween">
        <div class="lf">图片无法加载</div>
        <div class="rt icon-right"></div>
      </router-link>
      <router-link to="/opinion/detail" class="opinion-item ui acenter jbetween">
        <div class="lf">积分如何获取</div>
        <div class="rt icon-right"></div>
      </router-link>
      <router-link to="/opinion/detail" class="opinion-item ui acenter jbetween">
        <div class="lf">昵称无法更改</div>
        <div class="rt icon-right"></div>
      </router-link>
    </div>
    <!-- 确认 -->
    <div class="confirm">
      <div class="confirm-box ui center">写反馈</div>
    </div>
  </div>
</template>

<script>
import { XHeader, XInput, Group, Cell } from "vux";
export default {
  name: "opinion",
  data() {
    return {
      pageTitle: "意见反馈"
    };
  },
  components: {
    XHeader,
    XInput,
    Group,
    Cell
  },
  created() {},
  methods: {},
  computed: {
    getName: function() {
      return "zhangsww";
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.my-setting-opinion {
  padding: 46px 0 94px;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .opinion-title {
    border-bottom: 1px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    span {
      display: block;
      font-size: 13px;
      color: #999999;
      margin-left: 16px;
    }
  }
  .opinion-list {
    background-color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    width: 100%;
    .opinion-item {
      height: 44px;
      border-bottom: 1px solid #e0e0e0;
      font-size: 15px;
      &:last-child {
        border-bottom: none;
      }
      .lf {
        color: #333333;
        font-weight: 400;
        span {
          vertical-align: middle;
        }
      }
      .rt {
        color: #666666;
        height: 20px;
        line-height: 20px;
        &.icon-right {
          padding-right: 24px;
          background: url("../../assets/images/my_btn_next@2x.png") no-repeat
            right center;
          background-size: 8px 15px;
        }
      }
    }
  }
  .confirm {
    position: fixed;
    left: 15px;
    right: 15px;
    bottom: 10px;
    background-color: #ff5151;
    color: #fff;
    font-size: 18px;
    height: 44px;
    border-radius: 5px;
    .confirm-box {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
