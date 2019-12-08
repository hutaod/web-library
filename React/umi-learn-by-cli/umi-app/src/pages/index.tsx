import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Button } from 'antd';
import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
const Home = function({ users, dispatch }) {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <div>{users.counter}</div>
      <Button
        onClick={() => {
          dispatch({
            type: 'users/asyncAdd',
          });
        }}
      >
        add
      </Button>
      <Link to="/my">to my</Link>
    </div>
  );
};

export default connect(state => state)(Home);
