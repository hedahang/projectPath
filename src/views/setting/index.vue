<template>
  <div class="my-setting container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <!-- 列表 -->
    <div class="setting-box">
      <div class="setting-list">
        <div class="row ui acenter jbetween">
          <div class="lf ui acenter">
            <span class='lf-text'>头像</span>
          </div>
          <div class="rt icon-right">
            <vue-core-image-upload class="btn btn-primary" :crop="false" @imageuploaded="imageuploaded" :data="data" :max-file-size="5242880"
              :url="baseUrl" :headers='setHeaders' inputOfFile='avatar'>
              <img width="40" height="40" :src="src" />
            </vue-core-image-upload>
          </div>
        </div>
        <router-link to="/updateName" class="row ui acenter jbetween">
          <div class="lf ui acenter">
            <span class='lf-text'>昵称</span>
          </div>
          <div class="rt icon-right">
            <span class="gray">{{name}}</span>
          </div>
        </router-link>
      </div>
      <div class="setting-list" style="margin-top:10px;">
        <router-link to="" class="row ui acenter jbetween">
          <div class="lf ui acenter">
            <span class='lf-text'>手机</span>
          </div>
          <div class="rt ">
            <span class="gray">{{mobile}}</span>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 退出登录 -->
    <!-- <div class="outLogin">
        <div class="outLogin-box ui center">退出当前登录</div>
    </div> -->
  </div>
</template>

<script>
import { XHeader } from "vux";
import VueCoreImageUpload from "vue-core-image-upload";
import footerBar from "@/components/footerBar/index";
import { util, request as $, cookie } from "@/utils/index";
export default {
  name: "home",
  data() {
    return {
      baseUrl: process.env.BASE_API + "/api/user/upload",
      setHeaders: { Authorization: `Bearer ${cookie.get("windice_token")}` },
      pageTitle: "设置",
      src: "",
      name: "海是倒过来的天",
      mobile: 13000000000,
      data: null
    };
  },
  components: {
    XHeader,
    "vue-core-image-upload": VueCoreImageUpload
  },
  created() {
    this.src =
      cookie.get("windice_userAvatar") ||
      "http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png";
    this.name = cookie.get("windice_username") || "未设置";
    this.mobile = cookie.get("windice_userMobile") || "未设置";
  },
  methods: {
    imageuploaded(res) {
      if (res.code == 200) {
        this.src = res.data.preview;
        this.$vux.loading.show();
        this.updateUserInfo(res.data.avatar)
      } else {
        this.$vux.toast.show({
          text: res.message,
          type: "warn"
        });
      }
    },
    updateUserInfo(avatar) {
      $.put(`/api/user`, {
        avatar: avatar
      }).then(res => {
        cookie.set("userAvatar",res.data.avatar)
        this.$vux.loading.hide();
        this.$vux.toast.show({
          text: "修改成功",
          type: "success"
        });
      });
    }
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
  .setting-box {
    width: 100%;
    height: 100%;
    .setting-list {
      width: 100%;
      box-sizing: border-box;
      padding: 0 15px;
      background-color: #fff;
      .row {
        border-bottom: 1px solid #e0e0e0;
        font-size: 15px;
        padding: 10px 0;
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
          img {
            border-radius: 50%;
          }
          .gray {
            color: #999999;
          }
          &.icon-right {
            padding-right: 24px;
            background: url("../../assets/images/my_btn_next@2x.png") no-repeat
              right center;
            background-size: 8px 15px;
          }
        }
      }
    }
  }
  .outLogin {
    position: fixed;
    left: 15px;
    right: 15px;
    bottom: 10px;
    border: 1px solid #ff5151;
    background-color: #fff;
    color: #ff5151;
    font-size: 18px;
    height: 42px;
    border-radius: 5px;
    .outLogin-box {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
