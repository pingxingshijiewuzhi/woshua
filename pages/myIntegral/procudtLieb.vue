<template>
	<view class="box">

		<view class="box_list">
			<block v-for='(item,index) in productlist' :key='index'>
				<view class="list">
					<view class="flexs1 border_bottom" @click="tolibao(item.id)">
						<image class="list_image" :src="imgUrl+item.image" mode=""></image>
						<view class="border_left">
							<view class="barner_first">{{item.name}}</view>
							<view class=" flexs1">
								<view class="flexs1">
									<view class="">积分</view>
									<view class="border_next">{{item.price}}</view>
								</view>
								<view class="border_num">{{'/'+item.number+item.norms}}</view>
							</view>
						</view>
						<view class="goumai" @click.stop='goconversion(item.id)'>兑换</view>
					</view>
				</view>
			</block>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				limit: 10,
				page: 1,
				lisize: 0, //本次加载数量
				loadMoreText: "加载中...",
				showLoadMore: false,
				imgUrl: this.$common.baseUrl,
				productlist: []

			}
		},
		onLoad(option) {
			this.id = option.id
			this._getList()
		},
		onUnload() {
			this.productlist = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onPullDownRefresh() { //监听下拉刷新动作
			this.page = 1;
			this._getList();
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onReachBottom() { //监听上拉触底事件
			this.showLoadMore = true
			setTimeout(() => {
				//获取数据
				if (this.lisize == 10) { //
					this.page++;
					this._getList();
				} else {
					this.loadMoreText = "暂无更多";
					this.showLoadMore = false;
				}
			}, 1000);
		},
		methods: {
			_getList() {
				let obj = {
					integral_type_id: this.id,
					page: this.page,
					limit: this.limit
				}
				this.$common.requests('/api/integral/get_integral_product_list', obj).then(res => {
					if (res.data.code == 1) {
						this.lisize = res.data.data.length;
						if (this.lisize == 0) return;
						if (this.page == 1) {
							this.productlist = res.data.data
						} else {
							this.productlist = this.productlist.concat(res.data.data);
							console.log(this.productlist)
						}
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			tolibao(id) {
				uni.navigateTo({
					url: "../activity/libaoxiangqing?id=" + id
				})
			},
			goconversion(id){
				uni.navigateTo({
					url: "../activity/tijiaodingdan?id=" + id
				})
			}
		},
	}
</script>

<style>
	.box {
		width: 100vw;
		/* height: 100vh; */
		overflow-y: scroll;
		/* height: calc(100vh - 100rpx); */
		/* overflow: hidden; */
	}

	.list {
		width: 100%;
		height: 240rpx;
		background-color: #FFFFFF;
	}

	.box_list {
		width: 100%;
	}

	.border_bottom {
		width: 90%;
		height: 240rpx;
		margin: 0 5%;
		border-bottom: solid 1rpx #E5E5E5;
	}

	.barner_first {
		width: 380rpx;
		height: 120rpx;
		font-size: 34rpx;

	}

	.barder_left {
		font-size: 32rpx;
		font-weight: 600;
		margin-right: 40rpx;
		color: #363636;
		letter-spacing: 6rpx;
	}

	.barder_right {
		font-size: 32rpx;
		font-weight: 600;
		color: #363636;
		letter-spacing: 6rpx;
		margin-top: 8rpx;
	}

	.barder_last {
		font-size: 30rpx;
		margin-top: 10rpx;
		color: #5E5E5E;
	}

	.border_next {
		font-size: 36rpx;
		color: #FE3131;
		letter-spacing: 2rpx;
	}

	.border_num {
		letter-spacing: 2rpx;
	}

	.border_left {
		margin-left: 30rpx;
	}

	.list_image {
		width: 180rpx;
		height: 170rpx;
	}

	.goumai {
		width: 100rpx;
		line-height: 46rpx;
		color: #7B91DC;
		border: solid 2rpx #7B91DC;
		text-align: center;
		margin-top: 50rpx;
	}

	.uni-loadmore {
		text-align: center;
	}
</style>
