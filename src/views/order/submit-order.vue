<template>
  <div class="submit-order">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" title="确认订单" style="background-color:#FF5151;">
    </x-header>
    <router-link class="userInfo ui acenter" to="/address">
      <div class="lf f1">
        <div class="top">
          <span class='username'>{{defaultAddr.name}}</span>
          <span class='mobile'>{{defaultAddr.mobile|formatMobile}}</span>
        </div>
        <div class="school">{{defaultAddr.province_name+defaultAddr.city_name+defaultAddr.city_name+defaultAddr.detailed_address}}</div>
      </div>
      <div class="rt fshrink">
        <img src="../../assets/images/my_btn_next@2x.png" alt="">
      </div>
    </router-link>
    <div class="box">
      <div class="box-list">
        <div class="box-item" v-for="(item,index) in pageData.list" :key='index'>
          <div class="item-lf">
            <img :src="item.image&&item.image[0]" alt="">
          </div>
          <div class="item-rt">
            <h4 class="item-rt_title">{{item.name}}</h4>
            <p class="item-rt_desc">{{item.desc}}</p>
            <p class="item-rt_sales">月销售{{item.sales}}份</p>
            <div class="item_rt_footer">
              <span class='price'>￥{{item.sale_price}}</span>
              <div class="item_rt_footer_number">x{{item.qty}}</div>
            </div>
          </div>
        </div>
      </div>
      <group>
        <popup-picker title="配送方式" :data="shippingTypeData" @on-change='handleShippingType' v-model="value1"></popup-picker>
      </group>
      <div class='coupon row ui acenter jbetween'>
        <div class="lf">优惠券</div>
        <div class="rt icon-right" @click="showCouponPopup = true">{{!formVal.coupon_id?pageData.couponCount+'张可选'
          :curCouponData.type==1?'优惠'+curCouponData.discount+'元':curCouponData.discount+'折'}}</div>
      </div>
    </div>
    <div class="cost">
      <div class="cost-amount row ui acenter jbetween">
        <div class="lf">商品金额</div>
        <div class="rt red">￥{{orderPrice}}</div>
      </div>
      <div class="cost-freight row ui acenter jbetween">
        <div class="lf">运费</div>
        <div class="rt red">￥{{pageData.freight}}</div>
      </div>
    </div>
    <div class="footer ui acenter jbetween">
      <div class="lf ui acenter">
        <span class='lf-text'>合计</span>
        <span class='lf-price'>￥{{orderLastPrice}}</span>
      </div>
      <div class="rt" @click="switchPayModal('open')">立即支付</div>
    </div>
    <div v-transfer-dom>
      <popup v-model="showPopup">
        <div class="popupBox">
            <div class="top ui center">
                <span>支付</span>
                <img @click="switchPayModal('close')" src='../../assets/images/btn_zhifu_qx@2x.png' alt="">
            </div>
            <div class="popupBox-list">
                <!-- <div class="item ui acenter jbetween">
                    <div class="wx lf ui">
                        <img src="../../assets/images/icon_zhifu_wx@2x.png" alt="">
                        <span>微信支付</span>
                    </div>
                    <div :class="{'rt':true,'checked':formVal.payment_type == 2}"></div>
                </div> -->
                <div class="item ui acenter jbetween">
                    <div class="zfb lf ui">
                        <img src="../../assets/images/icon_zhifu_zfb@2x.png" alt="">
                        <span>支付宝支付</span>
                    </div>
                    <div :class="{'rt':true,'checked':formVal.payment_type == 1}"></div>
                </div>
            </div>
            <div class="popupBoxPay" @click="confimPayOrder">确认支付{{orderLastPrice}}元</div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="showCouponPopup" height="270px" is-transparent>
        <div class="sub-coupon">
          <div v-for="(item,index) in couponData" :key='index' :class="{
            'coupon-item ui':true,
            'overdue4':item.status==4,
            'overdue2':item.status==2,
            'overdue3':item.status==3,
            'cur': item.id==formVal.coupon_id}" @click="handleCoupon(item)">
            <div class="lf ui center">
              <span class="price">{{item.discount}}</span>
              <!-- <p class="desc ellitext">{{item.description}}</p> -->
            </div>
            <div class="rt">
              <p class="name">{{item.description}}</p>
              <p class="date">{{item.begin_at|formatDate}} - {{item.end_at|formatDate}}</p>
              <p class='desc'>{{item.reason}}</p>
            </div>
            <icon class="couponCur" type="success"></icon>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import {
  Group,
  Cell,
  XButton,
  PopupPicker,
  Popup,
  TransferDom,
  XHeader,
  Icon
} from "vux";
import iconSearch from "@/assets/images/home_icon_search@2x.png";
import iconPocket from "@/assets/images/recommend_btn_pocket@2x.png";
import { util, request as $, cookie } from "@/utils/index";
export default {
  name: "submitOrder",
  data() {
    return {
      defaultAddr: {
        id: undefined,
        user_id: undefined,
        name: "张三",
        mobile: "13800138000",
        province_id: null,
        province_name: "",
        city_id: null,
        city_name: "",
        area_id: null,
        area_name: "",
        detailed_address: "",
        is_default: 1
      },
      pageData: {
        couponCount: "",
        freight: "",
        list: "",
        payType: null,
        shippingType: null
      },
      shippingTypeData: [["快递自取", "送货上门"]],
      value1: ["快递自取"],
      showPopup: false,
      showCouponPopup: false,
      couponData: [],
      curCouponData: {},
      orderPrice: "", // 商品金额
      orderLastPrice: "", // 最终价格
      formVal: {
        address_id: "", // 地址
        coupon_id: "", // 优惠券Id
        row_id: [], // 商品Id
        remark: "加辣特拉", //备注
        payment_type: 1,
        shipping_type: 1
      }
    };
  },
  directives: {
    TransferDom
  },
  components: {
    PopupPicker,
    Group,
    Popup,
    XHeader,
    Cell,
    XButton,
    Icon
  },
  filters: {
    formatMobile(val) {
      return val.slice(0, 3) + "****" + val.slice(7, 11);
    },
    formatDate(val) {
      return val.slice(0, 10).replace(/-/g, ".");
    }
  },
  created() {
    // 初始页面数据
    let payGoods = cookie.get("payGoods");
    console.log(cookie.get("payGoods"));
    this.formVal.row_id = payGoods && payGoods.split(",");
    this.getPageData();
  },
  methods: {
    // 确认支付
    confimPayOrder() {
      console.log(this.formVal);
      this.$vux.loading.show();
      $.post(`/api/orders`, this.formVal)
        .then(res => {
          console.log(res);
          this.$vux.loading.hide();
        })
        .catch(() => {
          this.$vux.loading.hide();
        });
    },
    // 选择配送方式
    handleShippingType(value) {
      if (value == "快递自取") {
        this.formVal.shipping_type = 1;
      } else if (value == "送货上门") {
        this.formVal.shipping_type = 2;
      }
    },
    getPageData() {
      //获取默认地址
      $.get("/api/addresses").then(response => {
        let list = response.data && response.data.list;
        list &&
          list.length !== 0 &&
          list.forEach(item => {
            if (item.is_default == 1) {
              this.defaultAddr = item;
              this.formVal.address_id = item.id;
            }
          });
      });
      //商品列表
      $.get("/api/carts/confirm", { row_id: this.formVal.row_id }).then(rs => {
        this.pageData = rs.data;
        this.totalPrice();
      });
      //我的优惠券列表
      $.get("/api/coupons").then(response => {
        this.couponData = response.data && response.data.list;
      });
    },
    // 打开支付弹框
    switchPayModal(type) {
      if (type == "open") {
        console.log("打开");
        this.showPopup = true;
      } else if (type == "close") {
        console.log("关闭");
        this.showPopup = false;
      }
    },
    // 选择购物券
    handleCoupon(item) {
      if (item.usable) {
        if (item.id == this.formVal.coupon_id) {
          this.formVal.coupon_id = "";
          this.curCouponData = {};
        } else {
          this.formVal.coupon_id = item.id;
          this.curCouponData = item;
        }
        this.showCouponPopup = false;
        this.totalPrice();
      }
    },
    // 计算总价
    totalPrice() {
      this.orderPrice = 0;
      this.orderLastPrice = 0;
      this.pageData &&
        this.pageData.list &&
        this.pageData.list.length &&
        this.pageData.list.forEach(item => {
          this.orderPrice =
            (Number(this.orderPrice) * 100 +
              Number(item.sale_price) * 100 * Number(item.qty)) /
            100;
        });
      if (this.curCouponData.type == 1) {
        // 满减
        this.orderLastPrice =
          (Number(this.orderPrice) * 100 -
            Number(this.curCouponData.discount) * 100) /
          100;
      } else if (this.curCouponData.type == 2) {
        // 折扣
        this.orderLastPrice =
          Number(this.curCouponData.discount) *
          100 *
          (Number(this.orderPrice) * 100) /
          10000;
      } else {
        this.orderLastPrice = this.orderPrice;
      }
      this.orderLastPrice =
        (Number(this.orderLastPrice) * 100 +
          Number(this.pageData.freight) * 100) /
        100;
    }
  }
};
</script>
<style lang="less">
.submit-order {
  padding: 46px 0 50px;
  .userInfo {
    width: 100%;
    height: 60px;
    background-color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 2px;
      background: url("../../assets/images/order_bg_address@2x.png") no-repeat 0
        0;
      background-size: 100%;
    }
    .lf {
      .top {
        height: 20px;
        line-height: 20px;
        font-size: 15px;
        color: #333333;
        span.username {
          margin-right: 10px;
        }
      }
      .school {
        height: 15px;
        line-height: 15px;
        font-size: 12px;
        color: #999;
        margin-top: 3.5px;
      }
    }
    .rt {
      width: 8px;
      height: 15px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
  }
  .box {
    width: 100%;
    margin: 10px 0;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 15px;
    .box-list {
      .box-item {
        display: flex;
        align-items: center;
        padding: 10px 0px;
        position: relative;
        border-bottom: 1px solid #e0e0e0;
        &:before {
          display: none;
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
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price {
              color: #ff5151;
              font-size: 15px;
              font-weight: bold;
            }
            .item_rt_footer_number {
              color: #666666;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
  .weui-cells {
    margin-top: 0px;
    &:before {
      border-top: none;
    }
    &:after {
      border-bottom: 1px solid #e0e0e0;
      transform: scaleY(1);
    }
    .weui-cell {
      padding: 10px 0px;
      .weui-cell__hd {
        font-size: 15px;
        color: #333333;
        font-weight: 400;
      }
      .vux-cell-value {
        color: #666666;
        font-size: 15px;
      }
      .weui-cell__ft {
        height: 24px;
        padding-right: 20px;
        background: url("../../assets/images/my_btn_next@2x.png") no-repeat
          right center;
        background-size: 8px 15px;
        &:after {
          display: none;
        }
      }
    }
  }
  .coupon .weui-cells:after {
    display: none;
  }
  .row {
    height: 44px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 15px;
    &.coupon {
      border-bottom: none;
    }
    .lf {
      color: #333333;
      font-weight: 400;
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
  .cost {
    width: 100%;
    padding: 0 15px;
    margin: 0px 0 100px;
    background-color: #fff;
    box-sizing: border-box;
    .cost-amount {
      border-bottom: none;
    }
    .cost-freight {
      border-bottom: none;
      border-top: 1px solid #e0e0e0;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 49px;
    display: flex;
    background-color: #ffffff;
    border-top: 1px solid #ddd;
    .lf {
      padding: 0 15px;
      height: 30px;
      line-height: 30px;
      .lf-text {
        color: #666;
        font-size: 12px;
      }
      .lf-price {
        font-weight: bold;
        font-size: 18px;
        color: #ff5151;
        margin-left: 12px;
      }
    }
    .rt {
      flex-shrink: 0;
      width: 120px;
      text-align: center;
      line-height: 49px;
      background-color: #ff5151;
      color: #fff;
      font-size: 18px;
    }
  }
}
.popupBox {
  background-color: #fff;
  padding: 1px;
  .top {
    height: 47px;
    border-bottom: 1px solid #e0e0e0;
    position: relative;
    font-size: 18px;
    color: #333333;
    font-weight: 400;
    img {
      position: absolute;
      right: 25px;
      top: 16px;
      width: 15px;
      height: 15px;
      vertical-align: top;
    }
  }
  .popupBox-list {
    margin: 15px 20px 28px;
    .item {
      height: 24px;
      padding: 15px 0;
      .lf {
        font-size: 15px;
        color: #333333;
        font-weight: 400;
        &.wx img {
          width: 24px;
          height: 21.5px;
          vertical-align: top;
        }
        &.zfb img {
          width: 24px;
          height: 24px;
          vertical-align: top;
        }
        span {
          margin-left: 10px;
        }
      }
      .rt {
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
  .popupBoxPay {
    margin: 0 15px 10px;
    height: 44px;
    line-height: 44px;
    background-color: #ff5151;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
  }
}
.sub-coupon {
  background-color: #f5f6f7;
  overflow: hidden;
  min-height: 100%;
  padding: 10px;
  .coupon-item {
    width: 100%;
    height: 80px;
    background: url("../../assets/images/coupon_bg_available@2x.png");
    background-size: 100%;
    margin-bottom: 10px;
    overflow: hidden;
    padding-right: 22px;
    box-sizing: border-box;
    position: relative;
    &.overdue2 {
      background: url("../../assets/images/coupon_bg_frozen@2x.png");
      background-size: 100%;
    }
    &.overdue3 {
      background: url("../../assets/images/coupon_bg_unavailable@2x.png");
      background-size: 100%;
    }
    &.overdue4 {
      background: url("../../assets/images/coupon_bg_overdue@2x.png");
      background-size: 100%;
    }
    .lf {
      width: 120px;
      height: 100%;
      flex-direction: column;
      flex-shrink: 0;
      .price {
        font-weight: 400;
        font-size: 30px;
        color: #fff;

        &::before {
          content: "￥";
          font-size: 15px;
          font-weight: normal;
        }
      }

      .desc {
        font-size: 12px;
        color: #fff;
        margin-top: 2px;
        padding-bottom: 3px;
        max-width: 90%;
      }
    }
    .rt {
      // background-color: #fff;
      overflow: hidden;
      // flex: 1;
      .name {
        // width: 100%;
        // height: 20px;
        line-height: 20px;
        color: #333333;
        font-size: 15px;
        margin: 5px 0 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .date {
        width: 100%;
        height: 16px;
        line-height: 16px;
        color: #999;
        font-size: 12px;
        margin: 4px 0 0 10px;
      }
      .desc {
        width: 100%;
        height: 16px;
        line-height: 16px;
        color: #666666;
        font-size: 12px;
        margin: 14px 0 0 10px;
      }
    }
    .couponCur {
      position: absolute;
      right: 2px;
      top: 50%;
      margin-top: -12px;
      display: none;
    }
    &.cur .couponCur {
      display: block;
    }
  }
}
</style>
