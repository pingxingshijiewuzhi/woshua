import Vue from 'vue'
import App from './App'
import common from '@/common/common.js'
const msg = (title, duration=1500, mask=false, icon='none')=>{
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const bus = new Vue()
Vue.prototype.bus = bus
Vue.config.productionTip = false
Vue.prototype.$common = common
Vue.prototype.$api = {
	msg
};
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
