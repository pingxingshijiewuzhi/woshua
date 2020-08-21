<template>
	<view class="box">
		<view class="barder flexs2">
			<image class="ditu" src="../../static/image/0008.png" mode=""></image>
			<view class="" @click="todizhi">
				<view class="flexs1">
					<view class="barder_left">废后将军</view>
					<view class="barder_right">155****1778</view>
				</view>
				<view class="barder_last">江苏省徐州市铜山区万达广场</view>
			</view>
			<image class="next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
		</view>
		<view class="barner ">
			<view class="barner_border flexs1">
			<image class="libao" src="../../static/image/img_zp1@2x.png" mode=""></image>
			<view class="border_left">
				<view class="barner_first">小喔电签体验礼包A</view>
				<view class=" flexs1">
					<view class="border_next">￥3200</view>
					<view class="border_num">/20台</view>
				</view>
			</view>
			<view class="border_number">×1</view>
		</view>
		</view>
		<view class="text">
			<view class="text_border flexs2">
				<view class="">兑换对象</view>
				<view class="">总部</view>
			</view>
		</view>
		<view class="text">
			<view class="text_border none flexs2">
				<view class="">配送方式(包邮)</view>
				<view class="">快递配送</view>
			</view>
		</view>
		<view class="text ">
			<view class="text_border mt flexs2">
				<view class="">支付方式</view>
				<view class="">积分支付</view>
			</view>
		</view>
		<view class="button flexs1">
			<view class="button_left">合计￥3200</view>
			<view class="button_right" @tap="showModal" data-target="DialogModal1">提交</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
					<image class="deleat"  src="../../static/image/icon_mm_gb@2x.png" mode="" @tap="hideModal"></image>
					<view class="pasword">选择支付方式</view>
					<radio-group class="block" @change="RadioChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" >
								<label class="flex justify-between align-center ">
									<view class="order_picbox flexs"><image class="order_money" src="../../static/image/icon_qianbao@2x.png"></image></view>
									<view class="flex-sub">钱包余额</view>
									<view class='blanceclass'>{{blance}}</view>
									<radio class="round radio" :class="radio=='1'?'checked':''" :checked="radio=='1' ?true:false"
									 value="1"></radio>
								</label>
							</view>
							<view class="cu-item" >
								<label class="flex justify-between align-center ">
									<view class="order_picbox flexs"><image class="order_money" src="../../static/image/icon_wxzf@2x.png"></image></view>
									<view class="flex-sub">微信支付</view>
									<radio class="round radio" :class="radio=='2'?'checked':''" :checked="radio=='2' ?true:false"
									 value="2"></radio>
								</label>
							</view>
						<!-- 	<view class="cu-item" >
								<label class="flex justify-between align-center ">
									<view class="order_picbox flexs"><image class="order_money" src="../../static/image/icon_zfb@2x.png"></image></view>
									<view class="flex-sub">支付宝支付</view>
									<radio class="round radio" :class="radio=='3'?'checked':''" :checked="radio=='3' ?true:false"
									 value="3"></radio>
								</label>
							</view> -->
						</view>
					</radio-group>
					<view class="  flexs1">
					 <view class="buttons" @tap="hideModal">立即付款 </view>
					</view>
			</view>
		</view>
		<!-- <view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
					<image class="deleat"  src="../../static/image/icon_mm_gb@2x.png" mode="" @tap="hideModal"></image>
					<view class="pasword">输入支付密码</view>
					<view class=" list flexs3">
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
					</view>
					<view class="  flexs1">
					 <view class="buttons" @tap="hideModal">确认支付 </view>
					</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default{
	data(){
		return{
			modalName: null,
			radio: '1',
			// 钱包余额
			blance:'',
		}
	},
	onShow() {
		this._getblance()
	},
	methods:{
		// 获取余额
		_getblance(){
			this.$common.requests('/api/user/get_settlement').then(res=>{
				console.log(res.data.data,888)
				this.blance = res.data.data
			})
			
		},
		todizhi(){
			uni.navigateTo({
				url:"../myIntegral/site"
			})
		},
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target
		},
		hideModal(e) {
			this.modalName = null
		},
		RadioChange(e) {
			this.radio = e.detail.value
		},
	},
}
</script>

<style>
	.box{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.barder{
		width: 100%;
		height: 180rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 30rpx;
	}
	/* 弹框 */
	.deleat{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 20rpx;
		top:20rpx;
	}
	.pasword{
		font-size: 32rpx;
		margin: 30rpx 0 20rpx 0;
	}
	.list{
		width: 100%;
		height: 180rpx;
	}
	.box_list{
		width: 80rpx;
		height: 80rpx;
		border: solid 1rpx #E5E5E5; 
	}
	.box_list input{
		margin-top: 16rpx;
		font-size: 34rpx;
	}
	.buttons{
		width: 94%;
		line-height: 80rpx;
		text-align: center;
		background-color:#5A7EF8 ;
		color: #FFFFFF;
		margin: 100rpx 3% 0 3%;
		font-size: 34rpx;
		margin: 20rpx 30rpx 50rpx 30rpx;
	}
	/* end */
	.ditu{	
		width: 40rpx;
		height: 50rpx;
	}
	.next{
		width: 26rpx;
		height: 46rpx;
	}
	.border_next{
		font-size: 38rpx;
		color:#DE0E0B;
		font-weight: 500;
		}
	.border_num {
		letter-spacing:4rpx;
	}
	.barner{
		width: 100%;
		height: 260rpx ;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 30rpx;
		position: relative;
	}
	.barner_border{
		width: 90%;
		margin: 0 5%;
		height: 260rpx ;
		border-bottom: solid 1rpx #E5E5E5; 
	}
.libao{
	width: 180rpx;
	height: 180rpx;
}
.text{
	width: 100%;
	line-height: 130rpx;
	background-color: #FFFFFF;
	padding: 0 30rpx;
}
.text_border{
	width: 90%;
	margin: 0 5%;
	height: 130rpx;
	 border-bottom: solid 1rpx #E5E5E5; 
	letter-spacing: 4rpx;
}
.barner_first{
	width: 380rpx;
	height: 130rpx;
	font-size: 34rpx;
	
}
.barder_left{
	font-size: 32rpx;
	font-weight: 600;
	margin-right: 40rpx;
	color: #363636;
	letter-spacing: 6rpx;
}
.barder_right{
	font-size: 32rpx;
	font-weight: 600;
	color: #363636;
	letter-spacing: 6rpx;
	margin-top: 8rpx;
}
.barder_last{
	font-size: 30rpx;
	margin-top: 10rpx;
	color: #5E5E5E;
}
.border_left{
	margin-left: 30rpx;
}
.border_number{
	width: 60rpx;
	line-height: 120rpx;
	position: absolute;
	bottom: 10rpx;
	right: 30rpx;
}
.mt{
	margin-top: 30rpx;
	border: none;
}
.none{
	border: none;
}
.button{
		width: 100%;
		line-height: 120rpx;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
		font-size: 32rpx;
	}
.button_left{
	width: 70%;
	height: 120rpx;
	background-color:#FFFFFF;
	color:#D12D3E;
}
.button_right{
	width: 30%;
	height: 120rpx;
	background-color:#5880FA ;
}
.cu-dialog{
	background-color: #FFFFFF !important;
}
.flex-sub{
	margin-left: 38rpx;
	width: 470rpx;
	height: 40rpx;
}
.blanceclass{
		width:200rpx;
		height:42rpx;
		line-height: 42rpx;
	}
.order_picbox{
	width: 55rpx;
	height: 55rpx;
	
}
.order_money{
	width: 47rpx;
	height: 40rpx;
}

</style>
