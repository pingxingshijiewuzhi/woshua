<!-- 订单金额:{{item.price}}{{item.num}} -->
							
<template>
	<view class="content">
		<view class='list'>
			<block v-for='(item,index) in list' :key='index'>
				<view class="list_one" @click="goDetail(item.id)">
					<view class="list_top">{{item.createtime}}  {{item.status_text}}</view>
					<view class="list_middle flexs11">
						<image class='list_img' :src="imgUrl+item.pos_type_image"></image>
						<view class="list_middle_l">
							<view class="list_title flexs13">
								<view>{{item.pos_type_text}}</view>
								<view class="text-blue">X{{item.num}}</view>
							</view>
							<view class="list_title ">
								<!-- <text>￥</text>
								<text class="price">{{item.price}}</text>
								<text class="list_sise">/{{item.product_norms}}</text> -->
							</view>
							<view class="list_title ">
								<view class="list_heji">合计：￥{{item.price}}</view>
							</view>
						</view>
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
				modalName: null,
				Inv: 0,
				imgUrl: this.$common.baseUrl,
				orderid: '',

				//列表
				list: [],
				limit: 10,
				page: 1,
				lisize: 0, //本次加载数量
				loadMoreText: "加载中...",
				showLoadMore: false,

			}
		},
		onShow() {
			this._getnopaygiftlist()
		},
		onUnload() {
			this.list = []
			this.loadMoreText = "加载更多"
			this.showLoadMore = false
		},
		onPullDownRefresh() { //监听下拉刷新动作
			this.page = 1
			this._getnopaygiftlist();
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
						this._getnopaygiftlist();
					} else {
						this.loadMoreText = "暂无更多";
						this.showLoadMore = false;
					}
				}, 1000);
		},
		methods: {
			// 默认获取为付款礼包列表
			_getnopaygiftlist() {
				var that = this
				
				let myobj = {
					limit: this.limit,
					page: this.page
				}
				this.$common.requests('/api/Organization/getOrganizationOrderList', myobj).then(res => {
					if (res.data.code == 1) {
							this.lisize = res.data.data.length;
							if (this.lisize == 0 && that.list.length == 0) {
								that.list = []
								this.$api.msg('暂无数据')
								return;
							}
							if (this.page == 1) {
								that.list = res.data.data
								// console.log(that.list, '收货')
							} else {
								that.list = that.list.concat(res.data.data);
								// console.log(that.list, '收货')
							}
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url:'buyorderdetail?id=' + id
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		overflow-y: scroll;
	}

	.list {
		width: 100%;
	}

	.list_one {
		width: 100%;
		height: 34%;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
		padding: 28rpx;
	}

	.text-blue {}

	.list_top {
		width: 100%;
		height: 60rpx;
		letter-spacing: 4rpx;
		color: #555555;
		border-bottom: 1px solid #E5E5E5
	}

	.list_middle {
		width: 100%;
		height: 64%;
		padding: 20rpx 0;
		border-bottom: 1px solid #E5E5E5;
	}

	.list_img {
		width: 120rpx;
		height: 120rpx
	}

	.list_middle_l {
		width: 78%;
		height: 120rpx;
		margin-left: 32rpx;

	}

	.list_sise {
		font-size: 26rpx;
	}

	.list_title {
		width: 100%;
		height: 40rpx;
		letter-spacing: 3rpx;
		font-size: 30rpx;
	}

	.list_fonts {
		font-size: 28rpx;
	}

	.price {
		/* width: 100rpx; */
		color: #E22A1F;
		font-size: 32rpx;
	}

	.list_heji {
		width: 300rpx;
	}

	.list_b {
		width: 100%;
		line-height: 70rpx;
		margin-top: 20rpx;
	}

	.btns {
		width: 180rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #F2F4FF;
		text-align: center;
		border-radius: 20rpx;
		color: #5B7DEF;
		border: 1px solid #5B7DEF;
	}


	/* model */
	.button_color {
		width: 680rpx;
		height: 300rpx;
		background-color: #FFFFFF;
	}

	.button_top {
		width: 680rpx;
		height: 150rpx;
		color: #3F57AD;
		font-size: 38rpx;
		;
	}

	.button_middle {
		width: 680rpx;
		line-height: 80rpx;
		display: flex;
		font-size: 34rpx;
		justify-content: center;
		color: #000000;
		/* align-items: center; */
	}

	.button_bottom_left {
		width: 50%;
		line-height: 80rpx;
		border-top: 1px solid #E1E1E1;

	}

	.button_bottom_right {
		width: 50%;
		line-height: 80rpx;
		border-left: 1px solid #E1E1E1;
		border-top: 1px solid #E1E1E1;
		color: #3F57AD;
	}

	.uni-loadmore {
		text-align: center;
	}
</style>
