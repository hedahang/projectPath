<template>
  <div class="my-coupon container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <div class="coupon-list">
      <div v-for="(item,index) in data" :key='index' :class="{
        'coupon-item ui':true,
        'overdue4':item.status==4,
        'overdue2':item.status==2,
        'overdue3':item.status==3}">
        <div class="lf ui center">
          <span class="price">{{item.discount}}</span>
          <!-- <p class="desc ellitext">{{item.description}}</p> -->
        </div>
        <div class="rt">
          <p class="name">{{item.description}}</p>
          <p class="date">{{item.begin_at|formatDate}} - {{item.end_at|formatDate}}</p>
          <!-- <p class='desc'>使用条件</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader } from "vux";
import { util, request as $, cookie } from "@/utils/index";
import config from "@/config/index";
export default {
  name: "home",
  data() {
    return {
      couponStatus: config.couponStatus,
      pageTitle: "优惠券",
      data: []
    };
  },
  components: {
    XHeader
  },
  filters: {
    formatDate(val) {
      return val.slice(0, 10).replace(/-/g, ".");
    }
  },
  created() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.$vux.loading.show();
      //我的优惠券列表
      $.get("/api/coupons").then(response => {
        this.data = response.data && response.data.list;
        this.$vux.loading.hide();
      });
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
.my-coupon {
  padding: 46px 0 94px;

  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }

  .coupon-list {
    padding: 10px;
    overflow: hidden;

    .coupon-item {
      width: 100%;
      height: 80px;
      background: url("../../assets/images/coupon_bg_available@2x.png");
      background-size: 100%;
      margin-bottom: 10px;
      overflow: hidden;

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
    }
  }
}
</style>
