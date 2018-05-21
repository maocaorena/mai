(function() {
	var docEl = document.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth || 375;
			clientWidth > 750 ? clientWidth = 750 : clientWidth = clientWidth;
			if(!clientWidth) return;
			docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
			window.remscale = clientWidth / 375;
		};
	if(!document.addEventListener) return;
	window.addEventListener(resizeEvt, recalc, false);
	document.addEventListener('DOMContentLoaded', recalc, false);
	setTimeout(function() {
		document.body.style.display = 'block';
	}, 10)
})();
