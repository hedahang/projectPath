<template>
  <div class="my-order container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <!-- 订单分类 -->
    <div class="order-nav">
      <tab v-model="status" prevent-default @on-before-index-change="switchTabItem" :line-width='2' bar-active-color='#ff5151'
        active-color='#ff5151'>
        <tab-item v-for="(item,index) in statusList" :key="index">{{ item }}</tab-item>
      </tab>
    </div>
    <!-- 订单商品列表 -->
    <div class="goods-box">
      <div class="goods-list">
        <template v-for="(item,index) in goodsList">
          <div v-if='item.count==1&&(status==0||status==item.status)' :key='index' class="goods-list-item">
            <div class="item-top">
              <div class="item-lf">
                <img :src="item.image&&item.image[0]" alt="">
              </div>
              <div class="item-rt">
                <h4 class="item-rt_title ui jbetween">
                  <span class='ellitext'>{{item.name}}</span>
                  <span class="status">{{statusList[item.status]}}</span>
                </h4>
                <div class="item_rt_footer">
                  <span class='price'>￥{{item.total_amount}}</span>
                </div>
              </div>
            </div>
            <div class="item-bottom">
              <router-link class="look-detail" :to="{ name: 'orderDetail', query: { orderId: item.id }}">查看详情</router-link>
              <div class="pay">立即支付</div>
            </div>
          </div>
          <div v-if='item.count!=1&&(status==0||status==item.status)' :key='index' class="goods-list-item not-only">
            <div class="item-top">
              <span class="status">{{statusList[item.status]}}</span>
            </div>
            <div class="item-center">
              <ul class='item-center-ul'>
                <li v-for="(itm,idx) in item.items" :key='idx'>
                  <img :src="itm.image&&itm.image" alt="">
                </li>
              </ul>
              <div class="item-center-price">
                <div class="item-center-price-box">
                  <p class='p1'>共计{{item.count}}件商品</p>
                  <p class='p2'>合计: 
                    <b>￥{{item.total_amount}}</b>
                  </p>
                </div>
              </div>
            </div>
            <div class="item-bottom">
              <router-link class="look-detail" :to="{ name: 'orderDetail', query: { orderId: item.id }}">查看详情</router-link>
              <div class="pay">立即支付</div>
            </div>
          </div>
        </template>
      </div>
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
  name: "orderlist",
  data() {
    return {
      orderStatus: config.orderStatus,
      pageTitle: "我的订单",
      edit: false,
      goodsList: [
        {
          image: [
            "http://cdn.bookround.com/3697687492166beddcb63cfb29ed92d4.jpg"
          ],
          name: "薯片",
          status: 1,
          price: 99,
          length: 1,
          id:7
        },
        {
          image: [
            "http://cdn.bookround.com/3697687492166beddcb63cfb29ed92d4.jpg"
          ],
          name: "薯片",
          status: 1,
          price: 99,
          length: 2,
          id:8
        }
      ],
      status: 0, // 状态，0-全部，1-未付款，2-已付款，3-未发货，4-已发货，5-交易完成，6-交易关闭
      statusList: [
        "全部",
        "未付款",
        "已付款",
        "未发货",
        "已发货",
        "交易完成",
        "交易关闭"
      ]
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
  created() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.$vux.loading.show();
      //我的商品列表
      $.get("/api/orders").then(response => {
        this.goodsList = response.data && response.data.list;
        this.goodsList &&
          this.goodsList.data &&
          this.goodsList.data.length !== 0 &&
          this.goodsList.data.forEach(item => {
            if (!item.qty) {
              this.$set(item, "qty", 0);
            }
          });
        console.log(this.goodsList);
        this.$vux.loading.hide();
      });
    },
    // 切换状态
    switchTabItem(index) {
      this.$vux.loading.show({
        text: "loading"
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        this.status = index;
      }, 300);
    },
  },
  computed: {
    getName: function() {
      return "zhangsww";
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.my-order {
  padding: 46px 0 94px;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .order-nav {
    .curActive {
      color: #ff5151 !important;
      border-bottom: 2px solid #ff5151 !important;
    }
  }
  .goods-box {
    width: 100%;
    height: 100%;
    display: flex; // background-color: #fff;
    margin-top: 10px;
    .goods-list {
      width: 100%;
      .goods-list-item {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 10px 20px;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 10px;
        background-color: #fff;
        .item-top {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          position: relative;
          width: 100%;
          padding-bottom: 10px;
          border-bottom: 1px solid #e0e0e0;
          .item-lf {
            margin-right: 0.8em;
            width: 60px;
            height: 60px;
            line-height: 60px;
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
            .item-rt_title {
              .status {
                font-size: 15px;
                color: #999;
              }
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
              margin-top: 22px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .price {
                color: #ff5151;
                font-size: 15px;
                font-weight: bold;
              }
            }
          }
        }
        .item-bottom {
          width: 100%;
          height: 34px;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          .look-detail,
          .pay {
            width: 73px;
            height: 22px;
            line-height: 22px;
            border: 1px solid #bbbbbb;
            font-size: 12px;
            color: #999;
            text-align: center;
            border-radius: 24px;
          }
          .pay {
            margin-left: 10px;
            color: #ff5151;
            border-color: #ff5151;
          }
        }
        &.not-only {
          padding: 0px;
          background-color: transparent;
          .item-top {
            padding: 0px 20px;
            height: 36px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-bottom: 0;
            border-bottom: 0;
            background-color: #fff;
            span.status {
              font-size: 15px;
              color: #999;
            }
          }
          .item-center {
            width: 100%;
            overflow: hidden;
            .item-center-ul {
              padding: 10px 20px;
              height: 60px;
              display: flex;
              overflow-y: hidden;
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
              box-sizing: content-box;
              li {
                flex-shrink: 0;
                width: 60px;
                height: 60px;
                overflow: hidden;
                float: left;
                margin-right: 15px;
                &:last-child {
                  padding-right: 20px;
                }
                img {
                  width: 100%;
                  max-height: 100%;
                  vertical-align: top;
                }
              }
            }
            .item-center-price {
              height: 32px;
              padding: 0 20px;
              background-color: #fff;
              .item-center-price-box {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                height: 31px;
                border-bottom: 1px solid #E0E0E0;
                p.p1 {
                  height: 24px;
                  line-height: 24px;
                  font-size: 12px;
                  color: #333;
                }
                p.p2 {
                  margin-left: 11px;
                  height: 24px;
                  line-height: 24px;
                  font-size: 12px;
                  color: #333;
                  b {
                    color: #ff5151;
                    font-size: 15px;
                  }
                }
              }
            }
          }
          .item-bottom{
            background-color: #fff;
            padding: 10px 20px 10px;
            box-sizing: border-box;
            height: 44px;
          }
        }
      }
    }
  }
  .balance {
    position: fixed;
    left: 0;
    bottom: 46px;
    width: 100%;
    height: 44px;
    background-color: #fff;
    box-shadow: 0 0px 3px #eee;
    .lf {
      flex: 1;
      span.checkAll {
        display: block;
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border: 1px solid #bbbbbb;
        border-radius: 50%;
        margin: 0 10px 0 12px;
        &.checked {
          border: none;
          background: url("../../assets/images/pocket_btn_choose@2x.png")
            no-repeat 0 0;
          background-size: 100%;
        }
      }
      span.checkAllText {
        font-size: 12px;
        color: #999999;
        margin-right: 10px;
      }
      p.total {
        color: #333333;
        font-size: 16px;
        .totalPrice {
          font-weight: bold;
        }
      }
    }
    .rt {
      flex-shrink: 0;
      width: 100px;
      .toBalance {
        display: block;
        width: 100px;
        height: 100%;
        line-height: 44px;
        background-color: #ff5151;
        color: #fff;
        font-size: 15px;
        text-align: center;
      }
      .delete {
        display: block;
        width: 78px;
        height: 28px;
        line-height: 30px;
        border: 1px solid #e0e0e0;
        background-color: #fff;
        color: #666666;
        font-size: 15px;
        text-align: center;
        margin-top: 7px;
        margin-left: 5px;
        border-radius: 15px;
      }
    }
  }
}
</style>
