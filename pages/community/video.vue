<template>
	<view class="content">
		<video class='mtvideo' id='shabi' :src="url" show-progress='false' enable-play-gesture='true'
		controls @play='amplification' ></video>
	</view>
</template>

<script>
	export default {
	  data() {
	   return {
	     url : ''
	   }
	  },
	  onLoad(option) {
	   this.url = option.url;
	  },
	  methods: {
	   amplification(){
	   	// 获取 video 上下文 videoContext 对象
	   	this.videoContext = uni.createVideoContext('shabi');
	   	// 进入全屏状态
	   	this.videoContext.requestFullScreen();
	   },
	  }
	 }
</script>

<style>
	.content{
		
	}
	.mtvideo{
		width:100%;
	}
</style>
