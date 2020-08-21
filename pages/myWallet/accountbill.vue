<template>
	<view class="box">
		<view class="border">
			<view class="border_number flexs">{{user.money}}</view>
			<view class="border_jine flexs">{{user.status}}</view>
		</view>
		<view class="box_list">

		</view>
		<view class="time flexs2" v-for="(item,index) in users" :key="index">
			<view class="">{{item.name}}</view>
			<view class="">{{item.value}}</view>
		</view>
		<view class="time flexs2">
			<view class="">分润明细</view>
			<view class="flexs1" @click="tomingxi(id)">
				<view class="">查看</view>
				<image class="time_next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				user: [],
				users: [],
			}
		},
		onLoad(option) {
			this.id = option.billid
			this.getdata()
		},
		methods: {
			tomingxi(id) {
				uni.navigateTo({
					url: "../myWallet/detail?id=" + id,
				})
			},
			getdata() {
				let obj = {
					water_id: this.id
				}
				this.$common.requests('/api/Money/get_money_detail', obj).then(res => {
					if (res.data.code == 1) {
						this.user = res.data.data.data
						this.users = res.data.data.list
						console.log(this.user)
						console.log(this.users, 11)
					} else {
						// console.log(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style>
	.box {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.border {
		width: 100%;
		height: 256rpx;
		padding-top: 30rpx;
		border-bottom: solid 1rpx #E5E5E5;
	}

	.border_number {
		font-size: 32px;
		color: #577FFA;
		margin-top: 40rpx;
	}

	.border_jine {
		font-size: 30rpx;
		color: #595959;
		margin-top: 22rpx;
	}

	.time {
		width: 100%;
		height: 120rpx;
		font-size: 30rpx;
		border-bottom: solid 1rpx #E5E5E5;
		padding: 0 20rpx;
	}

	.time_next {
		width: 16rpx;
		height: 30rpx;
		margin-left: 20rpx;
	}
</style>
