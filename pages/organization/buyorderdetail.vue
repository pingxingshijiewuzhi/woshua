<template>
	<view class='rukudetail'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/btn_h_fanhui@2x.png" mode=""></image>
				<view class="mytabbar_text">{{detailobj.status_text}}</view>
				<view class=" mytabbar_right"></view>
			</view>
		</view>
		<view class='rukudetail_header'>
			<view class='imgbox'>
				<image src="../../static/pic/icon_d_cg@2x.png" mode=""></image>
			</view>
			<view class='opacitytitle'>{{detailobj.status_text}}</view>
		</view>
		<view class='rukudetail_content'>
			<view class='contetn_item'>
				<view class='item_left'>订单编号</view>
				<view class='item_right'>{{detailobj.order_num}}</view>
			</view>
		</view>
		<block v-if='detailobj.status != 5'>
			<view class='rukudetail_content'>
				<view class='contetn_item'>
					<view class='item_left'>机具台数</view>
					<view class='item_right'>{{detailobj.num}}</view>
				</view>
			</view>
			
		</block>
		<view class='rukudetail_content'>
			<view class='contetn_item'>
				<view class='item_left'>创建时间</view>
				<view class='item_right'>{{detailobj.createtime}}</view>
			</view>
		</view>
		<view class='rukudetail_content'>
			<view class='contetn_item'>
				<view class='item_left'>支付时间</view>
				<view class='item_right'>{{detailobj.pay_time}}</view>
			</view>
		</view>
		<view class='rukudetail_content'>
			<view class='contetn_item'>
				<view class='item_left'>支付方式</view>
				<view class='item_right'>{{detailobj.pay_type_text}}</view>
			</view>
		</view>
		<view class='rukudetail_content'>
			<view class='contetn_item'>
				<view class='item_left'>订单金额</view>
				<view class='item_right'>{{detailobj.price}}</view>
			</view>
		</view>
		<block v-if='mylengths != 0'>
			<view class='rukudetail_content' @click='screenmore'>
				<view class='contetn_item'>
					<view class='item_left'>新机编号</view>
					<view class='arrowsbox'>
						<view>{{detailobj.tools_list.first}}</view>
						<image class="penarrows" src="../../static/image/btn_psdz_xyb@2x.png"></image>
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class='item_right'></view>
		</block>
		<!-- 显示更多机具 -->
		<view v-if='showmoreStatus' class='morebox' >
			<view class='head_time'>
				<view>共{{detailobj.num}}台</view>
				<view>新机编号</view>
				<image src="../../static/close.png" mode="" @click='closemore'></image>
			</view>
			<scroll-view class='content_time' scroll-y="true">
			<block v-for='(item,index) in list' :key='index'>
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
				detailobj: {},
				// 新机编号数组长度
				list:[],
				// 新机编号长度
				mylengths:0,
				showmoreStatus:false
			}
		},
		onLoad(option) {
			console.log(option.id)
			this.id = option.id
			this._getdetail()
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
			_getdetail() {
				let obj = {
					organization_id: this.id
				}
				this.$common.requests('/api/Organization/getOrganizationOrderDetail', obj).then(res => {
					if (res.data.code == 1) {
						console.log(res.data.data)
						this.detailobj = res.data.data
						this.list = res.data.data.tools_list.list
						this.mylengths = res.data.data.tools_list.list.length
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
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

<style scoped>
	page{
		background-color: #FFFFFF !important;
	}
	.rukudetail {
		width: 100vw;
		/* height: 100vh; */
		/* background-color:#F2F2F2; */
		background-color: #FFFFFF;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 120rpx;
		padding: 30rpx 20rpx;
	}

	.mytabbar_image {
		width: 40rpx;
		height: 34rpx;
	}

	.mytabbar_text {
		font-size: 38rpx;
	}

	.mytabbar_right {
		font-size: 28rpx;
	}

	.mytabbar_top {
		width: 100%;
		height: 100rpx;
	}

	.rukudetail_header {
		height: 270rpx;
		width: 100%;
		border-bottom: 1rpx solid #E5E5E5;
		border-top: 1rpx solid #E5E5E5;
	}

	.imgbox {
		height: 180rpx;
		width: 100%;
		padding-top: 50rpx;
		padding-bottom: 30rpx;
		display: flex;
		justify-content: center;
	}

	.imgbox image {
		width: 100rpx;
		height: 100rpx;
	}

	.opacitytitle {
		height: 40rpx;
		line-height: 40rpx;
		width: 100%;
		text-align: center;
		color: #557DF7;
	}

	.rukudetail_content {
		padding: 0 30rpx;
		padding-top: 20rpx;
		width: 100%;
	}

	.contetn_item {
		height: 80rpx;
		padding: 20rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item_left {
		width: 140rpx;
		height: 40rpx;
		line-height: 40rpx;
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
	.item_right {
		line-height: 40rpx;
		height: 40rpx;
		width: 390rpx;
		text-align: end;
	}
	
	/* 模态框跟过机具 */
	.morebox{
		position: absolute;
		left:0;
		right:0;
		bottom:0;
		height:650rpx;
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
		height:500rpx;
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
	/* 单独给更多机具头部样式 */
</style>

