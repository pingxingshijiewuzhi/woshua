<template>
	<view class="box">
		<view class="box_list">
			<block v-for='(item,index) in activeList' :key='index'>
				<view class="barner" :style="'background-image: url('+imgUrl+item.image+')'" @click="tobuy(item.id)">
				</view>
			</block>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				activeList: [],
				giftshop_id:'',
				imgUrl: this.$common.baseUrl
			}
		},
		onLoad() {
			this._getactivity()
		},
		onBackPress(e) {
			if (e.from == 'backbutton') {
				uni.switchTab({
					url: '../index/index'
				})
				return true
			}
			if (e.from == 'navigateBack') {
				uni.switchTab({
					url: '../index/index'
				})
				return true
			}
		},
		methods: {
			// 获取礼包列表
			_getactivity() {
			this.$common.requests('/api/giftshop/get_giftshop_list').then(res => {
				if (res.data.code == 1) {
					this.activeList = res.data.data
				} else {
					console.log(res.data.msg)
					this.$api.msg(res.data.msg);
				}
			})
			},
			tobuy(id) {
				uni.removeStorageSync('choosezhifu')
				uni.setStorageSync('choosezhifu', id)
				var obj = {
					giftshop_id : id
				}
				console.log(obj)
				this.$common.requests('/api/Giftshop/is_kaiqi',obj).then(res => {
					if (res.data.code == 1) {
						uni.navigateTo({
							url: '../activity/bops?id=' + id + '&type=' + 2
						})
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			tobuys() {
				uni.navigateTo({
					url: '../activity/putongcai'
				})
			},
		},
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
	}

	.box_list {
		width: 100%;
		height: 1100rpx;
		overflow-y: scroll;

	}

	.barner {
		width: 92%;
		height: 23%;
		/* background-image: url(../../static/image/0002.png); */
		background-size: 100% 100%;
		background-repeat: no-repeat;
		overflow: hidden;
		margin: 20rpx 4%;
		border-radius: 20rpx;
		position: relative;
	}

	.barners {
		width: 92%;
		height: 23%;
		background-image: url(../../static/image/img_libao2@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		overflow: hidden;
		margin: 20rpx 4%;
		border-radius: 20rpx;
		position: relative;

	}

	.barner_center {
		width: 170rpx;
		line-height: 46rpx;
		font-size: 28rpx;
		letter-spacing: 2rpx;
		color: #EEE0FF;
		border-radius: 50rpx 50rpx;
		text-align: center;
		/* margin: 16rpx 0 0 30rpx; */
		position: absolute;
		bottom: 36rpx;
		left: 160rpx;
		background-color: #572DD9;
	}
</style>
