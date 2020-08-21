<template>
	<view class='changeplanes'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/0000.png" mode=""></image>
				<view class="mytabbar_text">换机更机</view>
				<view class=" mytabbar_right"></view>
			</view>
		</view>
		<view class='navtabbar'>
			<view class='basestyle' @click='choose(0)'>
				<view :class="{'active':currentIndex==0}">
					全部
				</view>
			</view>
			<view class='basestyle' @click='choose(1)'>
				<view :class="{'active':currentIndex==1}">
					等待接收
				</view>
			</view>
		</view>
		<block v-for='(item,index) in 3' :key='index'>
			<view class='mytimetitle'>2018-12</view>
			<view class='recodeitem' @click='godetail'>
				<view class='recodeitem_left'>
					<!-- <view class='left_title addblue'>确认换机</view> -->
					<!-- <view class='left_title addblue'>等待接收</view> -->
					<view class='left_title addblue'>已拒绝</view>
					<view class='left_time'>审批人:孙不凡</view>
				</view>
				<view class='recodeitem_right'>
					<view class='addmycolor'>
						<view class='addfontsize'>24</view> 台
					</view>
					<view class='right_num'>2019-09-05 15:30</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			choose(index) {
				this.currentIndex = index
			},
			// 换机申请详情
			godetail() {
				uni.navigateTo({
					url: 'huanjiresult'
				})
			}
		}
	}
</script>

<style>
	.changeplanes {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 120rpx;
		background-color: #5A7EF8;
		padding: 30rpx 20rpx;
	}

	.mytabbar_image {
		width: 40rpx;
		height: 34rpx;
	}

	.mytabbar_text {
		font-size: 38rpx;
		color: #FCFFFC;
	}

	.mytabbar_right {
		font-size: 28rpx;
		color: #DDE9F4;
	}

	.mytabbar_top {
		width: 100%;
		height: 100rpx;
	}

	.navtabbar {
		height: 90rpx;
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		margin-bottom: 30rpx;
	}

	.basestyle {
		/* flex-grow: 1; */
		height: 90rpx;
		width: 50%;
		text-align: center;
		line-height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.basestyle>view {
		width: 200rpx;
		height: 100%;
	}

	.active {
		color: #5D7DF4;
		border-bottom: 1rpx solid #5D7DF4;
	}


	/* 换机申请流水记录样式 */
	.mytimetitle {
		height: 82rpx;
		line-height: 82rpx;
		background-color: #FFFFFF;
		font-size: 34rpx;
		padding-left: 30rpx;
		border-bottom: 1rpx solid #E5E5E5;
	}

	.recodeitem {
		padding: 30rpx;
		background-color: #FFFFFF;
		height: 150rpx;
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.recodeitem_left {
		height: 90rpx;
		width: 400rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
	}

	.left_time {}

	.left_title {
		height: 36rpx;
		line-height: 36rpx;
		font-size: 30rpx;
		color: #5F84F6;
	}

	.recodeitem_right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		height: 90rpx;
		width: 300rpx;
		text-align: right;
	}

	.addmycolor {
		display: flex;
		width: 80rpx;
		justify-content: space-between;
		height: 36rpx;
		line-height: 36rpx;
		font-size: 30rpx;
	}

	.addfontsize {
		font-size: 34rpx;
	}
</style>
