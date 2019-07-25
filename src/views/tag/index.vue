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
        label="名称"
        prop="name"
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
  </div>
</template>

<script>
import { fetchTagList, deleteTag, addTag, updateTag } from '@/api/tag'

export default {
  data() {
    return {
      data: {},
      list: [
        {
          id: null,
          name: ''
        }
      ],
      page: 1,
      size: 10,
      currRow: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchTagList(this.page, this.size).then(response => {
        this.list = response.data.list
        this.data = response.data
      })
    },
    calcIndex(index) {
      return this.size * (this.page - 1) + index + 1
    },
    handleAdd() {
      this.$prompt('请输入标签名称', '新建', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        addTag({ name: value }).then(response => {
          this.$message({
            type: 'success',
            message: '添加成功！'
          })
          this.fetchData()
        })
      })
    },
    handleEdit() {
      if (this.currRow === null) {
        this.$message({
          type: 'warning',
          message: '请选择要修改的行'
        })
        return
      }
      this.$prompt('请输入标签名称', '修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        updateTag({ id: this.currRow.id, name: value }).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.fetchData()
        })
      })
    },
    handleDelete() {
      if (this.currRow === null) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的行'
        })
        return
      }
      this.$confirm(`此操作将永久删除标签“ ${this.currRow.name} ”，是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTag(this.currRow.id).then(response => {
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
    }
  }
}
</script>

<style lang="scss" scoped>

  .common-table{

    .el-button-group{
      margin: 10px auto auto 10px;
    }
  }
</style>
