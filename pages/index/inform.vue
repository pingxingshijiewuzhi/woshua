<template>
	<view class="box">
		<!-- <view :style="{ height: statusBarHeight }" class="uni-status-bar">
			
		</view> -->
		<view class="borderbox"></view>
		<view class="myborder flexs3">
			<view @click='clickbtn(1)' class='border_left flexs' :class="{'chooseactive':currentIndex==1}">业务信息</view>
			<view @click='clickbtn(2)' class='border_left flexs' :class="{'chooseactive':currentIndex==2}">系统消息</view>
		</view>
		<view class="box_hight" v-show="currentIndex==1">
			<view class="list_box">
				<view class="box_list" v-for="(item,index) in noticeList" :key="index" @click="tolist(item.id)">
					<view class=" mt flexs1">
						<image class="list_img" src="../../static/image/icon_shxq_h_dx@2x.png" mode=""></image>
						<view class="list_first">{{item.title}}</view>
					</view>
					<view class="list_time  list_center">{{item.createtime}}</view>
					<view class="list_center">
						<!-- 您已成功到账，体现金融一个亿，你真是一个土豪，你可以吃大餐了，还是你准备怎么去花这笔钱。如果没有好的方法还是去烤火吧。 -->
						{{item.content}}
					</view>
				</view>
			</view>
		</view>
		<view class="box_hight" v-show="currentIndex==2">
			<view class="list_box">
				<view class="box_list" v-for="(item,index) in noticeList" :key="index" @click="toxitong(item.id)">
					<view class="flexs1 mt">
						<image class="list_img" src="../../static/image/icon_shxq_h_dx@2x.png" mode=""></image>
						<view class="list_first">{{item.title}}</view>
					</view>
					<view class="list_time  list_center">{{item.createtime}}</view>
					<!-- <view class="list_center mt">系统通知</view> -->
					<view class="list_center">
						<!-- 您已成功到账，体现金融一个亿，你真是一个土豪，你可以吃大餐了，还是你准备怎么去花这笔钱。如果没有好的方法还是去烤火吧。 -->
						{{item.content}}
					</view>
					<view class="list_border">
						<view class="list_right ">查看详情</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	export default {

		data() {
			return {
				currentIndex: 1, //1=业务消息,2=系统消息
				noticeList: [],
				page: 1,
				limit: 10,
				showLoadMore: false,
				statusBarHeight: statusBarHeight,
				page_yewu: 1, //业务消息页码
				page_xitong: 1 //系统消息页码
			}
		},
		onLoad() {
			this.get_notice_list();
		},
		onUnload() {
			this.noticeList = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onPullDownRefresh() {
			this.noticeList = [];
			this.page = 1;
			if (this.currentIndex == 1) {
				//业务消息
				this.page_yewu = 1;
			} else {
				//系统消息
				this.page_xitong = 1;
			}
			this.get_notice_list();
		},
		onReachBottom() { //监听上拉触底事件
			this.showLoadMore = true
			setTimeout(() => {
				//获取数据
				if (this.lisize == 10) { //
					if (this.currentIndex == 1) {
						//业务消息
						this.page_yewu++;
						this.page = this.page_yewu;
					} else {
						this.page_xitong++;
						this.page = this.page_xitong;
					}
					this.get_notice_list();
				} else {
					this.loadMoreText = "暂无更多";
					this.showLoadMore = false;
				}
			}, 1000);
		},
		// onReachBottom() {
		// 	this.page++;
		// 	this.get_notice_list();
		// },
		methods: {
			get_notice_list() {
				var obj = {
					status: this.currentIndex,
					page: this.page,
					limit: this.limit
				}
				this.$common.requests('/api/index/get_notice_list', obj).then(res => {
					if (res.data.code == 1) {
						this.lisize = res.data.data.length;
						if (this.lisize == 0) {
							this.$api.msg('暂无更多');
							return;
						}
						if (this.page == 1) {
							this.noticeList = res.data.data
						} else {
							this.noticeList = this.noticeList.concat(res.data.data);
							console.log(this.noticeList)
						}
						// this.noticeList = this.noticeList.concat(res.data.data);
						uni.stopPullDownRefresh();
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			clickbtn(index) {
				this.noticeList = []
				this.currentIndex = index
				if (this.currentIndex == 1) {
					//业务消息
					this.page_yewu = 1;
					this.page = this.page_yewu;
				} else {
					this.page_xitong = 1;
					this.page = this.page_xitong;
				}
				var obj = {
					status: this.currentIndex,
					page: this.page,
					limit: this.limit
				}
				this.$common.requests('/api/index/get_notice_list', obj).then(res => {
					if (res.data.code == 1) {
						this.noticeList = res.data.data
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			tolist(noticeid) {
				uni.navigateTo({
					url: '../index/xiangqing?index=' + noticeid
				})
			},
			toxitong(noticeid) {
				uni.navigateTo({
					url: '../index/tongzhi?index=' + noticeid
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 100vw;
		/* height: 100vh; */
		overflow-y: scroll;
		position: relative;
	}

	.uni-status-bar {
		width: 750rpx;
		height: var(--status-bar-height);
	}

	.box_list {
		width: 100%;
		// height: 200rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		// padding: 0 68rpx;
		padding-left: 68rpx;
		padding-bottom: 20rpx;
		color: #323232;
		font-size: 30rpx;
		line-height: 44rpx;
		position: relative;
		overflow: hidden;
	}

	.myborder {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 999;
		height: 80rpx;
		background-color: #FFFFFF;
	}

	.borderbox {
		width: 100%;
		height: 80rpx;
	}

	.mt {
		margin-top: 20rpx;
	}

	.border_left {
		width: 200rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		text-align: center;
	}

	.chooseactive {
		width: 200rpx;
		height: 80rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #94A6EA;
		border-bottom: solid 2rpx #5A7DF6;
	}

	.list_img {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		left: 24rpx;
		top: 26rpx;
	}

	.list_box {
		width: 100%;
	}

	.list_first {
		margin-right: 40rpx;
	}

	.list_time {
		letter-spacing: 2rpx;
		color: #6A6A6A;
		font-size: 24rpx;
	}

	.list_center {
		margin-top: 10rpx;
	}

	.list_border {
		width: 100vw;
		height: 50rpx;
		border-top: solid 1rpx #E5E5E5;
		padding-left: 0;
		position: absolute;
		left: 0;
	}

	.list_right {
		position: absolute;
		right: 30rpx;
		top: 20rpx;
	}

	.uni-loadmore {
		text-align: center;
	}
</style>
