<template>
  <el-form ref="form" :model="form" label-width="80px" class="el-form">
    <el-form-item label="昵称">
      <el-input v-model="form.nickname" class="inner-item" style="width: 50%;"/>
    </el-form-item>
    <el-form-item label="用户名">
      <el-input v-model="form.username" class="inner-item" style="width: 50%;"/>
    </el-form-item>s
    <el-form-item label="密码">
      <el-input v-model="form.password" class="inner-item" style="width: 50%;"/>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" class="inner-item" style="width: 50%;"/>
    </el-form-item>
    <el-form-item label="头像">
      <lb-upload v-model="form.avatar" height="180px" class="inner-item" />
    </el-form-item>
    <el-form-item label="简介">
      <el-input v-model="form.profile" class="inner-item" type="textarea" style="width: 90%;" :rows="7" />
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Upload from '@/components/Upload'
import { getToken } from '@/utils/auth'
import { getInfo, updateAdmin } from '@/api/admin'

export default {
  components: {
    lbUpload: Upload
  },
  data() {
    return {
      form: {
        nickname: '',
        username: '',
        password: '',
        avatar: '',
        email: '',
        profile: ''
      }
    }
  },
  created() {
    getInfo(getToken).then(response => {
      this.form = response.data
    })
  },
  methods: {
    onSubmit() {
      updateAdmin(this.form).then(response => {
        // 更新state信息
        this.$store.dispatch('admin/getInfo')
        this.$message({
          type: 'success',
          message: '提交成功！'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-form {
    margin: 50px 40px 0 40px;

    .inner-item {
      padding-left: 40px;
    }
  }
</style>
