<template>
  <div class="my-setting-mobile container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <!-- 列表 -->
    <div class="setting-box">
      <div class="setting-list">
        <div class="row ui acenter jbetween">
          <group class="mobile" style="width:100%">
            <x-input title="" required placeholder="请输入手机号码" name="mobile" keyboard="number" is-type="china-mobile"></x-input>
          </group>
        </div>
        <div class="row ui acenter jbetween">
          <group class="mobile code" style="width:100%">
            <x-input title="" required placeholder="请输入验证码" max=6>
              <x-button disabled slot="right" type="warn" mini>获取验证码</x-button>
            </x-input>
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
import { XHeader, XInput, XButton, Group, Cell } from "vux";
export default {
  name: "mobile",
  data() {
    return {
      pageTitle: "绑定手机",
      name: "海是倒过来的天"
    };
  },
  components: {
    XHeader,
    XInput,
    Group,
    Cell,
    XButton
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
.my-setting-mobile {
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
      padding: 0 15px;
      .row {
        font-size: 15px;
        .mobile {
          &.code .weui-btn_warn{
            background-color: #ff5151;
          }
          &:not(.code) {
            border-bottom: 1px solid #e0e0e0;
          }
          & > .weui-cells {
            margin-top: 0;
            &:before {
              display: none;
            }
            &:after {
              display: none;
            }
            .weui-cell {
              padding: 10px 0;
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
