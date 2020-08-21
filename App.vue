<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>

 /*每个页面公共css */
   @import "colorui/main.css";
   @import "colorui/icon.css";
   /*每个页面公共css */
   page{
      width: 100%;  
      height: 100%;  
     /* overflow: hidden; */
    }
   .flexs{
   	display: flex;
   	justify-content: center;
   	align-items: center;
   }
   .flexs1{
   	display: flex;
   	justify-content: flex-start;
   	align-items: center;
   }
   .flexs2{
   	display: flex;
   	justify-content: space-between;
   	align-items: center;
   }
   .flexs3{
   	display: flex;
   	justify-content: space-around;
   	align-items: center;
   }
   .flexs4{
   	display: flex;
   	flex-direction:row-reverse;
   	align-items: center;
   }
   .flexs5{
   	display: flex;
   	flex-direction:row;
   	
   }
   .flexs6{
   	display: flex;
   	flex-direction:row;
   	align-items: center;
   }
   .flexs7{
   	display: flex;
   	justify-content: center;
   }
   .flexs8{
   	display: flex;
   	 align-items: flex-end ;
   	justify-content: space-around;
   }
	 .flexs9{
	 	display: flex;
	 	align-items: center ;
		flex-direction:column;
	 }
	 .flexs10{
	 	display: flex;
	 	justify-content: flex-end;
	 	align-items: center;
	 }
	 .flexs11{
   	display: flex;
   	justify-content: flex-start;
   }
	 .flexs12{
	 	display: flex;
	 	flex-direction:column-reverse;
	 }
	 .flexs13{
	 	display: flex;
	 	justify-content: space-between;
	 }
	 .text-colors{
		 color:#E99E1F;
	 }
	 .uni-video-fullscreen {
		 /* transform: translateX(-10rpx); */
		/* position: absolute;
		right:0;
		bottom:10rpx; */
	 }
	 .uni-video-controls {
		 margin: 0 !important;
	 }
	 video::-webkit-media-controls{
	 	margin:0 !important;
	 	border:2rpx solid red;
	 }
	 video::-webkit-media-controls-fullscreen-button{ 
	 	 display: none;
	 }
	 
	 video::-webkit-media-controls-fullscreen{
	 	display: none;
	 }
/* //进度条 */
	     video::-webkit-media-controls-timeline {
			display: none;
	     }
	/* 观看的当前时间 */
	     video::-webkit-media-controls-current-time-display{
				display: none;            
	     }
	/* 剩余时间 */
	     video::-webkit-media-controls-time-remaining-display {
			display: none;            
	     }
</style>
