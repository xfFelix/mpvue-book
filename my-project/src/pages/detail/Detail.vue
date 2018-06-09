<template>
	<div>
    <BookInfo :info="info"></BookInfo>
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
      info: {}
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
    }
  }
}
</script>
<style>

</style>