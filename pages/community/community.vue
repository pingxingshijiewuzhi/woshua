<template>
	<view class='community'>
		<view class='mytabbar'>
			<view>
				<view class='basestyle' :class="{'choosetitle':currentIndex == 0}" @click='choose(0)'>宣传中心</view>
			</view>
			<view>
				<view class='basestyle' :class="{'choosetitle':currentIndex == 1}" @click='choose(1)'>访谈录</view>
			</view>
			<view>
				<view class='basestyle' :class="{'choosetitle':currentIndex == 2}" @click='choose(2)'>e风采</view>
			</view>
		</view>
		<view class='hahatabbar'>
		</view>
		<!-- 宣传材料显示 -->
		<view class='contetnbox' v-show='currentIndex == 0'>
			<view class='changetabbar'>
				<view class='mybase' :class="{'choosetab':defaultIndex == 0}" @click='change(0)'>宣传资料</view>
				<view class='mybase' :class="{'choosetab':defaultIndex == 1}" @click='change(1)'>日常问候</view>
			</view>
			<view class="hahachangetabbar"></view>
			<!-- 问候图 -->
			<view class='materrialslist' v-if='defaultIndex == 0'>
				<block v-for='(item,index) in helloImageList' :key='"a"+index'>
					<view class='list_item'>
						<view class='list_item_top'>
							<block v-if="item.image.indexOf('mp4') != -1">
								<!-- enable-play-gesture='true' -->
								<!-- x5-playsinline="" playsinline="" webkit-playsinline="" -->
								<image :src="baseUrl+item.image_feng" @click="goVideo(item.image)" ></image>
								<!-- <video class='mtvideo' :id='item.id' :src="item.image" show-progress='false' enable-play-gesture='true'
								controls @play='amplification(item.id)' @fullscreenchange='changefull'></video> -->
								<!-- show-center-play-btn='false' play-btn-position='center' -->
								<!-- show-fullscreen-btn='false' -->
								<!-- :controls='controlStatus' -->
							</block>
							<block v-else>
								<!-- <block v-for="(v,k) in item.images" :key='k'>
									<image :src="v" mode=""  @click="datu(item.images,k)"></image>
								</block> -->
								<!-- 这里问候图和日常问候返回图片参数不一样 -->
								<image :src="item.image" mode="" @click="datu(item.image)"></image>
							</block>
						</view>

						<view class='list_item_bottom'>
							<view class='yearmonth flexs'>
								{{item.createtime}}
							</view>
							<view class='sharebox'>
								<image src="../../static/communityimage/sharebtn.png" mode="" @click='share(item.image,item.id)'></image>
								<view>{{item.share_num}}</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<!-- 日常问候 -->
			<view class='materrialslist' v-if='defaultIndex == 1'>
				<view class='changetabbar_again'>
					<view class='changetabbar_left flexs3'>
						<view class='community_time'>按时间</view>
						<view class="btnchoose" @click="changeTimeOrderType()">
							<image src="../../static/image/icon_h_sanjiao_lan@2x.png" mode="" v-show="timeOrderType == 1"></image>
							<image src="../../static/image/shaixuan.png" mode="" v-show="timeOrderType == 2"></image>
							<image src="../../static/image/123456.png" mode="" v-show="timeOrderType == 2"></image>
							<image src="../../static/image/icon_h_sanjiao_hui@2x.png" mode="" v-show="timeOrderType == 1"></image>
						</view>
					</view>
					<view class='changetabbar_right flexs3'>
						<view class='community_xia'>按下载量</view>
						<view class="btnchoose" @click="changeDownNumType()">
							<image src="../../static/image/icon_h_sanjiao_lan@2x.png" mode="" v-show="downNumType == 1"></image>
							<image src="../../static/image/shaixuan.png" mode="" v-show="downNumType == 2"></image>

							<image src="../../static/image/123456.png" mode="" v-show="downNumType == 2"></image>
							<image src="../../static/image/icon_h_sanjiao_hui@2x.png" mode="" v-show="downNumType == 1"></image>
						</view>
					</view>
				</view>
				<block v-for='(item,index) in dayHelloImageList' :key='"b"+index'>
					<view class='common_item'>
						<view class='imgbox'>
							<block v-for="(v,k) in item.images" :key='k'>
								<image :src="v" mode="" @click="datu(item.images,k)"></image>
							</block>
						</view>
						<view class='list_item_bottom'>
							<view class='yearmonth'>
								{{item.createtime}}
							</view>
							<view class='downloadsharebox'>
								<image src="../../static/communityimage/download.png" mode="" @click='download_image(item.images,item.id,index)'></image>
								<view>{{item.down_num}}</view>
							</view>
						</view>
					</view>
				</block>
			</view>

		</view>
		<!-- 喔访谈 -->
		<view class='interview_contentbox' v-show='currentIndex == 1'>
			<block v-for='(item,index) in fangTanList' :key='"c"+index'>
				<view class='interview_item' @click='gointerviewdetail(item.id,index)'>
					<view class='interview_item_top'>
						<image :src="baseUrl + item.image" mode=""></image>
					</view>
					<view class='interview_item_bottom'>
						<view class='opacitytitle'>{{item.name}}</view>
						<view class='eyeview'>
							<image src="../../static/communityimage/icon_yj@2x.png" mode=""></image>
							<view>{{item.read_num}}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 伙伴之声 -->
		<view class='interview_contentbox' v-show='currentIndex == 2'>
			<!-- class='interview_item' 判断用那个类名-->
			<view class='interview_item_baoming' @click='gocontribute'>
				<view class='interview_item_top'>
					<image :src="baseUrl+voice_image" mode=""></image>
				</view>
			</view>
			<view class='interview_item' @click='gopartnerdetail(item.id,index)' v-for="(item,index) in voice_good" :key='"d"+index'>
				<view class='interview_item_top'>
					<image :src="baseUrl+item.images" mode=""></image>
				</view>
				<view class='interview_item_bottom'>
					<view class='opacitytitle'>{{item.name}}</view>
					<view class='eyeview'>
						<image src="../../static/communityimage/icon_yj@2x.png" mode=""></image>
						<view>{{item.read_num}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 模态框 -->
		<view class='masking' @click='modclick' v-if='sharestatus'></view>
		<view class='modelopacity' v-if='sharestatus'>
			<view class='my_title'>选择要分享到的平台</view>
			<view class='typechoose'>
				<image src="../../static/image/icon_wdsh_h_wx@2x.png" mode="" @click="goFriend"></image>
				<image src="../../static/image/icon_h_wdsh_pyq@2x.png" mode="" @click="goQuan"></image>
			</view>
			<view class='bottombtn' @click='closeshare'>
				<image src="../../static/communityimage/btn_h_qxfx@2x.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 控制栏显示与否
				controlStatus:false,
				
				currentIndex: 0,
				defaultIndex: 0,
				// 默认不显示弹框
				sharestatus: false,
				helloPage: 1, //问候图分页页码
				dayHelloPage: 1, //日常问候分页页码
				fangTanPage: 1, //喔访谈分页页码
				limit: 10,
				helloImageList: [], //问候图列表
				timeOrderType: 1,
				downNumType: 1,
				dayHelloImageList: [], //日常问候列表
				fangTanList: [], //访谈列表
				baseUrl: this.$common.baseUrl,
				voice_image: '', //伙伴之声报名入口
				voice_good: [] ,//优秀发声
				new_image:'',
				new_id:''
			}
		},
		onShow() {
			this.get_list();
			this.get_woshow_list()
		},
		onPullDownRefresh() {
			if (this.currentIndex == 0) {
				//宣传材料进入
				if (this.defaultIndex == 0) {
					this.helloPage = 1
				} else {
					this.dayHelloPage = 1
				}
				this.get_list()
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 1000)
			} else if (this.currentIndex == 1) {
				//喔访谈进入
				this.fangTanPage = 1
				this.get_woshow_list()
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 1000)
			} else {
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 1000)
			}
		},
		onReachBottom() { //监听上拉触底事件
			//console.log(99999666666)
			//判断是哪个页面进入的触底
			if (this.currentIndex == 0) {
				//宣传材料进入
				if (this.defaultIndex == 0) {
					this.helloPage++
				} else {
					this.dayHelloPage++
				}
				//	this.get_list()
			} else if (this.currentIndex == 1) {
				//喔访谈进入
				this.fangTanPage++
				this.get_woshow_list()
			} else {
				//伙伴之声
			}

		},
		methods: {
			goVideo(url){
				uni.navigateTo({
					url:'video?url='+url
				})
			},
			// 分享
			share(image,id) {
				this.sharestatus = true
				this.new_image=image
				this.new_id=id
			},
			// 分享微信好友
			goFriend(){
				var that=this
				//console.log(this.new_image.indexOf(".mp4"))
				if(that.new_image.indexOf(".mp4") > 0){
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 4,
					    summary: "我正在使用刷脸e付，赶紧跟我一起来体验！",
							mediaUrl:that.new_image,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
									that.addNumber(that.new_id)
									that.get_list()
									that.sharestatus = false
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}else{
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 2,
					    // summary: "我正在使用刷脸e付，赶紧跟我一起来体验！",
							imageUrl:that.new_image,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
									that.addNumber(that.new_id)
									 that.get_list()
									that.sharestatus = false
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}
			},
			//分享朋友圈
			goQuan(){
				var that=this
				//console.log(this.new_image.indexOf(".mp4"))
				if(that.new_image.indexOf(".mp4") > 0){
					uni.share({
					    provider: "weixin",
					    scene: "WXSenceTimeline",
					    type: 4,
					    summary: "我正在使用刷脸e付，赶紧跟我一起来体验！",
							mediaUrl:that.new_image,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
									that.addNumber(that.new_id)
									that.get_list()
									that.sharestatus = false
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}else{
					uni.share({
					    provider: "weixin",
					    scene: "WXSenceTimeline",
					    type: 2,
					    // summary: "我正在使用刷脸e付，赶紧跟我一起来体验！",
							imageUrl:that.new_image,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
									that.addNumber(that.new_id)
									 that.get_list()
									that.sharestatus = false
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}
			},
			//分享加数量
			addNumber(ids){
				var obj={
					materials_id:ids
				}
			//	console.log(obj)
				this.$common.requests('/api/Materials/materials_setinc', obj).then(res => {
					//console.log(res)
						if(res.data.code==1){
							this.$api.msg(res.data.msg);
						}
				})
			},
			// 播放放大
			amplification(id){
				// 获取 video 上下文 videoContext 对象
				this.videoContext = uni.createVideoContext(id+'');
				// 进入全屏状态
				this.videoContext.requestFullScreen();
			},
			changefull(e){
				this.controlStatus = e.detail.fullScreen
				// console.log(e.detail,456654)
			},
			// 多图下载
			download_image(images, id, index) {
				var that = this;
				var id = id;
				var indexs = index;
				var images_num = images.length;
				var ok_num = 0;
				var into_num = 0;
				images.forEach(function(currentValue, index, arr) {

					uni.downloadFile({
						url: currentValue,
						success: res => {

							if (res.statusCode === 200) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function(res) {
										// that.$api.msg('保存成功');
										into_num++;
										ok_num++;
										if (into_num == images_num) {
											var obj = {
												materials_id: id
											}
											that.$common.requests('/api/Materials/materials_setinc', obj).then(res => {
												that.dayHelloImageList[indexs]['down_num']++;
												if (ok_num == images_num) {
													that.$api.msg('下载成功');
												} else {
													var msg = '下载成功' + ok_num + '张,' + '失败' + (images_num - ok_num) + '张';
													that.$api.msg(msg);
												}
											})
										}
									},
									fail: function() {
										// that.$api.msg('保存失败，请稍后重试');
										into_num++;
									}
								});
							} else {
								// that.$api.msg('下载失败');
							}
						}
					});
				})
			},

			datu(image, index) {
				console.log(image)
				console.log(index)
				if (index == undefined) {
					index = 0
				}
				if (!Array.isArray(image)) {
					var imagearr = [image];
				} else {
					var imagearr = image;
				}
				uni.previewImage({
					current: index,
					urls: imagearr,
					loop: true
				})
			},
			get_vioce_interface() {
				this.$common.requests('/api/Voice/get_image').then(res => {
					if (res.data.code == 1) {
						// console.log(res.data.data)
						this.voice_image = res.data.data.voice_image
					} else {
						this.$api.msg(res.data.msg)
					}
				});
				this.$common.requests('/api/Voice/get_voice').then(res => {
					if (res.data.code == 1) {
						// console.log(res.data.data)
						this.voice_good = res.data.data
						// console.log(this.voice_good,666)
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			changeTimeOrderType() {
				this.dayHelloImageList = []
				this.dayHelloPage = 1
				if (this.timeOrderType == 1) {
					this.timeOrderType = 2
				} else {
					this.timeOrderType = 1
				}
				this.get_list()
			},
			changeDownNumType() {
				this.dayHelloImageList = []
				this.dayHelloPage = 1
				if (this.downNumType == 1) {
					this.downNumType = 2
				} else {
					this.downNumType = 1
				}
				this.get_list()
			},
			get_list() {
				if (this.defaultIndex == 0) {
					var obj = {
						//问候图
						type: this.defaultIndex + 1,
						page: this.helloPage,
						limit: this.limit,
						createtime_type: this.timeOrderType,
						down_type: this.downNumType
					}
				} else {
					var obj = {
						//日常问候
						type: this.defaultIndex + 1,
						page: this.dayHelloPage,
						limit: this.limit,
						createtime_type: this.timeOrderType,
						down_type: this.downNumType
					}
				}
				this.$common.requests('/api/Materials/get_materials_list', obj).then(res => {
					if (res.data.code == 1) {
						if (res.data.data.length !== 0) {
							if (this.defaultIndex == 1) {
								if (this.dayHelloPage == 1) {
									// 这里是日常问候
									this.dayHelloImageList = res.data.data
									//console.log(this.dayHelloImageList, '日常问候')
								} else {
									this.dayHelloImageList = this.dayHelloImageList.concat(res.data.data)
								}
							} else {
								if (this.helloPage == 1) {
									//这里是问候图
									this.helloImageList = res.data.data
									//console.log(this.helloImageList, '问候图')
								} else {
									this.helloImageList = this.helloImageList.concat(res.data.data)
								}
							}
						} else {
							if (this.helloPage != 1) {
								this.$api.msg('暂无更多')
							}
						}
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			get_woshow_list() {
				var obj = {
					page: this.fangTanPage,
					limit: this.limit
				}
				this.$common.requests('/api/Interview/get_interview_list', obj).then(res => {
					if (res.data.code == 1) {
						if (res.data.data.length != 0) {
							if (this.fangTanPage == 1) {
								this.fangTanList = res.data.data
							} else {
								this.fangTanList = this.fangTanList.concat(res.data.data)
							}
						} else {
							if (this.fangTanPage != 1) {
								this.$api.msg('暂无更多')
							}
							
						}
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			choose(index) {
				this.currentIndex = index
				if (this.currentIndex == 0) {
					//宣传材料
					//默认进入就是宣传材料,切换不需要多余操作
				} else if (this.currentIndex == 1) {
					//喔访谈
					this.fangTanPage = 1;
					this.fangTanList = [];
					//获取喔访谈列表
					this.get_woshow_list()
				} else {
					//伙伴之声
					//获取伙伴之声页面两入口
					this.get_vioce_interface()
				}

			},
			change(index) {
				//每次点击切换日常问候及问候图都清空之前的数据
				this.defaultIndex = index
				this.helloImageList = []
				this.dayHelloImageList = []
				// 还要把页数变成1
				this.helloPage = 1;
				this.dayHelloPage = 1;
				this.get_list()
			},
			
			modclick() {
				this.sharestatus = false
			},
			// 取消分享
			closeshare() {
				this.sharestatus = false
			},
			// 进入访谈详情
			gointerviewdetail(fangTanId, index) {
				this.fangTanList[index]['read_num']++;
				uni.navigateTo({
					url: 'interviewdetail?id=' + fangTanId
				})
			},
			// 进入伙伴之声详情
			gopartnerdetail(fangTanId, index) {
				this.voice_good[index]['read_num']++;
				console.log(fangTanId, 456654)
				uni.navigateTo({
					url: 'richtextinterview?id=' + fangTanId
				})
			},
			// 去投稿
			gocontribute() {
				uni.navigateTo({
					url: 'contribute'
				})
			}
		}
	}
</script>

<style>
	.community {
		/* height:100vh; */
		/* height: calc(100vh - 100rpx); */
		width: 100vw;
		background-color: #F2F2F2;
		position: relative;
		margin-bottom: 100rpx;
	}

	.mytabbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9;
		height: 130rpx;
		padding-top: 40rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		display: flex;
		justify-content: space-around;
		background-color: #FFFFFF;
	}

	.hahatabbar {
		width: 100%;
		height: 130rpx;
		padding-top: 40rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		display: flex;
		justify-content: space-around;
	/* 	background-color: blue; */
	}

	.basestyle {
		height: 80rpx;
		line-height: 80rpx;
		width: 150rpx;
		text-align: center;
	}

	.choosetitle {
		color: #5E80FB;
		border-bottom: 1rpx solid #5E80FB;
	}

	.contetnbox {
		padding: 0 1%;
		position: relative;
		/* tabbar和导航栏高度 */
		/* height:calc(100vh - 230rpx); */
		/* overflow-y:scroll; */
	}

	.changetabbar {
		position: fixed;
		background-color: #f7f7f7;
		z-index: 999;
		top: 130rpx;
		left: 0;
		right: 0;
		padding: 30rpx 1%;
		height: 120rpx;
		/* width:350rpx; */
		display: flex;
		/* justify-content:space-between; */
		/* border:1rpx solid red; */
	}

	.hahachangetabbar {
		padding: 30rpx 1%;
		height: 120rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		/* background-color: red; */
	}

	.mybase {
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		width: 170rpx;
		/* border-radius: 20%; */
		border-radius: 20rpx;
	}

	.mybase:nth-child(1) {
		margin-left: 4%;
	}

	.choosetab {
		background-color: #5A7EF8;
		color: #FFFFFF;
	}

	.materrialslist {
		height: calc(100% - 120rpx);
		overflow: hidden;
		overflow-y: scroll;
		/* height:calc(100vh - 350rpx) */
	}

	.list_item {
		/* width: 50%; */
		/* 不该给49% */
		/* width:49%; */
		/* 也不该用相对父元素给高,因为父元素高度不固定 */
		/* height:50%; */
		height: 512rpx;
		width: 48%;
		margin: 0 1%;
		/* padding: 0 4%; */
		padding-bottom: 20rpx;
		float: left;
		/* border:1rpx solid red; */
	}

	.list_item_top {
		height: 91%;
		width: 100%;
	}

	.mtvideo {
		width: 100%;
		height: 100%;
		position: relative;
	}

	/* .uni-video-controls{
	} */


	.list_item_top image {
		width: 100%;
		height: 100%;
	}

	.list_item_bottom {
		height: 9%;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.yearmonth {
		width: 60%;
		height: 100%;
	}

	.sharebox {
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.sharebox image {
		height: 24rpx;
		width: 28rpx;
	}

	.sharebox>view {
		height: 100%;
		width: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 日常问候样式 */
	.changetabbar_again {
		padding: 30rpx 1%;
		height: 120rpx;
		width: 340rpx;
		display: flex;
		justify-content: space-between;
	}

	.changetabbar_left,
	.changetabbar_right {
		width: 148rpx;
		height: 70rpx;
	}

	.btnchoose {
		height: 60rpx;
		width: 30rpx;
	}

	.btnchoose image {
		display: block;
		margin: 10rpx;
		width: 18rpx;
		height: 12rpx;
	}

	.community_time {
		width: 58%;
		height: 56%;
	}

	.community_xia {
		width: 100%;
		height: 56%;
	}

	.common_item {
		padding: 0 1%;
		height: 360rpx;
	}

	.imgbox {
		height: 300rpx;
		width: 100%;
		padding: 25rpx 0;
		display: flex;
		overflow: hidden;
		overflow-x: scroll;
	}

	.imgbox image {
		flex-shrink: 0;
		height: 250rpx;
		width: 30%;
		margin-right: 3%;
	}

	.downloadsharebox {
		width: 20%;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.downloadsharebox image {
		margin-top: -6rpx;
		width: 28rpx;
		height: 24rpx;
	}

	.downloadsharebox>view {
		height: 100%;
		width: 40%;
		margin-left: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 喔访谈样式 */
	.interview_contentbox {
		padding: 0 1%;
		position: relative;
		/* padding: 0 1%;
		tabbar和导航栏高度
		height:calc(100vh - 230rpx);
		overflow: hidden;
		overflow-y: scroll; */
	}

	.interview_item {
		margin-top: 30rpx;
		height: 390rpx;
		width: 100%;
	}

	/* 报名图片样式 */
	.interview_item_baoming {
		margin-top: 30rpx;
		height: 300rpx;
		width: 100%;
	}

	.interview_item_top {
		height: 300rpx;
		width: 94%;
		margin: 0 3%;
	}

	.interview_item_top image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
	}

	.interview_item_bottom {
		background-color: #FFFFFF;
		height: 90rpx;
		width: 94%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 0 3%;
		border-radius: 0 0 20rpx 20rpx;
	}

	.opacitytitle {
		width: 60%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: left;
	}

	.eyeview {
		width: 15%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.eyeview image {
		width: 38rpx;
		height: 24rpx;
	}

	.eyeview>view {
		width: 50%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
	}

	/* 分享弹框样式 */
	.masking {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.modelopacity {
		position: fixed;
		z-index: 9999;
		left: 0;
		right: 0;
		bottom: 0;
		height: 390rpx;
		background-color: #FFFFFF;
		/* border:1rpx solid red; */
	}

	.my_title {
		font-size: 32rpx;
		height: 150rpx;
		line-height: 150rpx;
		text-align: center;
	}

	.typechoose {
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.typechoose image {
		width: 120rpx;
		height: 120rpx;
	}

	.bottombtn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 80rpx;
	}

	.bottombtn image {
		width: 100%;
		height: 100%;
	}
</style>
