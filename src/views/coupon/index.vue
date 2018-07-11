<template>
  <div class="my-coupon container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <div class="coupon-list">
      <div class="coupon-item ui">
        <div class="lf ui center">
          <span class="price">2</span>
          <p class="desc ellitext">满50减2元</p>
        </div>
        <div class="rt">
          <p class="name ellitext">零食优惠券</p>
          <p class="date">2018.04.01-2018.05.01</p>
          <p class='desc'>使用条件</p>
        </div>
      </div>
      <div class="coupon-item ui overdue">
        <div class="lf ui center">
          <span class="price">2</span>
          <p class="desc ellitext">满50减2元</p>
        </div>
        <div class="rt">
          <p class="name ellitext">零食优惠券</p>
          <p class="date">2018.04.01-2018.05.01</p>
          <p class='desc'>使用条件</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "home",
  data() {
    return {
      pageTitle: "优惠券",
    };
  },
  components: {
    XHeader
  },
  created() {},
  methods: {
  },
  computed: {
    getName: function() {
      return "zhangsww";
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.my-coupon {
  padding: 46px 0 94px;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .coupon-list{
    padding: 10px;
    .coupon-item{
      width: 100%;
      height: 80px;
      background: url('../../assets/images/coupon_bg_available@2x.png');
      background-size: 100%;
      margin-bottom: 10px;
      &.overdue{
      background: url('../../assets/images/coupon_bg_unavailable@2x.png');
      background-size: 100%;
      }
      .lf{
        width: 120px;
        height: 100%;
        flex-direction: column;
        .price{
          font-weight: 400;
          font-size: 30px;
          color:#FFF;
          &::before{
            content: "￥";
            font-size: 15px;
            font-weight: normal;
          }
        }
        .desc{
          font-size: 12px;
          color: #fff;
          margin-top: 2px;
          padding-bottom: 3px;
          max-width: 90%;
        }
      }
      .rt{
        background-color: #fff;
        .name{
          width: 100%;
          height: 20px;
          line-height: 20px;
          color:#333333;
          font-size: 15px;
          margin: 5px 0 0 10px;
        }
        .date{
          width: 100%;
          height: 16px;
          line-height: 16px;
          color:#999;
          font-size: 12px;
          margin: 4px 0 0 10px;
        }
        .desc{
          width: 100%;
          height: 16px;
          line-height: 16px;
          color:#666666;
          font-size: 12px;
          margin: 14px 0 0 10px;
        }
      }
    }
  }
}
</style>
