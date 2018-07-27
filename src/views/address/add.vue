<template>
  <div class="my-addAddress container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <div class="addAddress-list">
      <div class="addAddress-item ui acenter jbetween">
        <group class="item-group" style="width:100%">
          <x-input title="联系人" v-model="formVal.name" required placeholder="姓名" :show-clear="true"></x-input>
        </group>
      </div>
      <div class="addAddress-item ui acenter jbetween">
        <group class="item-group" style="width:100%">
          <x-input title="电话" v-model="formVal.mobile" name="mobile" keyboard="number" is-type="china-mobile" required placeholder="联系人电话" :show-clear="true"></x-input>
        </group>
      </div>
      <div class="addAddress-item ui acenter jbetween">
        <group class="item-group addr" style="width:100%">
          <x-address @on-hide="logHide" @on-show="logShow" title="地区" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择区域" :show.sync="showAddress"></x-address>
        </group>
      </div>
      <div class="addAddress-item ui acenter jbetween">
        <group class="item-group" style="width:100%">
          <x-input title="详细地址" v-model="formVal.detailed_address" required placeholder="请输入详细地址" :show-clear="true"></x-input>
        </group>
      </div>
    </div>
    <!-- 确认 -->
    <div class="confirm">
      <div class="confirm-box ui center" @click="confirm">{{!editId?'确认':'修改'}}</div>
    </div>
  </div>
</template>

<script>
import {
  XHeader,
  XInput,
  Group,
  Cell,
  XAddress,
  ChinaAddressV4Data
} from "vux";
import { util, request as $, cookie } from "@/utils/index";
export default {
  name: "addAddress",
  data() {
    return {
      pageTitle: "新增地址",
      value: [],
      addressData: ChinaAddressV4Data,
      showAddress: false,
      editId: undefined,
      arrayId: [], // 地址id集合
      arrayName: [], // 地址name集合
      formVal: {
        name: "",
        mobile: "",
        province_id: "",
        province_name: "",
        city_id: "",
        city_name: "",
        area_id: "",
        area_name: "",
        detailed_address: ""
      }
    };
  },
  components: {
    XHeader,
    XInput,
    Group,
    Cell,
    XAddress
  },
  created() {
    let id = this.$route.query.id;
    this.editId = id;
    if (!!this.editId) {
      this.pageTitle = "修改地址";
      this.getPageDetail();
    }
  },
  methods: {
    logHide(type) {
      if (type) {
        console.log(this.value);
        this.formVal.province_id = this.arrayId[0];
        this.formVal.city_id = this.arrayId[1];
        this.formVal.area_id = this.arrayId[2];
        this.formVal.province_name = this.arrayName[0];
        this.formVal.city_name = this.arrayName[1];
        this.formVal.area_name = this.arrayName[2];
      }
    },
    logShow() {
      console.log("logShow");
    },
    onShadowChange(arrayId, arrayName) {
      this.arrayId = arrayId;
      this.arrayName = arrayName;
    },
    getPageDetail() {
      $.get(`/api/addresses/${this.editId}`).then(response => {
        console.log(response);
        this.formVal = JSON.parse(JSON.stringify(response.data));
        this.value = [
          response.data.province_id + "",
          response.data.city_id + "",
          response.data.area_id + ""
        ];
        console.log(this.value);
      });
    },
    confirm() {
      console.log(this.formVal);
      if (!this.formVal.name) {
        this.$toast({
          type: "text",
          text: "请输入联系人",
          width: "120px"
        });
        return;
      }
      if (!/^1\d{10}$/.test(this.formVal.mobile)) {
        this.$toast({
          text: "请输入正确电话",
          width: "140px"
        });
        return;
      }
      if (!this.formVal.province_id) {
        this.$toast({
          text: "请选择地区",
          width: "140px"
        });
        return;
      }
      if (!this.formVal.detailed_address) {
        this.$toast({
          text: "请输入详细地址",
          width: "140px"
        });
        return;
      }
      let method = this.editId ? "put" : "post";
      let url = this.editId ? "/api/addresses/"+this.editId : "/api/addresses";

      $.request({ method, url, data: this.formVal }).then(
        response => {
          this.$router.go(-1);
        }
      );
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
.my-addAddress {
  padding: 46px 0 94px;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .addAddress-list {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 0 15px;
    .addAddress-item {
      font-size: 15px;
      border-bottom: 1px solid #e0e0e0;
      &:last-child {
        border-bottom: none;
      }
      .item-group {
        & > .weui-cells {
          margin-top: 0;
          &:before {
            display: none;
          }
          &:after {
            display: none;
          }
          .weui-cell {
            padding: 10px 0;
          }
          .weui-label {
            font-size: 15px;
            color: #333;
            font-weight: 400;
            height: 24px;
            line-height: 24px;
            width: 5em !important;
          }
          .weui-input {
            font-size: 15px;
            &::-webkit-input-placeholder {
              /* WebKit browsers */
              color: #bbb;
            }
            &:-moz-placeholder {
              /* Mozilla Firefox 4 to 18 */
              color: #bbb;
            }
            &::-moz-placeholder {
              /* Mozilla Firefox 19+ */
              color: #bbb;
            }
            &:-ms-input-placeholder {
              /* Internet Explorer 10+ */
              color: #bbb;
            }
          }
          .vux-popup-picker-value,
          .vux-popup-picker-placeholder {
            color: #666;
            font-size: 15px;
          }
        }
        &.addr {
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
    }
  }

  .confirm {
    position: fixed;
    left: 15px;
    right: 15px;
    bottom: 10px;
    background-color: #ff5151;
    color: #fff;
    font-size: 18px;
    height: 44px;
    border-radius: 5px;
    .confirm-box {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
