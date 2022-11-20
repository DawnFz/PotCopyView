<template>
  <div class="author-container">

    <el-container>
      <div style="width: 200px;height: 690px">
        <el-aside>
          <el-menu
              router
              style="width: 200px;height: 690px"
              default-active="2"
              class="el-menu-vertical-demo"
              :default-openeds="['1']"
              active-text-color="#42b983">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <Edit/>
                </el-icon>
                <span>摹本管理</span>
              </template>
              <el-menu-item index="/author/my-info">我发布的</el-menu-item>
              <el-menu-item index="/author/info-share">摹本发布</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/author/pot-msg">
              <el-icon>
                <Notification/>
              </el-icon>
              <span>站内消息</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
      </div>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </div>
</template>

<script lang="ts" setup>
import {Guide, Tickets, Edit, Notification,} from '@element-plus/icons-vue'
</script>

<style lang="scss">

</style>
