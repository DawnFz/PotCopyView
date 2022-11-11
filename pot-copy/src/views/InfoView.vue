<template>
    <div class="info-container">
      <div class="info-top">
        <div class="info-infos">
          <div class="info-big-img">
            <img :src="meta.data.images[0]" alt="">
          </div>
          <div class="info-titles">
            <div class="info-copy-name mbg-64">{{ meta.data.copyName }}</div>
            <div class="info-tag info-pot-type">{{ meta.data.potType }}</div>
            <div class="info-tags mgb-50">
              <div class="info-tag info-tag-type" v-for="(tag,index) in meta.data.tags" :key="index">{{ tag }}</div>
            </div>
            <div class="info-name">
              <el-avatar :size="20" :fit="fill" :src="state.circleUrl" />
              <div>喵？</div>
            </div>
            <div class="info-upload-time">{{ meta.data.uploadTime }}2022-11-09 13:02:31</div>
            <div class="info-right-imgs">
              <div class="info-img-right" title="点我，点我" @click="showDetail">
                <img :src="meta.data.images[0]" alt="">
              </div>
            </div>
            <div class="info-copy-id">
              <div>{{ meta.data.copyId }}</div>
              <el-button class="copy" round @click="touchCopy(meta.data.copyId)">点击复制</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="info-bottom">
        <div class="info-description">
          <div class="info-description-detail">
            {{ meta.data.description }}详情详情详情详情详情详情详情详情详情详情详，情详情详情详情详情详情详情
          </div>
          <div id="downImg" class="info-description-imgs" v-for="(item,index) in meta.data.images" :key="index"
            v-show="meta.show">
            <div class=""><img :src="item" alt=""></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {reactive, ref, toRefs } from 'vue'
import {copyErrorMessage,copySuccessMessage} from "../elehelper/message.js";
import {getCopyInfos, getPotTypes} from "../webapi/api.js";
import { useRoute, useRouter } from 'vue-router';
import router from "../router";
import useClipboard from 'vue-clipboard3';

export default {
    name: 'CopyInfo',
    async setup() {
        const route = useRoute()

        const meta = reactive({
            data: {},
            show: false
        })

        const getItem = () => {
            meta.data = JSON.parse(route.query.item)
            // meta.data = router.query.item;
        }
        const state = reactive({
          circleUrl:
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          imageUrl:
            'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
        })
        // const { circleUrl } = toRefs(state)

        const touchCopy = (msg) => {
          copy(msg)
        }
        // 使用插件
        const { toClipboard } = useClipboard()
        const copy = async (msg) => {
          try {
            await toClipboard(msg)
            copySuccessMessage(msg)
          } catch (e) {
            copyErrorMessage(e)
          }
        }

        const showDetail = async () => {
          meta.show = true;
          // setTimeout(goto('downImg'),10);
          await goto('downImg')
        }

        const goto = (id) => {
          let anchor = document.getElementById(id);
          let distance = 0;
          let total = anchor.offsetTop;
          let step = total / 30;
          jump();

          function jump(){
            if (distance < total) {
              distance += step;
              document.documentElement.scrollTop = distance;
              document.body.scrollTop = distance;
              window.pageYOffset = distance;
              setTimeout(jump,10);
            } else {
              document.documentElement.scrollTop = total;
              document.body.scrollTop = total;
              window.pageYOffset = total;
            }
          }
        }
        //不能写在外面
        // const jump = (distance,total,step) => {
        //   if (distance < total) {
        //     distance += step;
        //     document.documentElement.scrollTop = distance;
        //     document.body.scrollTop = distance;
        //     window.pageYOffset = distance;
        //     setTimeout(jump,10);
        //   } else {
        //     document.documentElement.scrollTop = total;
        //     document.body.scrollTop = total;
        //     window.pageYOffset = total;
        //   }
        // }

        await getItem()

        return {
            meta,
            getItem,
            touchCopy,
            goto,
            showDetail,
            router,
            route,
            state
        }
    }
}
</script>

<style lang="scss">
.info-container {
  align-items: center;
  margin: 10px auto;
  width: 75%;
  object-fit: cover;

  .info-top {
    margin: 40px auto 20px;
    .info-infos {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .info-big-img {
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        width: 546px;
        height: 440px;
        text-align: center;
        border-radius: 35px;
        box-shadow: 0 1px 15px 1px rgba(0, 0, 0, 0.1);
        margin-bottom: 32px;
        img {
          display: inline-block;
          border-radius: 35px;
          margin: 10px auto;
        }
      }
      .info-titles {
        width: 243px;
        height: 440px;
        .info-copy-name {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 32px;
        }
        .info-pot-type {
          background-color: #42afb9;
        }
        .info-tag-type {
          background-color: #42b983;
        }
        .info-tags {
          margin-top: 5px;
          width: 240px;
        }
        .info-tag {
          user-select: none;
          -ms-user-select: none;
          -webkit-user-select: none;
          padding: 0 10px;
          line-height: 25px;
          color: white;
          margin: 5px;
          display: inline-block;
          height: 25px;
          border-radius: 15px;
        }
        .info-name {
          user-select: none;
          -ms-user-select: none;
          -webkit-user-select: none;
          height: 20px;
          font-size: 15px;
          display: inline-flex;
          margin: 20px 0;
        }
        .info-right-imgs {
          user-select: none;
          -ms-user-select: none;
          -webkit-user-select: none;
          transition: 0.5s;
          margin: 5px auto 2px;
          display: inline-flex;
          flex-wrap: wrap;
          cursor: pointer;
          img {
            width: 155px;
            height: 93px;//todo
            border-radius: 15px;
            margin: 5px auto;
          }
          .info-img-right {
            padding: 5px;
            width: 155px;
            height: 93px;
          }
        }
        .info-upload-time {
          //text-align: center;
          font-size: 14px;
        }
        .info-copy-id {
          margin: 20px;
          display: inline-block;
          text-align: center;
          background-color: rgba(194, 192, 192, 0.1);
          border-radius: 12px;
          .copy {}
        }
      }
    }
  }
  .info-bottom {
    margin: 40px auto 20px;
    .info-description {
      align-items: center;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      .info-description-detail {
        margin: 40px auto;
        flex: 60%;
        text-align: center;
        font-size: 20px;
      }
      .info-description-imgs {
        //1686*1357
        //843*678
        //997*801
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        transition: 0.5s;
        margin: 40px auto;
        flex: 60%;
        box-shadow: 0 1px 15px 1px rgba(0, 0, 0, 0.1);
        .info-description-img {
          width: 950px;
          height: 723px;
          text-align: center;
          border-radius: 15px;
          line-height: 723px;
          box-shadow: 0 1px 15px 1px rgba(0, 0, 0, 0.1);
        }

        img {
          display: inline-block;
          margin: 10px auto;
          border-radius: 15px;
        }
      }
    }
  }

}
/* mobile */
@media screen and (max-width: 767px) {
  .info-right-imgs ,.info-description-imgs{
    transition: 0.5s;
    width: 100%;
  }
}

/* pad */
@media screen and (min-width: 768px) and (max-width: 991px) {
  .info-right-imgs ,.info-description-imgs{
    transition: 0.5s;
    width: 70%;
  }
}

/* pc */
@media screen and (min-width: 992px) {
  .info-right-imgs ,.info-description-imgs{
    transition: 0.5s;
    width: 50%;
  }
}
</style>
