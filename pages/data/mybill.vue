<template>
	<view class='mybill'>
		<block v-for='(item,index) in 2' :key='index'>
			<view class='mybillitem'>
				<view class='monthscreen'>04月</view>
				<block v-for='(item,index) in 3' :key='index'>
					<view class='month_item' @click='gobilldetail'>
						<view class='month_item_left'>
							<view class='mytitle'>账户提现</view>
							<view class='my_time'>
								<view>04-27</view>
								<view>17:01:42</view>
							</view>
						</view>
						<view class='month_item_right'>
							-473:21
						</view>
					</view>
				</block>
			</view>
		</block>
		<!--弹框 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end content">
					<view class="content">月份</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" @change="changeDatetimePicker">
					<view class="row">
						<view class="rows flexs1">
							<view class="value">
								<BiaofunDatetimePicker placeholder="2019-05" fields="month">
								</BiaofunDatetimePicker>
							</view>
							<image src="../../static/image/123456.png" mode="widthFix" class="icon-right"></image>
						</view>
					</view>
					<view class=" ">
						<view class="title flexs1">类型</view>
						<view class="radio_box flexs1">
							<view class="radio_list" v-for="(item,index) in 12" :key="index">结算款</view>

							<!-- <radio class='blue radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
								<radio class='red margin-left-sm' :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D"></radio> -->
						</view>
					</view>
				</view>
				<view class=" flexs1">
					<button class="action_left" @tap="hideModal">重置</button>
					<button class="action_right" @tap="hideModal">确定</button>
				</view>
			</view>
		</view>
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
			}
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			if (e.index == 0) {
				this.modalName = 'DialogModal1'
			}
		},
		methods: {
			// 进入页面详情
			gobilldetail() {
				uni.navigateTo({
					url: 'billdetail'
				})
			},
			hideModal(e) {
				this.modalName = null
			},
			changeDatetimePicker(date) {
				console.log(date);
			},
		}
	}
</script>

<style scoped>
	.mybill {
		height: 100vh;
		width: 100vw;
		background-color: #F2F2F2;
	}

	.mybillitem {
		background-color: #FFFFFF;
	}

	.monthscreen {
		background-color: #F2F2F2;
		width: 100%;
		padding-left: 30rpx;
		height: 86rpx;
		line-height: 86rpx;
		letter-spacing: 4rpx;
		color: #969696;
		font-size: 32rpx;
	}

	.month_item {
		padding: 0 30rpx;
		height: 146rpx;
		width: 100%;
		border-bottom: 1rpx solid #F2F2F2;
		display: flex;
		justify-content: space-between;
	}

	.month_item_left {
		height: 100%;
		width: 230rpx;
	}

	.month_item_right {
		height: 146rpx;
		line-height: 146rpx;
		width: 200rpx;
		text-align: end;
		font-size: 40rpx;
	}

	.mytitle {
		height: 88rpx;
		line-height: 88rpx;
		font-size: 40rpx;
		width: 100%;
	}

	.my_time {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	/* 模态框样式 */
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
		height: 100upx;
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
		height: 290rpx;
		flex-wrap: wrap;
	}

	.cu-form-group {
		width: 100%;
		height: 300rpx;
	}

	.radio_list {
		width: 21%;
		line-height: 60rpx;
		border-radius: 10rpx 0rpx;
		background-color: #F2F2F2;
		margin: 20rpx 0rpx 0 20rpx;
		font-size: 28rpx;
		border-radius: 50rpx 50rpx;
	}

	.action_left {
		width: 50%;
		height: 100rpx;
	}

	.action_left:hover {
		background-color: #5A7EF8;
	}

	.action_right {
		width: 50%;
		height: 100rpx;
	}

	.action_right:hover {
		background-color: #5A7EF8;
	}

	.cu-dialog {
		position: absolute;
		top: 200rpx;
		right: 36rpx;
	}
</style>
