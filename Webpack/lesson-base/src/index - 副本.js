// import png from './imgs/ic_account_commission.png';
// import png2 from './imgs/emptystatus_search_no_result.png';
// import styles from './styles/index.less';
import React from 'react';
import ReactDom from 'react-dom';
// import printMe from './printMe';
import App from './app';
import './styles/index.css';

// function component() {
//   const element = document.createElement('div');
//   const btn = document.createElement('button');

//   element.innerHTML = ['Hello', 'webpack'].join();

//   btn.innerHTML = 'Click me and check the console!';
//   btn.onclick = printMe;

//   element.appendChild(btn);

//   return element;
// }

// document.body.appendChild(component());

ReactDom.render(<App />, document.getElementById('root'));

// if (module.hot) {
//   module.hot.accept('./app.js', function() {
//     // 使用更新过的 library 模块执行某些操作...
//     console.log(123);
//     printMe();
//   });
// }
