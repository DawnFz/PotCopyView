<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-card-account">
        <el-input v-model="username" placeholder="请输入用户名"/>
      </div>
      <div class="login-card-key">
        <el-input v-model="password" type="password" placeholder="请输入登录密码"/>
      </div>
      <div class="login-card-btn" @click="verifyManager">登录</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {getAuthToken} from "../webapi/t-api";

const username = ref('')
const password = ref('')
const verifyManager = async () => {
  await getAuthToken(username.value, password.value)
}
</script>

<style lang="scss">
.login-container {
  margin: 160px auto 0;
  height: 435px;
  transition: .5s;

  .login-card {
    margin: 0 auto;
    height: 200px;
    width: 400px;
    padding: 30px 0;
    background-color: #effff7;
    border-radius: 20px;
    box-shadow: 0 5px 15px 2px rgba(0, 0, 0, .3);
    transition: .5s;

    .login-card-account {
      margin: 35px auto 20px;
      width: 60%;
    }

    .login-card-key {
      margin: 20px auto;
      width: 60%;
    }

    .login-card-btn {
      text-align: center;
      width: 120px;
      margin: 20px auto;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      font-weight: bold;
      color: #206546;
      user-select: none;
      background-color: #83e8b6;
      transition: .5s;
    }

    .login-card-btn:hover {
      background-color: #87dab1;
      transition: .3s;
    }

    .login-card-btn:active {
      background-color: #61ad88;
      transition: .3s;
    }
  }
}
</style>
