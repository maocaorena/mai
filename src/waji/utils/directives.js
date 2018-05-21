import Vue from 'vue'
Vue.directive('ratio', {
  inserted: (el, binding) => {
    // debugger
    const ratio = Number(binding.value) || 1
    if (binding.arg === 'width') {
      el.style.width = `${el.offsetHeight * ratio}px`
    } else {
      el.style.height = `${el.offsetWidth * ratio}px`
    }
  }
})
