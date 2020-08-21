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
									<view class="">￥</view>
									<view class="border_next">{{item.price}}</view>
								</view>
								<view class="border_num">{{'/'+item.norms}}</view>
							</view>
						</view>
						<view class="goumai" @click.stop="tobuy(item.id,item.number)">购买</view>
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
		onBackPress(e) {
			let backid = uni.getStorageSync('choosezhifu')
			if (e.from == 'backbutton') {
				uni.navigateTo({
					url:'bops?id='+backid+'&type=2'
				})
				return true
			}
			if (e.from == 'navigateBack') {
				uni.navigateTo({
					url:'bops?id='+backid+'&type=2'
				})
				return true
			}
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
					giftshop_id: this.id,
					page: this.page,
					limit: this.limit
				}
				this.$common.requests('/api/giftproduct/get_product_list', obj).then(res => {
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
					url: "../activity/libaoxiang?id=" + id
				})
			},
			tobuy(id,num){
				uni.navigateTo({
					url: "../activity/jiaodingdan?id=" + id + '&number='+num
				})
			}
		},
	}
</script>

<style>
	.box {
		width: 100vw;
		overflow-y: scroll;
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
		height: 200rpx;
		margin: 0 5%;
		border-bottom: solid 1rpx #E5E5E5;
	}

	.barner_first {
		width: 380rpx;
		height: 100rpx;
		font-size: 34rpx;
		/* max-height: 100rpx; */
		overflow: hidden;
		word-break: break-all;	/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;	/* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		
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
		font-size: 46rpx;
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
		width: 160rpx;
		height: 160rpx;
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
