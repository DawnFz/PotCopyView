<template>
  <div class="share-container">
    <div class="share-form">
      <div class="share-state">没有经过尘歌壶原作者同意转载的摹本禁止上传，大家如果有看到有侵权的可以联系站长处理一下，预计这两天会加入审核功能</div>
      <el-form ref="shareForm" :model="form.data" :rules="rules" label-position="top">
        <el-form-item label="摹本摹数" prop="copyId">
          <el-input class="share-label"
                    maxlength="16" minlength="7" v-model="form.data.copyId" placeholder="在这里输入摹本摹数~"
                    clearable/>
        </el-form-item>
        <el-form-item label="摹本名称" prop="copyName">
          <el-input class="share-label" maxlength="15" minlength="3" v-model="form.data.copyName"
                    placeholder="在这里输入摹本名称喵~" clearable/>
        </el-form-item>
        <el-row>
          <el-col class="el-col-sm-11">
            <el-form-item class="share-select" label="洞天类型" prop="typeId">
              <el-select class="share-label share-width" v-model="form.data.typeId" placeholder="在这里选择洞天类型喵~"
                         clearable>
                <el-option v-for="potType in meta.potTypes"
                           :key="potType.id"
                           :label="potType.typeName"
                           :value="potType.id"
                           @click="getBlocksByType(potType.id)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="el-col-sm-12 el-col-sm-offset-1">
            <el-form-item class="share-select share-select-short" label="所在区域" prop="blockId">
              <el-select class="share-label share-width" v-model="selBlockId"
                         placeholder="在这里选择所在区域喵~" clearable>
                <el-option v-for="block in meta.blocks"
                           :key="block.blockId"
                           :label="block.blockName"
                           :value="block.blockId" @click="setBlockId(block.blockId)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="摹本作者" prop="author">
          <el-input class="share-label" maxlength="16" type="text"
                    v-model="form.data.author" placeholder="在这里输入摹本作者喵~" clearable/>
        </el-form-item>

        <el-form-item label="摹本来源 [可选]" prop="origin">
          <el-input class="share-label" type="text"
                    v-model="form.data.origin" placeholder="在这里输入摹本来源 [链接]" clearable/>
        </el-form-item>

        <!--        多个标签-->
        <el-form-item label="标签" class="is-required" prop="tagIds">
          <div style="display: block;margin-bottom:15px;width: 100%" class="share-select">
            <el-select style="width: 100%" v-model="form.data.tagIds" multiple placeholder="请选择标签">
              <el-option
                  v-for="tag in meta.tags"
                  :key="tag.id"
                  :label="tag.tagName"
                  :value="tag.id"
              />
            </el-select>
          </div>
        </el-form-item>
        <!--        多个链接-->
        <el-form-item label="图片链接" class="is-required">
          <span style="margin: 0 15px;color: #aaa">因服务器压力原因，图片采用外链形式上传</span>
          <span><a href="https://www.superbed.cn/" target="_blank">点我去图床</a></span>
          <div v-for="(item,index) in form.data.imageUrls" class="share-div">
            <el-form-item class="share-label-short" :rules="rules.imageUrls" :prop="`imageUrls.${index}`">
              <el-input v-model="form.data.imageUrls[index]" placeholder="在这里输入图片链接喵~" clearable/>
            </el-form-item>
            <el-button class="share-button" v-if="index === 0" :icon="Plus" @click="addImgRow" circle/>
            <el-button class="share-button" v-if="index > 0" style="color: #f66" :icon="Minus"
                       @click="deleteImgRow(index)" circle/>
          </div>
        </el-form-item>
        <el-form-item label="摹本描述/简介" prop="description">
          <el-input class="share-label" v-model="form.data.description"
                    placeholder="在这里输入摹本描述喵~可以多写一点喵~" type="textarea" autosize clearable/>
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
import {addCopyInfo, getBlocks, getPotTypes, getTags} from "../webapi/api";
import {reactive, ref} from "vue";
import {Plus, Minus} from '@element-plus/icons-vue'
import {FormInstance, FormRules} from "element-plus";
import {errorTips} from "../elehelper/message";

const shareForm = ref<FormInstance>()
let selBlockId = ref()

const form = reactive({
  data: {
    blockId: null,
    tagIds: [],
    imageUrls: ['']
  }
})
const meta: any = reactive({
  potTypes: [],
  tags: [],
  blocks: []
})
meta.potTypes = await getPotTypes()
meta.tags = await getTags()

const getBlocksByType = async (typeId: number) => {
  selBlockId.value = null;
  meta.blocks = await getBlocks(typeId)
}

const setBlockId = (val: any) => {
  selBlockId.value = val;
  form.data.blockId = selBlockId.value
}

const rules = reactive<FormRules>({
  copyId: [
    {required: true, message: '请输入正确的摹本摹数！', trigger: 'blur', pattern: /^[0-9]*$/},
  ],
  copyName: [
    {required: true, message: '请输入摹本名称~  喵！', trigger: 'blur'},
  ],
  typeId: [
    {required: true, message: '请选择洞天类型~  喵！', trigger: 'blur', pattern: /^[0-9]*$/},
  ],
  blockId: [
    {required: true, message: '请选择所在区域~  喵！', trigger: 'blur', pattern: /^[0-9]*$/},
  ],
  author: [
    {required: true, message: '请输入作者名称！', trigger: 'blur'},
  ],
  origin: [
    {
      required: false,
      message: '请输入正确的摹本来源链接 [带http]！',
      trigger: 'blur',
      pattern: /\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
    },
  ],
  tagIds: [
    {required: true, message: '请选择标签~  喵！', trigger: 'blur'},
  ],
  imageUrls: [
    {
      required: true,
      message: '请输入正确的图片链接 [带http]~  喵！',
      trigger: 'blur',
      pattern: /\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
    },
  ],
  description: [
    {required: true, message: '请输入摹本详情~  喵！', trigger: 'blur'},
  ]
})

const upload = async (sharingForm: FormInstance | undefined) => {
  if (!sharingForm) return
  await sharingForm.validate(async (valid: boolean) => {
    if (valid) {
      if (form.data.tagIds.length > 3) {
        errorTips("最多只能选择三个标签!")
        return;
      }
      await addCopyInfo(form.data)
    }
  })
}

const clear = async (sharingForm: FormInstance | undefined) => {
  if (!sharingForm) return
  sharingForm.resetFields()
}

const addImgRow = () => {
  if (form.data.imageUrls.length >= 6) {
    errorTips("最多只能添加六张图片!")
    return;
  }
  form.data.imageUrls.push('')
}
const deleteImgRow = (index: number) => {
  form.data.imageUrls.splice(index, 1)
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

    .share-state{
      transition: .5s;
      font-size: 18px;
      color: white;
      font-weight: bold;
      background-color: #ff8f92;
      margin: 15px auto 30px;
      padding: 15px;
      border-radius: 20px;
    }

    .share-width {
      width: 100%;
    }

    .share-label {
      margin-bottom: 15px;
    }

    .share-label-short {
      display: inline-block;
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
        margin-left: 17px;
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

    .share-label-short {
      width: 84%;
    }

    .share-input {
      .el-input__wrapper {
        width: calc(55vw);
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

    .share-label-short {
      width: 92%;
    }

    .share-input {
      .el-input__wrapper {
        width: calc(82vw);
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
    width: 535px;
    transition: 0.5s;

    .share-label-short {
      width: 90%;
    }

    .share-input {
      .el-input__wrapper {
        width: calc(23vw);
      }

      .el-input__inner {
        width: 100%;
      }
    }
  }
}
</style>
