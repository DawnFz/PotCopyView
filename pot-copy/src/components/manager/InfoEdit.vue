<template>
  <div class="process-container">
    <el-table :data="meta.data.content" border fit style="width: 100%">
      <el-table-column show-overflow-tooltip prop="copyId" label="摹本摹数" width="120"/>
      <el-table-column show-overflow-tooltip prop="copyName" label="标题" width="160"/>
      <el-table-column show-overflow-tooltip prop="author" label="作者" width="110"/>
      <el-table-column prop="potType" label="洞天类型" width="100"/>
      <el-table-column prop="blockName" label="洞天区域" width="100"/>
      <el-table-column show-overflow-tooltip prop="tags" label="包含标签" width="200"/>
      <el-table-column show-overflow-tooltip prop="origin" label="摹本来源" width="260"/>
      <el-table-column show-overflow-tooltip prop="uploadTime" label="上传时间" width="120"/>
      <el-table-column show-overflow-tooltip prop="serverName" label="服务器" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.server===0" style="background-color: #60b6da;border:none;color: white">国服</el-tag>
          <el-tag v-if="scope.row.server===1" style="background-color: #ffa5b6;border:none;color: white">哔哩</el-tag>
          <el-tag v-if="scope.row.server===2" style="background-color: #838383;border:none;color: white">国际</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审核状态" width="110">
        <template #default="scope">
          <el-tag v-if="scope.row.status===0" class="ml-2" type="success">已通过</el-tag>
          <el-tag v-if="scope.row.status===1" class="ml-2" type="warning">审核中</el-tag>
          <el-tag v-if="scope.row.status===2" class="ml-2" type="danger">已拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作">
        <template #default="scope">
          <el-button size="default"
                     @click="showInfo(scope.row)">预览
          </el-button>
          <el-button size="default" style="color: white" color="#42b983"
                     @click="showEdit(scope.row)">编辑
          </el-button>

          <el-button @click="showDelete(scope.row.copyId)" type="danger">删除</el-button>

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

    <!-- 预览界面 -->
    <div>
      <el-dialog style="width: 75%" destroy-on-close v-model="dialogViewVisible">
        <InfoView :data="tempData"/>
        <template #footer>
      <span class="dialog-footer">
        <el-button size="large" @click="dialogViewVisible = false">关闭</el-button>
      </span>
        </template>
      </el-dialog>
    </div>

    <!-- 编辑界面 -->
    <div>
      <el-dialog destroy-on-close v-model="dialogEditVisible">
        <EditCopyInfo :data="editData" @closeThis="closeThis"/>
        <template #footer>
      <span class="dialog-footer">
        <el-button size="large" @click="dialogEditVisible = false">关闭</el-button>
      </span>
        </template>
      </el-dialog>
    </div>

    <!-- 删除二次提醒 -->
    <el-dialog
        v-model="delVisible"
        title="删除警告"
        width="20%"
        align-center>
      <span>你确定要删除该摹本吗，该操作不可逆！</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="delVisible = false">取消</el-button>
        <el-button type="danger" @click="delThisCopyInfo">确认删除</el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {allCopyInfos, delCopyInfo, managerDelCopyInfo, updateCopyInfo} from "../../webapi/t-api";
import EditCopyInfo from "../author/EditCopyInfo.vue";
import InfoView from "../../views/InfoView.vue";

const dialogViewVisible = ref(false)
const dialogEditVisible = ref(false)
const delCopyId = ref();

const meta: any = reactive({
  data: {},
  types: [],
  params: {
    pageNum: 1,
    pageSize: 10,
    total: 0
  }
})
const delVisible = ref(false)

let tempData = reactive({})

let editData = reactive({})

let loadPage = async (val: number) => {
  meta.params.pageNum = val
  meta.data = await allCopyInfos(meta.params)
  meta.params.totalSize = meta.data.totalSize
}

const closeThis = (val: any) => {
  dialogEditVisible.value = val
  location.reload()
}

const showInfo = (data: any) => {
  tempData = Object.assign({}, data)
  dialogViewVisible.value = true
}

const showEdit = (data: any) => {
  editData = Object.assign({}, data)
  dialogEditVisible.value = true
}

const showDelete = (copyId: string) => {
  delCopyId.value = copyId;
  delVisible.value = true
}

const delThisCopyInfo = async () => {
  await managerDelCopyInfo(delCopyId.value)
  delCopyId.value = ref();
  delVisible.value = false;
  setTimeout(() => {
    location.reload()
  }, 500)
}

const setInfoStatus = async (row: any, status: number) => {
  let data: object = {
    copyId: row.copyId,
    status: status
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
