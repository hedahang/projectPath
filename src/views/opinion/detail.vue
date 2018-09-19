<template>
  <div class="my-setting-opinionD container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <!-- 问题详情 -->
    <div class="opinion-box">
      <div class="opinion-row">
        <div class="ask">
          <div class="lf">Q:</div>
          <div class="rt">图片无法加载</div>
        </div>
        <div class="answer">
          <div class="lf">A:</div>
          <div class="rt">原因1、网站的图片已经过期；原因2、网速不够，导致图片加载不顺利</div>
        </div>
      </div>
      <div class="opinion-row">
        <div class="ask">
          <div class="lf">Q:</div>
          <div class="rt">图片无法加载</div>
        </div>
        <div class="answer">
          <div class="lf">A:</div>
          <div class="rt">原因1、网站的图片已经过期；原因2、网速不够，导致图片加载不顺利</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, XInput, Group, Cell } from "vux";
import { util, request as $, cookie } from "@/utils/index";
export default {
  name: "opinion",
  data() {
    return {
      pageTitle: "意见详情",
      id:"",
      pageData:"",
    };
  },
  components: {
    XHeader,
    XInput,
    Group,
    Cell
  },
  created() {
    this.id = this.$route.query.id;
    this.getPageData()
  },
  methods: {
    getPageData(){
      if(!this.id)return;
      this.$vux.loading.show();
      $.get("/api/feedbacks/"+this.id).then(res => {
        console.log(res)
        this.pageData = res.data;
        this.$vux.loading.hide();
      });
    }
  },
};
</script>

<style rel="stylesheet/less" lang="less">
.my-setting-opinionD {
  padding: 46px 0 94px;
  background-color: #fff;
  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .opinion-box {
    margin: 15px;
    .opinion-row {
      width: 100%;
      font-size: 15px;
      font-weight: 500;
      .ask,.answer{
        display: flex;
        line-height: 20px;
        color: #333333;
        margin-bottom: 10px;
        .lf {
          width: 20px;
          height: 20px;
        }
      }
      .answer{
        color: #666666;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
