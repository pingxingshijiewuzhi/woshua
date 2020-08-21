<template>
	<view class="box">
		<view class="border ">
			<view class=" border_number flexs">{{num}}</view>
			<view class=" border_jihuo flexs">{{source}}</view>
		</view>
		<view class="center">
			<block v-for="(item,index) in list" :key="index">
				<view class="center_list mt  flexs2" v-if="item.name == '机具编码'" @click='screenmore'>
						<view class="">{{item.name}}</view>
						<view class="arrowsbox">
							<view>{{item.value}}</view>
							<image class="penarrows" src="../../static/image/btn_psdz_xyb@2x.png"></image>
						</view>
				</view>
				<view class="center_list mt flexs2" v-else>
					<view class="">{{item.name}}</view>
					<view class="">{{item.value}}</view>
				</view>
			</block>
			
			<!-- <view class="center_list  flexs2">
				<view class="">新机编号</view>
				<view class="">2121212121</view>
			</view>
			<view class="center_list  flexs2">
				<view class="">商户</view>
				<view class="">李晓</view>
			</view>
			<view class="center_list  flexs2">
				<view class="">创建时间</view>
				<view class="">2121-2-1 21:21:21</view>
			</view> -->
		</view>
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
				id: '',
				list: [],
				num: '',
				source: '',
				
				// 更多机具列表
				moreTool:[],
				showmoreStatus:false
			}
		},
		onLoad(option) {
			this.id = option.id
			this.get_detail();
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
			get_detail() {
				let obj = {
					integral_id: this.id
				}
				this.$common.requests('/api/integral/get_integral_detail', obj).then(res => {
					if (res.data.code == 1) {
						this.list = res.data.data.list;
						this.num = res.data.data.num;
						this.source = res.data.data.source;
						this.moreTool = res.data.data.newtool
						console.log(res.data.data);
					} else {
						this.$api.msg(res.data.msg);
					}
				});
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
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.box {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
	}

	.border {
		width: 100%;
		height: 280rpx;
		overflow: hidden;
		border-bottom: solid 1rpx #E5E5E5;
	}

	.border_number {
		width: 100%;
		height: 100rpx;
		margin-top: 80rpx;
		font-size: 48rpx;
		font-size: 600;
		color: #EC2726;
	}

	.border_jihuo {
		width: 100%;
		height: 100rpx;
		color: #6982DC;
		font-size: 34rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
		letter-spacing: 4rpx;
	}

	.center_list {
		width: 100%;
		height: 60rpx;
		padding: 0 30rpx;
		font-size: 32rpx;
		color: #383838;
	}

	.mt {
		margin-top: 20rpx;
	}
	
	
	/* 特殊状态栏有展开效果 */
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
