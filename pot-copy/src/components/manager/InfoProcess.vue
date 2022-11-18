<template>
  <div class="process-container">
    <el-table :data="meta.data.content" border fit style="width: 100%">
      <el-table-column prop="copyId" label="摹本摹数" width="160"/>
      <el-table-column prop="copyName" label="标题" width="180"/>
      <el-table-column prop="author" label="作者" width="140"/>
      <el-table-column prop="potType" label="洞天类型" width="100"/>
      <el-table-column prop="blockName" label="洞天区域" width="100"/>
      <el-table-column show-overflow-tooltip prop="tags" label="包含标签" width="200"/>
      <el-table-column show-overflow-tooltip prop="origin" label="摹本来源" width="260"/>
      <el-table-column show-overflow-tooltip prop="serverName" label="服务器" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.server===0" style="background-color: #60b6da;border:none;color: white">国服</el-tag>
          <el-tag v-if="scope.row.server===1" style="background-color: #ffa5b6;border:none;color: white">哔哩</el-tag>
          <el-tag v-if="scope.row.server===2" style="background-color: #838383;border:none;color: white">国际服</el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="uploadTime" label="上传时间" width="120"/>
      <el-table-column show-overflow-tooltip label="审核操作">
        <template #default="scope">
          <el-button size="default"
                     @click="showEdit(scope.$index, scope.row)">详情
          </el-button>
          <el-button size="default" style="color: white" color="#42b983"
                     @click="setInfoStatus(scope.row,true)">同意
          </el-button>
          <el-button size="default" type="danger"
                     @click="setInfoStatus(scope.row,false)">拒绝
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

    <div>
      <el-dialog style="width: 75%" destroy-on-close v-model="dialogVisible">
        <InfoView :data="tempData"/>
        <template #footer>
      <span class="dialog-footer">
        <el-button size="large" @click="dialogVisible = false">关闭</el-button>
      </span>
        </template>
      </el-dialog>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {getManagerCopyInfos, updateCopyInfo} from "../../webapi/t-api";
import InfoView from "../../views/InfoView.vue";

const dialogVisible = ref(false)

const meta: any = reactive({
  data: {},
  types: [],
  params: {
    pageNum: 1,
    pageSize: 10,
    total: 0
  }
})

let tempData = reactive({})

let loadPage = async (val: number) => {
  meta.params.pageNum = val
  meta.data = await getManagerCopyInfos(meta.params)
  meta.params.totalSize = meta.data.totalSize
}

const showEdit = (index: number, data: any) => {
  tempData = data
  dialogVisible.value = true
}

const setInfoStatus = async (row: any, control: boolean) => {
  let data: object = {
    copyId: row.copyId,
    control: control
  }
  let result = await updateCopyInfo(data);
  if (result) await loadPage(meta.params.pageNum)
}


await loadPage(1)

</script>
<style lang="scss">
.process-container {
}
</style>
