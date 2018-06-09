<template>
	<div class="swiper">
		<swiper
		  :indicator-dots='true'
		  indicator-color="#EA5149"
		  :autoplay='true'
		  :interval="6000"
		  :duration='1000'
		  :circular="true"
		>
			<div :key="imgindex" v-for="(top,imgindex) in imgUrls">
				<swiper-item>
					<img :src="img.image" :key="img.id" v-for="img in top" class="slide-image" mode="aspectFit" @click="bookDetail(img.id)">
				</swiper-item>
			</div>
		</swiper>
	</div>
</template>
<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls () {
      let res = this.tops
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
    }
  },
  methods: {
    bookDetail (id) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + id
      })
    }
  }
}
</script>
<style lang="scss">
.swiper{
	margin-top: 5px;
	.slide-image{
		width: 33%;
		height: 250rpx;
	}
}
</style>
