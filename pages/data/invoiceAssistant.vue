<template>
	<view class='invoiceAssistant'>
		<block v-for='(item,index) in invoicelist' :key='index'>
			<view class='invoice_item'>
				<view class='invoice_item_left' @click="amplifier(imgurl+item.invoice_images)">
					<image :src="imgurl+item.invoice_images" mode=""></image>
				</view>
				<view class='invoice_item_right'>
					<view class='monthinvoice'>
						{{item.name}}
					</view>
					<view class='dateinvoice'>
						<image src="../../static/communityimage/download.png" mode="" @click='download_image(imgurl+item.invoice_images)'></image>
						<view>{{item.createtime}}</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invoicelist: [],
				imgurl: this.$common.baseUrl,

				page: 1,
				limit: 10,

			}
		},
		onLoad() {
			this._getinvoice()
		},
		onPullDownRefresh() {
			this.page = 1;
			this.invoicelist = [];
			this._getinvoice();
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onReachBottom() {
			this.page++;
			this._getinvoice();
		},
		methods: {
			_getinvoice() {
				var obj = {
					page: this.page,
					limit: this.limit
				}
				this.$common.requests('/api/invoice/get_my_invoice', obj).then(res => {
					if (res.data.code == 1) {
						if (res.data.data.length == 0) {
							this.$api.msg('暂无更多');
						}
						if (this.page == 1) {
							this.invoicelist = res.data.data
						} else {
							this.invoicelist = this.invoicelist.concat(res.data.data)
						}
					} else {
						// console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			// 放大图片
			amplifier(urls) {
				let arrayimg = []
				console.log(urls)
				// console.log(this.$common.baseUrl)
				arrayimg.push(urls)
				console.log(arrayimg)
				// 预览图片
				uni.previewImage({
					current: 1,
					urls: arrayimg,
					longPressActions: {
						success: function(data) {
							console.log('成功查看图片')
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			// 下载图片
			download_image(urls){
				var that = this
				uni.downloadFile({
					url:urls,
					success:(res) =>{
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath:res.tempFilePath,
								success(res) {
									// console.log(res,88)
									that.$api.msg('下载成功') 
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.invoiceAssistant {
		width: 100vw;
		overflow-y: scroll;
	}

	.invoice_item {
		margin-top: 30rpx;
		padding: 30rpx;
		width: 100%;
		height: 210rpx;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
	}

	.invoice_item_left {
		width: 300rpx;
		height: 100%;
	}

	.invoice_item_left image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx 20rpx;
	}

	.invoice_item_right {
		width: 210rpx;
		height: 100%;
	}

	.monthinvoice {
		height: 80rpx;
		line-height: 80rpx;
		text-align: end;
		letter-spacing: 4rpx;
		font-size: 32rpx;
		color: #637CD8;
	}

	.dateinvoice {
		height: 80rpx;
		color: #565656;
		/* border:1rpx solid red; */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.dateinvoice image{
		width: 28rpx;
		height: 24rpx;
	}
</style>
