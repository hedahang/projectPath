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
    <goodsListC :list="goodsList.data"></goodsListC>
  </div>
</template>

<script>
import { XInput, Group, XHeader } from "vux";
import goodsListC from "@/components/goodsList/index";
import iconSearch from "@/assets/images/home_icon_search@2x.png";
import { util, request as $, cookie } from "@/utils/index";
export default {
  name: "search",
  data() {
    return {
      iconSearch: iconSearch,
      goodsList: [],
      formVal:{
        q:'',
        page: 1,
      }
    };
  },
  components: {
    XHeader,
    XInput,
    Group,
    goodsListC
  },
  methods: {
    getPageData(){
      $.post("/api/goods/search",this.formVal).then(response => {
        this.goodsList = response.data && response.data.list;
        this.goodsList  && this.goodsList.data &&
          this.goodsList.data.length !== 0 &&
          this.goodsList.data.forEach(item => {
            if (!item.number) {
              this.$set(item, "number", 0);
            }
          });
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
  padding: 46px 0 50px;
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
