<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">添加新闻</span>
      <p style="float: right">
        <el-button type="primary" @click="submit">保存修改</el-button>
      </p>
    </div>
    <div class="text item">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="新闻简要" name="first">
          <el-form label-position="right" label-width="160px">
            <el-form-item label="新闻标题">
              <el-input v-model="title" class="short-input"></el-input>
              <span style="color: red" id="title"></span>
            </el-form-item>
            <el-form-item label="添加日期">
              <el-input v-model="time" class="short-input"></el-input>
              <span style="color: red" id="time"></span>
            </el-form-item>
            <el-form-item label="新闻描述">
              <el-input v-model="desc" class="short-input"></el-input>
              <span style="color: red" id="desc"></span>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="author" class="short-input"></el-input>
              <span style="color: red" id="author"></span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="新闻内容" name="second">
          <el-input
            type="textarea"
            :rows="20"
            placeholder="请输入内容"
            v-model="content">
          </el-input>
        </el-tab-pane>
        <el-tab-pane label="新闻附件" name="third">
          <el-form label-position="right" label-width="160px">
            <el-form-item label="附件类型">
              <el-select placeholder="请选择附件类型" v-model="commentSourceName">
                <el-option label="文档" value="document"></el-option>
                <el-option label="音频" value="audio"></el-option>
              </el-select>
            </el-form-item>
            <div :class="appStoreClass">
              <el-form-item label="AppId">
                <el-input style="width: 220px !important;" v-model="AppId"></el-input>
              </el-form-item>
              <el-form-item label="国家">
                <el-select v-model="currentCountry" multiple filterable placeholder="请选择">
                  <el-option
                    v-for="item in country"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否开启抓取">
                <el-radio class="radio" v-model="isEnable" label="0">否</el-radio>
                <el-radio class="radio" v-model="isEnable" label="1">是</el-radio>
              </el-form-item>
            </div>
            <div :class="facebookClass">
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>
<script>
  export default {
    data () {
      return {
        activeName: 'first'
      }
    },
    methods: {

    }
  }
</script>
<style>
  .short-input {
    width: 180px !important;
  }

  .loadText {
    margin-left: 20px;
    color: red;
  }

  .appStoreClass-show {
    display: block;
  }

  .appStoreClass-hide {
    display: none;
  }

  .facebookClass-show {
    display: block;
  }

  .facebookClass-hide {
    display: none;
  }
</style>
