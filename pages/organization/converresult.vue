<template>
	<view class='converresult'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/btn_h_fanhui@2x.png" mode=""></image>
				<view class="mytabbar_text">兑换订单</view>
				<view class=" mytabbar_right"></view>
			</view>
		</view>
		<!-- <view class='converresult_header'>
			<view class='imgbox'>
				<image src="../../static/pic/icon_d_ddhs@2x.png" mode=""></image>
			</view>
			<view class='opacitytitle'>待发货</view>
		</view> -->
		<view class='converresult_header'>
			<view class='imgbox'>
				<image src="../../static/pic/icon_d_cg@2x.png" mode=""></image>
			</view>
			<view class='opacitytitleooo'>已完成</view>
		</view>
		<view class='converrecodeitem'>
			<view class='myitem_left'>
				<image :src="$common.baseUrl + detailobj.product_image" mode=""></image>
				<view class='oneprice'>
					<view>{{detailobj.product_name}}</view>
					<view class='mygay'>
						<view class='addcolorandred'>{{detailobj.price}}</view>
						<view> /{{detailobj.product_norms}}</view>
					</view>
				</view>
			</view>
			<view class='myitem_right'>
				× {{detailobj.num}}
			</view>
		</view>
		<view class='converresult_content'>
			<view class='contetn_item'>
				<view class='item_left'>积分支付</view>
				<view class='item_right'>{{detailobj.order_price}}积分</view>
			</view>
		</view>
		<view class='converresult_content'>
			<view class='contetn_item'>
				<view class='item_left'>申请人</view>
				<view class='item_right_flex'>
					<view>{{detailobj.name}}</view>
					<image src="../../static/image/icon_h_dianhua@2x.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class='converresult_content'>
			<view class='contetn_item'>
				<view class='item_left'>订单编号</view>
				<view class='item_right'>{{detailobj.order_num}}</view>
			</view>
		</view>
		<view class='converresult_content'>
			<view class='contetn_item'>
				<view class='item_left'>创建时间</view>
				<view class='item_right'>{{detailobj.createtime}}</view>
			</view>
		</view>

		<!-- 新机编号弹框 -->
		<!-- <view class='orderbox'>
			<image class='close' src="../../static/image/icon_mm_gb@2x.png" @click='closebtn'></image>
			<view class='orderbox_head'>
				<view class='orderbox_head_item'>共15台</view>
				<view class='orderbox_headcnter'>新机编号</view>
				<view class='orderbox_head_item'></view>
			</view>
			<block v-for='(item,index) in 15' :key='index'>
				<view class='orderbox_content'>
					<view class='orderbox_content_left'>
						<view>21111222222</view>
						<view class='addyellow'>5151</view>
					</view>
					<view>1</view>
				</view>
			</block>
		</view> -->

		<!-- 等待回收显示按钮 -->
		<!-- <view class='mybottombtn' @tap="showModal" data-target="DialogModal1" >
			发放机具
		</view> -->
		<!--弹框 -->
		<!-- <view  class='masking'  v-show="modalName"  @click='hideModal'></view>
			<view class='bigbox'  v-show="modalName" :class="modalName=='DialogModal1'?'show':''">
				<view class="mytitle">提示</view>
				<view class='myentrue'>确认发放机具？</view>
				<view class="bottombtn flexs1">
					<view class="action_left" @tap="hideModal">取消</view>
					<view class="action_right" @tap="hideModal">确定</view>
				</view>
			</view> -->
		<view class='fa_bottombtn' @click='providenewrobot'>发放机具</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				id: '',
				detailobj: {}
			}
		},
		onLoad(option) {
			this.id = option.id
			this._getdetailinfo()
		},
		methods: {
			_getdetailinfo() {
				let obj = {
					integral_order_id: this.id
				}
				this.$common.requests('/api/integral/get_zhuanqu_duihuandetail', obj).then(res => {
					this.detailobj = res.data.data
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			providenewrobot() {
				"url:../../organization/providenewrobots";
				console.log(1)
			}
		},
	}
</script>

<style scoped>
	.converresult {
		width: 100vw;
		height: 100vh;
		/* background-color:#F2F2F2; */
		background-color: #FFFFFF;
		position: relative;
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

	.converresult_header {
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
		color: #F0AC4B;
	}

	/* 拒绝通过和确认审核颜色 */
	.opacitytitleooo {
		height: 40rpx;
		line-height: 40rpx;
		width: 100%;
		text-align: center;
		color: #90A6FB;
	}

	/* 机具图片 */
	.converrecodeitem {
		padding: 30rpx 30rpx 20rpx 30rpx;
		background-color: #FFFFFF;
		height: 180rpx;
		border-bottom: 1rpx solid #E5E5E5;
		display: flex;
		justify-content: space-between;
	}

	.myitem_left {
		height: 130rpx;
		padding: 10rpx 0;
		width: 300rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.myitem_right {
		height: 130rpx;
		padding-top: 90rpx;
	}

	.myitem_left image {
		width: 82rpx;
		height: 126rpx;
	}

	.oneprice {
		height: 100%;
		width: 140rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.mygay {
		width: 140rpx;
		display: flex;
	}

	.addcolorandred {
		color: red;
		font-size: 30rpx;
	}


	.converresult_content {
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

	.item_right {
		line-height: 40rpx;
		height: 40rpx;
		width: 390rpx;
		text-align: end;
	}

	.item_right_flex {
		height: 40rpx;
		width: 180rpx;
		/* border:1rpx solid red; */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item_right_flex image {
		height: 30rpx;
		width: 30rpx;
	}

	.item_right_flex>view {
		width: 120rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
	}

	/* 模态框样式 */
	.masking {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.bigbox {
		width: 690rpx;
		height: 320rpx;
		background-color: #FFFFFF;
		border-radius: 40rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		letter-spacing: 4rpx;
		transform: translate(-50%, -50%);
	}

	.mytitle {
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		color: #5B7DF8;
		font-size: 30rpx;
	}

	.myentrue {
		height: 90rpx;
		line-height: 90rpx;
		width: 100%;
		text-align: center;
		color: #9A9A9A;
	}

	/* 模态框底部按钮 */
	.bottombtn {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 70rpx;
		border-top: 1rpx solid #E5E5E5;
	}

	.action_left {
		height: 70rpx;
		line-height: 70rpx;
		width: 50%;
		text-align: center;
		border-bottom-left-radius: 40rpx;
	}

	.action_right {
		text-align: center;
		line-height: 70rpx;
		height: 70rpx;
		width: 50%;
		background-color: #FFFFFF;
		color: #5A7EF8;
		border-left: 1rpx solid #E5E5E5;
		border-top: 1rpx solid #E5E5E5;
		border-bottom-right-radius: 40rpx;
	}

	/* 发放机具底部按钮 */
	.mybottombtn {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
		background-color: #5A7EF8;
		text-align: center;
	}

	/* 新机模态框样式 */
	.orderbox {
		width: 100%;
		height: 650rpx;
		overflow: hidden;
		overflow-y: scroll;
		padding: 0 30rpx;
		padding-top: 30rpx;
		background-color: #FFFFFF;
		border-radius: 40rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.close {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		top: 25rpx;
		right: 25rpx;
	}

	.orderbox_head {
		height: 70rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.orderbox_head_item {
		width: 200rpx;
		height: 70rpx;
		line-height: 70rpx;
	}

	.orderbox_headcnter {
		width: 200rpx;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 30rpx;
	}

	.orderbox_content {
		height: 60rpx;
		padding: 15rpx 0;
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.orderbox_content_left {
		/* height:60rpx;
		line-height: 60rpx; */
		width: 280rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.addyellow {
		color: #DAAE4F;
	}

	.fa_bottombtn {
		width: 100%;
		line-height: 90rpx;
		background-color: #5A7EF8;
		position: absolute;
		bottom: 0;
		text-align: center;
		color: #FFFFFF;
	}
</style>
