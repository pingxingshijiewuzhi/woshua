<template>
	<view class="box">
		<view class="border flexs3">
			<view @click='clickbtn(1)' class='border_left flexs' :class="{'chooseactive':currentIndex==1}">全部</view>
			<view @click='clickbtn(2)' class='border_left flexs' :class="{'chooseactive':currentIndex==2}">收入</view>
			<view @click='clickbtn(3)' class='border_left flexs' :class="{'chooseactive':currentIndex==3}">支出</view>
		</view>
		<view class="box_hight" v-show="currentIndex==1">
			<view class="box_list" v-for="(item,index) in user" :key="index">
				<view class="time">{{item.month}}</view>
				<block v-for="(initem,inindex) in item.list" :key="inindex">
					<view class="time_top flexs2" @click="tolist(initem.id)">
						<view class="time_left">
							<view class="time_jiju">{{initem.source}}</view>
							<view class="time_tim">{{initem.createtime}}</view>
						</view>
						<view class="time_right" v-show="initem.statis==1">+<text class="number">{{initem.num}}</text></view>
						<view class="time_right" v-show="initem.statis==2">-<text class="number">{{initem.num}}</text></view>
					</view>
				</block>
			</view>
		</view>
		<view class="box_hight" v-show="currentIndex==2">
			<view class="box_list" v-for="(item,index) in process" :key="index">
				<view class="time">{{item.month}}</view>
				<view class="time_top flexs2" v-for="(item1,index1) in item.list" :key="index1">
					<view class="time_left" @click="tolists(item1.id)">
						<view class="time_jiju">{{item1.source}}</view>
						<view class="time_tim">{{item1.createtime}}</view>
					</view>
					<view class="time_right" v-show="item1.statis==1">+<text class="number">{{item1.num}}</text></view>
					<view class="time_right" v-show="item1.statis==2">-<text class="number">{{item1.num}}</text></view>
				</view>
			</view>
		</view>
		<view class="box_hight" v-show="currentIndex==3">
			<view class="box_list" v-for="(item,index) in outmoney" :key="index">
				<view class="time">{{item.month}}</view>
				<view class="time_top flexs2" v-for="(item2,index2) in item.list" :key="index2">
					<view class="time_left" @click="tolistss(item2.id)">
						<view class="time_jiju">{{item2.source}}</view>
						<view class="time_tim">{{item2.createtime}}</view>
					</view>
					<view class="time_right" v-show="item2.statis==1">+<text class="number">{{item2.num}}</text></view>
					<view class="time_right" v-show="item2.statis==2">-<text class="number">{{item2.num}}</text></view>
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
				limit: 10,
				page: 1,
				pagea: 1,
				pageb: 1,
				lisize: 0, //本次加载数量
				loadMoreText: "加载中...",
				showLoadMore: false,
				status: '',
				user: [],
				process: [],
				outmoney: []
			}
		},
		onLoad() {
			this.getdate()
		},
		onUnload() {
			this.user = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onPullDownRefresh() { //监听下拉刷新动作
			if (this.currentIndex == 0) {
				this.page = 1;
			};
			if (this.currentIndex == 1) {
				this.pagea = 1;
			};
			if (this.currentIndex == 2) {
				this.pageb = 1;
			};
			this.getdate();
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onReachBottom() { //监听上拉触底事件
			// console.log(this.lisize)
			this.showLoadMore = true
			setTimeout(() => {
				//获取数据
				if (this.lisize != 0) {

					if (this.currentIndex == 3) {
						this.pageb++;
					};
					if (this.currentIndex == 1) {
						this.page++;
					};
					if (this.currentIndex == 2) {
						this.pagea++;
					};
					this.getdate();
					this.showLoadMore = false;
				} else {
					this.loadMoreText = "暂无更多";
					this.showLoadMore = false;
				}
			}, 1000);
		},
		methods: {
			clickbtn(index) {
				this.currentIndex = index
				if (this.currentIndex == 0) {
					this.page = 1;
				};
				if (this.currentIndex == 1) {
					this.pagea = 1;
				};
				if (this.currentIndex == 2) {
					this.pageb = 1;
				};
				this.getdate()
			},
			tolist(id) {
				uni.navigateTo({
					url: '../myIntegral/details?id=' + id
				})
			},
			tolists(id) {
				uni.navigateTo({
					url: '../myIntegral/details?id=' + id
				})
			},
			tolistss(id) {
				uni.navigateTo({
					url: '../myIntegral/details?id=' + id
				})
			},
			getdate() {
				var that = this
				var mypage = '';
				if (this.currentIndex == 3) {
					mypage = this.pageb;
					this.status = 2;
				};
				if (this.currentIndex == 1) {
					mypage = this.page;
					this.status = '';
				};
				if (this.currentIndex == 2) {
					mypage = this.pagea;
					this.status = 1;
				};
				let obj = {
					page: mypage,
					limit: this.limit,
					status: this.status,
				}
				this.$common.requests('/api/integral/get_integral_list', obj).then(res => {
					if (res.data.code == 1) {
						this.lisize = res.data.data.length;
						if (this.lisize == 0) {
							this.$api.msg(res.data.msg)
							return ;
						}
						if (this.currentIndex == 1) {
							if(this.page == 1){
								this.user = res.data.data;
								console.log(res.data.data)
							}else{
								// console.log(res.data.data,555)
								var aa = that.user.length//当前展示数组的长度
								var aa_month = that.user[aa-1].month;//当前展示数组的最后一个月分
								// console.log(aa_month);
								var bb_month = res.data.data[0].month;//最新拿到的数组的第一个月份
								// console.log(bb_month)
								if(aa_month == bb_month){
									//月份相等
									res.data.data[0]['list'].forEach(item=>{
										that.user[aa-1].list.push(item)
									})
									let bb = res.data.data.splice(0,1)
									res.data.data.forEach(item=>{
										that.user.push(item)
									})
								}else{
									that.user = that.user.concat(res.data.data);
								}
							}
						}
						if (this.currentIndex == 2) {
							if(this.pagea == 1){
								this.process = res.data.data;
							}else{
								var aa = that.process.length//当前展示数组的长度
								var aa_month = that.process[aa-1].month;//当前展示数组的最后一个月分
								// console.log(aa_month);
								var bb_month = res.data.data[0].month;//最新拿到的数组的第一个月份
								// console.log(bb_month)
								if(aa_month == bb_month){
									//月份相等
									res.data.data[0]['list'].forEach(item=>{
										that.process[aa-1].list.push(item)
									})
									let bb = res.data.data.splice(0,1)
									res.data.data.forEach(item=>{
										that.process.push(item)
									})
								}else{
									that.process = that.process.concat(res.data.data);
								}
							}
						}
						if (this.currentIndex == 3) {
							if(this.pageb == 1){
								this.outmoney = res.data.data;
							}else{
								var aa = that.outmoney.length//当前展示数组的长度
								var aa_month = that.outmoney[aa-1].month;//当前展示数组的最后一个月分
								// console.log(aa_month);
								var bb_month = res.data.data[0].month;//最新拿到的数组的第一个月份
								// console.log(bb_month)
								if(aa_month == bb_month){
									//月份相等
									res.data.data[0]['list'].forEach(item=>{
										that.outmoney[aa-1].list.push(item)
									})
									let bb = res.data.data.splice(0,1)
									res.data.data.forEach(item=>{
										that.outmoney.push(item)
									})
								}else{
									that.outmoney = that.outmoney.concat(res.data.data);
								}
							}
						}
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			}
		},
	}
</script>

<style>
	.box {
		width: 100vw;
	}

	.border {
		width: 100%;
		height: 80rpx;
		background-color: #FFFFFF;
		font-weight: 600;
	}

	.border_left {
		width: 100rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		text-align: center;
	}

	.chooseactive {
		width: 100rpx;
		height: 80rpx;
		font-size: 32rpx;
		font-weight: 600;
		color: #6180DE;
		border-bottom: solid 2rpx #6180DE;
	}

	.time {
		width: 100%;
		line-height: 100rpx;
		padding: 0 24rpx;
		font-size: 34rpx;
	}

	.time_tim {
		color: #878787;
		margin-top: 20rpx;
	}

	.time_top {
		width: 100%;
		height: 160rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}

	.time_jiju {
		font-size: 30rpx;
		color: #6180DE;
		font-weight: 500;
	}

	.time_right {
		color: #E53230;
		font-weight: 600;
	}

	.number {
		font-size: 36rpx;
	}

	.box_hight {
		width: 100%;
		height: calc(100vh -300rpx);
		overflow-y: scroll;
	}

	.uni-loadmore {
		text-align: center;
	}
</style>
