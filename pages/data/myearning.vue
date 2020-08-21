<template>
	<view class='myearning'>
		<block v-for='(item,index) in incomeList' :key='index'>
			<view class='earning_item'>
				<view class='earning_item_date'>
					{{item.createtime}}
				</view>
				<view class='earningcount'>结算收益 (元)</view>
				<view class='mynum text-bold'>
					{{item.jiesuan}}
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				incomeList: [],
				page: 1,
				limit: 10

			}
		},
		onLoad() {
			this.get_incomeList();
		},
		onPullDownRefresh() {
			this.incomeList = []
			this.page = 1
			this.get_incomeList()
		},
		onReachBottom() {
			console.log(555)
			this.page++;
			this.get_incomeList()
		},
		methods: {
			get_incomeList() {
				let obj = {
					page: this.page,
					limit: this.limit
				}
				this.$common.requests('/api/Datacount/get_my_income', obj).then(res => {
					if (res.data.code == 1) {
						uni.stopPullDownRefresh()
						console.log(res.data.data);
						if (res.data.data.length == 0) {
							this.$api.msg('暂无更多数据')
						}
						if (this.page == 1) {
							this.incomeList = res.data.data;
						} else {
							this.incomeList = this.incomeList.concat(res.data.data);
						}
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			}

		}
	}
</script>

<style scoped>
	.myearning {
		background-color: #F2F2F2;
		width: 100vw;
		/* height:100vh; */
		padding-top: 30rpx;
		overflow-y: scroll;
	}


	.earning_item {
		margin-bottom: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		padding: 40rpx 30rpx 80rpx 30rpx;
		height: 320rpx;
		/* width:100%; */
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.earning_item_date {
		width: 160rpx;
		height: 50rpx;
		line-height: 50rpx;
		background-color: #EAA90F;
		color: #FFFFFF;
		text-align: center;
		border-radius: 50rpx;
	}
	.earningcount{
		width:100%;
		padding-top: 30rpx;
		height:120rpx;
		line-height: 90rpx;
		/* border:1rpx solid red; */
		text-align:center;
	}
	.mynum {
		width: 630rpx;
		height: 80rpx;
		display: flex;
		color: #333333;
		font-size: 58rpx;
		justify-content: center;
		align-items: center;
	}
</style>
