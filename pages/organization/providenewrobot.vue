<template>
	<view class='providenewrobot'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/0000.png" mode=""></image>
				<view class="mytabbar_text">发放新机</view>
				<view class=" mytabbar_right"></view>
			</view>
			<view class='searchbox'>
				<image src="../../static/pic/search.png" mode="" class='searchimg'></image>
				<input class='myinput' type="text" placeholder-style='color:#ffffff;font-size:28rpx;letter-spacing:4rpx;'
				 placeholder="请输入机身号">
				<image src="../../static/pic/saoyisao.png" mode="" class='saoyisao'></image>
			</view>
		</view>
		<view class='content_topbox'>
			<view class='topbox_left'>需要放数量5台</view>
			<view class='topbox_right'>
				<view>
					<image class='mysortimg' src="../../static/pic/up_hui.png" mode=""></image>
					<image class='mysortimg' src="../../static/pic/down_lan.png" mode=""></image>
				</view>
				<image src="../../static/pic/sort.png" mode=""></image>
			</view>
		</view>
		<view class='bigcontent_box'>
			<view class='orderbox_content'>
				<view class='topbox_left'>
					机身编号
				</view>
				<view>操作</view>
			</view>
			<block v-for='(item,index) in 2' :key='index'>
				<view class='orderbox_content'>
					<view class='topbox_left'>
						<view>21111222222</view>
						<view class='addyellow'>5151</view>
						<!-- <view class='copybox'>复制</view> -->
						<view class='nocopybox'></view>
					</view>
					<image class='addnum' src="../../static/pic/jia.png" mode=""></image>
				</view>
			</block>
		</view>
		<view class='bottom_box'>
			<view class='abbox'>0</view>
			<view class='bottom_box_left'>批量选中</view>
			<view class='bottom_box_right'>下发</view>
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
			},
		}
	}
</script>

<style>
	.providenewrobot {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
		position: relative;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 270rpx;
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

	.searchbox {
		margin: 0 auto;
		width: 690rpx;
		height: 60rpx;
		background-color: #8CA4FA;
		border-radius: 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40rpx;
	}

	.myinput {
		height: 100%;
		margin-left: 20rpx;
		width: 540rpx;
		/* border:1rpx solid red; */
		color: #FFFFFF;
	}

	/* input::-webkit-input-placeholder { color: red;}
	 input:-moz-placeholder { color: red;}
	 input:-ms-input-placeholder { color: red;}​ */
	.searchimg,
	.saoyisao {
		width: 30rpx;
		height: 30rpx;
	}

	.bigcontent_box {
		/* 270rpx  100rpx;  120rpx*/
		height: calc(100vh - 490rpx);
		background-color: #FFFFFF;
		/* border:1rpx solid red; */
	}

	.content_topbox {
		width: 100%;
		padding: 0 30rpx;
		height: 90rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.orderbox_content {
		background-color: #FFFFFF;
		border: 1rpx solid #E5E5E5;
		height: 90rpx;
		padding: 15rpx 0;
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.topbox_left {
		width: 420rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.topbox_right {
		width: 90rpx;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.topbox_right>view {
		/* width:24rpx; */
		width: 34rpx;
		height: 28rpx;
		display: flex;
		justify-content: space-between;
	}

	.mysortimg {
		width: 12rpx;
		height: 28rpx;
	}

	.topbox_right>image {
		width: 24rpx;
		height: 28rpx;
	}

	.addyellow {
		color: #DAAE4F;
	}

	.copybox {
		border: 1rpx solid #E5E5E5;
		color: #9A9A9A;
		width: 80rpx;
		text-align: center;
		height: 32rpx;
		line-height: 32rpx;
	}

	.nocopybox {
		height: 32rpx;
		width: 80rpx;
	}

	.addnum {
		width: 32rpx;
		height: 32rpx;
	}

	.bottom_box {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		display: flex;
		box-shadow: 0rpx 1rpx 2rpx 1rpx rgba(0, 0, 0, 0.3);
	}

	.abbox {
		height: 84rpx;
		line-height: 84rpx;
		text-align: center;
		width: 84rpx;
		background-color: #FFFFFF;
		position: absolute;
		top: -30rpx;
		left: 30rpx;
		border-radius: 50%;
		box-shadow: 0rpx 0rpx 2rpx 1rpx rgba(0, 0, 0, 0.3);
	}

	.bottom_box_left {
		width: 75%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #FFFFFF;
		color: #989898;
		padding-right: 20rpx;
		text-align: end;
	}

	.bottom_box_right {
		height: 100rpx;
		line-height: 100rpx;
		width: 25%;
		text-align: center;
		background-color: #D4D4D4;
		color: #FFFFFF;
	}
</style>
