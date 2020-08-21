<template>
	<view class='performance'>
		<view class='mytabbar'>
			<view>
				<view class='basestyle' :class="{'choosetitle':currentIndex == 0}" @click='choose(0)'>日维度</view>
			</view>
			<view>
				<view class='basestyle' :class="{'choosetitle':currentIndex == 1}" @click='choose(1)'>月维度</view>
			</view>
		</view>
		<block v-for='(item,index) in dataList' :key='index'>
			<view class="performance_item">
				<view class='performance_item_left'>
					<view class='timescreen'>{{item.time}}</view>
				</view>
				<view class='performance_item_right'>
					<view class='topbox'>
						<block v-for="(item1,index1,) in item.list" :key='index1'>
							<view class='topbox_item' v-if='index1<item.back'>
								<view class='topbox_item_opacity'>{{item1.name}}</view>
								<view class='topbox_item_num'>{{item1.value}}</view>
							</view>
							<view class='topbox_items' v-if='index1 >=item.back'>
								<view class='topbox_item_opacity'>{{item1.name}}</view>
								<view class='topbox_item_num'>{{item1.value}}</view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				page: 1,
				limit: 3,
				type: 1, //1日维度,2=月维度
				page1: 1, //日维度页码
				page2: 1, //月维度页码
				dataList: [], //数据记录
			}
		},
		onLoad() {
			this.getMyData();
		},
		onPullDownRefresh() {
			if (this.type == 1) {
				this.page1 = 1;
				this.page = this.page1;
				this.dataList = [];
			} else {
				this.page2 = 1;
				this.page = this.page2;
				this.dataList = [];
			}
			this.getMyData();
		},
		onReachBottom() {
			if (this.type == 1) {
				this.page1++;
				this.page = this.page1;
			} else {
				this.page2++;
				this.page = this.page2;
			}
			this.getMyData();
		},
		methods: {
			getMyData() {
				var obj = {
					page: this.page,
					limit: this.limit,
					type: this.type
				}
				this.$common.requests('/api/Datacount/get_my_weidu', obj).then(res => {
					if (res.data.code == 1) {
						uni.stopPullDownRefresh();
						if (res.data.data.length == 0) {
							this.$api.msg('暂无更多');
							return;
						}
						this.dataList = this.dataList.concat(res.data.data);
						console.log(this.dataList, )

					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			choose(index) {
				this.currentIndex = index;
				this.type = index + 1;
				this.page = 1;
				this.page1 = 1;
				this.page2 = 1;
				this.dataList = [];
				this.getMyData();
			}
		}
	}
</script>

<style scoped>
	.performance {
		height: 100vh;
		width: 100vw;
		background-color: #F2F2F2;
	}

	.mytabbar {
		height: 92rpx;
		width: 100%;
		display: flex;
		background-color: #FFFFFF;
	}

	.mytabbar>view {
		width: 50%;
		height: 92rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.basestyle {
		height: 92rpx;
		line-height: 92rpx;
		width: 200rpx;
		font-size: 32rpx;
		letter-spacing: 4rpx;
		text-align: center;
	}

	.choosetitle {
		color: #5E80FB;
		border-bottom: 1rpx solid #5E80FB;
	}

	.performance_item {
		margin-top: 30rpx;
		padding: 10rpx 30rpx;
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
	}

	.performance_item_left {
		align-self: stretch;
		width: 176rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.timescreen {
		width: 200rpx;
		height: 220rpx;
		line-height: 220rpx;
		text-align: center;
		/* padding-right: 20rpx; */
		border-right: 1rpx solid #E5E5E5;
	}

	.performance_item_right {
		padding-left: 30rpx;
		flex-grow: 1;
	}

	.topbox_item {
		height: 60rpx;
		width: 460rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 13rpx;
		padding-bottom: 13rpx;
	}

	.topbox_items {
		height: 60rpx;
		width: 460rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* color: #9F9F9F; */
		/* padding: 13rpx 0 13rpx 20rpx; */
	}

	.bottombox_item {
		height: 50rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 4rpx;
		padding-bottom: 4rpx;
	}

	.topbox_item_opacity {
		width: 230rpx;
	}

	.topbox_item_num {
		width: 190rpx;
		text-align: end;
	}

	.bottombox {
		color: #9B9B9B;
		width: 100%;
		padding-left: 20rpx;
	}
</style>
