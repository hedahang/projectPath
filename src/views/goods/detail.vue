<template>
  <div class="detail container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" title="商品详情" style="background-color:#FF5151;">
    </x-header>
    <!-- 轮播 -->
    <swiper :aspect-ratio="400/750">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerList" :key="index">
        <img style="width:100%" :src="item.img">
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <div class="detail-info">
      <div class="info-top">
        <span class="info-top-title ellitext">经典原味、芝士、香辣味薯片</span>
        <b class="info-top-tag">满100减3元</b>
      </div>
      <p class="info-desc">非常棒的薯片</p>
      <p class="info-sales">月销售2000份</p>
      <div class="info-desc_footer">
        <span class='price'>￥88</span>
        <div class="info-desc_footer_number">
          <inlineNumber :item="item"></inlineNumber>
        </div>
      </div>
    </div>
    <!-- 购物车栏 -->
    <div class="detail-shop">
        <div class="shop-lf">
            <div class="icon-shop">
                <img :src="iconPocket" alt="">
                <badge class="shopBadge" text="8"></badge>
            </div>
            <div class="shop-price">￥12.9</div>
        </div>
        <a class="shop-rt" href="#/submitOrder">结算</a>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem, XHeader, Badge } from "vux";
import iconSearch from "@/assets/images/home_icon_search@2x.png";
import iconPocket from "@/assets/images/recommend_btn_pocket@2x.png";
import inlineNumber from "@/components/inline-number/index";
export default {
  name: "home",
  data() {
    return {
      iconSearch,
      iconPocket,
      item: {
        number: 0
      },
      bannerList: [
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg"
        },
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg"
        },
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg" // 404
        }
      ],
      goodsList: [
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
    Swiper,
    SwiperItem,
    inlineNumber,
    Badge
  },
  methods: {
    onItemClick() {
      console.log("123");
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
.detail {
  padding: 46px 0 50px;
  background-color: #fff;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .detail-info {
    padding: 0 15px;
    .info-top {
      height: 20px;
      line-height: 20px;
      overflow: hidden;
      display: flex;
      align-items: center;
      margin-top: 10px;
      .info-top-title {
        // flex: 1;
        color: #333;
        font-size: 15px;
        font-weight: 600;
        padding-right: 10px;
      }
      .info-top-tag {
        flex-shrink: 0;
        padding: 0px 6px;
        height: 16px;
        line-height: 16px;
        color: #ff5151;
        border: 1px solid #ff5151;
        font-size: 12px;
      }
    }
    .info-desc {
      height: 20px;
      line-height: 20px;
      color: #999999;
      font-size: 12px;
      margin-top: 6px;
    }
    .info-sales {
      height: 20px;
      line-height: 20px;
      color: #666;
      font-size: 12px;
      margin-top: 6px;
    }
    .info-desc_footer {
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
  .detail-shop {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 49px;
    display: flex;
    background-color: #ffffff;
    .shop-lf {
      flex: 1;
      display: flex;
      .icon-shop {
        width: 49px;
        height: 49px;
        position: relative;
        left: 20px;
        bottom: 5px;
        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
        .shopBadge {
          position: absolute;
          top: -4px;
          right: -2px;
          background-color: #ff5151;
        }
      }
      .shop-price {
        font-size: 18px;
        color: #333333;
        margin-left: 36px;
        line-height: 50px;
      }
    }
    .shop-rt {
      flex-shrink: 0;
      width: 100px;
      text-align: center;
      line-height: 50px;
      background-color: #ff5151;
      color: #fff;
      font-size: 18px;
    }
  }
}
</style>
