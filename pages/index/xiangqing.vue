<template>
	<view class="box">
		<view class="border">
			<view class="border_number flexs" v-show="money">{{money}}</view>
			<view class="border_jine flexs" v-show="status">{{status}}</view>
		</view>
		<view class="box_list"></view>
		<block v-for="(item,index) in noticeList.list" :key="index">
			<view class="time flexs2" v-if="item.name == '新机编号'" @click='screenmore'>
					<view class="">{{item.name}}</view>
					<view class="arrowsbox">
						<view>{{item.value}}</view>
						<image class="penarrows" src="../../static/image/btn_psdz_xyb@2x.png"></image>
					</view>
			</view>
			<view class="time flexs2" v-else>
				<view class="time_left">{{item.name}}</view>
				<view class="time_right">{{item.value}}</view>
			</view>
		</block>
		<!-- 显示更多机具 -->
		<view v-if='showmoreStatus' class='morebox'>
			<view class='head_time'>
				<view>共{{moreTool.count}}台</view>
				<view>新机编号</view>
				<image src="../../static/close.png" mode="" @click='closemore'></image>
			</view>
			<scroll-view class='content_time' scroll-y="true">
				<block v-for='(item,index) in moreTool.list' :key='index'>
					<view class="moretime flexs2" >
						<view class='flexs2'>
							<view class='bianmaqian'>{{item | graphic}}</view>
							<view class='addyellow'>{{item | format}}</view>
						</view>
						<view class="">{{Number(index) + 1}}</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '',
				status: '',
				createtime: '',
				bank_num: '',
				order_num: '',
				notice_id: '',
				noticeList: [],
				
				// 更多机具列表
				moreTool:[],
				showmoreStatus:false
			}
		},
		onLoad(option) {
			this.notice_id = option.index //消息的id
			this.get_notice_detail();
		},
		filters:{
			format(item){
				// console.log(item.length)
				// substring返回截取
				let aa = item.substring(item.length-6)
				// console.log(aa)
				// substring不修改原来字符串
				// console.log(item)
				return aa
			},
			graphic(item){
				let bb = item.slice(0,item.length-6)
				return bb
			}
		},
		methods: {
			get_notice_detail() {
				var obj = {
					notice_id: this.notice_id
				}
				this.$common.requests('/api/index/get_notice_detail', obj).then(res => {
					if (res.data.code == 1) {
						this.noticeList = res.data.data;
						console.log(this.noticeList)
						this.moreTool = res.data.data.newtool
						this.money = res.data.data.data.money
						console.log(this.money)
						this.status = res.data.data.data.status
						// this.createtime = res.data.data.createtime
						// this.bank_num = res.data.data.bank
						// this.order_num = res.data.data.order_num
						// this.$api.msg(res.data.msg);
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			tomingxi() {
				uni.navigateTo({
					url: "../myWallet/detail"
				})
			},
			screenmore(){
				this.showmoreStatus = true
			},
			closemore(){
				this.showmoreStatus = false
			}
		}
	}
</script>

<style>
	.box {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #FFFFFF;
		overflow-y: scroll;
		position: relative;
	}

	.border {
		width: 100%;
		height: 200rpx;
		margin-top: 20rpx;
		border-bottom: solid 1rpx #E5E5E5;
	}

	.border_number {
		font-size: 36px;
		color: #577FFA;
		margin-top: 40rpx;
	}

	.border_jine {
		font-size: 30rpx;
		color: #595959;
		margin-top: 22rpx;
	}

	.time {
		width: 100%;
		height: auto;
		/* height: 150rpx; */
		font-size: 30rpx;
		border-bottom: solid 1rpx #E5E5E5;
		padding: 20rpx 20rpx;
	}
	.time_left{
		width:200rpx;
		height:50rpx;
		line-height: 50rpx;
		/* border:1rpx solid red; */
	}
	.time_right{
		text-align: right;
		height:auto;
		width:500rpx;
		/* border:1rpx solid red; */
	}
	.arrowsbox{
		display: flex;
	}
	/* 箭头 */
	.penarrows{
		width:18rpx;
		height:30rpx;
		margin-left: 20rpx;
	}
	
	/* 模态框跟过机具 */
	.morebox{
		position: absolute;
		left:0;
		right:0;
		bottom:0;
		height:550rpx;
		/* border:1rpx solid red; */
		overflow: hidden;
		background-color: #FFFFFF;
	}
	/* 单独给更多机具头部样式 */
	.head_time{
		width: 100%;
		height: 150rpx;
		font-size: 30rpx;
		border-bottom: solid 1rpx #E5E5E5;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.head_time image{
		width:30rpx;
		height:30rpx;
	}
	.content_time{
		height:400rpx;
		width:100%;
	}
	.moretime {
		width: 100%;
		height: 100rpx;
		font-size: 30rpx;
		border-bottom: solid 1rpx #E5E5E5;
		padding: 0 20rpx;
	}
	.bianmaqian {
		margin-right: 10rpx;
		line-height: 100rpx;
		height: 100rpx;
	}
	.addyellow {
		height: 100rpx;
		line-height: 100rpx;
		/* width:30%; */
		color: #E7A342;
		font-size: 40rpx;
	}
</style>
