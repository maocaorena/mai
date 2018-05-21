import AlertComponent from './alert.vue';

const Alert ={
	install: function(Vue){
		Vue.component('Alert',AlertComponent)
	}
}
export default Alert;