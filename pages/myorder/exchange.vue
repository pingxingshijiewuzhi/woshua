<template>
	<view class="content">
		<view class="top flexs">
			<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="mydui">我的兑换</view>
			<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="myshen">兑换订单</view>
		</view>
		<view class='topbox'></view>
		<view class='list' v-show="Inv==1">
			<view class="list_one_new" @click="gotomydetail1(item.id)" v-for="(item,index) in res" :key="index">
				<view class="list_top flexs5 ">
					<view class="list_top_left ">{{item.createtime}}</view>
					<view class="list_top_right ">{{item.status_text}}</view>
				</view>
				<view class="list_middle1 flexs11">
					<image class='list_img' :src="baseurl+item.product_image "></image>
					<view class="list_middle_l">
						<view class="list_bigtitle flexs">
							<view class="list_title">{{item.product_name}}</view>
							<view class="text-black">X{{item.num}}</view>
						</view>
						<view class="list_price flexs2">
							<view><text>积分</text><text class="price">{{item.price}}</text><text>/{{item.number}}{{item.product_norms}}</text></view>
							<view class="text-right">合计：{{item.order_price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class='list' v-show="Inv==0">
			<view class="list_one" v-for="(item,index) in res" :key="index">
				<view class="list_top">{{item.createtime}}</view>
				<view class="list_middle flexs11" @click="gotomydetail(item.id)">
					<image class='list_img' :src="baseurl+item.product_image"></image>
					<view class="list_middle_l">
						<view class="list_title flexs13">
							<view>{{item.product_name}}</view>

							<view class="text-blue">X{{item.num}}</view>
						</view>
						<view class="list_price flexs2">
							<view> <text>积分</text><text class="price">{{item.price}}</text><text>/{{item.number}}{{item.product_norms}}</text></view>
							<view class="text-right">合计:{{item.order_price}}</view>
						</view>
					</view>
				</view>
				<view class="list_b flexs4">
					<view class="btns" @click="queren(item.id)" v-show="item.status == 3">确认收货</view>
					<!-- <view class="btns1" v-show="item.status == 3" @click='gologistics'>查看物流</view> -->
					<view class="btns1" v-show="item.status == 4">兑换成功</view>
					<view class="btns1" v-show="item.status == 5">兑换被驳回</view>
				</view>
			</view>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				Inv: 1,
				type: '',
				limit: 10,
				res: '',
				baseurl: this.$common.baseUrl,
				integral_order_id: '',
				lisize: 0, //本次加载数量
				loadMoreText: "加载中...",
				showLoadMore: false,
			}
		},
		onLoad() {
			this.type = 2,
				this.getdata();
		},
		onUnload() {
			this.res = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onPullDownRefresh() { //监听下拉刷新动作
			this.page = 1;
			this.getdata();
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onReachBottom() { //监听上拉触底事件
			console.log(123)
			this.showLoadMore = true
			setTimeout(() => {
				//获取数据
				if (this.lisize == 10) {
					this.page++;
					this.getdata();
				} else {
					this.loadMoreText = "暂无更多";
					this.showLoadMore = false;
				}
			}, 1000);
		},
		onShow() {
			this.getdata();
		},
		methods: {
			queren(id) {
				let obj = {
					integral_order_id: id,
				}
				this.$common.requests('/api/integral/confirm_huo', obj).then(res => {
					if (res.data.code == 1) {
						this.$api.msg(res.data.msg);
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			mydui() {
				this.res = []
				this.Inv = 0;
				this.type = 1;
				this.page = 1;
				this.getdata();
			},
			myshen() {
				this.res = []
				this.Inv = 1;
				this.page = 1;
				this.type = 2;
				this.getdata();
			},
			gotomydetail(mydetailid) {
				uni.navigateTo({
					url: 'mydetail?order_id=' + mydetailid
				})
			},
			gotomydetail1(mydetailid) {
				uni.navigateTo({
					url: 'mydetail2?order_id=' + (mydetailid)
				})
			},

			getdata() {
				let obj = {
					page: this.page,
					limit: this.limit,
					type: this.type,
				}
				this.$common.requests('/api/integral/get_integral_order_list', obj).then(res => {
					if (res.data.code == 1) {
						this.lisize = res.data.data.length;
						if (this.lisize == 0 && this.res.length == 0){
							this.$api.msg('暂无数据')
							return;
						} 
						if (this.page == 1) {
							this.res = res.data.data
						} else {
							this.res = this.res.concat(res.data.data);
							console.log(this.res)
						}
					} else {
						this.$api.msg(res.data.msg);
					}

				});
			},
			// gologistics() {
			// 	uni.navigateTo({
			// 		url: '../logistics/logistics'
			// 	})
			// }
		}

	}
</script>

<style>
	.content {
		width: 100vw;
		overflow-y: scroll;
	}

	.top {
		height: 100rpx;
		font-size: 32rpx;
		letter-spacing: 4rpx;
	}

	.inv-h {
		width: 27%;
		height: 100%;
		line-height: 100rpx;
		text-align: center;
	}

	.inv-h-se {
		color: #5B7DEF;
		border-bottom: 2px solid #5B7DEF;
	}

	.list {
		width: 100%;
	}

	.list_one {
		width: 100%;
		height: 400rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
		padding: 28rpx;
	}

	.list_one_new {
		width: 100%;
		/* height:260rpx; */
		height: 300rpx;
		/* border:1rpx solid red; */
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
		padding: 28rpx;
	}

	.list_top {
		width: 100%;
		height: 60rpx;
		letter-spacing: 4rpx;
		color: #555555;
		border-bottom: 1px solid #E5E5E5
	}

	.list_top_left {
		width: 135%;
		height: 60rpx;
		color: #555555;
		border-bottom: 1px solid #E5E5E5
	}

	.list_top_right {
		width: 41%;
		height: 60rpx;
		color: #798CD0;
		border-bottom: 1px solid #E5E5E5;
		margin-left: 200rpx;
	}

	.list_middle {
		width: 100%;
		height: 64%;
		padding: 24rpx;
		border-bottom: 1px solid #E5E5E5;
	}

	.list_middle1 {
		width: 100%;
		height: 64%;
		padding: 24rpx;
		/* border-bottom:1px solid #E5E5E5; */
	}

	.list_img {
		width: 180rpx;
		height: 155rpx;
	}

	.list_middle_l {
		width: 80%;
		height: 160rpx;
		margin-left: 30rpx;

	}

	.list_bigtitle {}

	.text-black {
		color: #000000;
		margin-bottom: 64rpx;
		margin-left: 20rpx;
	}

	.list_title {
		width: 100%;
		height: 110rpx;
		letter-spacing: 3rpx;
		font-size: 32rpx;
	}

	.price {
		height: 40rpx;
		color: #FF1B20;
		font-size: 36rpx;
	}

	.list_price {
		width: 100%;
		letter-spacing: 4rpx;
	}
	.text-right{
		width:200rpx;
	}
	.list_b {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
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
		margin-left: 30rpx;
	}

	.btns1 {
		width: 180rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #FFFBF2;
		text-align: center;
		border-radius: 20rpx;
		color: #F9A620;
		border: 1px solid #5B7DEF;
	}

	.uni-loadmore {
		text-align: center;
	}
</style>
