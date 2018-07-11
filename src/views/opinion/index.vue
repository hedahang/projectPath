<template>
  <div class="my-setting-updateName container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <!-- 列表 -->
    <div class="setting-box">
      <div class="setting-list">
        <div class="row ui acenter jbetween">
          <group class="updateName" style="width:100%">
            <x-input title="" required placeholder="请输入昵称" :show-clear="true"></x-input>
          </group>
        </div>
      </div>
    </div>
    <!-- 确认 -->
    <div class="confirm">
      <div class="confirm-box ui center">确认</div>
    </div>
  </div>
</template>

<script>
import { XHeader, XInput, Group, Cell } from "vux";
export default {
  name: "updateName",
  data() {
    return {
      pageTitle: "意见反馈",
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
.my-setting-updateName {
  padding: 46px 0 94px;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .setting-box {
    width: 100%;
    height: 100%;
    .setting-list {
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      .row {
        font-size: 15px;
        .updateName {
          & > .weui-cells {
            margin-top: 0;
            &:before {
              display: none;
            }
            &:after {
              display: none;
            }
            .weui-input {
              font-size: 15px;
              &::-webkit-input-placeholder {
                /* WebKit browsers */
                color: #bbb;
              }
              &:-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #bbb;
              }
              &::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #bbb;
              }
              &:-ms-input-placeholder {
                /* Internet Explorer 10+ */
                color: #bbb;
              }
            }
          }
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
