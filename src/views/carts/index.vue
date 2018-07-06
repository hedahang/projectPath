<template>
  <div class="classify container">
    <x-header class="home-header header-bar" :left-options="{showBack: false}" :title="pageTitle" style="background-color:#FF5151;">
      <span style="font-size: 15px;color: #ffffff;" slot="right">编辑</span>
    </x-header>
    <!-- 商品列表 -->
    <div class="goods-box" :style="{height:classifyGoodsHeight+'px'}">
        <aside class="goods-lf">
            <ul>
                <li class="current"><a href="#">薯片</a></li>
                <li><a href="#">糖果</a></li>
                <li><a href="#">巧克力</a></li>
                <li><a href="#">坚果</a></li>
                <li><a href="#">辣条</a></li>
            </ul>
        </aside>
        <div class="goods-rt">
            <goodsListC :list="goodsList"></goodsListC>
        </div>
    </div>
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
import iconSearch from "@/assets/images/home_btn_search@2x.png";
export default {
  name: "home",
  data() {
    return {
      pageTitle: "口袋",
      iconSearch: iconSearch,
      classifyGoodsHeight: 0,
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
    goodsListC
  },
  created() {
    let Cheight = document.documentElement.clientHeight;
    this.classifyGoodsHeight = Cheight - 96;
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
.classify {
  padding: 46px 0 50px;
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
    .goods-lf {
      width: 80px;
      flex-shrink: 0;
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      ul {
        width: 100%;
        height: 100%;
        li {
          width: 100%;
          height: 40px;
          line-height: 40px;
          background-color: #f5f5f5;
          margin-top: 1px;
          &:first-child {
            margin-top: 0;
          }
          &.current {
            background-color: #ffffff;
          }
          a {
            display: block;
            font-size: 15px;
            color: #999999;
            text-align: center;
          }
        }
      }
    }
    .goods-rt {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .goods-list .goods-list-item {
        padding: 10px;
      }
    }
  }
}
</style>
