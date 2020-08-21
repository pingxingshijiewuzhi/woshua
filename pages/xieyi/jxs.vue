<template>
	<view class="jxs_content ">
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				xieyi_name:''
			}
		},
		onLoad(option) {
			this.xieyi_name = option.xieyi_name
			uni.setNavigationBarTitle({
				title:this.xieyi_name
			})
			this.agreement_distributor();
		},
		methods: {
			agreement_distributor() {
				this.$common.requests('/api/user/agreement_distributor').then(res => {
					if (res.data.code == 1) {
						this.content = res.data.data;
					} else {
						this.$api.msg(res.data.msg)
					}
				})
			},
		}
	}
</script>

<style>
	.jxs_content {
		padding: 50rpx 30rpx 0 30rpx;
		width: 100vw;
		height: 100vh;
		background-color: #FFF;
	}

	.jxs_top {
		width: 85%;
		height: 5%;
		font-size: 30rpx;
		letter-spacing: 5rpx;
		font-weight: 540;
		margin-left: 72rpx;
	}

	.jxs_body {
		width: 85%;
		height: 95%;
		letter-spacing: 2rpx;
		font-size: 27rpx;
		letter-spacing: 2rpx;
		margin-left: 72rpx;
		color: #555555;
	}

	.flexs {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.flexs1 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.flexs2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.flexs3 {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.flexs4 {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	.flexs5 {
		display: flex;
		flex-direction: row;
	}

	.flexs6 {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.flexs7 {
		display: flex;
		justify-content: center;
	}

	.flexs8 {
		display: flex;
		align-items: flex-end;
		justify-content: space-around;
	}

	.flexs9 {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.flexs10 {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
</style>
