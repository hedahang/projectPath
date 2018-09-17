<template>
  <div class="order-detail container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <!-- 订单状态 -->
    <div class="order-status">
      <span class="status">{{orderStatus[data.status]}}</span>
    </div>
    <!-- 收货信息 -->
    <div class="userInfo ui acenter">
      <div class="lf f1">
        <div class="top ui acenter">
          <span class='title'>收货人：</span>
          <span class='username'>{{data.name}}</span>
          <span class='mobile'>{{data.mobile|formatMobile}}</span>
        </div>
        <div class="address ui acenter">
          <span class='title'>收货地址：</span>
          <span>{{data.address}}</span>
        </div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="goods-list">
        <div class="goods-item" v-for="(item,index) in data.items" :key='index'>
          <div class="item-lf">
            <img :src="item.iamge" alt="">
          </div>
          <div class="item-rt">
            <h4 class="item-rt_title">{{item.goods_name}}</h4>
            <p class="item-rt_desc">{{item.description}}</p>
            <p class="item-rt_sales">月销售{{item.sales||0}}份</p>
            <div class="item_rt_footer">
              <span class='price'>￥{{item.price}}</span>
              <div class="item_rt_footer_number">x{{item.qty}}</div>
            </div>
          </div>
        </div>
        <div class="row ui jbetween acenter">
          <div class="lf">商品金额</div>
          <div class="rt">￥{{data.total_amount}}</div>
        </div>
        <div class="row ui jbetween acenter">
          <div class="lf">运费</div>
          <div class="rt">￥{{data.freight}}</div>
        </div>
        <div class="real_amount row ui jbetween acenter">
          <div class="lf">实付款</div>
          <div class="rt">￥{{data.real_amount}}</div>
        </div>
    </div>
    <!-- 订单其他信息 -->
    <div class="other-order">
      <div class="other-order-row">订单编号：{{data.order_id}}</div>
      <div v-if="data.payment_no&&data.payment_no!='0'" class="other-order-row">支付流水号：{{data.payment_no}}</div>
      <div v-if='data.paid_at' class="other-order-row">支付时间：{{data.paid_at}}</div>
      <div v-if="data.shipped_at" class="other-order-row">发货时间：{{data.shipped_at}}</div>
    </div>
  </div>
</template>

<script>
import {
  Grid,
  GridItem,
  GroupTitle,
  Swiper,
  SwiperItem,
  XInput,
  Group,
  ButtonTab,
  ButtonTabItem,
  XHeader,
  Divider,
  Tab,
  TabItem
} from "vux";
import footerBar from "@/components/footerBar/index";
import goodsListC from "@/components/goodsList/index";
import { util, request as $, cookie } from "@/utils/index";
import config from "@/config/index";
export default {
  name: "orderDetail",
  data() {
    return {
      orderStatus: config.orderStatus,
      pageTitle: "订单详情",
      orderId: null, // 订单id
      edit: false,
      data: {
        status: null,
        item: [],
        mobile: ""
      },
      status: 0 // 状态，0-全部，1-未付款，2-已付款，3-未发货，4-已发货，5-交易完成，6-交易关闭
    };
  },
  components: {
    XHeader,
    ButtonTab,
    XInput,
    Group,
    ButtonTabItem,
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    GroupTitle,
    footerBar,
    Divider,
    Tab,
    TabItem,
    goodsListC
  },
  filters: {
    formatMobile(val) {
      return val.slice(0, 3) + "****" + val.slice(7, 11);
    }
  },
  created() {
    let { orderId } = this.$route.query;
    this.orderId = orderId;
    console.log(orderId);
    this.getPageData();
  },
  methods: {
    getPageData() {
      if (!this.orderId) return;
      this.$vux.loading.show();
      //我的商品列表
      $.get(`/api/orders/${this.orderId}`).then(response => {
        this.data = response.data;
        console.log(this.data);
        this.$vux.loading.hide();
      });
    },
    // 切换状态
    switchTabItem(index) {
      console.log("on-before-index-change", index);
      this.$vux.loading.show({
        text: "loading"
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        this.status = index;
      }, 1000);
    },
    changeEdit() {
      this.edit = !this.edit;
      this.headerRight = this.headerRight == "编辑" ? "完成" : "编辑";
    },
    toSearch() {
      //   console.log("123");
      this.$router.push("/search");
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
.order-detail {
  padding: 46px 0 94px;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .order-status {
    width: 100%;
    height: 50px;
    position: relative;
    background-color: #ff5151;
    &:after {
      content: "";
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 0px;
      height: 32.5px;
      background: url("../../assets/images/my_bg_head@2x.png") no-repeat 0 0;
      background-size: cover;
    }
    .status {
      height: 20px;
      line-height: 20px;
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
      font-weight: bold;
      position: absolute;
      left: 26px;
      bottom: 16px;
      z-index: 2;
    }
  }
  .userInfo {
    width: 100%;
    height: 62px;
    background-color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    .lf {
      .top {
        height: 20px;
        line-height: 20px;
        font-size: 15px;
        color: #333333;
        span.username {
          margin-right: 10px;
        }
      }
      .address {
        height: 15px;
        line-height: 15px;
        font-size: 12px;
        color: #999;
        margin-top: 3.5px;
      }
      span.title {
        display: block;
        width: 60px;
        text-align: justify;
      }
    }
  }
  .goods-list {
    width: 100%;
    margin: 10px 0;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 15px;
    .goods-item {
      display: flex;
      align-items: center;
      padding: 10px 0px;
      position: relative;
      border-bottom: 1px solid #e0e0e0;
      &:before {
        display: none;
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #e0e0e0;
        color: #e5e5e5;
        transform-origin: 0 0;
        transform: scaleY(0.5);
        left: 15px;
      }
      &:first-child:before {
        display: none;
      }
      &:last-child {
        border-bottom: 0;
      }
      .item-lf {
        margin-right: 0.8em;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        img {
          width: 100%;
          max-height: 100%;
          vertical-align: top;
        }
      }
      .item-rt {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        min-width: 0;
        .item-rt_title,
        .item-rt_desc,
        .item-rt_sales {
          font-weight: 400;
          font-size: 15px;
          color: #333333;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          word-wrap: break-word;
          word-break: break-all;
        }
        .item-rt_desc {
          margin: 4px 0;
          color: #999999;
          font-size: 12px;
          font-weight: normal;
        }
        .item-rt_sales {
          color: #666666;
          font-weight: normal;
          margin: 4px 0;
          font-size: 12px;
        }
        .item_rt_footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .price {
            color: #ff5151;
            font-size: 15px;
            font-weight: bold;
          }
          .item_rt_footer_number {
            color: #666666;
            font-size: 15px;
          }
        }
      }
    }
    .row {
      margin-top: 6px;
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      color: #666;
      &.real_amount {
        margin-top: 6px;
        font-size: 15px;
        height: 20px;
        line-height: 20px;
        color: #333;
        padding-bottom: 10px;
        .rt {
          color: #ff5151;
          font-weight: bold;
        }
      }
    }
  }
  .other-order {
    width: 100%;
    margin: 10px 0;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 15px;
    .other-order-row {
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
}
</style>
