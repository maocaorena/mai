import MessageBoxComponent from './messageBox.vue';

const MessageBox ={
	install: function(Vue){
		Vue.component('MessageBox',MessageBoxComponent)
	}
}
export default MessageBox;