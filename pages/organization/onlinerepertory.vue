<template>
	<view class='repertory'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/0000.png" mode=""></image>
				<view class="mytabbar_text">线上库存</view>
				<view class=" mytabbar_right" @tap="showModal" data-target="DialogModal1">筛选</view>
			</view>
		</view>
		<block v-for='(item,index) in List' :key='index'>
			<view class='recodeitem'>
				<view class='recodeitem_left'>
					<view class='left_title addblue'>{{item.status}}</view>
					<view class='left_time'>{{item.createtime}}</view>
				</view>
				<view class='recodeitem_right'>
					<view class='addmycolor'>{{item.num}} 台</view>
					<view class='right_num'>库存数量 : {{item.all_shengyu}}</view>
				</view>
			</view>
		</block>

		<!--弹框 -->
		<view class='masking' v-show="modalName" @click='hideModal'></view>
		<view class='bigbox' v-show="modalName" :class="modalName=='DialogModal1'?'show':''">
			<image class='close' src="../../static/image/icon_mm_gb@2x.png" @click='hideModal'></image>
			<view class='topbox'>
				<view class="starttime">
					<view class='timetitle'>开始时间</view>
					<view class='timechoose'>
						<image src="../../static/pic/icon_h_sj@2x.png" class="xlbtn"></image>
						<gpp-date-picker-copy @onConfirm="onConfirmMonth" :startDate="startMonth" :endDate="endMonth" :defaultValue="pickerMonth">
							<!-- :defaultValue="pickerMonth" -->
							{{pickerMonth}}
						</gpp-date-picker-copy>
					</view>
				</view>
				<view class="starttime">
					<view class='timetitle'>结束时间</view>
					<view class='timechoose'>
						<image src="../../static/pic/icon_h_sj@2x.png" class="xlbtn"></image>
						<gpp-date-picker-copy @onConfirm="onConfirmEndMonth" :startDate="startEndMonth" :endDate="endEndMonth"
						 :defaultValue="pickerEndMonth">

							{{pickerEndMonth}}
						</gpp-date-picker-copy>
					</view>
				</view>
			</view>
			<view class='typebox'>
				<view class='typebox_head'>类型</view>
				<view class='typebox_choose'>
					<view @click="choosebtnclick('1')" :class="{'activecolor':current == '1'}">全部</view>
					<view @click="choosebtnclick('2')" :class="{'activecolor':current == '2'}">出库</view>
					<view @click="choosebtnclick('3')" :class="{'activecolor':current == '3'}">入库</view>
				</view>
			</view>
			<view class="bottombtn flexs1">
				<view class="action_left" @tap="reset">重置</view>
				<view class="action_right" @tap="get_in_out_list">确定</view>
			</view>

		</view>

	</view>
</template>

<script>
	import gppDatePickerCopy from '../../components/gpp-datePicker1/gpp-datePicker1.vue'
	export default {
		components: {
			gppDatePickerCopy
		},
		data() {
			return {
				current: '1',
				modalName: null,
				List: [],

				// 月份选择器
				startMonth: "2018-05",
				endMonth: "2022-09",
				// 初始化赋值默认月份,不传参数时默认
				// pickerMonth: '',
				pickerMonth: '2020-05',

				// 月份选择器结束
				startEndMonth: "2018-05",
				endEndMonth: "2022-09",
				// 初始化赋值默认月份,不传参数时默认
				pickerEndMonth: '2020-05',
				page: 1,
				limit: 10
			}
		},
		onLoad() {
			this.get_in_out_list(1);
		},
		methods: {
			reset() {
				this.current = '1',
					this.pickerEndMonth = "2020-05",
					this.pickerMonth = "2020-05"
			},
			choosebtnclick(nu) {
				this.current = nu
			},
			get_in_out_list(num) {
				var obj = {
					start: this.pickerMonth,
					end: this.pickerEndMonth,
					type: this.current,
					page: this.page,
					limit: this.limit
				}
				if (num == 1) {
					obj = {}
				}
				this.modalName = null

				this.$common.requests('/api/pos/get_in_out_list', obj).then(res => {
					if (res.data.code == 1) {
						// this.$api.msg(res.data.msg)
						this.List = res.data.data
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
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// 月份选择
			onConfirmMonth(e) {
				this.pickerMonth = e.dateValue;
			},
			onConfirmEndMonth(e) {
				this.pickerEndMonth = e.dateValue;
			}
		}
	}
</script>

<style scoped>
	.repertory {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 120rpx;
		background-color: #5A7EF8;
		padding: 30rpx 20rpx;
	}

	.mytabbar_image {
		width: 40rpx;
		height: 34rpx;
	}

	.mytabbar_text {
		font-size: 38rpx;
		color: #FCFFFC;
	}

	.mytabbar_right {
		font-size: 28rpx;
		color: #DDE9F4;
	}

	.mytabbar_top {
		width: 100%;
		height: 100rpx;
	}

	/* 流水记录样式 */
	.recodeitem {
		margin-top: 30rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		height: 150rpx;
		display: flex;
		justify-content: space-between;
	}

	.recodeitem_left {
		height: 90rpx;
		width: 310rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
	}

	.left_title {
		height: 36rpx;
		line-height: 36rpx;
		font-size: 30rpx;
	}

	.addblue {
		color: #5F84F6;
	}

	.addorange {
		color: #FE9000;
	}

	.recodeitem_right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 90rpx;
		width: 210rpx;
		text-align: right;
	}
	.addmycolor {
		text-align: right;
		color: #E76A6E;
		height: 36rpx;
		line-height: 36rpx;
		font-size: 30rpx;
	}
	/* 弹框样式 */
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
		height: 620rpx;
		background-color: #FFFFFF;
		border-radius: 40rpx;
		position: fixed;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.close {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		top: 25rpx;
		right: 25rpx;
	}

	/* 上面盒子样式 */
	.topbox {
		width: 100%;
		height: 286rpx;
		padding: 0 50rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1rpx solid #E5E5E5;
	}

	.starttime {
		width: 230rpx;
		height: 130rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.timechoose {
		height: 60rpx;
		width: 100%;
		position: relative;
	}

	.xlbtn {
		width: 30rpx;
		height: 14rpx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 6rpx;
	}

	/* 类型样式 */
	.typebox {
		width: 100%;
		padding: 0 30rpx;
		height: 270rpx;
	}

	.typebox_head {
		height: 140rpx;
		line-height: 140rpx;
		font-size: 36rpx;
		letter-spacing: 4rpx;
	}

	.typebox_choose {
		display: flex;
		justify-content: space-between;
	}

	.typebox_choose>view {
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 10rpx;
		background-color: #E5E5E5;
		text-align: center;
	}

	/* 底部按钮 */
	.bottombtn {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 70rpx;
	}

	.action_left {
		height: 70rpx;
		line-height: 70rpx;
		width: 50%;
		text-align: center;
		background-color: #E5E5E5;
		border-bottom-left-radius: 40rpx;
	}

	.action_right {
		text-align: center;
		line-height: 70rpx;
		height: 70rpx;
		width: 50%;
		color: #FFFFFF;
		background-color: #5A7EF8;
		border-bottom-right-radius: 40rpx;
	}

	.activecolor {
		background-color: #007AFF !important;
		color: #FFFFFF;
	}
</style>
