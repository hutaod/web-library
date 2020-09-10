function jsonp(url, datas, success) {
  const callBackName = 'callback' + Math.random().toString(16).slice(2)
  const script = document.createElement("script")
  window[callBackName] = (res) => {
    success(res)
    delete window[callBackName]
  }
  const dataStr = Object.keys(datas).reduce((str, key) => {
    str += `${key}=${datas[key]}&`
    return str
  }, '')
  script.src = `${url}?${dataStr}${callBackName}`
  document.body.appendChild(script)
  script.onload = () => {
    document.body.removeChild(script)
  }
}