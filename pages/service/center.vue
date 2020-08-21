<template>
	<view class="box">
		<textarea class='bigbox' v-model="content" placeholder="请输入工单内容" />
		<view class="button flexs" @click="entrue">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:''
			}
		},
		methods: {
			entrue(){
				let myobj = {
					question:this.content
				}
				this.$common.requests('/api/Service/add_service',myobj).then(res=>{
					if(res.data.code == 1){
						this.$api.msg(res.data.msg);
						uni.navigateBack({
							delta:1
						})
					}else{
						//console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			}
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.box{
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	.bigbox{
		margin-top: 20rpx;
		padding-top: 20rpx;
		padding-left: 20rpx;
		width:100%;
		height:500rpx;
		background-color: #FFFFFF;
	}
	.button{
		width: 100%;
		height:100rpx;
		background-color:#5A7EF8;
		color: #FFFFFF;
		position: absolute;
		bottom: 0;
	}
</style>
