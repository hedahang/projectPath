<template>
  <div class="footer">
    <tabbar>
      <tabbar-item link="/home" :selected="selected=='home'">
        <img slot="icon" :src="home">
        <img slot="icon-active" :src="home_pre">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/carts" class='footer-sconend' :selected="selected=='pocket'">
        <img slot="icon" :src="pocket">
        <img slot="icon-active" :src="pocket_pre">
        <span slot="label">口袋</span>
      </tabbar-item>
      <tabbar-item link="/component/demo" :selected="selected=='my'">
        <img slot="icon" :src="my">
        <img slot="icon-active" :src="my_pre">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
import home from "@/assets/images/home_btn_home@2x.png";
import home_pre from "@/assets/images/home_btn_home_pre@2x.png";
import my from "@/assets/images/home_btn_my@2x.png";
import my_pre from "@/assets/images/home_btn_my_pre@2x.png";
import pocket from "@/assets/images/home_btn_pocket@2x.png";
import pocket_pre from "@/assets/images/home_btn_pocket_pre@2x.png";
export default {
  props: {
    selected: {
      type: String,
      defalut: "home"
    }
  },
  data() {
    return {
      home,
      home_pre,
      my,
      my_pre,
      pocket,
      pocket_pre
    };
  },
  components: {
    Tabbar,
    TabbarItem
  },
  methods: {}
};
</script>

<style lang="less">
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 49px;
  .weui-tabbar {
    background-color: #fcfcfc;
    .weui-tabbar__icon {
      width: 20px;
      height: 22px;
    }
    .footer-sconend .weui-tabbar__icon {
      width: 18px;
    }
    .weui-tabbar__label {
      color: #666;
    }
    .weui-bar__item_on {
      .weui-tabbar__label {
        color: #ff5151;
      }
    }
  }
}
</style>
