<template>
	<view class='billdetail'>
		<view class='mytitle'>
			<view class='transactionmoney'>{{data.money}}</view>
			<view class='transactionstatus'>{{data.status}}</view>
		</view>
		<block v-for='(item,index) in list' :key='index'>
			<view class='common_style'>
				<view class='ilove'>{{item.name}}</view>
				<view class='ningshuang'>{{item.value}}</view>
			</view>
		</block>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				billid: '',
				data: {},
				list: []
			}
		},
		onLoad(option) {
			this.billid = option.billid
			this._getbilldetail()
		},
		methods: {
			_getbilldetail() {
				let obj = {
					water_id: this.billid
				}
				this.$common.requests('/api/Money/get_money_detail', obj).then(res => {
					if (res.data.code == 1) {
						this.data = res.data.data.data
						this.list = res.data.data.list
					} else {

						this.$api.msg(res.data.msg);
					}
				})
			}
		}
	}
</script>

<style scoped>
	.billdetail {
		/* height:100vh; */
		width: 100vw;
		background-color: #FFFFFF;
		overflow-y: scroll;
	}

	.mytitle {
		height: 274rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-bottom: 1rpx solid #F2F2F2;
	}

	.transactionmoney {
		color: #5F7EFB;
		font-size: 58rpx;
		height: 100rpx;
		line-height: 100rpx;
		width: 300rpx;
		text-align: center;
	}

	.transactionstatus {
		width: 300rpx;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.common_style {
		height: 130rpx;
		width: 100%;
		padding: 0 26rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #F2F2F2;
		align-items: center;
	}

	.ilove {
		height: 80rpx;
		line-height: 80rpx;
		width: 160rpx;
		letter-spacing: 4rpx;
		font-size: 32rpx;
	}

	.ningshuang {
		width: 410rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: end;
		letter-spacing: 4rpx;
	}

	.ningshuango {
		font-size: 32rpx;
		width: 410rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: end;
		letter-spacing: 4rpx;
	}

	.ningshuango image {
		width: 20rpx;
		height: 26rpx;
		margin-left: 14rpx;
	}
</style>
