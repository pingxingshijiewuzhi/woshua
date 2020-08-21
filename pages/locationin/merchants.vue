<template>
	<view class="box">
		<view class="big_list">
			<view class="list">
				<view class="four_box">
					<view class="four flexs2" v-for="(item,index) in dataList" :key="index" @click="tolist(item.id)">
						<view class="four_left flexs1">
							<image class="four_list" src="../../static/image/icon_d_sj@2x.png" mode=""></image>
							<view class="mle">
								<view class="">{{item.shops_introduction}}</view>
								<view class="four_time">{{item.createtime}}</view>
							</view>
						</view>
						<view class="four_money">待入网</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				limit: 10,
				dataList: []
			}
		},
		onLoad() {
			this.getData();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.dataList = [];
			this.getData();
		},
		onReachBottom() {
			this.page++;
			this.getData();
		},
		methods: {
			getData() {
				var obj = {
					page: this.page,
					limit: this.limit
				}
				this.$common.requests('/api/shops/get_step1_list', obj).then(res => {
					if (res.data.code == 1) {
						uni.stopPullDownRefresh();
						if (res.data.data.length == 0) {
							this.$api.msg('暂无更多');
							return;
						}
						this.dataList = this.dataList.concat(res.data.data);
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			tolist(shops_id) {
				uni.navigateTo({
					url: "../locationin/informationstep?shops_id=" + shops_id
				})
			}
		}
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.four_box {
		width: 100%;
		height: 1200rpx;
		overflow-y: scroll;
	}

	.four {
		width: 100%;
		height: 180rpx;
		padding: 0 4%;
		background-color: #FFFFFF;
		font-size: 32rpx;
		margin-top: 20rpx;
		position: relative;
	}

	.four_left {
		color: #626262;
	}

	.four_time {
		margin-top: 10rpx;
	}

	.four_list {
		width: 50rpx;
		height: 50rpx;
	}

	.four_money {
		position: absolute;
		top: 48rpx;
		right: 30rpx;
		color: #8AA2EB;
		font-size: 28rpx;
	}

	.mle {
		margin-left: 30rpx;
		margin-top: 0;
	}
</style>
