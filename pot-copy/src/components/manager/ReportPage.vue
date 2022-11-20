<template>
  <div class="report-container">
    <el-table :data="meta.data.content" border fit style="width: 100%">
      <el-table-column prop="id" label="编号" width="90"/>
      <el-table-column show-overflow-tooltip prop="copyId" label="摹本摹数" width="150"/>
      <el-table-column show-overflow-tooltip prop="author" label="原作者" width="160"/>
      <el-table-column show-overflow-tooltip prop="origin" label="摹本来源" width="260"/>
      <el-table-column show-overflow-tooltip prop="count" label="举报次数" width="90"/>
      <el-table-column show-overflow-tooltip prop="note" label="举报原因" width="280"/>
      <el-table-column show-overflow-tooltip prop="time" label="举报时间" width="170"/>
      <el-table-column show-overflow-tooltip label="审核操作">
        <template #default="scope">
          <el-button size="default" style="color: white" color="#42b983"
                     @click="setInfoStatus(scope.row,false)">下架该摹本
          </el-button>
          <el-button size="default" type="danger"
                     @click="delThisReport(scope.row.copyId)">删除举报
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-footer">
      <el-pagination
          background
          style="margin:15px auto;display: inline-flex;"
          :page-size="meta.params.pageSize"
          prev-text="&emsp;上一页&emsp;"
          next-text="&emsp;下一页&emsp;"
          layout="prev, pager, next"
          :total="meta.params.totalSize"
          :current-page="meta.params.pageNum"
          @current-change="loadPage"
      />
    </div>

  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {delReport, getAllReports, updateCopyInfo} from "../../webapi/t-api";

const meta: any = reactive({
  data: {},
  types: [],
  params: {
    pageNum: 1,
    pageSize: 10,
    total: 0
  }
})

let loadPage = async (val: number) => {
  meta.params.pageNum = val
  meta.data = await getAllReports(meta.params)
  meta.params.totalSize = meta.data.totalSize
}

const delThisReport = async (copyId: string) => {
  await delReport(copyId,true);
  setTimeout(() => {
    location.reload();
  }, 500)
}

const setInfoStatus = async (row: any, control: boolean) => {
  let data: object = {
    copyId: row.copyId,
    control: control
  }
  let result = await updateCopyInfo(data);
  if (result) {
    await delReport(row.copyId,false);
    await loadPage(meta.params.pageNum)
  }
}

await loadPage(1)

</script>
<style lang="scss">
.process-container {
}
</style>
