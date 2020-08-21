<template>
	<view class="box">
		<view class="border">
			<view class="border_input">
				<input type="text" placeholder="请输入商户姓名" v-model="searchvalue" @confirm='seachbtn' />
			</view>
			<view class=" border_big flexs2">
				<view class="flexs1" @click="hidden">
					<view class="new_title">{{data_text}}</view>
					<image class="barner_next" src="../../static/image/icon_h_sanjiao_hui@2x.png" mode=""></image>
				</view>
				<view class="flexs1" @click='transcation'>
					<view class="">本月交易额</view>
					<view class="border_image">
						<image class="barner_next" src="../../static/image/icon_h_sanjiao_lan@2x.png" v-if="transfore== 1 || transfore== ''"></image>
						<image class="barner_next" src="../../static/image/shaixuan.png" mode="" v-else></image>
						<image class="barner_next" src="../../static/image/icon_h_sanjiao_hui@2x.png" mode="" v-if="transfore== 1 || transfore== ''"></image>
						<image class="barner_next" src="../../static/image/123456.png" mode="" v-else></image>
					</view>
				</view>
				<view class="flexs1" @click='transcationTime'>
					<view class="">入网时间</view>
					<view class="">
						<image class="barner_next" src="../../static/image/icon_h_sanjiao_lan@2x.png" v-if="interstatus== 1 || interstatus== ''"></image>
						<image class="barner_next" src="../../static/image/shaixuan.png" v-else></image>
						<image class="barner_next" src="../../static/image/icon_h_sanjiao_hui@2x.png" v-if="interstatus== 1 || interstatus== ''"></image>
						<image class="barner_next" src="../../static/image/123456.png" mode="" v-else></image>
					</view>
				</view>
			</view>
			<!-- model -->
			<view class="model" v-show="data">
				<view class="barner_list" :class="{'barner_lists':data_text=='{{item.type_text}}' }" v-for="(item,index) in data_list"
				 :key=index @click="choose(index)">{{item.type_text}}</view>
				<!-- <view class="barner_list" :class="{'barner_lists':data_text=='旺铺商户' }" @click="choose('旺铺商户')">旺铺商户</view> -->
				<view class="barner_list" :class="{'barner_lists':data_text=='全部商户' }" @click="chooseAll()">全部商户</view>
			</view>
		</view>
		<view class="list_title">共{{merchantlist.length}}户</view>
		<view class="big_list ">
			<block v-for='(item,index) in merchantlist' :key='index'>
				<view class="list flexs2" @click="tophotos(item.posSerialNumber)">
					<view class="flexs1">
						<image class="list_image" src="../../static/defaultavatar.png" mode=""></image>
						<view class="list_name">{{item.merchantName}}</view>
					</view>
					<view class="moneystyle">
						<view class="list_money text-bold">{{item.money}}元</view>
						<view class="list_month">本月商户交易额</view>
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
				data: false,
				data_text: "商户类型",
				// 交易状态
				transfore: 1,
				// 入网状态
				interstatus: 1,
				// 搜索框值
				searchvalue: '',

				merchantlist: [],
				page: 1,
				limit: 10,
				lisize: 0,
				loadMoreText: "加载中...",
				showLoadMore: false,
				type: '',
				data_list: ''
			}
		},
		onShow() {
			this._getmerchant()
			this.get_my_num()
		},
		onUnload() {
			this.merchantlist = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onPullDownRefresh() { //监听下拉刷新动作
			this.page = 1;
			this._getmerchant();
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
					this._getmerchant();
				} else {
					this.loadMoreText = "暂无更多";
					this.showLoadMore = false;
				}
			}, 1000);
		},
		methods: {
			seachbtn(e) {
				console.log(e.detail.value)
				this.searchvalue = e.detail.value
				this._getmerchant()
			},
			get_my_num() {
				this.$common.requests('/api/pos/get_my_pos_num').then(res => {
					if (res.data.code == 1) {
						this.data_list = res.data.data
						// this.data_list = uni.getStorageSync('data_list')
						console.log(this.data_list)
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			_getmerchant() {
				var obj = {}
				if (this.data_text_text == '商户类型') {
					obj = {
						page: this.page,
						limit: this.limit,
						money_type: this.transfore,
						access_type: this.interstatus,
						// type:this.data_text
						type: '',
						friend_name: this.searchvalue
					}
				} else {
					obj = {
						page: this.page,
						limit: this.limit,
						money_type: this.transfore,
						access_type: this.interstatus,
						type: this.type,
						friend_name: this.searchvalue
					}
				}
				this.$common.requests('/api/shops/get_shops_list', obj).then(res => {
					if (res.data.code == 1) {
						this.lisize = res.data.data.length;
						if (this.lisize == 0){
							this.$api.msg('暂无数据')
							 return;
						}
						if (this.page == 1) {
							this.merchantlist = res.data.data
						} else {
							this.merchantlist = this.merchantlist.concat(res.data.data);
						}
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			tophotos(posSerialNumber) {
				uni.navigateTo({
					url: "../merchant/phones?posSerialNumber=" + posSerialNumber
				})
			},
			chooseAll() {
				//选择商户类型
				this.type = '';
				this.data_text = "全部商户";
				this.page = 1;
				this.merchantlist = [];
				this._getmerchant();
				this.data = false;
				// setTimeout(()=>{
				// 	//咱也不知道啊,咱也不敢问啊
				// 	this.data=false;
				// },300)
			},
			choose(index) {
				//选择商户类型
				this.type = this.data_list[index]['type'];
				this.data_text = this.data_list[index]['type_text'];
				this.page = 1;
				this.merchantlist = [];
				this._getmerchant();
				this.data = false;
				// setTimeout(()=>{
				// 	//咱也不知道啊,咱也不敢问啊
				// 	this.data=false;
				// },300)
			},
			hidden() {
				this.data = !this.data;
				this.get_my_num()
			},
			// 本月交易额
			transcation() {
				// 当交易额为空时,默认状态（因为入网时间增加一个空状态，这里判断）
				if (this.transfore == '') {
					this.interstatus = ''
					this.transfore = 2;
					this.page = 1;
					this.data_list = [];
					this._getmerchant()
					return
				}
				if (this.transfore == 1) {
					this.interstatus = ''
					this.transfore = 2;
					this.page = 1;
					this.data_list = [];
					this._getmerchant()
					return
				}
				if (this.transfore == 2) {
					this.interstatus = ''
					this.transfore = 1;
					this.page = 1;
					this.data_list = [];
					this._getmerchant();
					return
				}

			},
			// 入网时间条件筛选
			transcationTime() {
				// 当入网时间为空时,设置默认状态（因为交易金额增加一个空状态，这里判断）
				if (this.interstatus == '') {
					this.transfore = ''
					this.interstatus = 2;
					this.page = 1;
					this.data_list = [];
					this._getmerchant();
					return
				}
				if (this.interstatus == 1) {
					this.transfore = ''
					this.interstatus = 2;
					this.page = 1;
					this.data_list = [];
					this._getmerchant();
					return
				}
				if (this.interstatus == 2) {
					this.transfore = ''
					this.interstatus = 1;
					this.page = 1;
					this.data_list = [];
					this._getmerchant();
					return
				}
			}
		}
	}
</script>

<style>
	.uni-loadmore {
		text-align: center;
	}

	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #F2F2F2;
	}

	/* model */
	.model {
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
		position: absolute;
		z-index: 100;
	}

	.barner_list {
		width: 100%;
		line-height: 80rpx;
		background-color: #FFFFFF;
		color: #737373;
		text-align: center;
		border-bottom: 1px solid #F2F2F2
	}

	.barner_list:hover {
		width: 100%;
		line-height: 80rpx;
		background-color: #5B7FFA;
		color: #FFFFFF;
		text-align: center;
	}

	/* border */
	.border {
		width: 100%;
		height: 180rpx;
		background-color: #FFFFFF;
	}

	.border_big {
		width: 100%;
		line-height: 120rpx;
		padding: 0 30rpx;
	}
	.new_title{
		width:120rpx;
		text-align: center;
	}
	.barner_next {
		width: 26rpx;
		height: 16rpx;
		display: block;
		margin-left: 20rpx;
	}

	.border_input {
		width: 92%;
		height: 60rpx;
		margin: 0 4%;
		background-color: #E5E5E5;
		border-radius: 50rpx 50rpx;
		display: flex;
		align-items: center;
	}

	.border_input input {
		/* border:1rpx solid red; */
		height: 60rpx;
		line-height: 60rpx;
		width: 100%;
		padding-left: 46rpx;
	}

	/* list */
	.list_title {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		padding-left: 30rpx;
		background-color: #F2F2F2;
		font-size: 32rpx;
	}

	.list {
		width: 100%;
		height: 170rpx;
		background-color: #FFFFFF;
		padding: 0 10rpx 0 30rpx;
		margin-top: 20rpx;
	}
	.moneystyle{
	/* width:400rpx; */
	height:auto;
	}
	.list_image {
		width: 120rpx;
		height: 120rpx;
	}

	.list_name {
		margin-left: 30rpx;
	}

	.list_money {
		width: 300rpx;
		height: 60rpx;
		color: #F00706;
		font-size: 34rpx
	}

	.list_month {
		color: #989898;
	}

	.big_list {
		width: 100%;
		height: calc(100% - 280rpx);
		overflow-y: scroll;
	}

	.uni-input-placeholder {
		font-size: 28rpx;
		letter-spacing: 3rpx;
	}
</style>
