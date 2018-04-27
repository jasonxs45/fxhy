let _mtac
(() => {
  let mta = document.createElement("script")
  mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.4"
  mta.setAttribute("name", "MTAH5")
  mta.setAttribute("sid", "500529085")
  let s = document.getElementsByTagName("script")[0]
  s.parentNode.insertBefore(mta, s)
})()
