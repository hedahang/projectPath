<template>
  <div class="goods-list">
        <a v-for="(item,index) in list" :key='index' class="goods-list-item">
            <div class="item-lf">
                <img :src="item.img" alt="">
            </div>
            <div class="item-rt">
                <h4 class="item-rt_title">{{item.title}}</h4>
                <p class="item-rt_desc">{{item.desc}}</p>
                <p class="item-rt_sales">月销售{{item.sales}}份</p>
                <div class="item_rt_footer">
                    <span class='price'>￥{{item.price}}</span>
                    <div class="item_rt_footer_number">
                      <inlineNumber :item="item"></inlineNumber>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
import inlineNumber from "@/components/inline-number/index";
export default {
  props: {
    list: {
      type: Array,
      defalut: []
    }
  },
  data() {
    return {};
  },
  components: {
    inlineNumber
  },
  methods: {}
};
</script>

<style lang="less">
.goods-list {
  margin-top: 7px;
  background-color: #fff;
  .goods-list-item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    position: relative;
    &:before {
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
      }
    }
  }
}
</style>
