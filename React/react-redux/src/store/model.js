export default {
  namespace: 'global',
  state: {
    counter: 0
  },
  reducers: {
    increment(state, { payload }) {
      return {
        ...state,
        counter: state.counter + 1
      }
    },
    decrement(state, { payload }) {
      return {
        ...state,
        counter: state.counter - 1
      }
    }
  },
  effects: {
    async add({ dispatch }, { payload }) {
      const res = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ code: 1, success: true })
        }, 1000)
      })

      dispatch({
        type: 'increment',
        payload: res
      })
    }
  }
}
