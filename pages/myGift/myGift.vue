<template>
	<view class="content">
		<view class="top flexs">
			<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="tabclick(0)">待付款</view>
			<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="tabclick(1)">待发码</view>
			<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="tabclick(2)">已完成</view>
		</view>
		<view class='list' v-show="Inv==0">
			<block v-for='(item,index) in nopaylist' :key='index'>
				<view class="list_one" @click="goDetail(item.id)">
					<view class="list_top">{{item.createtime}}</view>
					<view class="list_middle flexs11">
						<image class='list_img' :src="imgUrl+item.product_image"></image>
						<view class="list_middle_l">
							<view class="list_title flexs13">
								<view>{{item.product_name}}</view>
								<view class="text-blue">X{{item.num}}</view>
							</view>
							<view class="list_title ">
								<text>￥</text>
								<text class="price">{{item.price}}</text>
								<text class="list_sise">/{{item.product_norms}}</text>
							</view>
							<view class="list_title ">
								<view class="list_heji">合计：￥{{item.order_price}}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class='list' v-show="Inv==1">
			<block></block>
			<block v-for='(item,index) in orderpaylist' :key='index'>
				<view class="list_one" @click="goDetail(item.id)">
					<view class="list_top">{{item.createtime}}</view>
					<view class="list_middle flexs11">
						<image class='list_img' :src="imgUrl+item.product_image"></image>
						<view class="list_middle_l">
							<view class="list_title flexs13">
								<view>{{item.product_name}}</view>
								<view class="text-blue">X{{item.num}}</view>
							</view>
							<view class="list_title ">
								<text>￥</text>
								<text class="price">{{item.price}}</text>
								<text class="list_sise">/{{item.product_norms}}</text>
							</view>
							<view class="list_title ">
								<view class="list_heji">合计：￥{{item.order_price}}</view>
							</view>
						</view>
					</view>
					<view class="list_b flexs4">
						<block v-if='item.status==3'>
							<view class="btns" @click.stop="enture($event,item.id)" data-target="ChooseModal">确认收货</view>
						</block>
					</view>
				</view>
			</block>
		</view>
		<view class='list' v-show="Inv==2">
			<block></block>
			<block v-for='(item,index) in list' :key='index'>
				<view class="list_one" @click="goDetail(item.id)">
					<view class="list_top">{{item.createtime}}</view>
					<view class="list_middle flexs11">
						<image class='list_img' :src="imgUrl+item.product_image"></image>
						<view class="list_middle_l">
							<view class="list_title flexs13">
								<view>{{item.product_name}}</view>
								<view class="text-blue">X{{item.num}}</view>
							</view>
							<view class="list_title ">
								<text>￥</text>
								<text class="price">{{item.price}}</text>
								<text class="list_sise">/{{item.product_norms}}</text>
							</view>
							<view class="list_title ">
								<view class="list_heji">合计：￥{{item.order_price}}</view>
							</view>
						</view>
					</view>
					<view class="list_b flexs4">
						<block v-if='item.status==3'>
							<view class="btns" @click.stop="enture($event,item.id)" data-target="ChooseModal">确认收货</view>
						</block>
					</view>
				</view>
			</block>
		</view>
		<view class="cu-modal " :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="button_color">
					<view class="button_top flexs">确认收货</view>
					<view class="button_middle">你确定收到该商品了吗？</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="button_bottom_left flexs" @tap="hideModal ">取消</view>
					<view class="button_bottom_right flexs" @tap="mysure">确定</view>
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
				modalName: null,
				Inv: 0,
				imgUrl: this.$common.baseUrl,
				orderid: '',
				
				// 代付款列表
				nopaylist: [],
				// 待发码列表
				orderpaylist:[],
				// 已完成列表
				list: [],
				limit: 10,
				orderpaypage:1,
				nopaypage: 1,
				page: 1,
				orderpaylisize:0,
				nopaylisize: 0, //本次加载数量
				lisize: 0, //本次加载数量
				loadMoreText: "加载中...",
				showLoadMore: false,
				
				// 定义一个变量来区分是不是从首页点击来的
				myStatus:false
			}
		},
		onBackPress(e) {
			let backid = uni.getStorageSync('choosezhifu')
			// console.log(uni.getStorageSync('choosezhifu'),888)
			if(this.myStatus){
				if(e.from=='backbutton'){
					uni.switchTab({
						url:'../personal/personal'
					})
				 return true
				}
				if(e.from == 'navigateBack'){
					uni.switchTab({
						url:'../personal/personal'
					})
				 return true
				}
			}else{
				if(e.from=='backbutton'){
					uni.navigateTo({
						url:'../activity/xianshangcai?id='+backid
					})
				 return true
				}
				if(e.from == 'navigateBack'){
					uni.navigateTo({
						url:'../activity/xianshangcai?id'+backid
					})
				 return true
				}
			}
			
		},
		onLoad(option) {
			// 有传入付款还是收货及用,没有默认0,付款列表显示
			this.Inv = option.Inv ? option.Inv : 0;
			this.myStatus = option.myStatus ? option.myStatus : false
			console.log(this.myStatus,999)
			this._getnopaygiftlist()
		},
		onShow() {
			this._getnopaygiftlist()
		},
		onUnload() {
			this.nopaylist = []
			this.list = []
			this.orderpaylist = []
			this.loadMoreText = "加载更多"
			this.showLoadMore = false
		},
		onPullDownRefresh() { //监听下拉刷新动作
			if (this.Inv == 0) {
				this.nopaypage = 1
			}
			if (this.Inv == 1) {
				this.orderpaypage = 1
			}
			if(this.Inv == 2){
				this.page = 1
			}
			this._getnopaygiftlist();
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onReachBottom() { //监听上拉触底事件
			this.showLoadMore = true
			if (this.Inv == 0) {
				setTimeout(() => {
					//获取数据
					if (this.nopaylisize == 10) { //
						this.nopaypage++;
						this._getnopaygiftlist();
					} else {
						this.loadMoreText = "暂无更多";
						this.showLoadMore = false;
					}
				}, 1000);
			}
			if (this.Inv == 1) {
				setTimeout(() => {
					//获取数据
					if (this.orderpaylisize == 10) { //
						this.orderpaypage++;
						this._getnopaygiftlist();
					} else {
						this.loadMoreText = "暂无更多";
						this.showLoadMore = false;
					}
				}, 1000);
			}
			if (this.Inv == 2) {
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
			}
		},
		methods: {
			// 确认收货
			enture(e, id) {
				this.modalName = e.currentTarget.dataset.target
				this.orderid = id
			},
			// 弹框确认
			mysure() {
				var that = this
				this.modalName = null
				let obj = {
					order_id: this.orderid
				}
				this.$common.requests('/api/Giftorder/confirm_order', obj).then(res => {
					if (res.data.code == 1) {
						// 确认收货重新请求,将原来数据清空
						that.Inv = 2
						that.page = 1
						that.list = []
						that._getnopaygiftlist();
						that.$api.msg(res.data.msg);
					} else {
						that.$api.msg(res.data.msg);
						console.log(res.data.msg)
					}
				})
			},
			// 取消弹框
			hideModal() {
				this.modalName = null
			},
			// 默认获取为付款礼包列表
			_getnopaygiftlist() {
				var that = this
				// 定义列表类型
				var type = null
				var page = null
				if (this.Inv == 0) {
					type = 1
					page = this.nopaypage
				}
				if (this.Inv == 1) {
					type = 2
					page = this.orderpaypage
				}
				if (this.Inv == 2) {
					type = 3
					page = this.page
				}
				
				let myobj = {
					limit: this.limit,
					page: page,
					type: type
				}
				this.$common.requests('/api/Giftorder/get_order_list', myobj).then(res => {
					if (res.data.code == 1) {
						if (that.Inv == 0) {
							that.nopaylisize = res.data.data.length;
							// console.log(that.nopaylisize ,555)
							if (that.nopaylisize == 0 && that.nopaylist.length == 0) {
								this.$api.msg('暂无数据')
								return;
							}
							if (that.nopaypage == 1) {
								that.nopaylist = res.data.data

							} else {
								that.nopaylist = that.nopaylist.concat(res.data.data);

							}
						}
						if (that.Inv == 1) {
							this.orderpaylisize = res.data.data.length;
							if (this.orderpaylisize == 0 && that.orderpaylist.length == 0) {
								that.orderpaylist = []
								this.$api.msg('暂无数据')
								return;
							}
							if (this.orderpaypage == 1) {
								that.orderpaylist = res.data.data
								// console.log(that.orderpaylist, 'page1待收码')
							} else {
								that.orderpaylist = that.orderpaylist.concat(res.data.data);
								// console.log(that.list, 'page多个待收码')
							}
						}
						if (that.Inv == 2) {
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
						}
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			tabclick(index) {
				this.Inv = index
				this.loadMoreText = "加载中..."
				this.showLoadMore = false
				this._getnopaygiftlist()
				console.log(this.Inv)
			},
			goDetail(id) {
				uni.navigateTo({
					url: 'detail?id=' + id
					// url:"../myIntegral/shipping?type=" + 2 + '&address_id=' + address_id 
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		overflow-y: scroll;
		/* height:100vh; */
	}

	.top {
		width: 100%;
		height: 8%;
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
