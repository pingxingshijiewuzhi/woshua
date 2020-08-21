<template>
	<view class='transaction'>
		<view class='topbox'>
			<view class='statusbox'>{{myobj.status}}</view>
			<view class='pricenumber'>{{myobj.money}}</view>
			<view class='procedurebox'>{{myobj.fe}}</view>
		</view>
		<view class='cantentbox'>
			<block v-for='(item,index) in list' :key='index'>
				<view class='item_box'>
					<view class='item_boxkey'>{{item.name}}</view>
					<view class='item_boxvalue'>{{item.value}}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				id:'',
				myobj:{},
				list:[]
			}
		},
		onLoad(option) {
			this.id = option.id
			this._getdetail()
		},
		methods:{
			
			_getdetail(){
				let obj = {
					transaction_id:this.id
				}
				this.$common.requests('/api/shops/getTransactionDetail',obj).then(res=>{
					console.log(res.data.data,'返回数据')
					this.myobj = res.data.data.head
					this.list = res.data.data.list
				})
			}
		}
	}
</script>

<style>
	.transaction{
		
	}
	/* 头部盒子 */
	.topbox{
		background-color: #0267DD;
		color:#FFFFFF;
		text-align: center;
	}
	.statusbox{
		height:80rpx;
		padding-top: 40rpx;
	}
	.pricenumber{
		font-size: 50rpx;
		height:80rpx;
		line-height: 80rpx;
	}
	.procedurebox{
		height:80rpx;
		padding-bottom: 40rpx;
	}
	
	/* 渲染盒子 */
	.cantentbox{
		padding-top: 10rpx;
		width:100%;
		height:auto;
		background-color: #FFFFFF;
	}
	.item_box{
		width: 96%;
		margin: 0 2%;
		height:100rpx;
		/* border:1rpx solid red; */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.item_boxkey{
		width: 200rpx;
		height:80rpx;
		line-height: 80rpx;
		/* border:1rpx solid blue; */
	}
	.item_boxvalue{
		width: 400rpx;
		height:80rpx;
		line-height: 80rpx;
		/* border: 1rpx solid red; */
		text-align: right;
	}
</style>
