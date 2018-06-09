<template>
  <div class="login container">
    <x-header class="login-header header-bar" :left-options="{backText: ''}" title="登录" style="background-color:#FF5151;">
      <router-link to="/register" style="font-size: 15px;color: #ffffff;" slot="right">注册</router-link>
    </x-header>
    <!-- 注册表单 -->
    <group gutter='0'>
      <x-input required title="" v-model="mobile" :max="13" is-type="china-mobile" placeholder="请输入手机号"></x-input>
      <x-input required title="" v-model="password" type="password" placeholder="请输入密码"></x-input>
    </group>
    <div class="loginBtn">
        <x-button @button-global-font-size='18' @click.native="toLogin" type="primary">确认</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XHeader, XButton } from "vux";
export default {
  name: "login",
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
    toLogin() {
      console.log("登录");
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.login {
  padding: 46px 0 50px;
  input {
    font-size: 15px;
  }
  .loginBtn {
    margin: 20px 15px;
    button {
      background-color: #ff5151;
      &:active {
        background-color: #e64340;
      }
    }
  }
}
</style>
