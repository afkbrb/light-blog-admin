<template>
  <div class="common-table">
    <el-table
      :data="list"
      style="width: 100%"
      :cell-style="{padding:'4px'}"
    >
      <el-table-column
        align="center"
        label="编号"
        type="index"
        :index="calcIndex"
      />
      <el-table-column
        align="center"
        label="头像"
        prop="readerAvatar"
      >
        <template slot-scope="scope">
          <img :src="scope.row.readerAvatar" class="image-cell">
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="用户名"
        prop="readerName"
      />
      <el-table-column
        align="center"
        label="博客标题"
        :formatter="blogTitleFormatter"
      />
      <el-table-column
        align="center"
        label="内容"
        prop="content"
      />
      <el-table-column
        align="center"
        label="日期"
        prop="commentDate"
        sortable
      />
      <el-table-column
        align="center"
        label="IP"
        prop="ip"
      />
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
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
      @current-change="handleCurrentPageChange"
    />

  </div>
</template>

<script>
import { fetchCommentList, deleteComment } from '@/api/comment'

export default {
  data() {
    return {
      data: {},
      list: [
        {
          id: null,
          blogId: null,
          blogTitle: '',
          commentDate: '',
          readerName: '',
          readerAvatar: '',
          ip: '',
          content: '',
          receiverName: '',
          receiverAvatar: '',
          receiverContent: '',
          receiverDate: ''
        }
      ],
      page: 1,
      size: 7
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchCommentList(this.page, this.size).then(response => {
        this.list = response.data.list
        this.data = response.data
      })
    },
    calcIndex(index) {
      return this.size * (this.page - 1) + index + 1
    },
    handleDelete(index, row) {
      this.$confirm(`此操作将永久删除该评论, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteComment(row.id).then(response => {
          // 更新数据
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    handleCurrentPageChange(currPage) {
      this.page = currPage
      this.fetchData()
    },
    blogTitleFormatter(row) {
      return `《${row.blogTitle}》`
    }
  }
}
</script>

<style lang="scss" scoped>

  .common-table{
    margin: 20px 20px auto 20px;

    .image-cell {
      width: 80px;
      height: 80px;
      display: block;
      margin: 0 auto;
    }
  }

</style>
