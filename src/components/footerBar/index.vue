<template>
  <div class="footer">
    <tabbar>
      <tabbar-item>
        <img slot="icon" src="../assets/demo/icon_nav_button.png">
        <span slot="label">Wechat</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img slot="icon" src="../assets/demo/icon_nav_msg.png">
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item selected link="/component/demo">
        <img slot="icon" src="../assets/demo/icon_nav_article.png">
        <span slot="label">Explore</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <img slot="icon" src="../assets/demo/icon_nav_cell.png">
        <span slot="label">News</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'
import home from "@/assets/images/home_btn_home@2x.png";
import home_pre from "@/assets/images/home_btn_home_pre@2x.png";
import my from "@/assets/images/home_btn_my@2x.png";
import my_pre from "@/assets/images/home_btn_my_pre@2x.png";
import pocket from "@/assets/images/home_btn_pocket@2x.png";
import pocket_pre from "@/assets/images/home_btn_pocket_pre@2x.png";
export default {
  props: {
    item: {
      type: Object,
      default: {number:0}
    }
  },
  data() {
    return {
      home,
      home_pre,
      my,
      my_pre,
      pocket,
      pocket_pre,
    };
  },
  methods: {
    /**
     * @method 增减单品数量
     * @param {Boolean} isAdd 是否增加
     */
    changeQty: function(isAdd) {
      var num = this.item.number
      if (isAdd && num < config.maxGoodsNum) {
        this.$set(this.item, "number", ++num);
      } else if (!isAdd && num > 1) {
        this.$set(this.item, "number", --num);
      }
    }
  }
};
</script>

<style lang="less">
.inline-number {
  display: inline-block;
  .number-selector {
    float: left;
    height: 18px;
    width: 18px;
    line-height: 18px;
    border-radius: 9px;
    overflow: hidden;
    &.number-selector-plus {
    }
    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
  }
  .number-input {
    float: left;
    height: 18px;
    line-height: 18px;
    font-size: 15px;
    color: #ff5151;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    text-align: center;
    border-radius: 1px;
  }
}
</style>
