<template>
  <div class="my-address container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <div class="address-list">
      <div class="address-item">
        <div class="top">
          <div class="ui">
            <span class="name ellitext">佚名</span>
            <span class="mobile">177****0000</span>
          </div>
          <p class="addr ellitext">西南交通大学</p>
        </div>
        <div class="bottom ui jbetween">
          <div class="lf ui acenter">
            <span class='checked'></span>
            <p>默认地址</p>
          </div>
          <div class="rt ui">
            <span class="edit">编辑</span>
            <span class="del">删除</span>
          </div>
        </div>
      </div>
      <div class="address-item">
        <div class="top">
          <div class="ui">
            <span class="name ellitext">佚名</span>
            <span class="mobile">177****0000</span>
          </div>
          <p class="addr ellitext">西南交通大学</p>
        </div>
        <div class="bottom ui jbetween">
          <div class="lf ui acenter">
            <span class=''></span>
            <p>设为默认</p>
          </div>
          <div class="rt ui">
            <span class="edit">编辑</span>
            <span class="del">删除</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增地址 -->
    <router-link class="addAdress ui center" to="/address/add">
      <img src="../../assets/images/home_btn_plus@2x.png" alt="">
      <span>新增地址</span>
    </router-link>
  </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "address",
  data() {
    return {
      pageTitle: "收货地址"
    };
  },
  components: {
    XHeader
  },
  created() {},
  methods: {},
  computed: {
    getName: function() {
      return "zhangsww";
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.my-address {
  padding: 46px 0 94px;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .address-list {
    padding-bottom: 46px;
    .address-item {
      padding: 12px 20px;
      background-color: #fff;
      margin-bottom: 10px;
      .top {
        width: 100%;
        padding-bottom: 8px;
        border-bottom: 1px solid #e0e0e0;
        .ui {
          width: 100%;
          span {
            height: 20px;
            line-height: 20px;
            font-size: 15px;
            color: #333;
            &.name {
              margin-right: 10px;
            }
            &.mobile {
              width: 100px;
            }
          }
        }
        .addr {
          width: 100%;
          height: 16px;
          line-height: 16px;
          font-size: 12px;
          color: #999;
          margin-top: 4px;
        }
      }
      .bottom {
        padding-top: 8px;
        .lf {
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
          p {
            font-size: 12px;
            color: #666;
            height: 16px;
            line-height: 16px;
            margin-left: 8px;
          }
        }
        .rt {
          span {
            display: block;
            height: 18px;
            line-height: 18px;
            padding-left: 26px;
            color: #999999;
            font-size: 12px;
            &.edit {
              background: url("../../assets/images/address_btn_edit@2x.png")
                no-repeat 0 center;
              background-size: 18px 18px;
            }
            &.del {
              background: url("../../assets/images/address_btn_delete@2x.png")
                no-repeat 0 center;
              background-size: 19px 18px;
              margin-left: 25px;
            }
          }
        }
      }
    }
  }
  .addAdress {
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #fff;
    color: #FF5151;
    font-size: 18px;
    height: 44px;
    img{
      width: 18px;
      height: 18px;
      display: block;
    }
    span{
      margin-left: 10px;
    }
  }
}
</style>
