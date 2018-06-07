<template>
  <div class="home container">
    <x-header class="home-header" :left-options="{showBack: false}" title="slot:overwrite-title" style="background-color:#FF5151;">
      <div class="overwrite-title-demo" slot="overwrite-title">
        <group gutter='0'>
          <x-input title="" placeholder="请输入商品" >
            <img slot="label" style="padding-right:10px;display:block;" :src="iconSearch" width="16"
              height="16">
          </x-input>
        </group>
      </div>
    </x-header>
    <!-- 轮播 -->
    <swiper :aspect-ratio="300/700">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerList" :key="index"><img style="width:100%" :src="item.img"></swiper-item>
    </swiper>
    <!-- 分类栏 -->
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item link="/component/cell" label="推荐">
        <img slot="icon" src="../../assets/images/home_btn_recommend@2x.png">
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" label="零食">
        <img slot="icon" src="../../assets/images/home_btn_snacks@2x.png">
      </grid-item>
      <grid-item link="/component/cell" @on-item-click="onItemClick">
        <img slot="icon" src="../../assets/images/home_btn_cosmetics@2x.png">
        <span slot="label">美妆</span>
      </grid-item>
    </grid>
    <!-- 商品列表 -->
    <div class="goods-list">
        <a class="goods-list-item">
            <div class="item-lf">
                <img src="http://ofjo26fgy.bkt.clouddn.com/21d87e11b15046bfb4a6f73af2c3b80e.jpg" alt="">
            </div>
            <div class="item-rt">
                <h4 class="item-rt_title">薯片</h4>
                <p class="item-rt_desc">非常棒的薯片</p>
                <p class="item-rt_sales">月销售2000份</p>
                <div class="item_rt_footer">
                    <span class='price'>￥8</span>
                    <div class="inline-number"></div>
                </div>
            </div>
        </a>
        <a class="goods-list-item">
            <div class="item-lf">
                <img src="http://ofjo26fgy.bkt.clouddn.com/21d87e11b15046bfb4a6f73af2c3b80e.jpg" alt="">
            </div>
            <div class="item-rt">
                <h4 class="item-rt_title">薯片</h4>
                <p class="item-rt_desc">非常棒的薯片</p>
                <p class="item-rt_sales">月销售2000份</p>
                <div class="item_rt_footer">
                    <span class='price'>￥8</span>
                    <div class="inline-number"></div>
                </div>
            </div>
        </a>
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
  XHeader
} from "vux";
import iconSearch from "@/assets/images/home_icon_search@2x.png";
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
    GroupTitle
  },
  methods: {
    onItemClick() {
      console.log("123");
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
  .home-header {
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
  .goods-list {
    margin-top: 7px;
    background-color: #fff;
    .goods-list-item {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      position: relative;
      &:before {
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
</style>
