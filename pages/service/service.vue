<template>
	<view class="box">
		<view class="big_list">
			<block v-for='(item,index) in serverlist' :key='index'>
				<view class="list" @click="totijiao(item.id)">
					<view class="list_mt">{{item.question}}</view>
					<view class="">{{item.answer}}</view>
					<view class="list_time">{{item.createtime}}</view>
					<image class="list_image" src="../../static/image/icon_d_zt_ycl@2x.png" mode="" v-show="item.status==2"></image>
					<image class="list_image" src="../../static/image/icon_d_zt_clz@2x.png" mode="" v-show="item.status==1"></image>
				</view>
			</block>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			<!-- <view class="mybutton"></view> -->
		</view>
		<view class="button flexs" @click="tocenter">提交工单</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				limit: 10,
				lisize: 0, //本次加载数量
				loadMoreText: "加载中...",
				showLoadMore: false,
				imgUrl: this.$common.baseUrl,
				serverlist: []
			}
		},
		onShow() {
			this._getserverlist()
		},
		onUnload() {
			this.serverlist = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onPullDownRefresh() { //监听下拉刷新动作
			this.page = 1;
			this._getserverlist();
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onReachBottom() { //监听上拉触底事件
			console.log(8888)
			this.showLoadMore = true
			setTimeout(() => {
				//获取数据
				if (this.lisize == 10) { //
					this.page++;
					this._getserverlist();
				} else {
					this.loadMoreText = "暂无更多";
					this.showLoadMore = false;
				}
			}, 1000);
		},
		methods: {
			_getserverlist() {
				let myobj = {
					page: this.page,
					limit: this.limit
				}
				this.$common.requests('/api/Service/get_service_list', myobj).then(res => {
					if (res.data.code == 1) {
						this.lisize = res.data.data.length;
						if (this.lisize == 0 && this.serverlist == []) return;
						if (this.page == 1) {
							this.serverlist = res.data.data
						} else {
							this.serverlist = this.serverlist.concat(res.data.data);
							console.log(this.serverlist)
						}
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			totijiao(id) {
				uni.navigateTo({
					url: "../service/order?id=" + id
				})
			},
			tocenter() {
				uni.navigateTo({
					url: "../service/center"
				})
			},
		}
	}
</script>

<style>
	.box {
		width: 100vw;
		overflow-y: scroll;
		background-color: #F2F2F2;
	}

	.button {
		width: 100%;
		height: 100rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.mybutton {
		width: 100%;
		height: 100rpx;
	}

	.big_list {
		width: 100%;
		/* height: calc(100vh - 100rpx); */
		/* height: 500rpx; */
		/* overflow-y: scroll; */
		/* border: 1rpx solid red; */
	}

	.list {
		width: 100%;
		height: 192rpx;
		padding-left: 30rpx;
		line-height: 52rpx;
		position: relative;
		background-color: #FFFFFF;
		margin-top: 30rpx;
	}

	.list_image {
		width: 88rpx;
		height: 88rpx;
		position: absolute;
		right: 0;
		top: 0;
	}

	.list_time {
		color: #ADADAD;
	}

	.list_mt {
		padding-top: 20rpx;
	}

	.uni-loadmore {
		text-align: center;
	}
</style>
