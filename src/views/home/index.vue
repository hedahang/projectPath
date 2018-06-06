<template>
  <div class="container">
    <x-header class="home-header" :left-options="{showBack: false}" title="slot:overwrite-title" style="background-color:#FF5151;">
      <div class="overwrite-title-demo" slot="overwrite-title">
        <group gutter='0'>
          <x-input title="" placeholder="请输入商品" >
            <img slot="label" style="padding-right:10px;display:block;" :src="iconSearch" width="16"
              height="16">
          </x-input>
        </group>
      </div>
    </x-header>
  </div>
</template>

<script>
import { XInput, Group, ButtonTab, ButtonTabItem, XHeader } from "vux";
import iconSearch from "@/assets/images/home_icon_search@2x.png";
export default {
  name: "home",
  data() {
    return {
      iconSearch: iconSearch
    };
  },
  components: {
    XHeader,
    ButtonTab,
    XInput,
    Group,
    ButtonTabItem
  },
  computed: {
    getName: function() {
      return "zhangsww";
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less"    >
.home-header {
  .overwrite-title-demo {
    margin-top: 7.5px;
    .weui-cells {
      border-radius: 20px;
      .weui-cell {
        padding: 0px 10px;
        input {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
