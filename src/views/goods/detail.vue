<template>
  <div class="detail container" :style="{'minHeight':minHeight+'px'}">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" title="商品详情" style="background-color:#FF5151;">
    </x-header>
    <!-- 轮播 -->
    <swiper :aspect-ratio="400/750">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in data.image" :key="index">
        <img style="width:100%" :src="item">
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <div class="detail-info">
      <div class="info-top">
        <span class="info-top-title ellitext">{{data.name}}</span>
        <b v-if="data.discount_message" class="info-top-tag">{{data.discount_message}}</b>
      </div>
      <p class="info-desc">{{data.description}}</p>
      <p class="info-sales">月销售{{data.sales}}份</p>
      <div class="info-desc_footer">
        <span class='price'>￥{{data.sale_price}}</span>
        <div class="info-desc_footer_number">
          <inlineNumber :item="data"></inlineNumber>
        </div>
      </div>
    </div>
    <!-- 购物车栏 -->
    <div class="detail-shop">
        <div class="shop-lf">
            <a class="icon-shop" href="#/carts">
                <img :src="iconPocket" alt="">
                <badge class="shopBadge" :text="getGoodsNum.num"></badge>
            </a>
            <div class="shop-price">￥{{getGoodsNum.price}}</div>
        </div>
        <a class="shop-rt" href="#/carts">结算</a>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem, XHeader, Badge } from "vux";
import iconSearch from "@/assets/images/home_icon_search@2x.png";
import iconPocket from "@/assets/images/recommend_btn_pocket@2x.png";
import inlineNumber from "@/components/inline-number/index";
import { util, request as $, cookie } from "@/utils/index";
export default {
  name: "home",
  data() {
    return {
      iconSearch,
      iconPocket,
      goodsId: undefined, // 商品Id
      cartList: [], // 购物车
      data: {
        id: undefined,
        category_id: undefined,
        name: "",
        description: "",
        image: [],
        sale_price: "",
        sales: 0,
        keyword: "",
        qty: 0
      },
      minHeight:400
    };
  },
  components: {
    XHeader,
    Swiper,
    SwiperItem,
    inlineNumber,
    Badge
  },
  created() {
    this.minHeight = window.innerHeight - 96
    // 分类id
    let { id } = this.$route.query;
    this.goodsId = id;
    // 初始页面事件
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.$vux.loading.show();
      //商品
      $.get(`/api/goods/${this.goodsId}`).then(response => {
        this.data = Object.assign(this.data, response.data && response.data[0]);
        this.$vux.loading.hide();
      });
      // 获取购物车数据
      $.get("/api/carts").then(response => {
        this.cartList = response.data && response.data.list;
      });
    }
  },
  computed: {
    getGoodsNum: function() {
      let num = 0;
      let price = 0;
      this.cartList &&
        this.cartList.length !== 0 &&
        this.cartList.forEach(item => {
          if (item.id == this.data.id) {
            num += parseInt(this.data.qty);
            price +=
              parseFloat(item.sale_price) * 100 * parseInt(this.data.qty) / 100;
          } else {
            if (!!item.qty) {
              num += parseInt(item.qty);
              price +=
                parseFloat(item.sale_price) * 100 * parseInt(item.qty) / 100;
            }
          }
        });
      return { num, price };
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
