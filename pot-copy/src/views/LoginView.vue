<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-card-account">
        <el-input v-model="grantee" placeholder="Please input grantee"/>
      </div>
      <div class="login-card-key">
        <el-input v-model="key" type="password" placeholder="Please input manager key"/>
      </div>
      <div class="login-card-btn" @click="verifyManager">verify</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {getAuthToken} from "../webapi/manager-api";
import router from "../router";

const grantee = ref('')
const key = ref('')
const verifyManager = async () => {
  let success = await getAuthToken(grantee.value, key.value)
  if (success) {
    setTimeout(() => {
      router.push("manager").catch()
    }, 1000)
  }
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
