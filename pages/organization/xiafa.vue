<template>
	<view class='xiafa'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/btn_h_fanhui@2x.png" mode=""></image>
				<view class="mytabbar_text">下发</view>
				<view class=" mytabbar_right"></view>
			</view>
		</view>
		<view class="content">
			<view class='head' @click='tochoosepartner'>
				<!-- <view>苏奴挽 (125****2554)</view> -->
				<view>{{choosepartnervalue}}</view>
				<image class="next_img" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
			<view class='mycontent'>已选机具编号</view>
			<block v-for='(item,index) in serialArray' :key='index'>
				<view class='orderbox_content'>
					<view class='orderbox_content_left'>
						<view>{{item.qian}}</view>
						<view class='addyellow'>{{item.hou}}</view>
					</view>
					<view></view>
				</view>
			</block>
			<!-- 占位固定位置 -->
			<view class='copybottom_box'></view>
		</view>


		<view class='bottom_box'>
			<!-- <view class='abbox'>0</view> -->
			<view class='bottom_box_left'>数量: {{choosenum}}</view>
			<view class='colorbottom_box_right' @click='cancle' v-if='!choosepartner || serialArray.length==0'>确定下发</view>
			<view class='bottom_box_right' @click='entrue' v-else>确定下发</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				choosepartnervalue: '请选择代理',
				choosepartner: '',
				alid: [],
				serialArray: [],
				choosenum: ''
			}
		},
		onLoad(option) {
			this.alid = JSON.parse(option.alid)
			this.serialArray = JSON.parse(option.serialArray)
			this.choosenum = this.alid.length
			// console.log(this.serialArray)
			// console.log(this.alid)
		},
		onShow() {
			// 确认过有值
			// if(this.choosepartner){
			// 	console.log(this.choosepartner)
			// }
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 选择合伙人
			tochoosepartner() {
				uni.navigateTo({
					url: 'partner'
				})
			},
			entrue() {
				let obj = {
					pos_ids: this.alid,
					user_id: this.choosepartner
				}
				this.$common.requests('/api/pos/hair_down', obj).then(res => {
					if (res.data.code == 1) {
						this.$api.msg(res.data.msg);
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			// 确认下发是灰的,提示不可点击
			cancle() {
				this.$api.msg('请补全代理人或机具选择')
			}
		}
	}
</script>

<style scoped>
	.xiafa {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
		position: relative;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 120rpx;
		/* background-color:#5A7EF8; */
		background-color: #FFFFFF;
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

	.content {
		height: calc(100vh - 120rpx);
		background-color: #F2F2F2;
		width: 100%;
		padding-top: 20rpx;
	}

	.head {
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0 30rpx;
		background-color: #FFFFFF;
	}

	.head>view {
		width: 420rpx;
	}

	.next_img {
		width: 14rpx;
		height: 22rpx
	}

	.mycontent {
		height: 90rpx;
		line-height: 90rpx;
		width: 100%;
		padding: 0 30rpx;
	}

	.orderbox_content {
		background-color: #FFFFFF;
		height: 100rpx;
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
		color: #EFB86C;
	}

	.copybottom_box{
		height: 100rpx;
		width:100%;
	}
	/* 底部按钮 */
	.bottom_box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		display: flex;
		box-shadow: 0rpx 1rpx 2rpx 1rpx rgba(0, 0, 0, 0.3);
	}

	/* 	.abbox{
		height:84rpx;
		line-height: 84rpx;
		text-align: center;
		width:84rpx;
		background-color: #FFFFFF;
		position: absolute;
		top:-30rpx;
		left:30rpx;
		border-radius: 50%;
		box-shadow: 0rpx 0rpx 2rpx 1rpx rgba(0,0,0,0.3);
	} */
	.bottom_box_left {
		width: 70%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #FFFFFF;
		color: #989898;
		padding-right: 40rpx;
		text-align: end;
	}

	.bottom_box_right {
		height: 100rpx;
		line-height: 100rpx;
		width: 30%;
		text-align: center;
		background-color: #5A7EF8;
		color: #FFFFFF;
	}

	.colorbottom_box_right {
		height: 100rpx;
		line-height: 100rpx;
		width: 30%;
		text-align: center;
		background-color: #e3e3e3;
		color: #FFFFFF;
	}
</style>
