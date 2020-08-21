<template>
	<view class='ruku'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/0000.png" mode=""></image>
				<view class="mytabbar_text">流动记录</view>
				<view class=" mytabbar_right"></view>
			</view>
		</view>
		<view class='navtabbar'>
			<view class='basestyle' @click='choose(0)'>
				<view :class="{'active':currentIndex==0}">入库</view>
			</view>
			<view class='basestyle' @click='choose(1)'>
				<view :class="{'active':currentIndex==1}">出库</view>
			</view>
			<!-- <view class='basestyle'  @click='choose(2)'>
				<view   :class="{'active':currentIndex==2}">换机</view>
			</view>
			<view class='basestyle'  @click='choose(3)'>
				<view   :class="{'active':currentIndex==3}">解绑</view>
			</view> -->
		</view>
		<block v-for='(item,index) in flowArray' :key='index'>
			<view class='nothing'>
				<view class='mytimetitle'>{{item.time}}</view>
				<block v-for='(item1,index1) in item.list' :key='index1'>
					<view class='recodeitem' @click='godetail(item1.id)'>
						<view class='recodeitem_left'>
							<block v-if='currentIndex == 0'>
								<view class='left_title addblue'>入库成功</view>
							</block>
							<block v-if='currentIndex == 1'>
								<view class='left_title addblue'>出库成功</view>
							</block>
							<block v-if='currentIndex == 0'>
								<view class='left_time'>下发者:{{item1.form_name}}</view>
							</block>
							<block v-if='currentIndex == 1'>
								<view class='left_time'>接收者:{{item1.form_name}}</view>
							</block>
						</view>
						<view class='recodeitem_right'>
							<view class='addmycolor'>
								<view class='addfontsize'>{{item1.num}}</view> 台
							</view>
							<view class='right_num'>{{item1.createtime}}</view>
						</view>
					</view>
				</block>
				<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				flowArray: [],
				page: 1,
				limit: 10,
				lisize: 0, //本次加载数量
				loadMoreText: "加载中...",
				showLoadMore: false,
			}
		},
		onLoad() {
			this._getrecode()
		},
		onUnload() {
			this.serverlist = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onPullDownRefresh() { //监听下拉刷新动作
			this.page = 1;
			this._getrecode();
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
					this._getrecode();
				} else {
					this.loadMoreText = "暂无更多";
					this.showLoadMore = false;
				}
			}, 1000);
		},
		methods: {
			_getrecode() {
				let obj = {
					type: this.currentIndex + 1,
					page: this.page,
					limit: this.limit
				}
				// page:this.page,
				// limit:this.limit
				this.$common.requests('/api/pos/get_pos_transfer_list', obj).then(res => {
					if (res.data.code == 1) {
						console.log(res.data.data)
						if (this.lisize == 0 && this.serverlist == []) return;
						if (this.page == 1) {
							this.serverlist = res.data.data
						} else {
							this.serverlist = this.serverlist.concat(res.data.data);
							console.log(this.serverlist)
						}
						this.flowArray = res.data.data
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 详情判断进入那个详情
			godetail(id) {
				if (this.currentIndex == 0) {
					uni.navigateTo({
						url: '../organization/rukudetail?id=' + id
					})
				}
				if (this.currentIndex == 1) {
					uni.navigateTo({
						url: '../organization/chukudetail?id=' + id
					})
				}
			},
			choose(index) {
				this.currentIndex = index
				// 每次点击切换,重新请求
				this.flowArray = []
				this._getrecode()
			},
		}
	}
</script>

<style scoped>
	.ruku {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 120rpx;
		background-color: #5A7EF8;
		padding: 30rpx 20rpx;
	}

	.mytabbar_image {
		width: 40rpx;
		height: 34rpx;
	}

	.mytabbar_text {
		font-size: 32rpx;
		color: #FCFFFC;
	}

	.mytabbar_right {
		font-size: 28rpx;
		color: #DDE9F4;
	}

	.mytabbar_top {
		width: 100%;
		height: 100rpx;
	}

	/* 导航栏tabbar样式 */
	.navtabbar {
		height: 90rpx;
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		margin-bottom: 30rpx;
		font-weight: 600;
	}

	.basestyle {
		/* flex-grow: 1; */
		height: 90rpx;
		/* width:25%; */
		width: 50%;
		text-align: center;
		line-height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.basestyle>view {
		width: 120rpx;
		height: 100%;
	}

	.active {
		color: #5D7DF4;
		border-bottom: 1rpx solid #5D7DF4;
	}

	/* 入库流水记录样式 */
	.nothing {
		margin-bottom: 30rpx;
	}

	.mytimetitle {
		height: 82rpx;
		line-height: 82rpx;
		background-color: #FFFFFF;
		font-size: 34rpx;
		padding-left: 30rpx;
		border-bottom: 1rpx solid #E5E5E5;
	}

	.recodeitem {
		padding: 30rpx;
		background-color: #FFFFFF;
		height: 150rpx;
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.recodeitem_left {
		height: 90rpx;
		width: 400rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
	}

	.left_time {}

	.left_title {
		height: 36rpx;
		line-height: 36rpx;
		font-size: 30rpx;
		color: #5F84F6;
	}

	.recodeitem_right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		height: 90rpx;
		width: 300rpx;
		text-align: right;
	}

	.addmycolor {
		display: flex;
		width: auto;
		justify-content: space-between;
		height: 36rpx;
		line-height: 36rpx;
		font-size: 30rpx;
	}

	.addfontsize {
		font-size: 36rpx;
	}

	.uni-loadmore {
		text-align: center;
	}
</style>
