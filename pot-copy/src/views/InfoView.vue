<template>
  <div class="info-container">
    <div class="info-images">
      <el-carousel height="460px">
        <el-carousel-item v-for="img in meta.data.images" :key="img">
          <img class="info-image-item" :src="img" :alt="img" draggable="false">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="info-title">{{ meta.data.copyName }}</div>
    <div class="info-grid">
      <div class="info-copy-id" @click="copy(meta.data.copyId)">{{ meta.data.copyId }}</div>
      <div class="info-copy-tips">tips: 点击上方摹本代码复制</div>
      <div class="info-card">
        <div class="info-card-type">{{ meta.data.potType }}</div>
        <div class="info-card-type" style="background-color: #46a0ff">{{ meta.data.blockName }}</div>
        <div class="info-card-tags" v-for="tag in meta.data.tags" :key="tag">{{ tag }}</div>
      </div>
      <div>
        <div class="info-grid-left" style="background-color: #ffc149;">上传者UID</div>
        <div class="info-grid-right" style="background-color: #97aeff;">{{ meta.data.uploadUid }}</div>
      </div>
      <div>
        <div class="info-grid-left" style="background-color: #1fce85;">上传时间</div>
        <div class="info-grid-right" style="background-color: #ff97a7;">{{ meta.data.uploadTime }}</div>
      </div>
      <div>
        <div class="info-desc-t">作品描述</div>
        <div class="info-desc-i">{{ meta.data.description }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {getCopyInfo} from "../webapi/api";
import {reactive} from "vue";
import {useRoute} from "vue-router";
import {copyErrorMessage, copySuccessMessage} from "../elehelper/message";
import useClipboard from 'vue-clipboard3';

const meta = reactive({
  data: {}
})
const route = useRoute()
let copyId: any = route.query.copyId
meta.data = await getCopyInfo(copyId)
const {toClipboard} = useClipboard()
const copy = async (msg: string) => {
  try {
    await toClipboard(msg)
    copySuccessMessage()
  } catch (e) {
    copyErrorMessage(e)
  }
}
</script>

<style lang="scss">
.info-container {
  margin: 50px auto;
  transition: 0.5s;

  .info-images {
    border-radius: 30px;
    box-shadow: 2px 3px 10px 5px rgba(0, 0, 0, 0.3);
    overflow: hidden;

    .info-image-item {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info-card {
    margin: 0 auto 15px;
    transition: 0.5s;

    .info-card-type {
      font-size: 18px;
      user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      padding: 0 18px;
      line-height: 40px;
      color: white;
      margin: 5px 15px 5px 5px;
      display: inline-block;
      height: 40px;
      border-radius: 40px;
      transition: 0.5s;
      background-color: #42afb9;
    }

    .info-card-tags {
      font-size: 18px;
      user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      padding: 0 18px;
      line-height: 40px;
      color: white;
      margin: 5px;
      display: inline-block;
      height: 40px;
      border-radius: 40px;
      transition: 0.5s;
      background-color: #42b983;
    }
  }

  .info-title {
    margin: 40px auto;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    color: #42b983;
    transition: 0.5s;
  }

  .info-grid {
    text-align: center;
    background-color: #eee;
    border-radius: 35px;
    margin: 20px auto;
    transition: 0.5s;

    .info-copy-id {
      user-select: none;
      height: 18px;
      width: 160px;
      line-height: 20px;
      font-size: 22px;
      margin: 0 auto;
      padding: 15px;
      background-color: #22b9b2;
      border-radius: 20px 0;
      color: white;
      transition: 0.5s;
    }

    .info-copy-id:hover {
      background-color: #28ded6;
    }

    .info-copy-id:active {
      background-color: #1f9d97;
    }

    .info-copy-id:visited {
      background-color: #22b9b2;
    }

    .info-copy-tips {
      color: #aaa;
      padding: 10px;
      font-size: 16px;
      border-radius: 10px;
      user-select: none;
      background-color: white;
      margin: 15px auto 30px;
      transition: 0.5s;
      width: 230px;
    }
  }

  .info-desc-t {
    font-size: 20px;
    color: white;
    margin: 25px auto 0;
    height: 35px;
    width: 125px;
    line-height: 35px;
    border-radius: 15px 30px;
    background-color: #ff9269;
    transition: 0.5s;
  }

  .info-desc-i {
    font-size: 18px;
    margin: 30px auto 0;
    padding: 15px;
    color: #42b983;
    background-color: white;
    border-radius: 30px 15px;
    width: 85%;
    transition: 0.5s;
    font-weight: bold;
  }
}

/* mobile */
@media screen and (max-width: 767px) {
  .info-container {
    width: 80%;
    transition: 0.5s;
  }
  .info-copy-id {

  }
  .info-card {
    width: 90%;
    transition: 0.5s;
  }
  .info-grid {
    font-size: 18px;
    padding: 30px 10px;
    transition: 0.5s;
  }
  .info-grid-left {
    margin: 10px 0;
    display: inline-block;
    color: white;
    padding: 0 18px;
    height: 35px;
    line-height: 35px;
    border-radius: 40px 0 0 40px;
    transition: 0.5s;
  }

  .info-grid-right {
    display: inline-block;
    color: white;
    padding: 0 18px;
    height: 35px;
    line-height: 35px;
    border-radius: 0 40px 40px 0;
    transition: 0.5s;
  }
}

/* pad */
@media screen and (min-width: 767px) and (max-width: 992px) {
  .info-container {
    width: 90%;
    transition: 0.5s;
  }
  .info-card {
    width: 90%;
    transition: 0.5s;
  }
  .info-grid {
    padding: 20px;
    transition: 0.5s;
    font-size: 22px;
  }
  .info-grid-left {
    margin: 20px 0;
    display: inline-block;
    color: white;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-radius: 40px 0 0 40px;
    transition: 0.5s;
  }
  .info-grid-right {
    display: inline-block;
    color: white;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-radius: 0 40px 40px 0;
    transition: 0.5s;
  }
}

/* pc */
@media screen and (min-width: 992px) {
  .info-container {
    width: 50%;
    transition: 0.5s;
  }
  .info-card {
    width: 100%;
    transition: 0.5s;
  }
  .info-grid {
    padding: 40px;
    font-size: 26px;
    transition: 0.5s;
  }
  .info-grid-left {
    margin: 20px 0;
    display: inline-block;
    color: white;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-radius: 40px 0 0 40px;
    transition: 0.5s;
  }
  .info-grid-right {
    display: inline-block;
    color: white;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-radius: 0 40px 40px 0;
    transition: 0.5s;
  }
}
</style>
