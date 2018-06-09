<template>
  <div class="register container">
    <x-header class="register-header header-bar" :left-options="{backText: ''}" title="注册" style="background-color:#FF5151;">
    </x-header>
    <!-- 注册表单 -->
    <group gutter='0'>
      <x-input required title="" v-model="mobile" :max="13" is-type="china-mobile" placeholder="请输入手机号"></x-input>
      <x-input required type='number' title="" mask="999999" :max="6" class="weui-vcode" placeholder="请输入验证码">
        <x-button class="codeBtn" slot="right" type="primary" mini>获取验证码</x-button>
      </x-input>
      <x-input required title="" :min='6' :max='12' v-model="password" type="password" placeholder="请输入6-12位密码"></x-input>
    </group>
    <div class="registerBtn">
        <x-button @button-global-font-size='18' @click.native="toRegister" type="primary">确认</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XHeader, XButton } from "vux";
export default {
  name: "register",
  data() {
    return {
      mobile: "",
      password: ""
    };
  },
  components: {
    XHeader,
    XInput,
    Group,
    XButton
  },
  methods: {
    toRegister() {
      console.log("登录");
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.register {
  padding: 46px 0 50px;
  input {
    font-size: 15px;
  }
  .registerBtn {
    margin: 20px 15px;
  }
  button {
    background-color: #ff5151 !important;
    &:active {
      background-color: #e64340 !important;
    }
  }
}
</style>
