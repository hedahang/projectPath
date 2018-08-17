<template>
  <div class="search container">
    <x-header  class="search-header" :left-options="{backText: ''}" title="slot:overwrite-title" style="background-color:#FF5151;">
      <div class="overwrite-title-demo" slot="overwrite-title">
        <group gutter='0'>
          <x-input title="" placeholder="请输入商品" @on-enter="handleSearch" v-model='formVal.q' >
            <img slot="label" style="padding-right:10px;display:block;" :src="iconSearch" width="16"
              height="16">
          </x-input>
        </group>
      </div>
      <span class="searchBtn" @click="handleSearch" slot="right">搜索</span>
    </x-header>
    <!-- 商品列表 -->
    <goodsListC v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" :list="goodsList.data"></goodsListC>
    <load-more :show-loading="!firstAjax&&!loadMoreOver" :tip="firstAjax?'暂无数据':loadMoreOver?'没有更多数据了':'正在加载'" background-color="#fbf9fe"></load-more>
  </div>
</template>

<script>
import { XInput, Group, XHeader,LoadMore  } from "vux";
import goodsListC from "@/components/goodsList/index";
import iconSearch from "@/assets/images/home_icon_search@2x.png";
import { util, request as $, cookie } from "@/utils/index";
export default {
  name: "search",
  data() {
    return {
      firstAjax:true, // 首次加载
      busy:false,
      loadMoreOver:false, // 是否加载完所有
      iconSearch: iconSearch,
      goodsList: [],
      formVal: {
        q: "",
        page: 1,
        per_page:1,
      }
    };
  },
  components: {
    XHeader,
    XInput,
    Group,
    goodsListC,
    LoadMore 
  },
  mounted() {
  },
  methods: {
    loadMore(){
      if(this.firstAjax) return
      this.busy = true;
     //官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
      setTimeout(() => {
        //这里请求接口去拿数据，实际应该是调用一个请求数据的方法
        this.busy = false;
      }, 1000);
    },
    getPageData() {
      this.$vux.loading.show();
      $.post("/api/goods/search", this.formVal).then(response => {
        this.goodsList = response.data;
        this.goodsList.data = this.goodsList.data;
        this.goodsList &&
          this.goodsList.data &&
          this.goodsList.data.length !== 0 &&
          this.goodsList.data.forEach(item => {
            if (!item.qty) {
              this.$set(item, "qty", 0);
            }
          });
          this.firstAjax = false;

          // 判断是否加载完成
          if(this.goodsList.current_page == this.goodsList.last_page){
            this.busy = true;
            this.loadMoreOver = true;
          }else{
            this.formVal.page = this.formVal.page+1
          }
      this.$vux.loading.hide();
      });
    },
    handleSearch() {
      this.getPageData();
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
.search {
  padding: 46px 0 0px;
  .search-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    .vux-header-left {
      .left-arrow:before {
        border-color: #fff;
        width: 10px;
        height: 10px;
      }
    }
    .vux-header-title-area {
      width: 200px;
      margin: 0 auto;
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
    .searchBtn {
      font-size: 15px;
      color: #ffffff;
    }
  }
}
</style>
