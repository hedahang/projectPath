<template>
  <div class="inline-number">
    <div>
      <a v-if="!(item.number == 0)" class="number-selector number-selector-sub" @click.stop.prevent="changeQty(false)">
        <img :src="reduceNumber" alt="">
      </a>
      <input v-if="!(item.number == 0)" readonly="readonly" v-model="item.number" pattern="[0-9]*" type="number" class="number-input" style="width: 37px;">
      <a class="number-selector number-selector-plus" @click.stop.prevent="changeQty(true)">
        <img :src="plusNumber" alt="">
      </a>
    </div>
  </div>
</template>

<script>
import config from "@/config/index";
import reduceNumber from "@/assets/images/home_btn_reduce@2x.png";
import plusNumber from "@/assets/images/home_btn_plus@2x.png";
export default {
  props: {
    item: {
      type: Object,
      default: {number:0}
    }
  },
  data() {
    return {
      reduceNumber,
      plusNumber
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
