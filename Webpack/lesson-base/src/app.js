import React, { Component } from 'react';
import _ from 'lodash';
import styles from './styles/index.module.less';

class App extends Component {
  render() {
    return (
      <div
        className={styles.app}
        onClick={e => {
          import(/* webpackChunkName:"printMe" */ './printMe').then(module => {
            var print = module.default;
            print();
          });
        }}
      >
        hello world
      </div>
    );
  }
}

export default App;
