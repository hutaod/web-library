import rayslog from '../rayslog'
import global from './model'
import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas'

// reducers
const initialModels = {
  global
}

const sagaMiddleware = createSagaMiddleware()

const app = rayslog({
  initialModels,
  initialState: {
    global: {
      counter: 2
    }
  },
  middlewares: [sagaMiddleware]
})

sagaMiddleware.run(mySaga)

const store = app.store

export const addReducer = app.addReducer

export default store
