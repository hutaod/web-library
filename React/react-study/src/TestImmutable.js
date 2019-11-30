import React from 'react'
import Immutable, { Map } from 'immutable'
import Cursor from 'immutable-cursor'

const TestComp = (props) => {
  const { children, color } = props
  console.log(props.children)
  // const a = Map({
  //   select: 'users',
  //   filter: Map({ name: 'Cam' })
  // })
  const a = Immutable.fromJS({
    select: 'users',
    filter: Map({ name: 'Cam' })
  })
  const b = a.set('select', 'users2')
  const c = Immutable.fromJS({
    select: 'users',
    filter: Map({ name: 'Cam' })
  })
  console.log(a, b, a === b)
  console.log(a.get('filter') === b.get('filter'))
  console.log(Immutable.is(a, c), Immutable.is(a, b))
  // console.log(Cursor)

  let data = Immutable.fromJS({ a: { b: { c: 1 } } })
  let corsor = Cursor.from(
    data,
    ['a', 'b'],
    (nextValue, prevValue, keyPath) => {
      // 当 cursor 或其子
      console.log(
        'Value changed from',
        prevValue.toJS(),
        'to',
        nextValue.toJS(),
        'at',
        keyPath
      )
    }
  )
  console.log(corsor.get('c'))
  corsor.set('a', 2)
  console.log(corsor)

  return (
    <button style={{ color }}>
      {/* <div aria-hiddle={true}>123</div> */}
      {children}
    </button>
  )
}

export default TestComp
