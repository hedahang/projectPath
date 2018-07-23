<template>
  <div class="classify container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
      <router-link to="/search" style="font-size: 15px;color: #ffffff;" slot="right">
        <img style="display:block;" :src="iconSearch" width="18" height="18">
      </router-link>
    </x-header>
    <!-- 轮播 -->
    <swiper :aspect-ratio="300/750">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerList" :key="index"><a :href="item.redirect_url"><img style="width:100%" :src="item.image"></a></swiper-item>
    </swiper>
    <!-- 商品列表 -->
    <div class="goods-box" :style="{height:classifyGoodsHeight+'px'}">
        <aside class="goods-lf">
            <ul>
                <li v-for="(item,index) in data" :key="index" :class="index==curClass?'current':''">
                  <a href="#" @click="curClass=index">{{item.name}}</a>
                </li>
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
import { util, request as $, cookie } from "@/utils/index";
export default {
  name: "home",
  data() {
    return {
      pageTitle: "零食",
      classifyId: "",
      iconSearch: iconSearch,
      classifyGoodsHeight: 0,
      bannerList: [],
      data:[],
      curClass:0, // 当前分类
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
  computed:{
    goodsList:function(){
      return this.data[this.curClass]&&this.data[this.curClass].goods;
    }
  },
  created() {
    let Cheight = document.documentElement.clientHeight;
    this.classifyGoodsHeight = Cheight - 96;
    // 分类id
    let { id } = this.$route.query;
    this.classifyId = id;
    // 获取商品列表
    this.getPageData();
  },
  methods: {
    getPageData() {
      //商品
      $.get(`/api/categories/${this.classifyId}`).then(response => {
        this.data = response.data&&response.data.categoryList;
      });
      //banner列表
      $.get("/api/banners").then(response => {
        this.bannerList = response.data && response.data.list;
      });
    },
    onItemClick() {
      console.log("123");
    },
    toSearch() {
      //   console.log("123");
      this.$router.push("/search");
    }
  },
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
        &:before {
          left: 10px;
          right: 10px;
        }
      }
    }
  }
}
</style>
