<template>
  <div class="login container">
    <x-header class="login-header header-bar" :left-options="{backText: ''}" title="登录" style="background-color:#FF5151;">
      <router-link to="/register" style="font-size: 15px;color: #ffffff;" slot="right">注册</router-link>
    </x-header>
    <!-- 注册表单 -->
    <group gutter='0'>
      <x-input :icon-type="iconType1" required title="" v-model="mobile" :max="13" is-type="china-mobile" placeholder="请输入手机号"></x-input>
      <x-input :icon-type="iconType" required title="" v-model="password" type="password" placeholder="请输入密码"></x-input>
    </group>
    <div class="loginBtn">
        <x-button @button-global-font-size='18' @click.native="toLogin" type="primary">确认</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XHeader, XButton } from "vux";
import { util, request as $, cookie } from "@/utils/index";
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      password: "",
      iconType1: "",
      iconType: ""
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
      if (this.mobile == "" || !this.mobile) {
        this.$vux.toast.text("手机号不能为空", "middle");
      } else if (this.password == "" || !this.password) {
        this.$vux.toast.text("密码不能为空", "middle");
      } else {
        $.post("/api/login", {
          mobile: this.mobile,
          password: this.password
        }).then(res => {
          if (res.status) {
            cookie.set("windice_token", res.data && res.data.token);
            this.$router.replace("home");
          }
        });
      }
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
