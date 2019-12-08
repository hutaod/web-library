export default {
  namespace: 'users',
  state: {
    counter: 0,
  },
  reducers: {
    add(state) {
      return { ...state, counter: state.counter + 1 };
    },
  },
  effects: {
    *asyncAdd({ payload, type }, { call, put }) {
      console.log(payload, type);
      yield call(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              success: true,
            });
          }, 2000);
        });
      });
      yield put({ type: 'add', payload: 2 });
    },
  },
};
