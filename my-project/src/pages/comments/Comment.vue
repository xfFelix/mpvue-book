<template>
  <div class="container">
    <CommentList type="user" :comments="comments" v-if="userinfo.openId"></CommentList>
    <div v-if="userinfo.openId">
      <div class="page-title">我的图书</div>
      <Card v-for="book in books" :key="book.id" :book="book"></Card>
      <div v-if="!books.length">暂时还没有添加过书，快去添加书吧</div>
    </div>
  </div>
</template>
<script>
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'
import {get} from '@/utils'
export default {
  components: {
    CommentList,
    Card
  },
  data () {
    return {
      comments: [],
      books: [],
      userinfo: {}
    }
  },
  onShow () {
    if (!this.userinfo.openId) {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      }
    }
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getBooks () {
      const books = await get('/weapp/booklist', {openid: this.userinfo.openId})
      this.books = books.list
    },
    async getComments () {
      let comments = await get('/weapp/commentlist', {openid: this.userinfo.openId})
      this.comments = comments.list
    }
  }
}
</script>
<style>
  
</style>