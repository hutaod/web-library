function ajax(options) {
  const { method = 'GET', params, async, success, headers } = options
  let xhr,
    url = options.url
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhr.onreadystatechange = function stateChange() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      success && success(xhr.responseText)
    }
  }

  if (method === 'GET' && params) {
    url = `${url}?${Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&')}`
  }
  xhr.open(method, url, async)

  if (headers) {
    Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
  }
  method === 'GET' ? xhr.send() : xhr.send(params)
}
