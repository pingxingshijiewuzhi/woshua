<template>
	<view class='contribute'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/btn_h_fanhui@2x.png" mode=""></image>
				<view class="mytabbar_text">代理之声投稿</view>
				<view class=" mytabbar_right" @tap="pushcontribute">投稿声明</view>
			</view>
		</view>
		<view class='mycontent'>
			<view class='mytitle text-bold'>我要发声</view>
			<view class='textcontent'>
				<view class='totalnum'>{{number}} / 100</view>
				<textarea class='intext' @input='myinput($event.target)' v-model='content' placeholder="请输入30字以上的内容" maxlength='100' />
				</view>
			<view class='uploadimg text-bold'>上传个人高清形象照</view>
			<block v-if='!upimgload'>
				<view class='pictorbox' @tap='choosetype'  data-target='DialogModal'>
					<image src="../../static/communityimage/addpictor.png" mode=""></image>
				</view>
			</block>
			<block v-else>
				<view class='pictorbox' @tap='choosetype'  data-target='DialogModal'>
					<image :src="imgUrl+upimgload" mode=""></image>
				</view>
			</block>
		</view>
		<view class='bottombtn' @click='commitcontribute'>
			<image src="../../static/image/btn_h_tj@2x.png" mode=""></image>
		</view>
		<view class='myimgtype'  v-show="modalName" :class="modalName=='DialogModal'?'show':''">
			<view class='content'>
				<view class='common_type addbottom' @click='choosecamera'>拍照上传</view>
				<view class='common_type' @click='choosephone'>从相册选择</view>
			</view>
			<view class='commoncancle' @tap='canclechoose'>取消</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				content:'',
				number:1,
				modalName:null,
				id:'',
				imgUrl:this.$common.baseUrl,
				upimgload:'',
			}
		},
		onLoad(option) {
			this.id = option.id	
		},
		watch:{
			// 监听输入框的值
			content(val){
				// console.log(val)
				// console.log(val.length)
				this.number = val.length
			}
		},
		methods:{
			// 监听输入框的值
			myinput(e){
				// console.log(e.value)
			},
			// 选择图片来源途径
			choosetype(e,number){
				this.phonenumber = number
				this.modalName = e.currentTarget.dataset.target
			},
			canclechoose(){
				this.modalName = null
			},
			back(){
			    uni.navigateBack({
			     delta:1
			    })
			},
			// 选择图片来源途径
		
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
			// 投稿
			pushcontribute(){
				uni.navigateTo({
					url:'declaration'
				})
			},
			// 提交
			commitcontribute(){
				let obj = {
					detail:this.content,
					images:this.upimgload
				}
				this.$common.requests('/api/voice/add_voice',obj).then(res=>{
					if(res.data.code == 1){
						this.$api.msg(res.data.msg);
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}else{
						console.log(res.data.msg)
					} 
				})
				
			}
		}
	}
</script>

<style scoped>
	.contribute{
		width: 100vw;
		height: 100vh;
		background-color:#F2F2F2;
	}
	.mytabbar{
		width: 100%;
		height: 120rpx;
		background-color: #FFFFFF;
		padding: 30rpx 20rpx;
	}
	.mytabbar_image{
		width: 40rpx;
		height: 34rpx;
	}
	.mytabbar_text{
		font-size: 38rpx;
	}
	.mytabbar_right{
		font-size: 28rpx;
	}
	.mytabbar_top{
		width: 100%;
		height: 100rpx;
	}
	
	.mycontent{
		height:calc(100vh - 190rpx);
		/* border:1rpx solid red; */
		width:100%;
		padding: 0 30rpx;
	}
	.mytitle{
		height:96rpx;
		width:94%;
		margin: 0 3%;
		line-height: 96rpx;
		font-size: 30rpx;
	}
	.textcontent{
		position: relative;
		width:94%;
		margin: 0 auto;
		height:300rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
	}
	.intext{
		padding-top: 20rpx;
		padding-left: 20rpx;
		width:100%;
		height:100%;
	}
	.totalnum{
		position: absolute;
		bottom: 10rpx;
		right:10rpx;
	}
	.uploadimg{
		height:110rpx;
		padding-top: 40rpx;
		padding-bottom: 30rpx;
		line-height: 40rpx;
		width:94%;
		margin: 0 auto;
		font-size: 30rpx;
	}
	.pictorbox{
		width: 96%;
		margin: 0 auto;	
	}
	.pictorbox image{
		width:194rpx;
		height:164rpx;
	}
	
	/* 图片弹框样式 */
	.myimgtype{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background-color:rgba(0,0,0,.3);
	}
	.content{
		position: absolute;
		bottom: 120rpx;
		left:40rpx;
		right:40rpx;
		height:160rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		color:#3C84F2;
	}
	.common_type{
		width:100%;
		height:80rpx;
		line-height: 80rpx;
		text-align: center;
	}
	.addbottom{
		border:1rpx solid #F2F2F2;
	}
	.commoncancle{
		line-height: 80rpx;
		text-align: center;
		color:#3C84F2;
		border-radius: 20rpx;
		position: absolute;
		bottom: 20rpx;
		left:40rpx;
		right:40rpx;
		height:80rpx;
		background-color: #FFFFFF;
	}
	
	/* 底部按钮 */
	.bottombtn{
		width: 90%;
		margin: 0 auto;
		position: fixed;
		left:0;
		right:0;
		bottom: 0;
		height:90rpx;
	}
	.bottombtn image{
		width:100%;
		height:100%;
		border-radius: 50rpx 50rpx;
	}
</style>
