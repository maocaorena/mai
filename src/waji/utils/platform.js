const ua = navigator.userAgent.toLowerCase()
export default {
	isIOS: /iphone|ipad|ipod/.test(ua),
	isAndroid: /android/.test(ua),
	isX5: /mqqbrowser/.test(ua)
}