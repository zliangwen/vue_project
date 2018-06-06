<template>
  <div class="recharge">
    <mt-header fixed title="修改用户名">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <div class="chose">
        <span>用户名</span>
        <input type="text" v-model="userName" placeholder="请输入新的用户名">
      </div>
      <div class="submit">
        <mt-button type="primary" size="large" @click="changName">确定</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {changeUserName} from '@/services/getDetail'

export default {
  data() {
    return {
      userName:''
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    changName() {
      changeUserName({userName:this.userName}).then(res => {
        // alert('changname')
        console.log(res)
        if(res.state) {
          this.userName = ''
          this.$messagebox.alert('修改成功').then(() => {
            this.$router.go(-1)
          });
        }else {
          this.$toast(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#recharge {
  position: relative;
}
.content {
  padding: 2rem 0 0;
  height: 100vh;
  .submit {
    margin-top: 2.5rem;
    padding: 0 1rem;
    .mint-button {
      background-color: red;
      border-radius: 1rem;
    }
  }
}
</style>