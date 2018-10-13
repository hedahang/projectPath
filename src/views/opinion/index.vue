<template>
  <div class="my-setting-opinion container" :style="{'minHeight':minHeight+'px'}">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <!-- 常见问题 -->
    <div class="opinion-title">
      <span>常见问题</span>
    </div>
    <div class="opinion-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <router-link v-for="(item,index) in pageData" :key="index" :to="{path:'/opinion/detail',query:{id:item.id}}" class="opinion-item ui acenter jbetween">
        <div class="lf">{{item.name}}</div>
        <div class="rt icon-right"></div>
      </router-link>
    </div>
    <!-- 确认 -->
    <router-link to="/opinion/feedback" class="confirm">
      <div class="confirm-box ui center">写反馈</div>
    </router-link>
  </div>
</template>

<script>
import { XHeader, XInput, Group, Cell } from "vux";
import { util, request as $, cookie } from "@/utils/index";
export default {
  name: "opinion",
  data() {
    return {
      pageTitle: "意见反馈",
      listQuery: {
        page: 1,
        per_page: 10
      },
      firstAjax: true, // 首次加载
      busy: false,
      loadMoreOver: false, // 是否加载完所有
      total: "", //总数量
      pageData: [],
      minHeight:''
    };
  },
  components: {
    XHeader,
    XInput,
    Group,
    Cell
  },
  created() {
    this.minHeight = window.innerHeight - 140
    this.getPageData();
  },
  methods: {
    loadMore() {
      if (this.firstAjax) return;
      this.busy = true;
      //官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
      setTimeout(() => {
        //这里请求接口去拿数据，实际应该是调用一个请求数据的方法
        this.getPageData();
      }, 1000);
    },
    getPageData() {
      this.$vux.loading.show();
      //首页商品列表
      $.get(`/api/feedbacks`, this.listQuery).then(response => {
        this.pageData = this.pageData.concat(response.data.data);
        this.total = response.data.total;
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
  },
  computed: {
    getName: function() {
      return "zhangsww";
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.my-setting-opinion {
  padding: 46px 0 94px;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .opinion-title {
    border-bottom: 1px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    span {
      display: block;
      font-size: 13px;
      color: #999999;
      margin-left: 16px;
    }
  }
  .opinion-list {
    background-color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    width: 100%;
    .opinion-item {
      height: 44px;
      border-bottom: 1px solid #e0e0e0;
      font-size: 15px;
      &:last-child {
        border-bottom: none;
      }
      .lf {
        color: #333333;
        font-weight: 400;
        span {
          vertical-align: middle;
        }
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
