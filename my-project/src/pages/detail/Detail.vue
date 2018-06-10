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
	</div>
</template>
<script>
import {get} from '@/utils'
import BookInfo from '@/components/BookInfo'
export default {
  components: {
    BookInfo
  },
  data () {
    return {
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
  },
  methods: {
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.id})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
    },
    getGeo (e) {

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