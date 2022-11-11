<template>
  <div class="info-list-container">
    <div class="copy-search">
      <el-input
          v-model="inputText"
          placeholder="输入查找的内容喵~"
          class="input-with-select"
          style="height: 45px;"
      >
        <template #prepend>
          <el-select v-model="searchType" placeholder="搜索类型" style="width: 125px">
            <el-option label="全部" value="-1"/>
            <el-option v-for="type in meta.types" :key="type" :label="type.typeName" :value="type.id"/>
          </el-select>
        </template>
        <template #append>
          <el-button style="width: 70px" :icon="Search" @click="searchLoad"/>
        </template>
      </el-input>

    </div>
    <div class="copy-list">
      <div class="copy-card" v-for="item in meta.data.content" :key="item">
        <img class="card-top" :src="item.images[0]" alt="{{item.copyName}}"
             ondragstart="return false;"/>
        <div class="card-bottom">
          <span class="card-title" @click="toInfo(item)">{{ item.copyName }}</span>
          <div class="card-type-parent">
            <div class="card-type">{{ item.potType }}
            </div>
          </div>
          <div class="card-tags-array">
            <div class="card-tags" v-for="tag in item.tags"
                 :key="tag">{{ tag }}
            </div>
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
        :total="meta.params.total"
        :current-page="meta.params.pageNum"
        @current-change="loadPage"
    />
  </div>
</template>

<script>
import {reactive, ref} from 'vue'
import {errorMessage} from "../elehelper/message.js";
import {getCopyInfos, getPotTypes} from "../webapi/api.js";
import {Search} from '@element-plus/icons-vue';
import router from "../router";

export default {
  name: 'InfoListView',
  async setup() {
    const searchType = ref()
    const inputText = ref()
    const toInfo = (item) => {
      router.push({
        path: 'info',
        query:{ item : JSON.stringify(item) }
      })
    }
    const meta = reactive({
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

    const loadPage = async (val) => {
      meta.page = val
      await getCopyInfos(meta.params).then(res => {
        if (res.status === 'error') {
          errorMessage(res)
        } else {
          meta.data = res.data
        }
      }).catch(err => {
        errorMessage(err)
      })
    }

    await getPotTypes().then(res => {
      meta.types = res.data
    }).catch(err => {
      errorMessage(err)
    })

    await loadPage()

    return {
      searchType,
      inputText,
      meta,
      loadPage,
      searchLoad,
      Search,
      toInfo
    }
  }
}
</script>

<style lang="scss">

.info-list-container {
  align-items: center;
  margin: 10px auto;
  width: 75%;

  .copy-search {
    margin: 40px auto 20px;
    transition: 0.5s;

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
      margin: 25px 0;
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
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        display: block;
        font-size: 24px;
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
}

/* pad */
@media screen and (min-width: 768px) and (max-width: 991px) {
  .copy-search {
    transition: 0.5s;
    width: 70%;
  }
}

/* pc */
@media screen and (min-width: 992px) {
  .copy-search {
    transition: 0.5s;
    width: 50%;
  }
}

</style>
