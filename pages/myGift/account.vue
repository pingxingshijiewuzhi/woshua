<template>
	<view class="box">
		<!-- 状态 -->
		<view class="big_box">
			<view class="list flexs2">
				<view>户名</view>
				<view>{{accountobj.username}}</view>
			</view>
			<view class="list flexs2" style="border-bottom:none">
				<view>账户</view>
				<view>{{accountobj.idnum}}</view>
			</view>
		</view>
		<view class="button flexs1">
			<view class="button_left" @click='copyname'>复制账号</view>
			<view class='button_center' @click='alreadypay'>我已付款</view>
			<view class="button_right" @click='copyaccount'>复制户名</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				accountobj: {},
				orderid:''
			}
		},
		onLoad(option) {
			this.orderid = option.id
			this._getAccount()
		},
		methods: {
			// 我已付款
			alreadypay(){
				let obj = {
					order_id:this.orderid
				}
				this.$common.requests('/api/giftorder/payedOk',obj).then(res=>{
					this.$api.msg(res.data.msg)
				})
			},
			_getAccount() {
				this.$common.requests('/api/Giftorder/get_offline').then(res => {
					if (res.data.code == 1) {
						this.accountobj = res.data.data
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			copyname() {
				uni.setClipboardData({
					data: this.accountobj.username,
					success: () => {
						uni.showToast({
							title: '复制成功'
						})
					}
				})
			},
			copyaccount() {
				console.log(1)
				uni.setClipboardData({
					data: this.accountobj.idnum,
					success: () => {
						uni.showToast({
							title: '复制成功'
						})
					}
				})
			}
		},
	}
</script>

<style>
	.box {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.big_box {
		width: 100%;
		height: 15%;
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		color: #333333;
	}

	.list {
		width: 100%;
		height: 50%;
		border-bottom: 1px solid #E5E5E5
	}

	.button {
		width: 100%;
		line-height: 100rpx;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
		font-size: 32rpx;
	}

	.button_left {
		width: 33%;
		height: 100rpx;
		background-color: #FFFFFF;
		color: #333333;
	}
	.button_center{
		width: 33%;
		height: 100rpx;
		background-color: #000000;
	}
	.button_right {
		width: 33%;
		height: 100rpx;
		background-color: #5880FA;
	}
</style>
