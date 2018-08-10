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
      <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerList" :key="index"><a :href="item.redirect_url"><img style="width:100%" :src="item.image"></a></swiper-item>
    </swiper>
    <!-- 分类栏 -->
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item v-for="item in classifyList" :key='item.id' :link="'/classify?id='+item.id" :label="item.name">
        <img slot="icon" :src="item.image">
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
import { util, request as $, cookie } from "@/utils/index";
export default {
  name: "home",
  data() {
    return {
      iconSearch: iconSearch,
      classifyList: [],
      bannerList: [],
      goodsList: []
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
  computed: {
    addNumber: function() {
      let list = this.goodsList && this.goodsList.data;
      return list;
    }
  },
  created() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      // this.$vux.loading.show()
      // this.$vux.loading.hide()
      //商品分类
      $.get("/api/categories").then(response => {
        this.classifyList = response.data;
      });
      //首页商品列表
      $.get("/api/goods").then(response => {
        this.goodsList = response.data && response.data.data;
        this.goodsList  && this.goodsList.data &&
          this.goodsList.data.length !== 0 &&
          this.goodsList.data.forEach(item => {
            if (!item.qty) {
              this.$set(item, "qty", 0);
            }
          });
          console.log(this.goodsList)
      });
      //banner列表
      $.get("/api/banners").then(response => {
        console.log(response);
        this.bannerList = response.data && response.data.list;
      });
    },
    toSearch() {
      //   console.log("123");
      this.$router.push("/search");
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
