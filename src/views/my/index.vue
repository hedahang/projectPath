<template>
  <div class="my container">
    <header class="ui jcenter">
        <div class="my-header ui acenter">
            <img src="../../assets/images/my_icon_head@2x.png" alt="头像">
            <p class="username ellitext">登录/注册</p>
        </div>
    </header>
    <!-- 列表 -->
    <div class="my-list">
      <router-link to="/order" class="row ui acenter jbetween">
          <div class="lf ui acenter">
              <span class="icon-my-order"></span>
              <span class='lf-text'>我的订单</span>
          </div>
          <div class="rt icon-right"></div>
      </router-link>
      <router-link to="/coupon" class="row ui acenter jbetween">
          <div class="lf ui acenter">
              <span class="icon-my-coupon"></span>
              <span class='lf-text'>优惠券</span>
          </div>
          <div class="rt icon-right"></div>
      </router-link>
      <router-link to="/address/index" class="row ui acenter jbetween">
          <div class="lf ui acenter">
              <span class="icon-my-address"></span>
              <span class='lf-text'>收货地址</span>
          </div>
          <div class="rt icon-right"></div>
      </router-link>
      <router-link to="/setting" class="row ui acenter jbetween">
          <div class="lf ui acenter">
              <span class="icon-my-setting"></span>
              <span class='lf-text'>设置</span>
          </div>
          <div class="rt icon-right"></div>
      </router-link>
      <router-link to="/opinion/index" class="row ui acenter jbetween">
          <div class="lf ui acenter">
              <span class="icon-my-opinion"></span>
              <span class='lf-text'>意见反馈</span>
          </div>
          <div class="rt icon-right"></div>
      </router-link>
    </div>
    <!-- 底部导航栏 -->
    <footerBar selected="my"></footerBar>
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
      pageTitle: "口袋",
      headerRight: "编辑",
      edit: false,
      goodsList: [
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
          number: 0
        },
        {
          img:
            "http://ofjo26fgy.bkt.clouddn.com/21d87e11b15046bfb4a6f73af2c3b80e.jpg",
          title: "薯片",
          desc: "非常棒的薯片",
          sales: "2000",
          price: "8",
          number: 0
        },
        {
          img:
            "http://ofjo26fgy.bkt.clouddn.com/21d87e11b15046bfb4a6f73af2c3b80e.jpg",
          title: "薯片",
          desc: "非常棒的薯片",
          sales: "2000",
          price: "8",
          number: 0
        },
        {
          img:
            "http://ofjo26fgy.bkt.clouddn.com/21d87e11b15046bfb4a6f73af2c3b80e.jpg",
          title: "薯片",
          desc: "非常棒的薯片",
          sales: "2000",
          price: "8",
          number: 0
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
.my {
  padding: 0px 0 50px;
  header {
    width: 100%;
    height: 194px;
    background-color: #ff5151;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 0px;
      height: 47.5px;
      background: url("../../assets/images/my_bg_head@2x.png") no-repeat 0 0;
      background-size: cover;
    }
    .my-header {
      width: 80%;
      margin: 44px auto 0px;
      flex-direction: column;
      img {
        width: 60px;
        height: 60px;
        display: block;
      }
      .username {
        font-size: 15px;
        color: #fff;
        margin-top: 11px;
        letter-spacing: 1px;
        width: 100%;
        text-align: center;
      }
    }
  }
  .my-list {
    margin-top: 10px;
    background-color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    width: 100%;
    .row {
      height: 44px;
      border-bottom: 1px solid #e0e0e0;
      font-size: 15px;
      &:last-child {
        border-bottom: none;
      }
      .lf {
        color: #333333;
        font-weight: 400;
        span {
          vertical-align: middle;
        }
      }
      .rt {
        color: #666666;
        height: 20px;
        line-height: 20px;
        &.icon-right {
          padding-right: 24px;
          background: url("../../assets/images/my_btn_next@2x.png") no-repeat
            right center;
          background-size: 8px 15px;
        }
        &.red {
          color: #ff5151;
          font-size: 15px;
          font-weight: bold;
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
