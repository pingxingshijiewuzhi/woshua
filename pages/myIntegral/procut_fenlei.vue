<template>
	<view class="box">
		<view class="box_list">
			<block v-for='(item,index) in activeList' :key='index'>
				<view class="list_name">{{item.name}}</view>
				<view class="barner" @click="tobuy(item.id)" :style="'background-image: url('+imgUrl+item.image+')'">
					<!-- <view class="barner_center ">查看详情</view> -->
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
				imgUrl: this.$common.baseUrl,
				chooseid: ''
			}
		},
		onLoad() {
			this.getactivity()
		},
		beforeDestroy() {
			this.bus.$emit('integralcategory',this.chooseid)
		},
		methods: {
			tobuy(id) {
				// this.nextTick(()=>{
				// 	this.bus.$emit('integralcategory',id)
				// })
				// uni.$emit('update',{msg:id})
				this.chooseid = id
				uni.setStorageSync('chooseintegral', '')
				uni.setStorageSync('chooseintegral', id)
				uni.navigateTo({
					url: '../myIntegral/procudtLieb?id=' + id
				})
			},
			// 获取礼包列表
			getactivity() {
				this.$common.requests('/api/integral/get_integral_type').then(res => {
					if (res.data.code == 1) {
						this.activeList = res.data.data

					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
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
		background-color: #FFFFFF
	}

	.box_list {
		width: 100%;
		height: 1100rpx;
		overflow-y: scroll;

	}

	.barner {
		width: 92%;
		height: 264rpx;
		/* background-image: url(../../static/image/0002.png); */
		background-size: 100% 100%;
		background-repeat: no-repeat;
		overflow: hidden;
		margin: 20rpx 4%;
		border-radius: 20rpx;
		position: relative;
		box-shadow: 2px 2px 12px rgba(0, 0, 0, .1);
	}

	.list_name {
		line-height: 60rpx;
		font-size: 32rpx;
		padding-left: 30rpx;
	}

	.barner_center {
		width: 170rpx;
		line-height: 46rpx;
		font-size: 28rpx;
		letter-spacing: 2rpx;
		color: #EEE0FF;
		border-radius: 50rpx 50rpx;
		text-align: center;

		position: absolute;
		bottom: 36rpx;
		left: 160rpx;
		background-color: #572DD9;
	}
</style>
