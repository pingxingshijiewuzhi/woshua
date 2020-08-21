<template>
	<view class="databox">
		<view class='header'>
			<view class='header_item' @click='goinvoice'>
				<image class="head_imagea" src="../../static/dataimage/icon_h_fpzs@2x.png" mode=""></image>
				<view>发票专区</view>
			</view>
			<view class='header_item' @click='gomyearnings'>
				<image class="head_imageb" src="../../static/dataimage/icon_h_wdsy@2x.png" mode=""></image>
				<view>e收益</view>
			</view>
			<view class='header_item' @click='gomybill'>
				<image class="head_imagec" src="../../static/dataimage/icon_h_wdzd@2x.png" mode=""></image>
				<view>e账单</view>
			</view>
		</view>
		<view class='content'>
			<view class='content_item' @click='togeren'>
				<view class='mytitle'>
					<view class='mytype  addbgredcolor'>个人业绩</view>
					<view class="mytypes">本月直营商户交易额(元)</view>
				</view>
				<view class='mynum text-bold'>
					{{my.money_count}}
				</view>
				<view class='mybottom'>
					<view class='mybottom_item '>本月新增商户 <text class='addfontsize'>{{my.month_shop_num}}</text> (户)</view>
					<view class='mybottom_item'>累计商户 <text class='addfontsize'>{{my.count_shop_num}}</text> (户)</view>
				</view>
			</view>

			<view class='content_item' @click='tohuoban'>
				<view class='mytitle'>
					<view class='mytype  addbgyellowcolor'>代理业绩</view>
					<view class="mytypes">本月代理商户交易额(元)</view>
				</view>
				<view class='mynum text-bold'>
					{{friends.money_count}}
				</view>
				<view class='mybottom'>
					<view class='mybottom_item'>本月新增商户 <text class='addfontsize'>{{friends.month_shop_num}}</text> (户)</view>
					<view class='mybottom_item'>累计商户 <text class='addfontsize'>{{friends.count_shop_num}}</text> (户)</view>
				</view>
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
				my: {},
				friends: {}
			}
		},
		onShow() {
			this._getdata()
		},
		methods: {
			_getdata() {
				this.$common.requests('/api/datacount/get_datacount').then(res => {
					if (res.data.code == 1) {
						this.my = res.data.data.my
						this.friends = res.data.data.friends
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			// 跳转发票助手
			goinvoice() {
				uni.navigateTo({
					url: 'invoiceAssistant'
				})
			},
			// 跳转我的收益
			gomyearnings() {
				uni.navigateTo({
					url: 'myearning'
				})
			},
			// 跳转我的账单
			gomybill() {
				uni.navigateTo({
					url: '../myWallet/bill'
				})
				// uni.navigateTo({
				// 	url:'mybill'
				// })
			},
			// 个人业绩
			togeren() {
				uni.navigateTo({
					url: 'performance'
				})
			},
			// 代理业绩
			tohuoban() {
				uni.navigateTo({
					url: 'partnerperformance'
				})
			},
			gomybillfellows() {
				uni.navigateTo({
					url: 'partnerperformance'
				})
			}
		}
	}
</script>

<style scoped>
	.databox {
		height: 100vh;
		width: 100vw;
		position: relative;
	}

	.head_imagea {
		width: 54rpx;
		height: 52rpx;
	}

	.head_imageb {
		width: 56rpx;
		height: 54rpx;
	}

	.head_imagec {
		width: 48rpx;
		height: 54rpx;
	}

	.header {
		height: 340rpx;
		width: 100%;
		background: url(../../static/image/8888.png);
		background-repeat: no-repeat;
		background-position: (100% 100%);
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.header_item {
		width: 120rpx;
		height: 120rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		color: #FFFFFF;
	}



	.nothing {
		height: calc(100vh - 340rpx);
		width: 100%;
		background-color: #F2F2F2;
	}

	.content {
		width: 700rpx;
		position: absolute;
		top: 290rpx;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgba(0, 0, 0, 0)
	}

	.content_item {
		height: 320rpx;
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.mytitle {
		padding-top: 30rpx;
		height: 72rpx;
		width: 630rpx;
		display: flex;
		color: #999999;
	}

	.mytype {
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 20rpx;
		color: #FFFFFF;
		text-align: center;
		margin-right: 20rpx;
	}

	.mytypes {
		line-height: 50rpx;
	}

	.addbgredcolor {
		background-color: #EC4847;
	}

	.addbgyellowcolor {
		background-color: #EAA90F;
	}

	.mynum {
		width: 630rpx;
		height: 160rpx;
		display: flex;
		color: #5680F3;
		font-size: 58rpx;
		justify-content: center;
		align-items: center;
	}

	.mybottom {
		width: 630rpx;
		height: 40rpx;
		display: flex;
		justify-content: space-around;
	}

	.mybottom_item {
		width: 280rpx;
		line-height: 40rpx;
		text-align: center;
		color: #545454;
	}

	.addfontsize {
		font-size: 30rpx;
		padding: 0 10rpx;
	}
</style>
