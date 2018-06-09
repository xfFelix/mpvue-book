<template>
	<div>
		<TopSwiper :tops="tops"></TopSwiper>
		<Card :key="book.id" v-for="book in books" :book="book"></Card>
		<p class="text-footer" v-if="!more">没有更多数据</p>
	</div>
</template>
<script>
import TopSwiper from '@/components/TopSwiper'
import {get} from '@/utils'
import Card from '@/components/Card'
export default {
  components: {
    Card,
    TopSwiper
  },
  data () {
    return {
      books: [],
      page: 0,
      more: true,
      size: 10,
      tops: []
    }
  },
  methods: {
    async getList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist', {page: this.page, size: this.size})
      if (books.list.length < this.size && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = books.list
        wx.stopPullDownRefresh()
      } else {
        this.books = [...this.books, ...books.list]
      }
      wx.hideNavigationBarLoading()
    },
    async getTop () {
      const tops = await get('/weapp/top')
      this.tops = tops.list
    }
  },
  onReachBottom () {
    if (!this.more) {
      return
    }
    this.page += 1
    this.getList()
  },
  onPullDownRefresh () {
    this.getList(true)
    this.getTop()
  },
  mounted () {
    this.getList(true)
    this.getTop()
  }
}
</script>
<style>
	
</style>
