// import rayslog from '../rayslog'
import demacia from '../demacia/index'
import global from './model'
import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas'

// reducers
const initialModels = {
  global,
}

const sagaMiddleware = createSagaMiddleware()

const store = demacia({
  initialModels,
  initialState: {
    global: {
      counter: 2,
    },
  },
  middlewares: [sagaMiddleware],
})

sagaMiddleware.run(mySaga)

export default store
