<template>
  <div class="manager-container">

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
              <el-menu-item index="/manager/process">摹本审核</el-menu-item>
              <el-menu-item index="/manager/info-edit">摹本修改</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <Guide/>
                </el-icon>
                <span>类型区域</span>
              </template>
              <el-menu-item index="/manager/add-type">添加类型</el-menu-item>
              <el-menu-item index="/manager/add-block">添加区域</el-menu-item>
              <el-menu-item index="/manager/type-block">关联区域</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/manager/tag">
              <el-icon>
                <Tickets/>
              </el-icon>
              <span>标签管理</span>
            </el-menu-item>
            <el-menu-item index="/manager/notify">
              <el-icon>
                <Notification/>
              </el-icon>
              <span>公告发布</span>
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
