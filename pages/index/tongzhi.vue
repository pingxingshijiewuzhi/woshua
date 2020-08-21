<template>
	<view class="box">
		<view class="big_box">
			<view class="border">
				<view class="border_text">{{title}}</view>
				<view class="border_number">{{createtime}}</view>
			</view>
			<view class="center">
				<!-- 你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好
				你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好
				你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好
				你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好 -->
				{{content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				createtime: '',
				content: '',
				notice_id: ''
			}
		},
		onLoad(option) {
			this.notice_id = option.index
			this.get_notice_detail();
		},
		methods: {
			get_notice_detail() {
				var obj = {
					notice_id: this.notice_id
				}
				this.$common.requests('/api/index/get_notice_detail', obj).then(res => {
					if (res.data.code == 1) {
						this.title = res.data.data.title
						this.createtime = res.data.data.createtime
						this.content = res.data.data.content
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
		},
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #F2F2F2;
	}

	.big_box {
		width: 100%;
		height: 98%;
		background-color: #FFFFFF;
		margin-top: 2%;
		color: #676767;
	}

	.border {
		width: 100%;
		height: 180rpx;
		border-bottom: solid 1rpx #E5E5E5;
		font-size: 32rpx;
		padding: 40rpx 30rpx;
	}

	.border_number {
		margin-top: 20rpx;
	}

	.center {
		font-size: 30rpx;
		padding: 30rpx 30rpx;
		line-height: 60rpx;
		letter-spacing: 4rpx;
	}
</style>
