<template>
  <div class="f0f-container">
    <div style="font-weight: bold;font-size: 48px">404 NotFound</div>
    <div style="height: 50px"></div>
    <h3>页面未找到，{{ second }}秒后返回主页</h3>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

let second = ref(3);

let timer = setInterval(() => {
  second.value--;
}, 1000)

const toHomePage = () => {
  setTimeout(() => {
    clearInterval(timer);
    location.href = "/#/"
  }, 3000)
}
toHomePage();
</script>

<style lang="scss">
.f0f-container {
  color: #42b983;
  text-align: center;
  margin: 15% auto;
}
</style>
