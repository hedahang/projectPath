<template>
  <div class="carts container">
    <x-header class="home-header header-bar" :left-options="{showBack: false}" :title="pageTitle" style="background-color:#FF5151;">
      <span @click="changeEdit" style="font-size: 15px;color: #ffffff;" slot="right">{{headerRight}}</span>
    </x-header>
    <!-- 商品列表 -->
    <div class="goods-box">
        <aside class="goods-lf">
            <ul>
                <li v-for="(item,index) in goodsList" :key='index' class="ui center">
                    <span :class='{"checked":item.checked}' @click="handGoodsChecked(item,index)"></span>
                </li>
            </ul>
        </aside>
        <div class="goods-rt">
            <goodsListC :list="goodsList"></goodsListC>
        </div>
    </div>
    <divider>我是有底线的</divider>
    <!-- 结算栏 -->
    <div class="balance ui jbetween">
        <div class="lf f1 ui acenter">
            <span @click="handleCheckedAll" :class="{'checkAll':true,'checked':isAllChecked}"></span>
            <span class="checkAllText">全选</span>
            <p v-show="!edit" class="total">
                <span class="totalText">合计:</span>
                <span class="totalPrice">￥{{allPrice}}</span>
            </p>
        </div>
        <div class="rt fshrink">
            <span v-show="!edit" class="toBalance" @click="toSubmitOrder">去结算</span>
            <span v-show="edit" class="delete" @click="delGoods">删除</span>
        </div>
    </div>
    <!-- 底部导航栏 -->
    <footerBar selected="pocket"></footerBar>
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
import { util, request as $, cookie } from "@/utils/index";
export default {
  name: "home",
  data() {
    return {
      pageTitle: "口袋",
      headerRight: "编辑",
      edit: false,
      allPrice: 0,
      isAllChecked: false, // 是否全选
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
    Divider,
    goodsListC
  },
  created() {
    this.getPageData();
  },
  methods: {
    // 切换选中商品
    handGoodsChecked(item, index) {
      if (item.checked) {
        item.checked = false; // 取消选中
        this.isAllChecked = false;
      } else {
        item.checked = true; // 选中
        this.isAllChecked = true;
        this.goodsList &&
          this.goodsList.length !== 0 &&
          this.goodsList.forEach(item => {
            if (!item.checked) {
              this.isAllChecked = false;
            }
          });
      }
      this.totalPrice();
    },
    // 切换全选
    handleCheckedAll() {
      if (this.isAllChecked) {
        this.isAllChecked = false;
      } else {
        this.isAllChecked = true;
      }
      this.goodsList &&
        this.goodsList.length !== 0 &&
        this.goodsList.forEach(item => {
          item.checked = this.isAllChecked;
        });
      this.totalPrice();
    },
    // 计算总价
    totalPrice() {
      this.allPrice = 0;
      this.goodsList &&
        this.goodsList.length !== 0 &&
        this.goodsList.forEach(item => {
          if (item.checked) {
            this.allPrice =
              (this.allPrice * 100 + item.sale_price * item.qty * 100) / 100;
          }
        });
    },
    // 删除商品
    delGoods() {
      let row_id = [];
      this.goodsList &&
        this.goodsList.length !== 0 &&
        this.goodsList.forEach(item => {
          if (item.checked) {
            row_id.push(item.row_id);
          }
        });
      if (row_id && row_id.length !== 0) {
        $.delete("/api/carts", row_id).then(rs => {
          this.getPageData();
        });
      }
    },
    // 去结算
    toSubmitOrder() {
      let payGoods = []; // 提交订单数组
      this.goodsList &&
        this.goodsList.length !== 0 &&
        this.goodsList.forEach(item => {
          if (item.checked) {
            payGoods.push(item.row_id);
          }
        });
      console.log(payGoods);
      if (payGoods && payGoods.length !== 0) {
        cookie.set("payGoods", payGoods.join(","));
        this.$router.push("/submitOrder");
      } else {
        this.$toast({
          text: "没有选中的商品",
          width: "140px"
        });
      }
    },
    getPageData() {
      //购物车列表
      $.get("/api/carts").then(response => {
        this.goodsList = response.data && response.data.list;
        this.goodsList &&
          this.goodsList.length !== 0 &&
          this.goodsList.forEach(item => {
            this.$set(item, "checked", false);
            if (!item.qty) {
              this.$set(item, "qty", 0);
            } else {
              this.$set(item, "qty", item.qty);
            }
          });
      });
    },
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
.carts {
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
    overflow: hidden;
    .goods-lf {
      width: 30px;
      flex-shrink: 0;
      ul {
        width: 100%;
        height: 100%;
        margin-top: 7px;
        li {
          width: 100%;
          height: 103px;
          justify-content: flex-end;
          span {
            display: block;
            width: 18px;
            height: 18px;
            box-sizing: border-box;
            border: 1px solid #bbbbbb;
            border-radius: 50%;
            &.checked {
              border: none;
              background: url("../../assets/images/pocket_btn_choose@2x.png")
                no-repeat 0 0;
              background-size: 100%;
            }
          }
        }
      }
    }
    .goods-rt {
      flex: 1;
      overflow: hidden;
      .goods-list .goods-list-item {
        padding: 10px 20px 10px 10px;
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
