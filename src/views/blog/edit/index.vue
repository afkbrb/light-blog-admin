<template>
  <el-form ref="form" :model="form" label-width="80px" class="el-form">
    <el-form-item label="博客标题">
      <el-input v-model="form.title" class="inner-item" style="width: 500px" />
    </el-form-item>
    <el-form-item label="博客类型">
      <el-radio-group v-model="form.typeName" class="inner-item">
        <el-radio v-for="(typeId, type) in typeMap" :key="type" :label="type" name="type">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="原文地址">
      <el-input v-model="form.originalUrl" class="inner-item" style="width: 500px" />
    </el-form-item>
    <el-form-item label="博客标签">
      <el-checkbox-group v-model="checkedTags" class="inner-item">
        <el-checkbox v-for="tag in tags" :key="tag.name" :label="tag.name" name="tag" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="博客图片">
      <lb-upload v-model="form.blogImage" height="180px" class="inner-item" />
    </el-form-item>
    <el-form-item label="博客正文">
      <div class="mavon-editor inner-item">
        <mavon-editor ref="md" v-model="form.content" :toolbars="toolbars" style="height: 100%" @imgAdd="imgAdd" />
      </div>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button type="primary" @click="onSubmit">发布博客</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import request from '@/utils/request'
import { fetchTagList } from '@/api/tag'
import { fetchBlog, updateBlog, addBlog } from '@/api/blog'
import Upload from '@/components/Upload'

export default {
  components: {
    lbUpload: Upload
  },
  data() {
    return {
      id: this.$route.query.id,
      form: {
        id: '',
        title: '',
        content: '',
        tag: '',
        typeName: '',
        originalUrl: '',
        blogImage: ''
      },
      checkedTags: [],
      tags: [],
      typeMap: {
        '原创': 1,
        '转载': 2,
        '翻译': 3
      },
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  created() {
    this.initTags()
    if (this.id) {
      this.initForm()
    }
  },
  methods: {
    // 初始化标签列表
    initTags() {
      fetchTagList(1, 100).then(response => {
        this.tags = response.data.list
      })
    },
    initForm() {
      fetchBlog(this.id).then(response => {
        // 以下写法出现多余的属性
        // this.form = response.data
        for (const key in this.form) {
          this.form[key] = response.data[key]
        }
        this.checkedTags = this.form.tag.split(',')
      })
    },
    convertForm() {
      // 转换form的tag形式
      let result = ''
      for (const checkedTag of this.checkedTags) {
        for (const tag of this.tags) {
          if (tag.name === checkedTag) {
            result += tag.id + ','
            break
          }
        }
      }
      result = result.substring(0, result.length - 1)
      this.form.tag = result

      // 转换form的type形式
      this.form.type = this.typeMap[this.form.typeName]
    },
    onSubmit() {
      this.convertForm()
      if (this.id) {
        updateBlog(this.form).then(response => {
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
          this.reset()
        })
      } else {
        addBlog(this.form).then(response => {
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
          this.reset()
        })
      }
    },
    imgAdd(pos, file) {
      //  先验证
      if (!this.validateImage(file)) return
      // 第一步.将图片上传到服务器.
      const formData = new FormData()
      formData.append('image', file)
      request({
        url: process.env.VUE_APP_UPLOAD_URL,
        withCredentials: false,
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((response) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, response.data.url)
      })
    },
    validateImage(file) {
      const isImg = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp')
      const isLt4M = file.size / 1024 / 1024 < 4

      if (!isImg) {
        this.$message.error('上传的文件必须是图片!')
      }
      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      return isImg && isLt4M
    },
    reset() {
      for (const key in this.form) {
        this.form[key] = ''
      }
      this.id = ''
      this.checkedTags = []
    }
  }
}
</script>

<style lang="scss" scoped>
 .el-form{
   margin: 50px 40px 0 40px;

   .inner-item{
     padding-left: 40px;
   }

   .mavon-editor{
     height: 88vh;
     width: 100%;
   }

 }
</style>
