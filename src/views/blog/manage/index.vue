<template>
  <div id="common-table">
    <el-table
      :data="list.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
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
        label="标题"
        prop="title"
      />
      <el-table-column
        align="center"
        label="创建日期"
        prop="createDate"
        sortable
      />
      <el-table-column
        align="center"
        label="更新日期"
        prop="updateDate"
        sortable
      />
      <el-table-column
        align="center"
        label="点击数"
        prop="clickCount"
        sortable
      />
      <el-table-column
        align="center"
        label="评论数"
        prop="commentCount"
        sortable
      />
      <el-table-column
        align="center"
        label="喜欢数"
        prop="likeCount"
        sortable
      />
      <el-table-column
        align="right"
      >
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center"
      layout="prev,pager,next"
      :page-size="data.pageSize"
      :total="data.total"
      :current-page="data.pageNum"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { fetchBlogList, deleteBlog } from '@/api/blog'

export default {
  data() {
    return {
      data: {},
      list: [],
      search: '',
      page: 1,
      size: 10
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchBlogList(this.page, this.size).then(response => {
        this.data = response.data
        this.list = response.data.list
      })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/blog/edit',
        query: { id: row.id }
      })
    },
    handleDelete(index, row) {
      this.$confirm(`此操作将永久删除《${row.title}》, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBlog(row.id).then(response => {
          // 更新数据
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    calcIndex(index) {
      return this.size * (this.page - 1) + index + 1
    },
    handleCurrentChange(currPage) {
      this.page = currPage
      this.fetchData()
    }
  }
}
</script>

<style scoped>

</style>
