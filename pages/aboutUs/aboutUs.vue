<template>
	<view class="box">
		<view class="border flexs">
			<!-- <view class="border_logo flexs">LOGO</view> -->
			<view class="border_logo flexs">
				<image :src="imgUrl+dataobj.logo" class="imgbox"></image>
			</view>
		</view>
		<view class="center flexs2" @click="torecommend">
			<view class="">了解{{dataobj.name}}</view>
			<image class="cneter_next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
		</view>
		<view class="center flexs2">
			<view class="">版本信息</view>
			<view class="">当前版本{{dataobj.version}}</view>
		</view>
		<view class="center flexs2" @click="tounsubscribe"  data-target="DialogModal1">
			<view class="">注销账号</view>
			<image class="cneter_next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
		</view>
		<!--弹框 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''" @click.self ='closemodify'>
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end content">
					<view class="content">提示</view>
				</view>
				<view class="padding-xl" >
					<view class="row">确定要注销账号吗</view>
				</view>
				<view class=" flexs1">
					<button class="action_left" @tap="hideModal">取消</button>
					<button class="action_right" @tap="hideModal_delete">确定</button>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$common.baseUrl,
				dataobj: {},
				modalName:null
			}
		},
		onLoad() {
			this._aboutUs()
		},
		methods: {
			_aboutUs() {
				this.$common.requests('/api/about/get_version_logo').then(res => {
					if (res.data.code == 1) {
						this.dataobj = res.data.data
						// console.log(res.data.data)
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			torecommend() {
				uni.navigateTo({
					url: "../aboutUs/recommend"
				})
			},
			// 注销不跳转
			// tounsubscribe() {
			// 	uni.navigateTo({
			// 		url: "../aboutUs/unsubscribe"
			// 	})
			// },
			tounsubscribe(){
				this.modalName = "DialogModal1";
			},
			closemodify(){
				this.modalName = null
			},
			hideModal(e) {
				this.modalName = null
			},
			hideModal_delete(e) {
				this.modalName = null;
				this.$common.requests('/api/user/cancellation_id').then(res => {
					if (res.data.code == 1) {
						this.$api.msg('注销成功');
						uni.setStorageSync('uid', '');
						uni.setStorageSync('token', '');
						uni.setStorageSync('userinfo', '');
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/login/login'
							})
						},1000)
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
		}
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
	}

	.border {
		width: 100%;
		height: 400rpx;
	}

	.border_logo {
		width: 200rpx;
		height: 200rpx;
		border-radius: 20rpx;
		background-color: #F2F2F2;
	}

	.imgbox {
		width: 100%;
		height: 100%;
	}

	.center {
		width: 100%;
		line-height: 120rpx;
		border-bottom: solid 1rpx #E5E5E5;
		padding: 0 30rpx;
		letter-spacing: 4rpx;
	}

	.cneter_next {
		width: 16rpx;
		height: 26rpx;
	}
	
	/* model */
	.action_left {
		width: 50%;
		line-height: 100rpx;
		font-size: 30rpx;
		background-color: #FFFFFF;
	}
	
	.row {
		height: 130rpx;
		font-size: 34rpx;
		color: #AFAFAF;
		padding-top: 20rpx;
	}
	
	.action_right {
		width: 50%;
		line-height: 100rpx;
		font-size: 30rpx;
		color: #5A7EF8;
		background-color: #FFFFFF
	}
	
	.content {
		width: 100% !important;
		height: 70rpx;
		color: #5F84F7;
	}
	
	.action_right:hover {
		color: #5A7EF8;
	}
	
	.padding-xl {
		background-color: #FFFFFF;
		padding: 0;
	}
</style>
