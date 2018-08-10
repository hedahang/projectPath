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
        <div class="box-item" v-for="(item,index) in list" :key='index'>
          <div class="item-lf">
            <img :src="item.img" alt="">
          </div>
          <div class="item-rt">
            <h4 class="item-rt_title">{{item.title}}</h4>
            <p class="item-rt_desc">{{item.desc}}</p>
            <p class="item-rt_sales">月销售{{item.sales}}份</p>
            <div class="item_rt_footer">
              <span class='price'>￥{{item.price}}</span>
              <div class="item_rt_footer_number">x{{item.qty}}</div>
            </div>
          </div>
        </div>
      </div>
      <group>
        <popup-picker title="配送方式" :data="[['送货上门','自提']]" v-model="value1"></popup-picker>
      </group>
      <group class='coupon'>
        <popup-picker title="优惠券" :data="[['送货上门','自提']]" v-model="value1"></popup-picker>
      </group>
    </div>
    <div class="cost">
      <div class="cost-amount row ui acenter jbetween">
        <div class="lf">商品金额</div>
        <div class="rt red">￥28</div>
      </div>
      <div class="cost-freight row ui acenter jbetween">
        <div class="lf">运费</div>
        <div class="rt red">￥8</div>
      </div>
    </div>
    <div class="footer ui acenter jbetween">
      <div class="lf ui acenter">
        <span class='lf-text'>合计</span>
        <span class='lf-price'>￥36.00</span>
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
                <div class="item ui acenter jbetween">
                    <div class="wx lf ui">
                        <img src="../../assets/images/icon_zhifu_wx@2x.png" alt="">
                        <span>微信支付</span>
                    </div>
                    <div class="rt checked"></div>
                </div>
                <div class="item ui acenter jbetween">
                    <div class="zfb lf ui">
                        <img src="../../assets/images/icon_zhifu_zfb@2x.png" alt="">
                        <span>支付宝支付</span>
                    </div>
                    <div class="rt"></div>
                </div>
            </div>
            <div class="popupBoxPay">确认支付24元</div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { Group, PopupPicker, Popup, TransferDom, XHeader } from "vux";
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
        is_default: 1,
      },
      list: [
        {
          img:
            "http://ofjo26fgy.bkt.clouddn.com/21d87e11b15046bfb4a6f73af2c3b80e.jpg",
          title: "薯片",
          desc: "非常棒的薯片",
          sales: "2000",
          price: "8",
          qty: 8
        },
        {
          img:
            "http://ofjo26fgy.bkt.clouddn.com/21d87e11b15046bfb4a6f73af2c3b80e.jpg",
          title: "薯片",
          desc: "非常棒的薯片",
          sales: "2000",
          price: "8",
          qty: 8
        },
        {
          img:
            "http://ofjo26fgy.bkt.clouddn.com/21d87e11b15046bfb4a6f73af2c3b80e.jpg",
          title: "薯片",
          desc: "非常棒的薯片",
          sales: "2000",
          price: "8",
          qty: 8
        }
      ],
      value1: [],
      showPopup: false
    };
  },
  directives: {
    TransferDom
  },
  components: {
    PopupPicker,
    Group,
    Popup,
    XHeader
  },
  filters: {
    formatMobile(val) {
      return val.slice(0, 3)+'****'+val.slice(7, 11);
    }
  },
  created() {
    // 初始页面数据
    this.getPageData();
  },
  methods: {
    getPageData() {
      //获取默认地址
      $.get("/api/addresses").then(response => {
        let list = response.data && response.data.list;
        list&&list.length !== 0&&list.forEach(item=>{
          if(item.is_default == 1){
            this.defaultAddr = item;
          }
        })
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
    .cost-freight {
      border-bottom: none;
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
</style>
