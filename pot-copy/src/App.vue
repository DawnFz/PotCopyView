<template>
  <suspense>
    <div>
      <div class="header-box">
        <div class="header">
          <div class="left-box">
            <span><router-link to="/">PotCopy</router-link></span>
            <span><router-link to="/info-list">摹本展览</router-link></span>
            <span><router-link to="/about">关于 PotCopy</router-link></span>
          </div>
          <div class="right-box">
            <div class="share-btn" @click="toShare">分享我的摹本</div>
          </div>
        </div>
      </div>
      <el-backtop :right="80" :bottom="80"
                  style="font-size: 14px;
                  box-shadow: 0 0 15px #bbbbbb;
                  color: #42b983;">Top
      </el-backtop>
      <div style="height: 80px"></div>

      <router-view/>


      <!--页脚-->
      <div class="footer">
        <div>© 2022 PotCopy.Api All Rights Reserved</div>
        <a href="https://beian.miit.gov.cn" target="_blank">辽ICP备2022000967号</a>
      </div>
    </div>
  </suspense>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import router from "./router";

onMounted(() => {
  document.body.style.setProperty('--el-color-primary', '#42b983');
  document.body.style.setProperty('--el-color-primary-light-9', '#d4ffeb');
  document.body.style.setProperty('--el-color-primary-light-3', '#47de99');
})

const toShare = () => {
  setTimeout(() => {
    router.push("share")
  }, 500)
}

</script>

<style lang="scss">

.header-box {
  line-height: 80px;
  border-bottom: 1px solid #dedede;
  width: 100%;
  height: 80px;
  box-shadow: 0 -5px 15px #bbbbbb;
  background: white;
  position: fixed;
  text-align: center;
  top: 0;
  z-index: 10; /*非常重要*/

  .header {
    margin: 0 auto;
    overflow: hidden;

    .left-box {
      width: 400px;
      float: left;
      overflow: hidden;
      user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;

      span {
        font-size: 16px;
        font-weight: bold;
        margin: 0 20px;
        text-align: center;
      }

      a {
        text-decoration: none;
        color: rgba(0, 0, 0, .65);
        outline: none;
      }
    }

    .right-box {
      width: 400px;
      float: right;
      overflow: hidden;

      .share-btn {
        margin-top: 20px;
        vertical-align: middle;
        display: inline-block;
        float: right;
        height: 40px;
        line-height: 40px;
        padding: 0 30px;
        border-radius: 50px;
        margin-right: 30px;
        color: white;
        font-size: 18px;
        font-weight: bold;
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        background-color: #42b983;
        transition: 0.3s;

        a {
          text-decoration: none;
          color: white;
          outline: none;
        }
      }

      .share-btn:hover {
        transition: 0.3s;
        background-color: #67d7a2;
      }

      .share-btn:active {
        transition: 0.3s;
        background-color: #329368;
      }
    }
  }
}

@media screen and (min-width: 1016px) {
  .header {
    width: 80%;
  }
}

@media screen and (min-width: 767px) and (max-width: 1016px) {
  .right-box {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .right-box {
    display: none;
  }
}

.footer {
  padding-top: 55px;
  height: 120px;
  background-color: #215940;
  text-align: center;
  clear: both;
  font-size: 18px;
  color: white;

  div {
    padding-top: 15px;
    display: block;
  }

  a {
    display: block;
    margin-top: 15px;
    color: white;
  }

  /*去除未被访问的a标签的下划线*/
  a:link {
    text-decoration: none;
  }

  /*去除已经被访问过的a标签的下划线*/
  a:visited {
    text-decoration: none;
  }

  /*去除鼠标悬停时的a标签的下划线*/
  a:hover {
    color: #42b983;
    text-decoration: none;
  }

  /*去除正在点击的a标签的下划线（鼠标按下，尚未松开）*/
  a:active {
    color: #42b983;
    font-weight: bold;
    text-decoration: none;
  }

  /*去除获得焦点的a标签的下划线（被鼠标点击过）*/
  a:focus {
    text-decoration: none;
  }
}

</style>
