<template>
	<view class='jiebangresult'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/btn_h_fanhui@2x.png" mode=""></image>
				<view class="mytabbar_text">解绑</view>
				<view class=" mytabbar_right"></view>
			</view>
		</view>
		<view class='jiebangresult_header'>
			<view class='imgbox'>
				<image src="../../static/pic/icon_d_ddhs@2x.png" mode=""></image>
			</view>
			<view class='opacitytitle'>待审批</view>
		</view>
		<!-- 		<view class='jiebangresult_header'>
			<view class='imgbox'>
				<image src="../../static/pic/icon_d_cg@2x.png" mode=""></image>
			</view>
			<view class='opacitytitleooo'>已解绑</view>
		</view> -->
		<view class='jiebangresult_content'>
			<view class='contetn_item'>
				<view class='item_left'>机具台数</view>
				<view class='item_right'>15</view>
			</view>
		</view>
		<view class='jiebangresult_content'>
			<view class='contetn_item'>
				<view class='item_left'>新机编号</view>
				<view class='item_right'>15555554464</view>
			</view>
		</view>
		<view class='jiebangresult_content'>
			<view class='contetn_item'>
				<view class='item_left'>申请人</view>
				<view class='item_right_flex'>
					<view>孙不凡</view>
					<image src="../../static/image/icon_h_dianhua@2x.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class='jiebangresult_content'>
			<view class='contetn_item'>
				<view class='item_left'>创建时间</view>
				<view class='item_right'>2018-12-22 13:13:14</view>
			</view>
		</view>
		<view class='jiebangresult_content'>
			<view class='contetn_item'>
				<view class='item_left'>原因</view>
				<view class='item_right'>人为损坏</view>
			</view>
		</view>

		<!-- 等待回收显示按钮 -->
		<view class='bottombtn'>
			<view class='sayno'>拒绝</view>
			<view class='sayture'>确认回收</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped>
	.jiebangresult {
		width: 100vw;
		height: 100vh;
		/* background-color:#F2F2F2; */
		background-color: #FFFFFF;
		position: relative;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 120rpx;
		padding: 30rpx 20rpx;
	}

	.mytabbar_image {
		width: 40rpx;
		height: 34rpx;
	}

	.mytabbar_text {
		font-size: 38rpx;
	}

	.mytabbar_right {
		font-size: 28rpx;
	}

	.mytabbar_top {
		width: 100%;
		height: 100rpx;
	}

	.jiebangresult_header {
		height: 270rpx;
		width: 100%;
		border-bottom: 1rpx solid #E5E5E5;
		border-top: 1rpx solid #E5E5E5;
	}

	.imgbox {
		height: 180rpx;
		width: 100%;
		padding-top: 50rpx;
		padding-bottom: 30rpx;
		display: flex;
		justify-content: center;
	}

	.imgbox image {
		width: 100rpx;
		height: 100rpx;
	}

	.opacitytitle {
		height: 40rpx;
		line-height: 40rpx;
		width: 100%;
		text-align: center;
		color: #F0AC4B;
	}

	/* 拒绝通过和确认审核颜色 */
	.opacitytitleooo {
		height: 40rpx;
		line-height: 40rpx;
		width: 100%;
		text-align: center;
		color: #90A6FB;
	}

	.jiebangresult_content {
		padding: 0 30rpx;
		padding-top: 20rpx;
		width: 100%;
	}

	.contetn_item {
		height: 80rpx;
		padding: 20rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item_left {
		width: 140rpx;
		height: 40rpx;
		line-height: 40rpx;
	}

	.item_right {
		line-height: 40rpx;
		height: 40rpx;
		width: 390rpx;
		text-align: end;
	}

	.item_right_flex {
		height: 40rpx;
		width: 180rpx;
		/* border:1rpx solid red; */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item_right_flex image {
		height: 30rpx;
		width: 30rpx;
	}

	.item_right_flex>view {
		width: 120rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
	}

	/* 底部按钮 */
	.bottombtn {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100rpx;
		display: flex;
	}

	.sayno {
		width: 50%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #FFFFFF;
		text-align: center;
	}

	.sayture {
		text-align: center;
		width: 50%;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
		background-color: #5A7EF8;
	}
</style>
