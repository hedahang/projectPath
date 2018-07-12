<template>
  <div class="register container">
    <x-header class="register-header header-bar" :left-options="{backText: ''}" title="注册" style="background-color:#FF5151;">
    </x-header>
    <!-- 注册表单 -->
    <group gutter='0'>
      <x-input required title="" v-model="mobile" :max="13" is-type="china-mobile" placeholder="请输入手机号"></x-input>
      <x-input required type='number' v-model="code" title="" mask="999999" :max="6" class="weui-vcode" placeholder="请输入验证码">
        <x-button :disabled='isDisable' @click.native='getCode' class="codeBtn" slot="right" type="primary" mini>{{codeText}}</x-button>
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
import { util, request as $, cookie } from "@/utils/index";
import { debug } from "util";
export default {
  name: "register",
  data() {
    return {
      mobile: "",
      password: "",
      code:"",
      isDisable: false,
      codeText: "获取验证码"
    };
  },
  components: {
    XHeader,
    XInput,
    Group,
    XButton
  },
  created() {
    this.settime();
  },
  methods: {
    // 倒计时
    settime() {
      var countdown = parseInt(cookie.get("countDown"));
      var that = this;
      if(!countdown)return;
      var tim = setInterval(function() {
        countdown--;
        that.isDisable = true;
        that.codeText = `倒计时(${countdown}s)`;
        if (countdown <= 0) {
          clearInterval(tim);
          that.isDisable = false;
          that.codeText = `获取验证码`;
        }
        cookie.set("countDown", countdown, {
          expires: 1 / 24 / 60 / 60 * (countdown + 1)
        });
      }, 1000); //每1000毫秒执行一次
    },
    getCode() {
      $.post("/api/sendSms", { mobile: this.mobile }).then(res => {
        if (res.status) {
          cookie.set("countDown", 60, { expires: 1 / 24 / 60 }); //添加cookie记录,有效时间60s
          this.settime();
        }
      });
    },
    toRegister(){
      $.post("/api/register", { mobile: this.mobile,password:this.password,code:this.code }).then(res => {
        if (res.status) {
          cookie.set('w_mobile',res.data&&res.data.mobile)
          cookie.set('token',res.data&&res.data.token)
          this.$router.replace('home')
        }
      });
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
