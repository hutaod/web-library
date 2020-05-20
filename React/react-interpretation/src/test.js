// import { hot } from 'react-hot-loader/root'
// import React from 'react'
// import React from './hreact/react';
// import ReactDom from 'react-dom'
// import Routes from './routes'

import React from './packages/react'
import ReactDom from './packages/react-dom'
const style = { border: '3px solid red', margin: '5px' }
let element = (
  <div id="a1" style={style}>
    A1
    <div id="b1" style={style}>
      B1
      <div id="c1" style={style}>
        C1
      </div>
      <div id="c2" style={style}>
        C2
      </div>
    </div>
    <div id="b2" style={style}>
      B2
    </div>
  </div>
)
console.log(element)
// const App = hot(Routes)

const render = function() {
  // const app = <App />
  const container = document.getElementById('root')
  // console.log(app, [container]);
  // console.log(__DEV__);

  // ReactDom.render(app, container)
  ReactDom.render(element, container)
}

render()

// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     render()
//   })
// }
