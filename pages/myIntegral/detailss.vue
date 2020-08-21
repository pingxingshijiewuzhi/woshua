<template>
	<view class="box">
		<view class="border ">
			<view class=" border_number flexs">+100</view>
			<view class=" border_jihuo flexs">激活机具</view>
		</view>
		<view class="center">
			<view class="center_list mt flexs2">
				<view class="">收入喔积分</view>
				<view class="">120(通用积分)</view>
			</view>
			<view class="center_list  flexs2">
				<view class="">新机编号</view>
				<view class="">2121212121</view>
			</view>
			<view class="center_list  flexs2">
				<view class="">创建时间</view>
				<view class="">2121-2-1 21:21:21</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
	}

	.border {
		width: 100%;
		height: 280rpx;
		overflow: hidden;
		border-bottom: solid 1rpx #E5E5E5;
	}

	.border_number {
		width: 100%;
		height: 100rpx;
		margin-top: 80rpx;
		font-size: 48rpx;
		font-size: 600;
		color: #EC2726;
	}

	.border_jihuo {
		width: 100%;
		height: 100rpx;
		color: #7683E0;
		font-size: 34rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
		letter-spacing: 4rpx;
	}

	.center_list {
		width: 100%;
		height: 80rpx;
		padding: 0 30rpx;
		font-size: 32rpx;
		color: #383838;
	}

	.mt {
		margin-top: 20rpx;
	}
</style>
