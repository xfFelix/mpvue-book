<template>
	<div>
    <BookInfo :info="info"></BookInfo>
    <div class="commet">
      <textarea v-model="comment" 
                class="textarea"
                :maxlength="100"
                placeholder="请输入图书评论"
                ></textarea>
    </div>
    <div class="location">
      地理位置
      <switch color="#EA5A49" @change="getGeo"></switch>
      <span class="text-primary">{{location}}</span>
    </div>
    <div class="phone">
      手机型号
      <switch color="#EA5A49" @change="getPhone"></switch>
      <span class="text-primary">{{phone}}</span>
    </div>
    <button class="btn" @click="addComment">
      评论
    </button>
	</div>
</template>
<script>
import {get, post, showModal} from '@/utils'
import BookInfo from '@/components/BookInfo'
export default {
  components: {
    BookInfo
  },
  data () {
    return {
      comments: [],
      id: '',
      info: {},
      comment: '',
      location: '',
      phone: ''
    }
  },
  mounted () {
    this.id = this.$root.$mp.query.id
    this.getDetail()
    this.getComments()
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  },
  methods: {
    async addComment () {
      if (!this.comment) {
        return
      }
      const data = {
        openid: this.userinfo.openId,
        bookid: this.id,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      }
      try {
        await post('/weapp/addcomment', data)
        this.comment = ''
      } catch (e) {
        showModal('失败', e.msg)
      }
      console.log(data)
    },
    async getComments () {
      const comments = await get('/weapp/commentlist', {bookid: this.id})
      this.comments = comments
    },
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.id})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
    },
    getGeo (e) {
      const ak = 'pPWOHDRGBBSRZ5NHHXmY4KpL272AGVlr'
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          success: geo => {
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json'
              },
              success: res => {
                console.log(res)
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
    }
  }
}
</script>
<style lang="scss">
.comment{
  margin-top: 10px;
  .textarea{
    background: #eee;
    width: 730rpx;
    height: 200rpx;
    padding: 10rpx;
  }
  .location{
    margin-top: 10px;
  }
  .phone{
    margin-top: 10px;
  }
}
</style>