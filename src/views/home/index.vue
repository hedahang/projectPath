<template>
  <div class="home container">
    <x-header class="home-header" :left-options="{showBack: false}" title="slot:overwrite-title" style="background-color:#FF5151;">
      <div class="overwrite-title-demo" slot="overwrite-title" @click="toSearch" >
        <group gutter='0'>
          <x-input disabled title="" placeholder="请输入商品">
            <img slot="label" style="padding-right:10px;display:block;" :src="iconSearch" width="16"
              height="16">
          </x-input>
        </group>
      </div>
    </x-header>
    <!-- 轮播 -->
    <swiper :aspect-ratio="300/750">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerList" :key="index"><img style="width:100%" :src="item.img"></swiper-item>
    </swiper>
    <!-- 分类栏 -->
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item link="/classify" label="推荐">
        <img slot="icon" src="../../assets/images/home_btn_recommend@2x.png">
      </grid-item>
      <grid-item :link="{ path: '/classify'}" label="零食">
        <img slot="icon" src="../../assets/images/home_btn_snacks@2x.png">
      </grid-item>
      <grid-item link="/classify" @on-item-click="onItemClick">
        <img slot="icon" src="../../assets/images/home_btn_cosmetics@2x.png">
        <span slot="label">美妆</span>
      </grid-item>
    </grid>
    <!-- 商品列表 -->
    <goodsListC :list="goodsList"></goodsListC>
    <!-- 底部导航栏 -->
    <footerBar selected="home"></footerBar>
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
  XHeader
} from "vux";
import footerBar from "@/components/footerBar/index";
import goodsListC from "@/components/goodsList/index";
import iconSearch from "@/assets/images/home_icon_search@2x.png";
import {$, util} from '@/utils/index'
export default {
  name: "home",
  data() {
    return {
      iconSearch: iconSearch,
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
    goodsListC
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
.home {
  padding: 46px 0 50px;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    .vux-header-title-area {
      width: 200px;
      margin: 0 auto;
      .overwrite-title-demo {
        margin-top: 7.5px;
        .weui-cells {
          border-radius: 20px;
          .weui-cell {
            padding: 0px 10px;
            input {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .weui-grids {
    background-color: #fff;
    .weui-grid {
      padding: 10px;
      &:after {
        display: none;
      }
      .weui-grid__icon {
        width: 44px;
        height: 44px;
      }
      .weui-grid__label {
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>
