import { model } from '../../demacia'

export default model({
  namespace: 'test',
  state: { name: 'haha' },
  reducers: {
    changeName(state, { payload }) {
      return {
        ...state,
        name: payload,
      }
    },
  },
})
