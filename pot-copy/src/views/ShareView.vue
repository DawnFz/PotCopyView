<template>
  <div class="share-container">
    <div class="share-form">
      <el-form ref="shareForm" :model="form.data" :rules="rules" label-position="top" >
        <el-form-item label="摹本编号" prop="copyId">
          <el-input class="share-label" v-model="form.data.copyId" placeholder="在这里输入摹本编号喵~" clearable />
        </el-form-item>
        <el-form-item label="摹本名称" prop="copyName">
          <el-input class="share-label" v-model="form.data.copyName" placeholder="在这里输入摹本名称喵~" clearable />
        </el-form-item>
        <el-form-item class="share-select" label="洞天类型" prop="potType">
          <el-col :span="24">
            <el-select class="share-label share-width" v-model="form.data.potType" placeholder="在这里选择洞天类型喵~" clearable>
              <el-option v-for="potType in meta.potTypes"
                         :key="potType.id"
                         :label="potType.typeName"
                         :value="potType.id">
              </el-option>
            </el-select>
          </el-col>

        </el-form-item>
        <el-form-item class="share-select" label="所在区域" prop="blockId">
          <el-select class="share-label share-width" v-model="form.data.blockId" placeholder="在这里选择所在区域喵~" clearable>
            <el-option v-for="block in meta.blocks"
                       :key="block.id"
                       :label="block.blockName"
                       :value="block.blockId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传者UID" prop="uploadUid">
          <el-input class="share-label" v-model="form.data.uploadUid" placeholder="在这里输入上传者UID喵~" clearable />
        </el-form-item>
<!--        多个标签-->
        <el-form-item label="标签" class="is-required">
          <div v-for="(item,index) in form.data.tagIds" class="share-div">
            <el-form-item class="share-select" :rules="rules.tagIds" :prop="`tagIds.${index}`">
              <el-select v-model="form.data.tagIds[index]" placeholder="在这里选择标签喵~">
                <el-option v-for="tag in meta.tags"
                           :key="tag.id"
                           :label="tag.tagName"
                           :value="tag.id">
                </el-option>
              </el-select>
<!--              <el-input v-model="form.data.tagIds[index]" clearable />-->
            </el-form-item>
            <el-button class="share-button" v-if="index == 0" :icon="Plus" @click="addTagRow" circle />
            <el-button class="share-button" v-if="index > 0" style="color: #f66" :icon="Minus" @click="deleteTagRow(index)" circle />
          </div>
        </el-form-item>
<!--        多个链接-->
        <el-form-item label="图片链接" class="is-required">
          <div v-for="(item,index) in form.data.imageUrls" class="share-div">
            <el-form-item class="share-input" :rules="rules.imageUrls" :prop="`imageUrls.${index}`">
              <el-input v-model="form.data.imageUrls[index]" placeholder="在这里输入图片链接喵~" clearable/>
            </el-form-item>
            <el-button class="share-button" v-if="index == 0" :icon="Plus" @click="addImgRow" circle />
            <el-button class="share-button" v-if="index > 0" style="color: #f66" :icon="Minus" @click="deleteImgRow(index)" circle />
          </div>
        </el-form-item>
        <el-form-item label="摹本描述/简介" prop="description">
          <el-input class="share-label" v-model="form.data.description" placeholder="在这里输入摹本描述喵~可以多写一点喵~" type="textarea" autosize clearable />
        </el-form-item>
        <el-form-item class="share-submit">

          <el-button type="primary" @click="upload(shareForm)">提交我的分享</el-button>
          <el-button @click="clear(shareForm)">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {addCopyInfo, getPotTypes} from "../webapi/api";
import {reactive,ref} from "vue";
import {errorMessage} from "../elehelper/message";
import {Plus,Minus} from '@element-plus/icons-vue'
import {FormInstance, FormRules, ElMessage, ElMessageBox} from "element-plus";

const shareForm = ref<FormInstance>()
const form = reactive({
  data: {
    tagIds:[''],
    imageUrls:['']
  }
})
const meta: any = reactive({
  potTypes: [],
  tags:[],
  blocks:[]
})
meta.potTypes = await getPotTypes()
//todo 标签和地区接口
meta.tags = [
  {id:1,tagName:'古风'},
  {id:2,tagName:'科技'},
  {id:3,tagName:'唯美'},
  {id:4,tagName:'小清新'},
  {id:5,tagName:'中国风'},
  {id:6,tagName:'庭院'},
  {id:7,tagName:'花园'}
]
meta.blocks = [
  {blockId:1,blockName:'古风'},
  {blockId:2,blockName:'科技'},
  {blockId:3,blockName:'唯美'},
  {blockId:4,blockName:'小清新'},
  {blockId:5,blockName:'中国风'},
  {blockId:6,blockName:'庭院'},
  {blockId:7,blockName:'花园'}
]

const rules = reactive<FormRules>({
  copyId: [
    { required: true, message: '请输入摹本编号~喵！', trigger: 'blur' },
  ],
  copyName: [
    { required: true, message: '请输入摹本名称~喵！', trigger: 'blur' },
  ],
  potType: [
    { required: true, message: '请选择洞天类型~喵！', trigger: 'blur' },
  ],
  blockId: [
    { required: true, message: '请选择所在区域~喵！', trigger: 'blur' },
  ],
  // blockName: [
  //   { required: true, message: '请选择所在区域~喵！', trigger: 'blur' },
  // ],
  uploadUid: [
    { required: true, message: '请输入上传者uid~喵！', trigger: 'blur' },
  ],
  tagIds: [
    { required: true, message: '请选择标签~喵！', trigger: 'blur' },
  ],
  imageUrls: [
    { required: true, message: '请输入图片链接~喵！', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请输入摹本详情~喵！', trigger: 'blur' },
  ]
})

const upload = async (sharingForm: FormInstance | undefined) => {
  if (!sharingForm) return
  await sharingForm.validate((valid, fields) => {
    if(valid) {
      let params = form.data
      addCopyInfo(params)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const clear = async (sharingForm: FormInstance | undefined) => {
  if (!sharingForm) return
  sharingForm.resetFields()
}

const addTagRow = () => {
  form.data.tagIds.push('')
}
const deleteTagRow = (index) => {
  form.data.tagIds.splice(index,1)
}
const addImgRow = () => {
  form.data.imageUrls.push('')
}
const deleteImgRow = (index) => {
  form.data.imageUrls.splice(index,1)
}
</script>

<style lang="scss">
.share-container {
  margin: 50px auto;
  transition: 0.5s;
  .share-form {
    margin: 0 auto 15px;
    overflow: hidden;
    transition: 0.5s;
    .share-width {
      width: 100%;
    }
    .share-label {
      margin-bottom: 15px;
    }
    .share-div {
      width: 100%;
      margin-bottom: 15px;
      .share-select {
        display: inline-block;
      }
      .share-input {
        display: inline-block;
        //.el-input__wrapper {
        //  width: calc( 44vw );
        //}
        //.el-input__inner {
        //  width: 100%;
        //}
      }
      .share-button {
         display: inline-block;
       }
    }
    .share-submit {
      text-align: center;
      .el-button {
        border-radius: 15px;
        //font-size: 20px;
        font-weight: 700;
      }
      .el-form-item__content {
        justify-content: center;
      }
    }
    .el-form-item__label {
      color: #1fce85;
      font-size: 20px;
      font-weight: 700;
    }
    .el-input__wrapper {
      border: #1fce85;
      border-radius: 15px;
    }
    .el-select-dropdown {
      border-radius: 15px;
    }
    .el-textarea__inner {
      border-radius: 15px;
      resize: none;
      min-height: 100px !important;
      overflow-y: hidden
    }
  }
}

/* mobile */
@media screen and (max-width: 767px) {
  .share-container {
    width: 80%;
    transition: 0.5s;
    .share-input {
      .el-input__wrapper {
        width: calc( 55vw );
      }
      .el-input__inner {
        width: 100%;
      }
    }
  }
}

/* pad */
@media screen and (min-width: 767px) and (max-width: 992px) {
  .share-container {
    width: 90%;
    transition: 0.5s;
    .share-input {
      .el-input__wrapper {
        width: calc( 82vw );
      }
      .el-input__inner {
        width: 100%;
      }
    }
  }
}

/* pc */
@media screen and (min-width: 992px) {
  .share-container {
    width: 50%;
    transition: 0.5s;
    .share-input {
      .el-input__wrapper {
        width: calc( 43vw );
      }
      .el-input__inner {
        width: 100%;
      }
    }
  }
}
</style>
