<template>
  <div>
    <el-form :inline="true" class="form-inline">
      <el-form-item label="标题">
        <el-input placeholder="请输入标题" v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input placeholder="请输入作者" v-model="author"></el-input>
      </el-form-item>
      <el-button type="success" @click="search">查询</el-button>
      <el-button type="danger" @click="recycle">删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :ids="selectionIds"
      :data="news"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @row-click="rowClick"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="日期">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="作者">
              <span>{{ props.row.author }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id"
        width="80"
        sortable="custom">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="200"
        sortable="custom">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="150"
        sortable="custom">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="描述"
        width="450"
        sortable="custom">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="100"
        sortable="custom">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :sort-field="sortField"
        :sort-order="sortOrder">
      </el-pagination>
    </div>
    <el-dialog title="确认提示" :visible.sync="dialogConfirmVisible">
      <span>确认要修改吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeStatus()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        news: [],
        pageSize: 10,
        currentPage: 1,
        account: '',
        nickname: '',
        total: 0,
        sortField: '',
        sortOrder: 'ASC',
        dialogFormVisible: false,
        dialogConfirmVisible: false,
        formLabelWidth: '120px',
        selectionIds: [],
        currentIndex: 0,
        status: 0,
        form: {
          content: ''
        }
      }
    },
    filters: {
      formatCreated (timestamp) {
        var date = new Date()
        date.setTime(timestamp * 1000)
        return date.toLocaleString()
      }
    },
    created () {
      this.requestData()
    },
    methods: {
      handleError (error) {
        if (error.response.status === 401) {
          localStorage.clear()
          this.$router.push('/login')
        }
      },
      requestData () {
        this.$http.get('/news/list', {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then(res => {
          this.news = res.data.list
          this.pageSize = res.data.page_size
          this.total = res.data.total
        }).catch(error => {
          this.handleError(error)
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.requestData()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.requestData()
      },
      search () {
        this.requestData()
      },
      handleSortChange (obj) {
        this.sortField = obj.prop
        if (obj.order === 'descending') {
          this.sortOrder = 'DESC'
        } else {
          this.sortOrder = 'ASC'
        }
        this.requestData()
      },
      formatCreated (row, column, cellValue) {
        var date = new Date()
        date.setTime(cellValue * 1000)
        return date.toLocaleString()
      },
      handleSelectionChange (selection) {
        var ids = []
        for (var i = 0; i < selection.length; i++) {
          ids.push(selection[i].id)
        }
        this.selectionIds = ids
      },
      choose () {
        if (this.selectionIds.length <= 0) {
          return false
        }
        return true
      },
      recycle () {
        if (this.choose()) {
          this.status = 4
          this.dialogConfirmVisible = true
        }
      },
      rowClick (row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      }
    }
  }
</script>
<style>
  .block {
    text-align: center;
    margin-top: 20px;
  }

  .table-expand {
    font-size: 0;
  }

  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33.3%;
  }
</style>
