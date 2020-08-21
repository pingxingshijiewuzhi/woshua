<template>
	<view class="box">
		<view class="big_boxs">
			<view class="" v-for="(item,index) in 4" :key="index">
				<view class="text">无法正常作业</view>
				<view class=" big_list ">
					<view class="list" v-for="(item,index) in 4" :key="index">蓝牙无法连接</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {


		},
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
		overflow: hidden;
		padding: 0 30rpx;
	}

	.big_boxs {
		width: 100%;
		height: 960rpx;
		overflow-y: scroll;
	}

	.text {
		width: 100%;
		line-height: 120rpx;
		font-size: 34rpx;
	}

	.list {
		line-height: 80rpx;
		background-color: #EAEAEA;
		border: solid 1rpx #E5E5E5;
		text-align: center;
		flex-wrap: wrap;
		padding: 0 20rpx;
		border-radius: 10rpx;
		display: inline-block;
		margin-right: 26rpx;
	}

	.list:nth-child(odd) {
		margin-bottom: 30rpx;
	}
</style>
