<template>
  <div class="inline-number">
    <div>
      <a v-if="!(item.qty == 0)" class="number-selector number-selector-sub" @click.stop.prevent="changeQty(false)">
        <img :src="reduceNumber" alt="">
      </a>
      <input v-if="!(item.qty == 0)" readonly="readonly" v-model="item.qty" pattern="[0-9]*" type="number" class="number-input" style="width: 37px;">
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
import { util, request as $, cookie } from "@/utils/index";
export default {
  props: {
    item: {
      type: Object,
      default: { qty: 0 }
    }
  },
  data() {
    return {
      reduceNumber,
      plusNumber
    };
  },
  created() {},
  methods: {
    /**
     * @method 增减单品数量
     * @param {Boolean} isAdd 是否增加
     */
    changeQty: function(isAdd) {
      this.$vux.loading.show()
      var num = this.item.qty;
      if (isAdd && num < config.maxGoodsNum) {
        $.post(`/api/carts`, {
          goods: [{ id: this.item.id, qty: 1 }]
        }).then(res => {
          this.$set(this.item, "qty", ++num);
      this.$vux.loading.hide()
        });
      } else if (!isAdd && num > 0) {
        $.put(`/api/carts`, {
          row_id: this.item.row_id,
          qty: this.item.qty--
        }).then(res => {
          this.$set(this.item, "qty", --num);
      this.$vux.loading.hide()
        });
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
