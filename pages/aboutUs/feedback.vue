<template>
	<view class="box">
		<view class="small_box">
			<view class="box_title">请选择您要反馈的问题类型</view>
			<block v-for='(item,index) in feedbackList' :key='index'>
				<view class=" list flexs1" @click="chooseImage(item.id)">
					<image class="check_box" src="../../static/image/0005.png" mode="" v-if="currentIndex==index" @click='change(index)'></image>
					<image class="check_box" src="../../static/image/0004.png" v-else mode="" @click='change(index)'></image>
					<view class="">{{item.name}}</view>
				</view>
			</block>
			<view class="border flexs1">补充详细问题或意见<view class="star">*</view></view>
			<view class="text">
				<textarea v-model="mycontent" placeholder="请输入内容(最多输入100字)"  maxlength="100"/>
				</view>
			<view class="border flexs1">补充详细问题或意见<view class="star">*</view></view>
			<block v-if="upimgload">
				<image class="add" @tap='choosetype'  data-target='DialogModal' :src="imgUrl+upimgload" mode=""></image>
			</block>
			<block v-else>
				<image class="add" @tap='choosetype'  data-target='DialogModal' src="../../static/communityimage/addpictor.png" mode=""></image>
			</block>
		</view>
		<!-- model  photo-->
		<view class='myimgtype'  v-show="modalName" :class="modalName=='DialogModal'?'show':''">
			<view class='content'>
				<view class='common_type addbottom' @click='choosecamera'>拍照上传</view>
				<view class='common_type' @click='choosephone'>从相册选择</view>
			</view>
			<view class='commoncancle' @tap='canclechoose'>取消</view>
		</view>
		<view class="button flexs" @click='submitfeedback'>提交</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				modalName:null,
				feedbackList:[],
				currentIndex:0,
				mycontent:'',
				imgUrl:this.$common.baseUrl,
				upimgload:'',
				id:''
			}
		},
		onLoad() {
			this._getOpinionList()
		},
		methods:{
			_getOpinionList(){
				this.$common.requests('/api/about/get_opinion_list').then(res=>{
					if(res.data.code == 1){
						this.feedbackList = res.data.data
						// console.log(res.data.data)
						// 默认选中id是第一个
						this.id = this.feedbackList[0].id
					}else{
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					} 
				})
			},
			chooseImage(id){
				this.id=id;	
			},
			submitfeedback(){
				let obj = {
					opinion_id:this.id,
					content:this.mycontent,
					images:this.upimgload
				}
				this.$common.requests('/api/about/add_feedback',obj).then(res=>{
					if(res.data.code == 1){
						// this.feedbackList = res.data.data
						this.$api.msg(res.data.msg);
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})							
						},1000)
					}else{
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			change(index){
				if(index == this.currentIndex){
					this.currentIndex = 200
					return
				}
				this.currentIndex = index
			},
			// 选择图片来源途径
			choosetype(e){
				this.modalName = e.currentTarget.dataset.target
			},
			// 拍照选择
			choosecamera(){
				this.upimgload = ''
				this.modalName = null
				this.$common.upimg(1,1,['camera']).then(res=>{
					this.upimgload = res[0]
				})
			},
			// 从相册选择
			choosephone(){
				this.upimgload = ''
				this.modalName = null
				this.$common.upimg(1,1,['album']).then(res=>{
					this.upimgload = res[0]
				})
			},
			// 取消 隐藏
			canclechoose(){
						this.modalName = null
			},
			// 模态框时间
			changeDatetimePicker(date) {
						console.log(date);
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
		background-color: #FFFFFF;
		font-size: 32rpx;
		letter-spacing: 4rpx;
	}
	.small_box{
		width: 100%;
		padding: 0 20rpx;
	}
	.box_title{
		width: 100%;
		line-height: 70rpx;
	}
	.check_box{
		width:40rpx;
		height:40rpx;
		margin-right: 30rpx;
	}
	.list{
		line-height: 70rpx;
	}
	.border{
		line-height: 70rpx;
	}
	.text{
		width: 100%;
		height: 330rpx;
		background-color: #F2F2F2;
		padding: 20rpx 0 0 20rpx;
	}
	.button{
		width:100%;
		height: 100rpx;
		position: absolute;
		bottom: 0;
		background-color:#5A7EF8;
		color: #FFFFFF;
	}
	.add{
		width: 230rpx;
		height: 198rpx;
	}
	/* model */
	.myimgtype{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background-color:rgba(0,0,0,.3);
		z-index: 101;
	}
	.common_type{
		width:100%;
		height:80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 20rpx 20rpx 0 0;
	}
	.commoncancle{
		line-height: 80rpx;
		text-align: center;
		color:#3C84F2;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 20rpx;
		left:40rpx;
		right:40rpx;
	}
	.addbottom{
		border:1rpx solid #F2F2F2;
	}
	.content{
		position: absolute;
		bottom: 120rpx;
		left:40rpx;
		right:40rpx;
		height:160rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx;
		color:#3C84F2;
	}
	.star{
		width:36rpx;
		height:30rpx;
		line-height: 48rpx;
		text-align: center;
		color:red;
		font-size: 40rpx;
	}
</style>
