<template>
  <div class="info-list-container">
    <div class="copy-search">
      <div class="info-search-server-pc">
        <el-select class="server-pc" v-model="meta.params.server" placeholder="全服">
          <el-option label="官服" value="0"/>
          <el-option label="哔哩" value="1"/>
          <el-option label="国际" value="2"/>
        </el-select>
      </div>
      <div class="info-search-server-pe">
        <el-select v-model="meta.params.server" style="width: 100%" placeholder="全服">
          <el-option label="官服" value="0"/>
          <el-option label="哔哩" value="1"/>
          <el-option label="国际" value="2"/>
        </el-select>
      </div>
      <div class="search-box">
        <el-input
            v-model="inputText"
            placeholder="输入查找的内容喵~"
            class="input-with-select"
            style="height: 45px">
          <template #prepend>
            <el-select v-model="searchType" placeholder="类型" style="width: 90px">
              <el-option label="全部" value="-1"/>
              <el-option v-for="type in meta.types" :key="type" :label="type.typeName" :value="type.id"/>
            </el-select>
          </template>
          <template #append>
            <el-button style="width: 50px" :icon="Search" @click="searchLoad"/>
          </template>
        </el-input>
      </div>

    </div>
    <div class="copy-list">
      <div class="copy-card" v-for="item in meta.data.content"
           :key="item" @click="toCopyInfo(item.copyId)">
<!--        <div style="position: absolute;color: #858585;right: 10px">
          <el-icon style="height: 50px;width: 50px;font-style: normal;"><View />{{item.hits}}</el-icon></div>-->
        <img class="card-top" :src="item.images[0]" :alt="item.copyName+'：图片加载失败'"
             ondragstart="return false;"/>
        <div class="card-bottom">
          <span class="card-title">{{ splitTitle(item.copyName) }}</span>
          <div class="card-type-parent">
            <div class="card-type">{{ item.potType }}</div>
            <div class="card-type" style="background-color: rgb(70, 160, 255)">{{ item.blockName }}</div>
          </div>
          <div class="card-tags-array">
            <div class="card-tags" v-for="tag in item.tags" :key="tag">{{ tag }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="list-footer">
    <el-pagination
        background
        style="margin: 40px auto;
         display: inline-flex;"
        :page-size="meta.params.pageSize"
        prev-text="&emsp;上一页&emsp;"
        next-text="&emsp;下一页&emsp;"
        layout="prev, pager, next"
        :total="meta.params.totalSize"
        :current-page="meta.params.pageNum"
        @current-change="loadPage"
    />
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {getCopyInfos, getPotTypes, getTags} from "../webapi/api";
import {Search,View} from '@element-plus/icons-vue';
import router from "../router";

const searchType = ref()
const inputText = ref()

const meta: any = reactive({
  data: {},
  types: [],
  params: {
    pageNum: 1,
    pageSize: 12,
    total: 0
  }
})

const searchLoad = async () => {
  if (searchType.value !== "-1") {
    meta.params.typeId = searchType;
  } else {
    meta.params.typeId = null
  }
  meta.params.copyName = inputText.value;
  await loadPage(1)
}

const loadPage = async (val: number) => {
  meta.params.pageNum = val
  meta.data = await getCopyInfos(meta.params)
  meta.params.totalSize = meta.data.totalSize
}

const splitTitle = (title: string) => {
  if (title.length > 12) {
    return title.substring(0, 9) + "..."
  } else {
    return title
  }
}

let toCopyInfo = (copyId: string) => {
  setTimeout(() => {
    router.push({
      path: 'info',
      query: {copyId: copyId}
    })
  }, 500);
}
meta.types = await getPotTypes()
await loadPage(1)
</script>

<style lang="scss">

.info-list-container {
  align-items: center;
  margin: 10px auto;
  width: 75%;

  .copy-search {
    margin: 40px auto 20px;
    transition: 0.5s;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .input-with-select .el-input-group__prepend {
      background-color: var(--el-fill-color-blank);
    }

    .el-input {
      height: 45px;
    }

  }

  .copy-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .copy-card {
      transition: 0.6s;
      display: inline-block;
      height: 400px;
      width: 300px;
      border-radius: 35px;
      box-shadow: 0 1px 15px 1px rgba(0, 0, 0, 0.2);

      .card-top {
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        pointer-events: none;
        object-fit: cover;
        display: block;
        border-radius: 25px;
        margin: 35px auto 10px;
        height: 200px;
        width: 240px;
      }

      .card-bottom {
        margin: 0 auto;
        display: block;
        height: 120px;
        width: 240px;
      }

      .card-title {
        margin-top: 15px;
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        display: block;
        font-size: 20px;
        font-weight: bold;
      }

      .card-tags-array {
        margin-top: 5px;
        width: 240px;
      }

      .card-type-parent {
        margin-top: 25px;
        width: 240px;
      }

      .card-tags {
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        padding: 0 10px;
        line-height: 25px;
        color: white;
        margin: 5px;
        display: inline-block;
        height: 25px;
        border-radius: 15px;
        background-color: #42b983;
      }

      .card-type {
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        padding: 0 10px;
        line-height: 25px;
        color: white;
        margin: 5px;
        display: inline-block;
        height: 25px;
        border-radius: 15px;
        background-color: #42afb9;
      }
    }

    .copy-card:hover {
      transition: 0.6s;
      transform: scale(1.05);
      box-shadow: 0 1px 15px 3px rgba(0, 0, 0, 0.35);
    }

    .copy-card:active {
      transition: 0.2s;
      background-color: #ccc;
    }
  }

}


.list-footer {
  text-align: center;

  .el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
    background-color: #42b983 !important;
  }
}

/* mobile */
@media screen and (max-width: 767px) {
  .copy-search {
    transition: 0.5s;
    width: 100%;
  }
  .info-search-server-pc {
    display: none;
    transition: .5s;
  }
  .info-search-server-pe {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    margin: 10px auto;
    transition: .5s;
  }
  .copy-card {
    margin: 25px 0;
    transition: .5s;
  }
}

/* pad */
@media screen and (min-width: 767px) and (max-width: 992px) {
  .copy-search {
    transition: 0.5s;
    width: 70%;
  }
  .copy-card {
    margin: 25px 10px;
  }
  .info-search-server-pc {
    display: none;
    transition: .5s;
  }
  .info-search-server-pe {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    margin: 10px auto;
    transition: .5s;
  }
  .copy-card {
    margin: 25px 0;
    transition: .5s;
  }
}

/* pc */
@media screen and (min-width: 992px) {
  .copy-search {
    transition: 0.5s;
    width: 50%;
  }
  .copy-card {
    margin: 25px 15px;
  }
  .search-box {
    display: inline-block;
    width: 85%;
  }
  .info-search-server-pc {
    width: 15%;
    transition: .5s;
  }
  .info-search-server-pe {
    display: none;
  }
}

</style>
