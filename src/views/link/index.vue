<template>
  <div class="common-table">
    <el-button-group class="el-button-group">
      <el-button type="success" icon="el-icon-plus" @click="handleAdd" />
      <el-button type="primary" icon="el-icon-edit" @click="handleEdit" />
      <el-button type="danger" icon="el-icon-delete" @click="handleDelete" />
    </el-button-group>
    <el-table
      :data="list"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentRowChange"
    >
      <el-table-column
        align="center"
        label="编号"
        type="index"
        :index="calcIndex"
      />
      <el-table-column
        align="center"
        label="ID"
        prop="id"
      />
      <el-table-column
        align="center"
        label="次序"
        prop="linkOrder"
        sortable
      />
      <el-table-column
        align="center"
        label="名称"
        prop="linkName"
      />
      <el-table-column
        align="center"
        label="URL"
        prop="linkUrl"
      />
    </el-table>
    <el-pagination
      style="text-align: center"
      layout="prev,pager,next"
      :page-size="data.pageSize"
      :total="data.total"
      :current-page="data.pageNum"
      @current-change="handleCurrentPageChange"
    />

    <el-dialog title="增加外链" :visible.sync="addVisible" width="30%" max-width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="链接名称">
          <el-input v-model="form.linkName" class="inner-item" />
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="form.linkUrl" class="inner-item" />
        </el-form-item>
        <el-form-item label="链接次序">
          <el-input v-model="form.linkOrder" class="inner-item" />
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchLinkList, deleteLink, addLink, updateLink } from '@/api/link'

export default {
  data() {
    return {
      data: {},
      list: [
        {
          id: null,
          linkName: '',
          linkUrl: '',
          linkOrder: ''
        }
      ],
      form: {
        id: null,
        linkName: '',
        linkUrl: '',
        linkOrder: ''
      },
      page: 1,
      size: 10,
      currRow: null,
      addVisible: false,
      editVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchLinkList(this.page, this.size).then(response => {
        this.list = response.data.list
        this.data = response.data
      })
    },
    calcIndex(index) {
      return this.size * (this.page - 1) + index + 1
    },
    handleAdd() {
      // reset
      this.form = {
        id: null,
        linkName: '',
        linkUrl: '',
        linkOrder: ''
      }
      this.addVisible = true
    },
    handleEdit() {
      if (this.currRow === null) {
        this.$message({
          type: 'warning',
          message: '请选择要修改的行'
        })
        return
      }
      this.form = this.currRow
      this.addVisible = true
    },
    handleDelete() {
      if (this.currRow === null) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的行'
        })
        return
      }
      this.$confirm(`此操作将永久删除外链“ ${this.currRow.linkName} ”，是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLink(this.currRow.id).then(response => {
          // 更新数据
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.currRow = null
        })
      })
    },
    handleCurrentPageChange(currPage) {
      this.page = currPage
      this.fetchData()
    },
    handleCurrentRowChange(currRow) {
      this.currRow = currRow
    },
    onSubmit() {
      if (this.form.id) {
        updateLink(this.form).then(response => {
          this.addVisible = false
          // 更新数据
          this.fetchData()
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
        })
      } else {
        addLink(this.form).then(response => {
          this.addVisible = false
          // 更新数据
          this.fetchData()
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .common-table {

    .el-button-group {
      margin: 10px auto auto 10px;
    }
  }

  .inner-item {
    padding-left: 30px;
  }
</style>
