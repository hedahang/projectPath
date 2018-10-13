<template>
  <div class="home container" :style="{'minHeight':minHeight+'px'}">
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
    <goodsListC :list="goodsList" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20"></goodsListC>
    <load-more :show-loading="!firstAjax&&!loadMoreOver" :tip="firstAjax?'暂无数据':loadMoreOver?'没有更多数据了':'正在加载'" background-color="#fbf9fe"></load-more>
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
  XHeader,
  LoadMore
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
      goodsList: [],
      listQuery: {
        page: 1,
        per_page: 10
      },
      firstAjax: true, // 首次加载
      busy: false,
      loadMoreOver: false, // 是否加载完所有
      total:"",//总数量
      minHeight:'200'
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
    goodsListC,
    LoadMore
  },
  computed: {},
  created() {
    this.minHeight = window.innerHeight - 96
    this.getPageData();
    this.getGoodsList();
  },
  methods: {
    loadMore() {
      if (this.firstAjax) return;
      this.busy = true;
      //官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
      setTimeout(() => {
        //这里请求接口去拿数据，实际应该是调用一个请求数据的方法
        this.getGoodsList();
      }, 1000);
    },
    getPageData() {
      //商品分类
      $.get("/api/categories").then(response => {
        this.classifyList = response.data;
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
    },
    getGoodsList() {
      this.$vux.loading.show();
      //首页商品列表
      $.get(`/api/goods`, this.listQuery).then(response => {
        this.goodsList = this.goodsList.concat(response.data.data);
        this.total = response.data.total;
        if (this.goodsList.current_page) {
          this.goodsList = this.goodsList.data;
        }
        this.goodsList &&
          this.goodsList.length !== 0 &&
          this.goodsList.forEach(item => {
            if (!item.qty) {
              this.$set(item, "qty", 0);
            }
          });
        this.firstAjax = false;
        // 判断是否加载完成
        if (this.listQuery.page * this.listQuery.per_page >= this.total) {
          this.busy = true;
          this.loadMoreOver = true;
        } else {
          this.listQuery.page = this.listQuery.page + 1;
          this.busy = false;
        }
        this.$vux.loading.hide();
      });
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
