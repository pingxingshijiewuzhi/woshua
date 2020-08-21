<template>
	<view class="box">
		<!-- <rich-text :nodes="helpobj"></rich-text> -->
		<jyf-parser :html="helpobj" ref="article"></jyf-parser>
		<!-- <view class="box_start">刷脸e付代理APP注册和实名认证流程</view>
		<view class="box_next">
			实名认证：是进行拓展客户,发展刷脸e付代理,机具采购下发,领取收益等业务的前提条件，只有通过实名审核，才能进行以上操作
		</view>
		<view class="box_ran">一、注册</view>
		<view class="box_second">注册流程分为 以下两种方式：</view>
		<view class="">1.通过扫描微信朋友圈或微信好友的推荐码进行注册</view>
		<image class="box_image" src="../../static/pic/002.png" mode=""></image> -->
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		components:{
			jyfParser
		},
		data() {
			return {
				id: '',
				helpobj: ''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.question = option.question
			uni.setNavigationBarTitle({
			   　　title:this.question
			})
			this._gethelp()
		},
		methods: {
			_gethelp() {
				let obj = {
					queshelp_id: this.id
				}
				this.$common.requests('/api/Queshelp/get_queshelp_detail', obj).then(res => {
					if (res.data.code == 1) {
						this.helpobj = res.data.data.content;
						console.log(this.helpobj)
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			}
		}
	}
</script>

<style>
	.box {
		width: 100vw;
		background-color: #FFFFFF;
		padding: 0 30rpx;
		letter-spacing: 2rpx;
	}


	/* .box_start{
		width: 100%;
		line-height: 70rpx;
		font-size: 34rpx;
	}
	.box_next{
		width: 100%;
		line-height: 46rpx;
		font-size: 30rpx;
	}
	.box_ran{
		font-size: 34rpx;
		width: 100%;
		line-height: 70rpx;
		margin-top: 10rpx;
	}
	.box_second{
		width: 100%;
		height: 50rpx;
	}
	.box_image{
		width: 56%;
		height: 52%;
		margin-top: 60rpx;
	} */
</style>
