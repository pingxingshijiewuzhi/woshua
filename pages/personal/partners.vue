<template>
	<view class="box flexs">
		<view class="center " :style=" 'background-image: url('+baseUrl + imageUrl+')'">
			<!-- <image :src="baseUrl + imageUrl" mode="aspectFit"></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: '',
				baseUrl: this.$common.baseUrl
			}
		},
		onLoad() {
			this.get_imageUrl();
		},
		methods: {
			get_imageUrl() {
				this.$common.requests('/api/user/get_empower').then(res => {
					if (res.data.msg == '请先通过实名认证') {
						this.$api.msg(res.data.msg)
						setTimeout(() => {
							uni.navigateTo({
								url: 'realname'
							})
						}, 1000)
						return
					}
					if (res.data.code == 1) {
						this.imageUrl = res.data.data;
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #61B8FF;

	}

	.center {
		width: 90%;
		height: 90%;
		/* background-image: url(../../static/pic/squans@2x.png); */
		background-size: 100% 100%;

		position: absolute;
		bottom: 5%;
	}
</style>
