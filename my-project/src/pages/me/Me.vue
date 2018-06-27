<template>
	<div class="container">
		<div class="userinfo" @click="login">
			<img :src="userinfo.avatarUrl" alt="">
			<p>{{userinfo.nickName}}</p>
		</div>
      <button v-if="firstLogin" open-type="getUserInfo" @getuserinfo="getuserinfo">用户登陆</button>
		<YearProgress></YearProgress>
		<button v-if="userinfo.openId" @click="scanBook" class="btn">添加图书</button>
	</div>
</template>
<script>
import YearProgress from '@/components/YearProgress'
import {showSuccess, post, showModal} from '@/utils'
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '用户姓名'
      },
      firstLogin: false
    }
  },
  created () {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  },
  methods: {
    async addBook (isbn) {
      const res = await post('/weapp/addbook', {
        isbn,
        openId: this.userinfo.openId
      })
      showModal('添加成功', `${res.title}添加成功`)
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    getuserinfo (e) {
      console.log(e.mp.detail)
    },
    login () {
      let user = wx.getStorageSync('userinfo')
      if (!user) {
        // 设置登录地址
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: (userinfo) => {
            showSuccess('登录成功')
            wx.setStorageSync('userinfo', userinfo)
            this.userinfo = userinfo
          },
          fail: (err) => {
            console.log('登录失败', err)
            this.firstLogin = true
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
	.container{
		padding: 0 30rpx;
		.userinfo{
			margin-top: 100rpx;
			text-align: center;
			img {
				width: 150rpx;
				height: 150rpx;
				margin: 20rpx;
				border-radius: 50%;
			}
		}
	}
</style>