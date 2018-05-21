const HTMLStr = `<div
 style="
   display: none;
   position: absolute;
   bottom: 15%;
   text-align: center;
   font-size: 14px;
   color: #fff;
   z-index: 10000;
   opacity: 0;
   width: 100%;
   width: 100vw;
   transition: .3s;
 "
>
  <span
    style="
      background-color: rgba(0,0,0,.6);
      border-radius: 5px;
      line-height: 20px;
      padding: 6px 10px;
    "
  >
    toast
  </span>
</div>`

let toastEl
let timeoutID

const toast = {
	show(msg, center = false, timeout = 1500) {
		if(!toastEl) {
			const div = document.createElement('div')
			div.innerHTML = HTMLStr
			toastEl = document.body.appendChild(div.firstChild)
		}

		function _show() {
			toastEl.children[0].innerText = msg
			toastEl.style.display = 'block'
			// debugger
			if(center) {
				toastEl.style.bottom = '50%'
			}
			setTimeout(() => {
				toastEl.style.opacity = '1'
			})
			timeoutID = setTimeout(() => {
				toastEl.style.opacity = '0'
				toastEl.style.display = 'none'
				timeoutID = null
			}, timeout)
		}

		if(timeoutID) {
			clearTimeout(timeoutID)
			toastEl.style.opacity = '0'
			toastEl.style.display = 'none'
			setTimeout(() => {
				_show()
			})
		} else {
			_show()
		}
	},
	destory() {
		toastEl && toastEl.remove()
		toastEl = null
	}
}

export default toast