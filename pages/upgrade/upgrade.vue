<template>
	<view class="box">
		<!-- <view class='apptabbar'></view> -->
		<view class="upborder flexs3">
			<view @click='clickbtn(1)' class='border_list flexs' :class="{'border_lists':currentIndex==1}">全部</view>
			<view @click='clickbtn(2)' class='border_list flexs' :class="{'border_lists':currentIndex==2}">待发货</view>
			<view @click='clickbtn(3)' class='border_list flexs' :class="{'border_lists':currentIndex==3}">待收货</view>
			<view @click='clickbtn(4)' class='border_list flexs' :class="{'border_lists':currentIndex==4}">已完成</view>
		</view>
		<view class="underborder">
		</view>
		<view class="big_barner" v-show="currentIndex==1">
			<view class="barner" v-for="(item,index) in user" :key="index" @click="tolist(item.id,item.status)">
				<view class="barner_right">{{item.status_text}}</view>
				<view class="barner_border">
					<view class=" flexs1">
						<view class="flexs1">
							<image class="barner_image" :src="baseurl+item.product_image" mode=""></image>
							<view class=" barner_center">
								<view class="">{{item.product_name}}</view>
								<view class="center_number">{{item.num}}{{item.product_norms}}</view>
							</view>
						</view>
						<view class="barner_rights">
							<view class="rights_right">￥{{item.price}}</view>
							<view class="rights_right">X{{item.num}}</view>
							<view class="rights_rights">合计:￥{{item.order_price}}</view>
						</view>
					</view>
				</view>
				<view class='nothingbox'>
					<view class="barner_last" v-if="item.status_text == '待付款'" @click.stop='cancleorder(item.id)'>删除</view>
					<view class="kongbarner_last" v-else></view>
					<view class="barner_last">查看详情</view>
				</view>
			</view>
		</view>
		<view class="big_barner" v-show="currentIndex==2">
			<view class="barner" v-for="(item,index) in usera" :key="index" @click="tolist(item.id)">
				<view class="barner_right">待发货</view>
				<view class="barner_border">
					<view class=" flexs1">
						<view class="flexs1">
							<image class="barner_image" :src="baseurl+item.product_image" mode=""></image>
							<view class=" barner_center">
								<view class="">{{item.product_name}}</view>
								<view class="center_number">{{item.num}}{{item.product_norms}}</view>
							</view>
						</view>
						<view class="barner_rights">
							<view class="rights_right">￥{{item.price}}</view>
							<view class="rights_right">X{{item.num}}</view>
							<view class="rights_rights">合计:￥{{item.order_price}}</view>
						</view>
					</view>
				</view>
				<view class='nothingbox'>
					<view class="kongbarner_last"></view>
					<view class="barner_last">查看详情</view>
				</view>
			</view>
		</view>
		<view class="big_barner" v-show="currentIndex==3">
			<view class="barner" v-for="(item,index) in userb" :key="index">
				<view class="barner_right">待收货</view>
				<view class="barner_border" @click="tolists(item.id,null)">
					<view class=" flexs1">
						<view class="flexs1">
							<image class="barner_image" :src="baseurl+item.product_image" mode=""></image>
							<view class=" barner_center">
								<view class="">{{item.product_name}}</view>
								<view class="center_number">{{item.num}}{{item.product_norms}}</view>
							</view>
						</view>
						<view class="barner_rights">
							<view class="rights_right">￥{{item.price}}</view>
							<view class="rights_right">X{{item.num}}</view>
							<view class="rights_rights">合计:￥{{item.order_price}}</view>
						</view>
					</view>
				</view>
				<view class=" last_bottom flexs1">
					<view class="last_left">查看物流</view>
					<view class="barner_last" @tap="showModal($event,item.id)" data-target="ChooseModal">确认收货</view>
				</view>
			</view>
			<!-- model -->
			<view class="cu-modal " :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop="">
					<view class="button_color">
						<view class="button_top flexs">确认收货</view>
						<view class="button_middle">您确定收到该商品了吗？</view>
					</view>
					<view class="flexs">
						<view class="button_bottom_left flexs" @tap="hideModal ">取消</view>
						<view class="button_bottom_right " @click="hidden">确定</view>
					</view>
				</view>
			</view>
		</view>
		<view class="big_barner" v-show="currentIndex==4">
			<view class="barner" v-for="(item,index) in userc" :key="index" @click="tolists(item.id,item.status)">
				<view class="barner_right">完成</view>
				<view class="barner_border">
					<view class=" flexs1">
						<view class="flexs1">
							<image class="barner_image" :src="baseurl+item.product_image" mode=""></image>
							<view class=" barner_center">
								<view class="">{{item.product_name}}</view>
								<view class="center_number">{{item.num}}{{item.product_norms}}</view>
							</view>
						</view>
						<view class="barner_rights">
							<view class="rights_right">￥{{item.price}}</view>
							<view class="rights_right">X{{item.num}}</view>
							<view class="rights_rights">合计:￥{{item.order_price}}</view>
						</view>
					</view>
				</view>
				<view class='nothingbox'>
					<view class="kongbarner_last"></view>
					<view class="barner_last">查看详情</view>
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
				currentIndex: 1,
				modalName: null,
				type: '',
				res: '',
				baseurl: this.$common.baseUrl,
				order_id: '',
				limit: 10,
				page: 1,
				pagea: 1,
				pageb: 1,
				pagec: 1,
				user: [],
				usera: [],
				userb: [],
				userc: [],
				lisize: 0, //本次加载数量
				loadMoreText: "加载中...",
				showLoadMore: false,

				// 确认收货id
				consignee: ''
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.gatadata();
		},
		onUnload() {
			this.user = []
			this.usera = []
			this.userb = []
			this.userc = []
			this.loadMoreText = "加载中..."
			this.showLoadMore = false
		},
		onPullDownRefresh() { //监听下拉刷新动作
		var that = this
			setTimeout(function() {
				//初始化数据
				if (that.currentIndex == 1) {
					that.page = 1;
				};
				if (that.currentIndex == 2) {
					that.pagea = 1;
				};
				if (that.currentIndex == 3) {
					that.pageb = 1;
				};
				if (that.currentIndex == 4) {
					that.pagec = 1;
				};
				that.gatadata();
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onReachBottom() { //监听上拉触底事件
			var that = this
			this.showLoadMore = true
			setTimeout(() => {
				//获取数据
				if (that.lisize != 0) {

					if (that.currentIndex == 1) {
						that.page++;
					};
					if (that.currentIndex == 2) {
						that.pagea++;
					};
					if (that.currentIndex == 3) {
						that.pageb++;
					};
					if (that.currentIndex == 4) {
						that.pagec++;
					};
					that.showLoadMore = false;
					that.gatadata();
				} else {
					that.loadMoreText = "暂无更多";
					that.showLoadMore = false;
				}
			}, 1000);
		},
		methods: {
			// 删除待付款
			cancleorder(orderid){
				let obj = {
					order_id: orderid
				}
				console.log(obj)
				this.$common.requests("/api/giftorder/del_wait_pay", obj).then(res => {
					this.$api.msg(res.data.msg)
					console.log(res)
					// 删除之后立即重新请求当前页面数据
					this.gatadata()
				})
			},
			hidden() {
				let obj = {
					order_id: this.consignee
				}
				this.modalName = null;
				this.$common.requests("/api/Giftorder/confirm_order", obj).then(res => {
					this.$api.msg(res.data.msg)
				})
			},
			gatadata() {
				var that = this
				let mypage = '';
				if (this.currentIndex == 3) {
					mypage = this.pageb;
					this.status = 2;
				};
				if (this.currentIndex == 1) {
					mypage = this.page;
				};
				if (this.currentIndex == 2) {
					mypage = this.pagea;
					this.status = 1;
				};
				if (this.currentIndex == 4) {
					mypage = this.pagec;
					this.status = 1;
				};
				let obj = {
					page: mypage,
					type: this.currentIndex,
					limit: this.limit,
				}
				this.$common.requests('/api/Giftorder/tools_order_list', obj).then(res => {
					if (res.data.code == 1) {
						this.lisize = res.data.data.length;
						console.log(this.lisize,'获取的数据长度')
						if(this.currentIndex == 1){
							if (that.lisize == 0 && that.user.length == 0) {
								this.$api.msg('暂无数据')
								return;
							}
						}
						if(this.currentIndex == 2){
							if (that.lisize == 0 && that.usera.length == 0) {
								this.$api.msg('暂无数据')
								return;
							}
						}
						if(this.currentIndex == 3){
							if (that.lisize == 0 && that.userb.length == 0) {
								this.$api.msg('暂无数据')
								return;
							}
						}
						if(this.currentIndex == 4){
							if (that.lisize == 0 && that.userc.length == 0) {
								this.$api.msg('暂无数据')
								return;
							}
						}
						
						if (mypage == 1) {
							if (this.currentIndex == 1) {
								this.user = res.data.data
							}
							if (this.currentIndex == 2) {
								this.usera = res.data.data
							}
							if (this.currentIndex == 3) {
								this.userb = res.data.data
							}
							if (this.currentIndex == 4) {
								this.userc = res.data.data
							}
							return
						}
						if (this.currentIndex == 1) {
							this.user = this.user.concat(res.data.data);
						}
						if (this.currentIndex == 2) {
							this.usera = this.usera.concat(res.data.data);
						}
						if (this.currentIndex == 3) {
							this.userb = this.userb.concat(res.data.data);
						}
						if (this.currentIndex == 4) {
							this.userc = this.userc.concat(res.data.data);
						}
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			clickbtn(index) {
				// 点击切换把原来数据都清空
				this.currentIndex = index
				this.user = []
				this.usera = []
				this.userb = []
				this.userc = []
				if (this.currentIndex == 0) {
					this.page = 1;
				};
				if (this.currentIndex == 1) {
					this.pagea = 1;
				};
				if (this.currentIndex == 2) {
					this.pageb = 1;
				};
				if (this.currentIndex == 3) {
					this.pagec = 1;
				};
				this.gatadata();
			},
			tolist(orderid,status) {
				if(status==4){
					uni.navigateTo({
						url: '../upgrade/buycentesr?orderid=' + orderid + '&status='+status
					})
				}else{
					uni.navigateTo({
						url: '../upgrade/buycenter?orderid=' + orderid + '&status='+status
					})
				}
			},
			tolists(orderid,status) {
				uni.navigateTo({
					url: '../upgrade/buycentesr?orderid=' + orderid + '&status='+status
				})
			},
			// 确认收货
			showModal(e, id) {
				// 把确认收货id保存
				this.consignee = id
				// console.log(this.consignee)
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		},
	}
</script>

<style>
	.box {
		width: 100vw;
/* 		height: 100vh; */
		background-color: #F2F2F2;
		position: relative;
		
		/* overflow-y: scroll; */
	}
	/* 占据自带导航栏高度 */
	/* .apptabbar{
		height: 100rpx;
		width:100%;
		border:1rpx solid red;
	} */
	/* border */
	.upborder {
		position: fixed;
		background-color: #FFFFFF;
		top:0;
		left:0;
		right:0;
		z-index: 999;
		height: 100rpx;
	}
	.underborder {
		width: 100%;
		height: 100rpx;
	}
	.border_list {
		width: 20%;
		/* line-height: 120rpx; */
		line-height: 100rpx;
		text-align: center;
		font-size: 32rpx;
	}

	.border_lists {
		color: #5C81F7;
		border-bottom: #5C81F7 solid 1rpx;
	}

	/* barenr */
	.big_barner {
		width: 100%;
		/* height: calc(100vh - 100rpx);
		overflow-y: scroll; */
	}

	.barner {
		width: 100%;
		height: 420rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		margin-top: 30rpx;
		position: relative;
	}

	.barner_border {
		height: 220rpx;
		padding: 40rpx 0;
		border-bottom: solid 1rpx #E5E5E5;
		border-top: solid 1rpx #E5E5E5;
	}

	.barner_right {
		line-height: 80rpx;
		align-self: flex-end;
		color: #FA4747;
		font-size: 30rpx;
		font-weight: 600;
	}

	.barner_image {
		width: 140rpx;
		height: 140rpx;
		margin-right: 20rpx;
	}

	.barner_center {
		width: 320rpx;
		height: 130rpx;
		font-size: 32rpx;
		letter-spacing: 2rpx;
	}

	.center_number {
		line-height: 80rpx;
		color: #707070;
		font-size: 30rpx;
	}

	.barner_rights {
		width: 210rpx;
		height: 140rpx;
		line-height: 46rpx;
		display: flex;
		flex-direction: column;
		letter-spacing: 2rpx;
	}

	.rights_right {
		align-self: flex-end;
	}

	.rights_rights {
		display: flex;
		width: 320rpx;
		align-self: flex-end;
		justify-content: flex-end;
	}

	.last_left {
		width: 160rpx;
		line-height: 60rpx;
		border: solid 1rpx #EDB970;
		color: #EDB970;
		text-align: center;
		background-color: #F2F4FF;
		border-radius: 20rpx;
		margin-top: 30rpx;
		margin-right: 20rpx;
	}
	
	.nothingbox{
		width:50%;
		justify-content: space-between;
		display: flex;
		/* border:1rpx solid red; */
		align-self: flex-end;
	}
	.barner_last {
		width: 160rpx;
		line-height: 60rpx;
		border: solid 1rpx #90A1D9;
		color: #90A1D9;
		text-align: center;
		background-color: #F2F4FF;
		border-radius: 20rpx;
		margin-top: 30rpx;
	}
	/* 占位用,防止样式变形 */
	.kongbarner_last{
		width: 160rpx;
		line-height: 60rpx;
		margin-top: 30rpx;
	}

	.last_bottom {
		position: absolute;
		right: 30rpx;
		bottom: 30rpx;
	}

	/* model */
	.cu-dialog {
		border-radius: 20rpx;
	}

	.button_color {
		width: 680rpx;
		height: 260rpx;
		background-color: #FFFFFF;
	}

	.button_top {
		width: 680rpx;
		line-height: 130rpx;
		color: #3F57AD;
		font-size: 38rpx;
		;
	}

	.button_middle {
		width: 680rpx;
		height: 120rpx;
		display: flex;
		font-size: 30rpx;
		justify-content: center;
		color: #000000;
	}

	.button_bottom_left {
		width: 50%;
		line-height: 88rpx;
		border-top: 1px solid #E1E1E1;
		background-color: #FFFFFF;
	}

	.button_bottom_right {
		width: 50%;
		line-height: 88rpx;
		border-left: 1px solid #E1E1E1;
		border-top: 1px solid #E1E1E1;
		color: #3F57AD;
		background-color: #FFFFFF;
	}

	.uni-loadmore {
		text-align: center;
	}
</style>
