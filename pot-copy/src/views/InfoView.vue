<template>
  <div class="info-bg-image">
    <div class="info-container">
      <div class="info-images">
        <el-carousel height="500px">
          <el-carousel-item v-for="img in meta.data.images" :key="img">
            <img class="info-image-item" :src="img" :alt="img" draggable="false">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="info-title">{{ meta.data.copyName }}</div>
      <div class="info-grid">

        <div class="info-report-btn" @click="reportWindow = true">
          <el-icon>
            <WarnTriangleFilled/>
          </el-icon>
        </div>

        <div class="info-copy-id" @click="copy(meta.data.copyId)">{{ meta.data.copyId }}</div>
        <div class="info-copy-tips">tips: 点击上方摹本摹数复制</div>

        <div class="info-card">
          <div class="info-card-type" :style="judgeServerStyle(meta.data.server)">{{
              judgeServer(meta.data.server)
            }}
          </div>
          <div class="info-card-type" v-if="meta.data.uid!==0&&meta.data.uploadType===0"
               style="background: linear-gradient(#bf92da, #63a9d7);">
            认证原创
          </div>
          <div class="info-card-type" v-if="meta.data.uid===0||meta.data.uploadType!==0"
               :style="judgeTypeStyle(meta.data.uploadType)">
            {{ judgeUploadType(meta.data.uploadType) }}
          </div>
        </div>
        <div class="info-card">
          <div class="info-card-type">{{ meta.data.potType }}</div>
          <div class="info-card-type" style="background-color: #46a0ff">{{ meta.data.blockName }}</div>
        </div>
        <div class="info-card">
          <div class="info-card-tags" v-for="tag in meta.data.tags" :key="tag">{{ tag }}</div>
        </div>
        <div class="info-card-hr"></div>
        <div>
          <div class="info-grid-left" style="background-color: #ffc149;">摹本作者</div>
          <div class="info-grid-right" style="background-color: #97aeff;">{{ meta.data.author }}</div>
        </div>
        <div v-show="meta.data.origin!=null">
          <div class="info-grid-left" style="background-color: #505050;">摹本来源</div>
          <div class="info-grid-right" style="background-color: #51767a;">
            <a class="go-origin"
               :href="meta.data.origin"
               target="_blank">点击前往</a>
          </div>
        </div>
        <div class="info-card-hr"></div>
        <div>
          <div class="info-desc-t">作品描述</div>
          <div class="info-desc-i">{{ meta.data.description }}</div>
        </div>
        <div>
          <div class="info-grid-left" style="background-color: #1fce85;
        margin: 30px auto 0">上传时间
          </div>
          <div class="info-grid-right" style="background-color: #ff97a7;
        margin: 30px auto 0">{{ meta.data.uploadTime }}
          </div>
        </div>
        <div class="info-report-btn-pe" @click="reportWindow = true">
          <el-icon>
            <WarnTriangleFilled/>
          </el-icon>
          举报
        </div>
      </div>
    </div>
  </div>

  <!-- 举报框 -->
  <div>
    <el-dialog
        v-model="reportWindow"
        title="举报该摹本"
        align-center class="report-window">

      <el-form ref="shareForm" :model="reportData" :rules="rules" label-position="top">
        <el-form-item label="摹本摹数" prop="copyId">
          <el-input class="share-label" v-model="meta.data.copyId" clearable readonly/>
        </el-form-item>

        <el-form-item label="摹本作者" prop="author">
          <el-input class="share-label" maxlength="16" type="text"
                    v-model="reportData.author" placeholder="在这里输入摹本原作者" clearable/>
        </el-form-item>

        <el-form-item label="摹本来源" prop="origin">
          <el-input class="share-label" type="text"
                    v-model="reportData.origin" placeholder="在这里输入摹本来源 [链接]" clearable/>
        </el-form-item>

        <el-form-item label="举报理由" prop="description">
          <el-input class="share-label" v-model="reportData.note"
                    placeholder="在这里输入举报该摹本信息的理由" type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8 }" clearable/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="reportSubmit(meta.data.copyId)">提交</el-button>
      </span>
      </template>
    </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import {getCopyInfo, reportCopyInfo} from "../webapi/api";
import {reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {copyErrorMessage, copySuccessMessage} from "../elehelper/message";
import {judgeServer, judgeServerStyle, judgeUploadType, judgeTypeStyle} from "../elehelper/utils";
import useClipboard from 'vue-clipboard3';
import {WarnTriangleFilled} from '@element-plus/icons-vue'
import {FormRules} from "element-plus";

const meta = reactive({
  data: {}
})

let reportData = reactive({
  copyId: '',
  author: '',
  origin: '',
  note: ''
})


const rules = reactive<FormRules>({
  author: [
    {required: true, message: '请输入摹本原作者', trigger: 'blur'},
  ],
  origin: [
    {required: true, message: '请输入作品原出处', trigger: 'blur'},
  ],
  note: [
    {required: true, message: '请输入举报理由', trigger: 'blur'},
  ],
})


let reportWindow = ref(false);

const route = useRoute()
const props = defineProps<{ data: any }>();
let copyId: any
const _data: any = ref(props.data)
if (_data.value !== undefined) {
  meta.data = _data.value
} else {
  copyId = route.query.copyId
  meta.data = await getCopyInfo(copyId)
}


const {toClipboard} = useClipboard()
const copy = async (msg: string) => {
  try {
    await toClipboard(msg)
    copySuccessMessage()
  } catch (e) {
    copyErrorMessage(e)
  }
}

const reportSubmit = (copyId: string) => {
  reportData.copyId = copyId;
  reportCopyInfo(reportData);
  reportWindow.value = false;
  reportData = reactive({
    copyId: '',
    author: '',
    origin: '',
    note: ''
  })
}

</script>

<style lang="scss">
.info-bg-image {
  padding-top: 50px;
  padding-bottom: 30px;

  .info-container {
    margin: 0 auto;
    transition: 0.5s;

    .info-images {
      border-radius: 30px;
      box-shadow: 2px 3px 10px 5px rgba(0, 0, 0, 0.3);
      overflow: hidden;

      .info-image-item {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info-card-hr {
      margin: 10px auto;
      height: 2px;
      width: 95%;
      transition: .5s;
      border-radius: 2px;
      background-color: #42b983;
    }


    .info-card {
      margin: 0 auto 15px;
      transition: 0.5s;

      .info-card-type {
        font-size: 18px;
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        padding: 0 18px;
        line-height: 40px;
        color: white;
        margin: 5px 15px 5px 5px;
        display: inline-block;
        height: 40px;
        border-radius: 40px;
        transition: 0.5s;
        background-color: #42afb9;
      }

      .info-card-tags {
        font-size: 18px;
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        padding: 0 18px;
        line-height: 40px;
        color: white;
        margin: 5px;
        display: inline-block;
        height: 40px;
        border-radius: 40px;
        transition: 0.5s;
        background-color: #42b983;
      }
    }

    .info-title {
      margin: 40px auto;
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      color: #42b983;
      transition: 0.5s;
    }

    .info-grid {
      text-align: center;
      background-color: rgba(238, 238, 238, 0.65);
      border-radius: 35px;
      margin: 20px auto;
      transition: 0.5s;
      box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.2);

      .info-report-btn:hover {
        background-color: #ff5c54;
        transition: .3s;
      }

      .info-report-btn:active {
        background-color: #b6403a;
        transition: .3s;
      }

      .info-report-btn-pe:hover {
        background-color: #ff5c54;
        transition: .3s;
      }

      .info-report-btn-pe:active {
        background-color: #b6403a;
        transition: .3s;
      }

      .info-report-btn-pe:visited {
        background-color: #b6403a;
        transition: .3s;
      }

      a {
        color: white;
      }

      .info-copy-id {
        user-select: none;
        height: 18px;
        width: 160px;
        line-height: 20px;
        font-size: 22px;
        margin: 0 auto;
        padding: 15px;
        background-color: #22b9b2;
        border-radius: 20px 0;
        color: white;
        transition: 0.5s;
      }

      .info-copy-id:hover {
        background-color: #28ded6;
      }

      .info-copy-id:active {
        background-color: #1f9d97;
      }

      .info-copy-id:visited {
        background-color: #22b9b2;
      }

      .info-copy-tips {
        color: #aaa;
        padding: 10px;
        font-size: 16px;
        border-radius: 10px;
        user-select: none;
        background-color: white;
        margin: 15px auto 30px;
        transition: 0.5s;
        width: 230px;
      }
    }

    .info-desc-t {
      font-size: 20px;
      color: white;
      margin: 25px auto 0;
      height: 35px;
      width: 125px;
      line-height: 35px;
      border-radius: 15px 30px;
      background-color: #ff9269;
      transition: 0.5s;
    }

    .info-desc-i {
      font-size: 18px;
      margin: 30px auto 0;
      padding: 15px;
      color: #42b983;
      background-color: white;
      border-radius: 30px 15px;
      width: 85%;
      transition: 0.5s;
      font-weight: bold;
    }
  }
}

/* mobile */
@media screen and (max-width: 767px) {

  .report-window {
    width: 95% !important;
  }


  .info-bg-image {
    background-color: rgba(228, 245, 236, 0.78);
    transition: .5s;
  }

  .info-container {
    width: 80%;
    transition: 0.5s;
  }
  .info-copy-id {

  }
  .info-card {
    width: 90%;
    transition: 0.5s;
  }
  .info-grid {
    font-size: 18px;
    padding: 30px 10px;
    transition: 0.5s;

    .info-report-btn {
      display: none;
      transition: 0.5s;
    }

    .info-report-btn-pe {
      margin: 25px auto 0;
      background-color: #d15351;
      line-height: 35px;
      height: 35px;
      width: 80px;
      border-radius: 30px;
      color: white;
      transition: 0.5s;
    }
  }
  .info-grid-left {
    margin: 10px 0;
    display: inline-block;
    color: white;
    padding: 0 18px;
    height: 35px;
    line-height: 35px;
    border-radius: 40px 0 0 40px;
    transition: 0.5s;
  }

  .info-grid-right {
    display: inline-block;
    color: white;
    padding: 0 18px;
    height: 35px;
    line-height: 35px;
    border-radius: 0 40px 40px 0;
    transition: 0.5s;
  }
}

/* pad */
@media screen and (min-width: 767px) and (max-width: 992px) {

  .report-window {
    width: 550px !important;
  }


  .info-bg-image {
    transition: .5s;
    background: url("https://pic.imgdb.cn/item/637770ce16f2c2beb1fc0a0d.jpg") no-repeat center;
    background-size: auto 100%;
  }

  .info-container {
    width: 90%;
    transition: 0.5s;
  }
  .info-card {
    width: 90%;
    transition: 0.5s;
  }
  .info-grid {
    padding: 20px;
    transition: 0.5s;
    font-size: 22px;

    .info-report-btn {
      float: right;
      background-color: #d15351;
      line-height: 38px;
      height: 35px;
      width: 35px;
      border-radius: 100%;
      color: white;
      transition: 0.5s;
    }

    .info-report-btn-pe {
      display: none;
      transition: 0.5s;
    }

  }

  .info-grid-left {
    margin: 20px 0;
    display: inline-block;
    color: white;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-radius: 40px 0 0 40px;
    transition: 0.5s;
  }
  .info-grid-right {
    display: inline-block;
    color: white;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-radius: 0 40px 40px 0;
    transition: 0.5s;
  }
}

/* pc */
@media screen and (min-width: 992px) {

  .report-window {
    width: 550px !important;
  }

  .info-bg-image {
    transition: .5s;
    background: url("https://pic.imgdb.cn/item/637770ce16f2c2beb1fc0a0d.jpg") no-repeat center;
    background-size: auto 100%;
  }

  .info-container {
    width: 50%;
    transition: 0.5s;
  }
  .info-card {
    width: 100%;
    transition: 0.5s;
  }
  .info-grid {
    width: 55%;
    padding: 40px;
    font-size: 26px;
    transition: 0.5s;

    .info-report-btn {
      float: right;
      background-color: #d15351;
      line-height: 38px;
      height: 35px;
      width: 35px;
      border-radius: 100%;
      color: white;
      transition: 0.5s;
    }

    .info-report-btn-pe {
      display: none;
      transition: 0.5s;
    }
  }
  .info-grid-left {
    margin: 20px 0;
    display: inline-block;
    color: white;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-radius: 40px 0 0 40px;
    transition: 0.5s;
  }
  .info-grid-right {
    display: inline-block;
    color: white;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-radius: 0 40px 40px 0;
    transition: 0.5s;
  }
}
</style>
