import { hot } from 'react-hot-loader/root';
import React from 'react';
// import React from './hreact/react';
import ReactDom from 'react-dom';
import Routes from './routes';

const App = hot(Routes);

const render = function() {
  const app = <App />;
  const container = document.getElementById('root');
  console.log(app, [container]);
  console.log(__DEV__);

  ReactDom.render(app, container);
};

render();

// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     render()
//   })
// }
