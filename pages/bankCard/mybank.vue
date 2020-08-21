<template>
	<view class="box">
		<view class="border flexs1">
			<image class="border_next" src="../../static/pic/001.png" mode=""></image>
			<input type="text" placeholder="搜索" />
		</view>
		<view class="big_ran">
			<view class="ran" @click="getid(id)" v-for="(item,index) in user" :key="index">{{item.name}}</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				user: '',
				id: '',
			}
		},
		onLoad() {
			this.getdata()

		},
		methods: {
			getdata() {
				this.$common.requests('/api/Datacount/get_bank_list').then(res => {
					if (res.data.code == 1) {
						this.user = res.data.data;
						console.log(this.user)
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			getid() {

			}
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
		background-color: #FFFFFF;
	}

	.border {
		width: 94%;
		height: 80rpx;
		background-color: #E5E5E5;
		border-radius: 50rpx 50rpx;
		margin: 30rpx 3% 10rpx 3%;

	}

	.border_next {
		width: 26rpx;
		height: 36rpx;
		margin-left: 50rpx;
		margin-right: 30rpx;
	}

	.big_ran {
		width: 100%;
		height: 1080rpx;
		overflow-y: scroll;
	}

	.ran {
		width: 94%;
		line-height: 100rpx;
		margin: 0 3%;
		border-bottom: solid 1rpx #E5E5E5;
		color: #4F4F4F;
	}
</style>
