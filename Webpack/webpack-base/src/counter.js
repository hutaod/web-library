function counter() {
  var div = document.createElement('div')
  div.setAttribute('id', 'counter')
  div.innerHTML = 111111
  document.body.appendChild(div)
}

export default counter
