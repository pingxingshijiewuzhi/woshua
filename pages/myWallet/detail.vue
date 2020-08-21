<template>
	<view class="box ">
		<view class="border flexs">
			<view class="border_img ">
				<view class="border_shou flexs">{{user.time}}</view>
				<view class="border_number flexs">￥{{user.money}}</view>
			</view>
		</view>
		<view class="bgc_"></view>
		<view class="mingx">
			<view class="ming_left">分润收入明细</view>
		</view>
		<view class="box_list">
			<view class="list  flexs2" :class="{'lists' :item.color==2}" v-for="(item,index) in users" :key="index">
				<view class="list_left">{{item.name}}</view>
				<view class="list_right">{{item.value}}</view>
			</view>
		</view>
		<view class='nothing'>
			
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id: '',
				user:'',
				users:'',
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getdata()
		},
		methods: {
			getdata() {
				console.log(this.id)
				let obj = {
					water_id: this.id
				}
				this.$common.requests('/api/money/get_jiesuan_mingxi', obj).then(res => {
					if (res.data.code == 1) {
						this.user = res.data.data.data
						this.users = res.data.data.list
						console.log(this.users)
					} else {
						// console.log(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background-color: #FFFFFF;
	}

	.box {
		width: 100vw;
	}

	.border {
		width: 100%;
		height: 460rpx;
	}

	.border_img {
		width: 380rpx;
		height: 380rpx;
		background-image: url(../../static/image/img_wdzd_yuan@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.border_shou {
		font-size: 28rpx;
		color: #B4B4B4;
		margin-top: 130rpx;
	}

	.border_number {
		font-size: 34rpx;
		margin-top: 20rpx;
		color: #363636;
	}

	.mingx {
		width: 100%;
		height: 70rpx;
		border-bottom: solid 1rpx #E5E5E5;
		padding: 0 20rpx;
		margin-top: 20rpx;
		color: #595959;
	}

	.bgc_ {
		width: 100%;
		height: 20rpx;
		background-color: #F2F2F2;
	}

	.box_list {
		width: 100%;
		height: 800rpx;
		margin-bottom: 100rpx;
	}

	.ming_left {
		line-height: 36rpx;
		border-left: solid 4rpx #5D7EEF;
		padding-left: 20rpx;
		font-size: 32rpx;
		font-weight: 600;
		letter-spacing: 2rpx;
	}

	.list {
		width: 100%;
		height: 60rpx;
		padding: 0 20rpx;
	}
	.lists {
		width: 100%;
		height: 60rpx;
		padding: 0 20rpx;
		color: #637CF0;
	}
	.nothing{
		height:100rpx;
		width:100%;
	}
</style>
