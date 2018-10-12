<template>
  <div class="order-pay-result container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <!-- 主要内容 -->
    <div class="result-content">
      <div class="top ui center">
        <img v-if="type==1" src="../../assets/images/success@2x.png" alt="">
        <img v-if="type==2" src="../../assets/images/fail@2x.png" alt="">
        <span>{{pageTitle}}</span>
        <span v-if="type==2" style="line-height:20px">{{failReason}}</span>
      </div>
      <div class="btn ui center">
        <router-link v-if="type==1" class="item" :to="{ name: 'order'}">查看订单</router-link>
        <router-link v-if="type==1" class="item" to="/home">返回首页</router-link>
        <router-link v-if="type==2" class="item" to="/home">重新支付</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader } from "vux";
import footerBar from "@/components/footerBar/index";
import goodsListC from "@/components/goodsList/index";
import { util, request as $, cookie } from "@/utils/index";
import config from "@/config/index";
export default {
  name: "orderDetail",
  data() {
    return {
      pageTitle: "支付成功",
      type: 1, // 支付结果1：成功;2：失败
      orderId: "", // 订单id
      failReason:""
    };
  },
  components: {
    XHeader
  },
  created() {
    let { type,failReason } = this.$route.query;
    this.type = type || 1;
    if (this.type == 1) {
      this.pageTitle = "支付成功";
    } else {
      this.pageTitle = "支付失败";
      this.failReason = failReason
    }
    // this.getPageData();
  },
  methods: {}
};
</script>

<style rel="stylesheet/less" lang="less">
.order-pay-result {
  padding: 46px 0 94px;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .result-content {
    margin-top: 40px;
    .top {
      width: 100%;
      flex-direction: column;
      img {
        width: 72px;
        height: 72px;
        display: block;
      }
      span {
        width: 200px;
        height: 16px;
        font-size: 15px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 16px;
        margin-top: 15px;
        text-align: center;
      }
    }
    .btn {
      margin-top: 40px;
      .item {
        width: 100px;
        height: 32px;
        line-height: 32px;
        box-sizing: border-box;
        border-radius: 5px;
        background-color: #ff5151;
        color: #fff;
        font-size: 15px;
        font-weight: 500;
        text-align: center;
        margin: 0 12.5px;
      }
    }
  }
}
</style>
