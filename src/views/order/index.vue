<template>
  <div class="my-order container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <!-- 订单商品列表 -->
    <div class="goods-box">
        <div class="goods-list">
            <a v-for="(item,index) in goodsList" :key='index' class="goods-list-item" href="#/goods">
                <div class="item-lf">
                    <img :src="item.img" alt="">
                </div>
                <div class="item-rt">
                    <h4 class="item-rt_title ui jbetween">
                        <span class='ellitext'>{{item.title}}</span>
                        <span class="status">已完成</span>
                    </h4>
                    <p class="item-rt_desc">{{item.desc}}</p>
                    <p class="item-rt_sales">月销售{{item.sales}}份</p>
                    <div class="item_rt_footer">
                        <span class='price'>￥{{item.price}}</span>
                    </div>
                </div>
            </a>
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
  Divider
} from "vux";
import footerBar from "@/components/footerBar/index";
import goodsListC from "@/components/goodsList/index";
export default {
  name: "home",
  data() {
    return {
      pageTitle: "我的订单",
      edit: false,
      goodsList: [
        {
          img:
            "http://ofjo26fgy.bkt.clouddn.com/21d87e11b15046bfb4a6f73af2c3b80e.jpg",
          title: "可比克麻辣番茄味薯片",
          desc: "非常非常非常棒的可比克麻辣番茄味薯片哦",
          sales: "2000",
          price: "8",
          number: 999
        },
        {
          img:
            "http://ofjo26fgy.bkt.clouddn.com/21d87e11b15046bfb4a6f73af2c3b80e.jpg",
          title: "薯片",
          desc: "非常棒的薯片",
          sales: "2000",
          price: "8",
          number: 999
        },
        {
          img:
            "http://ofjo26fgy.bkt.clouddn.com/21d87e11b15046bfb4a6f73af2c3b80e.jpg",
          title: "薯片",
          desc: "非常棒的薯片",
          sales: "2000",
          price: "8",
          number: 999
        },
        {
          img:
            "http://ofjo26fgy.bkt.clouddn.com/21d87e11b15046bfb4a6f73af2c3b80e.jpg",
          title: "薯片",
          desc: "非常棒的薯片",
          sales: "2000",
          price: "8",
          number: 999
        }
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
    goodsListC
  },
  created() {},
  methods: {
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
.my-order {
  padding: 46px 0 94px;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .goods-box {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #fff;
    .goods-list {
      width: 100%;
      background-color: #fff;
      .goods-list-item {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        &:before {
          content: " ";
          position: absolute;
          left: 20px;
          top: 0;
          right: 20px;
          height: 1px;
          border-top: 1px solid #e0e0e0;
          color: #e5e5e5;
          transform-origin: 0 0;
          transform: scaleY(0.5);
        }
        &:first-child:before {
          display: none;
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
