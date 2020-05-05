export default (content) => {
  const element = document.createElement('h2')
  // element.textContent = content || 'Hello Webpack'
  element.innerHTML = content || 'Hello Webpack'
  element.addEventListener('click', () => {
    alert('Hello Webpack')
  })
  return element
}
