<template>
  <div class="my-setting-feedback container">
    <x-header class="home-header header-bar" :left-options="{backText: ''}" :title="pageTitle" style="background-color:#FF5151;">
    </x-header>
    <!-- 意见反馈 -->
    <div class="feedback-box">
      <group>
        <x-textarea :rows='4' autosize :max="200" placeholder="请写下您的意见或建议" v-model='temp.name'></x-textarea>
      </group>
      <div class="row-box">
        <div class="img-list">
          <div v-for="(item,index) in imgList" :key='index' class="item">
            <div class="img">
              <img :src="'http://'+item.imgUrl">
            </div>
            <!-- <img  src='../../images/newstwo/icon-delete.png' /> -->
            <div class="del" @click='deleteImg(index)'>
              <icon type="clear"></icon>
            </div>
          </div>
          <vue-core-image-upload v-if="imgList.length < maxCount" class="item add" :crop="false" @imageuploaded="imageuploaded"
            :data="pageData" :max-file-size="5242880" :url="baseUrl" :headers='setHeaders' inputOfFile='avatar' :multipleSize='maxCount'>
            <img src="../../assets/images/btn_ft_pic@2x.png" />
          </vue-core-image-upload>
        </div>
      </div>
    </div>
    <!-- 提交 -->
    <div :class="{confirm:true,'disabled':!this.temp.name}" >
      <div class="confirm-box ui center" @click="submitFeedBack">提交</div>
    </div>
  </div>
</template>

<script>
import { XHeader, XInput, Group, Cell, XTextarea, Icon } from "vux";
import VueCoreImageUpload from "vue-core-image-upload";
import { util, request as $, cookie } from "@/utils/index";

export default {
  name: "feedback",
  data() {
    return {
      baseUrl: process.env.BASE_API + "/api/user/upload",
      setHeaders: {
        Authorization: `Bearer ${cookie.get("windice_token")}`
      },
      pageTitle: "意见反馈",
      temp: {
        name: "",
        image: ""
      },
      imgList: [],
      subImgList: [],
      maxCount: 9,
      pageData: null
    };
  },
  components: {
    XHeader,
    XInput,
    Group,
    Cell,
    XTextarea,
    VueCoreImageUpload,
    Icon
  },
  created() {},
  methods: {
    submitFeedBack() {
      if (!this.temp.name) {
        this.$vux.toast.text("请写下您的意见或建议");
        return;
      }
      this.temp.image = this.subImgList.join(",");
      this.$vux.loading.show();
      $.post(`/api/feedbacks`, this.temp)
        .then(res => {
          this.$vux.loading.hide();
          this.$vux.toast.show({
            text: "反馈成功",
            type: "success"
          });
          this.$router.go(-1);
        })
        .catch(() => {
          this.$vux.loading.hide();
        });
    },
    deleteImg(index) {
      this.imgList.splice(index, 1);
    },
    imageuploaded(res) {
      if (res.code == 200) {
        this.imgList.push({
          src: res.data.avatar,
          imgUrl: res.data.preview
        });
        this.subImgList.push(res.data.avatar);
        this.$vux.toast.show({
          text: "上传成功",
          type: "success"
        });
      } else {
        this.$vux.toast.show({
          text: res.message,
          type: "warn"
        });
      }
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
.my-setting-feedback {
  padding: 46px 0 94px;
  background-color: #fff;

  .home-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }

  .feedback-box {
    margin: 5px 0;

    .weui-cells {
      margin-top: 0;

      &:before,
      &:after {
        display: none;
      }
    }

    textarea {
      font-size: 15px;
    }

    .row-box {
      margin: 10px;

      .img-list {
        display: flex;
        flex-wrap: wrap;
        .item {
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          background-color: #f0f3f5;
          position: relative;
          margin: 5px;
          .img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .del {
            position: absolute;
            top: -6px;
            right: -6px;
          }

          &.add {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 0px;
            border-radius: 3px;
            overflow: hidden;

            img {
              width: 50px;
              height: 50px;
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
    &.disabled {
      background-color: #dddddd;
    }
    .confirm-box {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
