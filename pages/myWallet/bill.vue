<template>
	<view class="box">

		<!-- border -->
		<view class="border">
			<view class="border_top flexs2">
				<image class="border_image" @click="back" src="../../static/image/0000.png" mode=""></image>
				<view class="border_text">我的账单</view>
				<view class=" border_right" @tap="showModal" data-target="DialogModal1">筛选</view>
			</view>
		</view>
		<!-- cneter -->
		<view class="bordercopy">
		</view>
		<view class="year_box">
			<block v-for="(item,index) in billList" :key="index">
				<view class="year">
					<view class="month">{{item.month}}月</view>
					<view class="four_box">
						<block v-for="(initem,inindex) in item.list" :key="inindex">
							<view class="four flexs2" @click="gobilldetail(initem.id,initem.type)">
								<view class="four_left">
									<view class="four_times">{{initem.type_text}}</view>
									<view class="four_time">{{initem.createtime}}</view>
								</view>
								<view class="four_money">{{initem.money}}</view>
							</view>
						</block>
					</view>
				</view>
			</block>
		</view>
		<!--弹框 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end content">
					<view class="content">月份</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="row">
						<view class="rows flexs1">
							<view class="value">
								<BiaofunDatetimePicker :placeholder="_getTime()" ref='datetime' fields="month" @change="changeDatetimePicker">
								</BiaofunDatetimePicker>
							</view>
							<image src="../../static/image/123456.png" mode="widthFix" class="icon-right"></image>
						</view>
					</view>
					<view class=" ">
						<view class="title flexs1">类型</view>
						<view class="radio_box ">
							<block v-for='(item,index) in typeArray' :key='index'>
								<view class="radio_list" :class="{'typeactive':opacityindex==index}" @click='clickbtn(index)'>{{item}}</view>
							</block>
						</view>
					</view>
				</view>
				<view class=" flexs1">
					<button class="action_left" @tap="overset">重置</button>
					<button class="action_right" @tap="entrust">确定</button>
				</view>
			</view>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>
<script>
	import BiaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	export default {
		components: {
			BiaofunDatetimePicker
		},
		data() {
			return {
				modalName: null,
				// 账单数组
				billList: [],
				// 类型数组
				typeArray: ['全部','结算款','提现'],
				opacityindex: 0,
				data:this._getTime(),
				// type:'激活奖励',
				// data: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
				dataStatus: false,
				type: '',
				page: 1,
				limit: 10,
				lisize: 0,
				loadMoreText: "加载中...",
				showLoadMore: false,
			}
		},
		onUnload() {
			this.billList = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onPullDownRefresh() { //监听下拉刷新动作
			this.page = 1;
			this._getmybill();
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onReachBottom() { //监听上拉触底事件
			this.showLoadMore = true
			setTimeout(() => {
				//获取数据
				if (this.lisize != 0) {
					this.page++;
					this._getmybill();
				} else {
					this.loadMoreText = "暂无更多";
					this.showLoadMore = false;
				}
			}, 1000);
		},
		computed: {
			// data()=>{
			// 	let date = new Date();
			// 	let year = date.getFullYear();
			// 	let month = date.getMonth()+1;
			// 	let day = date.getDay();
			// 	month = Number(month) > 9 ? month : "0"+ month 
			// 	return year+"-"+month;
			// }
		},
		onShow() {
			this._getmybill()
		},
		methods: {
			_getmybill() {
				var that = this
				// 切换月份page重新开始
				if (this.dataStatus) {
					// 清空原来数据
					this.billList = []
					this.page = 1
				}
				let obj = {
					type: this.type,
					date: this.data,
					page: this.page,
					limit: this.limit
				}
				console.log(obj)
				this.$common.requests('/api/money/get_water_list', obj).then(res => {
					if (res.data.code == 1) {
						this.lisize = res.data.data.length;
						if (this.lisize == 0 && this.dataStatus) {

							this.$api.msg('暂无更多数据')
							return;
						}
						if (this.page == 1) {
							this.billList = res.data.data
						} else {
							// console.log(res.data.data,555)
							var aa = that.billList.length//当前展示数组的长度
							var aa_month = that.billList[aa-1].month;//当前展示数组的最后一个月分
							// console.log(aa_month);
							var bb_month = res.data.data[0].month;//最新拿到的数组的第一个月份
							// console.log(bb_month)
							if(aa_month == bb_month){
								//月份相等
								res.data.data[0]['list'].forEach(item=>{
									that.billList[aa-1].list.push(item)
								})
								let bb = res.data.data.splice(0,1)
								res.data.data.forEach(item=>{
									that.billList.push(item)
								})
							}else{
								that.billList = that.billList.concat(res.data.data);
							}
						
						}
					} else {
						//console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 点击筛选 type默认空
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				this.type = ''
			},
			hideModal(e) {
				this.modalName = null
			},
			// 筛选确定
			entrust() {
				this.modalName = null
				this._getmybill()
			},
			// 重置参数
			overset() {
				this.opacityindex = 0
				// 重置类型为空
				this.type = ''
				this.$refs.datetime.dateStr = this._getTime()
				this.modalName = null
				this._getmybill()
			},
			_getTime() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDay();
				// month = Number(month) > 9 ? month : "0"+ month 
				// day = Number(day) > 9 ? day : "0"+ day 
				return year + "-" + month;
			},
			// 弹框日期选择
			changeDatetimePicker(date) {
				console.log(date)
				// 判断日期是否发生变化,如果发生变化则重新定义页码
				if (this.data != date.YYYY + '-' + date.M) {
					this.dataStatus = true
				} else {
					this.dataStatus = false
				}
				this.data = date.YYYY + '-' + date.M
			},
			// 弹框类型选择
			clickbtn(num) {
				if(num == 0){
					this.type = ''
				}else{
					this.type = num 
				}
				this.opacityindex = num
				console.log(this.type,'选中type')
				// 类型:1=结算款1,2=结算款2,3=结算款3,4=激活奖励,5=提现,6=活动礼包购物,7=积分兑换购物
				// this.type = this.typeArray[num]
			},
			// 进入页面详情
			gobilldetail(billid,type) {
				if(type<=3){
					uni.navigateTo({
						url:"accountbill??billid="+billid 
					})
				}else{
					uni.navigateTo({
						url: '../data/billdetail?billid=' + billid
					})
				}
				
			},
			// tozhangdan(){
			// 	uni.navigateTo({
			// 		url:"../myWallet/accountbill"
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.uni-loadmore {
		text-align: center;
	}

	.box {
		width: 100vw;
		background-color: #F2F2F2;
		height: 100vh;
		// overflow-y: scroll;
	}

	.four_times {
		font-size: 34rpx;
		color: #505050;
	}

	.four_money {
		font-size: 34rpx;
	}

	/* border */
	.border {
		height: 120rpx;
		background-color: #5A7EF8;
		padding: 30rpx 20rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	.bordercopy {
		width: 100%;
		height: 120rpx;
		background-color: #5A7EF8;
		padding: 30rpx 20rpx;
	}

	.border_image {
		width: 40rpx;
		height: 34rpx;
	}

	.border_text {
		font-size: 38rpx;
		color: #FCFFFC;
	}

	.border_right {
		font-size: 28rpx;
		color: #DDE9F4;
	}

	.border_top {
		width: 100%;
		height: 100rpx;
	}

	/* center */
	.month {
		width: 98%;
		line-height: 100rpx;
		padding-left: 2%;
		letter-spacing: 2rpx;
		color: #999999;
	}

	.four_box {
		width: 100%;
		// height: 540rpx;
		// overflow-y: scroll;
	}

	.four {
		width: 100%;
		height: 180rpx;
		padding: 0 2%;
		background-color: #FFFFFF;
		border-bottom: solid 1rpx #F2F2F2;
		font-size: 32rpx;
	}

	.four_left {
		color: #626262;
	}

	.four_time {
		margin-top: 20rpx;
	}

	.year_box {
		width: 100%;
		// height: 1100rpx;
		overflow-y: scroll;
	}

	/* model */
	.text-red {
		width: 40rpx;
		height: 40rpx;
		border: solid 1rpx #000000;
		color: #000000;
		border-radius: 50% 50%;
	}

	.icon-right {
		width: 40rpx;
		height: 30rpx;
	}

	.content {
		width: 100% !important;
		height: 70rpx;
		color: #000000;
	}

	.value {
		flex: 1;
		padding: 0 16upx;
	}

	.row {
		display: flex;
		font-size: 30upx;
		line-height: 100rpx;
		padding: 0 30upx;
		z-index: 99;
		border-bottom: solid 1rpx #E5E5E5;
	}

	.rows {
		margin: 0 auto;
	}

	.row:after {
		content: '';
		height: 1px;
		left: 30upx;
		bottom: 0;
		background: #e4e5e6;
		z-index: 10;
		position: absolute;
	}

	.label {
		flex-shrink: 0;
	}

	.value {
		flex: 1;
		padding: 0 16upx;
	}

	.cu-modal {
		z-index: 11;
	}

	.padding-xl {
		background-color: #FFFFFF;
		padding: 0;
	}

	.title {
		width: 100%;
		height: 50rpx;
		font-size: 34rpx;
		padding: 20rpx 0 0 20rpx;
	}

	.radio_box {
		width: 100%;
		text-align: left;
	}

	.cu-form-group {
		width: 100%;
		height: 300rpx;
	}

	.radio_list {
		width: 21%;
		line-height: 60rpx;
		display: inline-block;
		text-align: center;
		border-radius: 10rpx 0rpx;
		background-color: #F2F2F2;
		margin: 0 0rpx 30rpx 20rpx;
		font-size: 28rpx;
		border-radius: 50rpx 50rpx;
	}
	.radio_list:nth-child(1){
		margin-top: 30rpx;
	}
	.action_left {
		width: 50%;
		line-height: 100rpx;
	}
	.action_left:hover {
		width: 50%;
		line-height: 100rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
	}

	.action_right:hover {
		width: 50%;
		line-height: 100rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
	}

	.action_right {
		width: 50%;
		line-height: 100rpx;
	}

	.cu-dialog {
		position: absolute;
		transform: translateY(70%);
		right: 36rpx;
	}

	// 选中样式
	.typeactive {
		color: #FFFFFF;
		background-color: #5A7EF8;
	}
</style>
