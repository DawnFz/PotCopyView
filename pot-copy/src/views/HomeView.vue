<template>
  <div class="home-container">
    <div class="title-level-one">欢迎使用 PotCopy</div>
    <div class="title-level-two">这是一个尘歌壶摹本分享站</div>
    <div class="body-box">
      <div class="btn-go-list" @click="toInfoList()">摹本中心</div>
      <div class="btn-go-share" @click="toShare()">分享摹本</div>
      <div class="btn-go-about">正在开发</div>
    </div>
  </div>
</template>

<script>


import router from "../router/index.js";

export default {
  name: 'HomeView',
  setup () {
    const toInfoList = () => {
      router.push({
        path: 'info-list'
      })
    }

    const toShare = () => {
    }

    return {
      toShare,
      toInfoList
    }
  }
}
</script>

<style lang="scss">
.home-container {
  margin: 25px auto;
  text-align: center;
  width: 75%;

  .title-level-one {
    margin: 150px auto 50px;
    height: 160px;
    font-size: 64px;
    font-weight: bold;
    color: #42b983;
  }

  .title-level-two {
    margin: 30px auto 50px;
    font-size: 32px;
    font-weight: bold;
    color: #42b983;
  }

  .body-box {
    width: 100%;
    height: 120px;
    margin: 120px auto;

    .btn-go-list {
      user-select: none;
      margin: 10px;
      height: 50px;
      line-height: 50px;
      border-radius: 50px;
      display: inline-block;
      padding: 0 25px;
      font-size: 22px;
      background-color: #42b983;
      color: white;
      transition: 0.3s;
    }

    .btn-go-list:hover {
      background-color: #5de1a6;
      transition: 0.3s;
    }

    .btn-go-list:active {
      background-color: #2b815a;
      transition: 0.3s;
    }

    .btn-go-share {
      user-select: none;
      margin: 10px;
      height: 50px;
      line-height: 50px;
      border-radius: 50px;
      padding: 0 25px;
      font-size: 22px;
      background-color: #42b983;
      color: white;
      transition: 0.3s;
    }

    .btn-go-share:hover {
      background-color: #5de1a6;
      transition: 0.3s;
    }

    .btn-go-share:active {
      background-color: #2b815a;
      transition: 0.3s;
    }

    .btn-go-about {
      user-select: none;
      margin: 10px;
      display: inline-block;
      height: 45px;
      line-height: 45px;
      border-radius: 45px;
      padding: 0 22px;
      font-size: 22px;
      border: #bbbbbb solid 3px;
      color: #aaa;
      transition: 0.3s;
    }

    .btn-go-about:hover {
      background-color: #bbbbbb;
      color: white;
      transition: 0.3s;
    }

    .btn-go-about:active {
      border: #757575 solid 3px;
      background-color: #757575;
      transition: 0.3s;
    }
  }
}

@media screen and (min-width: 992px) {
  .btn-go-share {
    display: none;
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .btn-go-share {
    display: inline-block;
  }
}

@media screen and (max-width: 767px) {
  .btn-go-share {
    display: inline-block;
  }
}

</style>
