# React系列

学好一门技术，需要经历大概三个过程：读文档，运用，看源码

本文档主要用于记录 React 的一些运用，和通过阅读 React 相关技术栈的源码，来更深层次的学习，读源码不是为了造一个同样的轮子，而是从别人的代码中学习到更多的知识，写出更好的运用方法。

目录：
- React使用总结
- 源码探索

## React使用总结

### React 中注意事项

- react 必须在 react-dom 之前引入
- 不能以 body 作为容器
- 引入babel并给script设置type可以支持jsx语法
- react 根元素只能有一个
- 插值表达式
  - 正常显示的类型: String Number
  - 不显示也不会报错的类型：Boolean null undefined
  - 插值表达式中不能直接输入的类型：对象（除去数组）数组会转换为字符串，并用空字符串拼接
- JSX属性
  - jsx标签也是支持属性设置的
  - jsx标签也是支持属性设置的
  - 基本上和html/xml类似
  - 属性也支持插值表达式
    注意：1. class： 使用className属性代替；2. style： 值必须使用对象
- React没有模板语法， 插值表达式中只支持表达式，不支持语句：for/if，通过数组生成的结构，每个元素都必须包含一个key属性，且每个key属性值是唯一的
- 函数使用：组件-拥有独立功能的一个模块，函数标签化-通过标签属性传入
- 一个函数或者类作为一个组件去使用的话， 那么名称必须首字母大写
- 如果使用类实现组件，需要继承一个父类：React.Component，props：传入的参数必须是对象的下一个属性props来接收

### 组件跨层级通信 - Context
在Context模式下有两个角色：
- Provider：外层提供数据的组件
- Consumer：内层获取数据的组件
  
实现Context：
```javascript
// 1. 创建上下文
const Context = React.createContext()

// 2. 获取Provider和Consumer
const Provider = Context.Provider
const Consumer = Context.Consumer

```

当Context使用时，应当避免直接使用Provider组件，
否则每次更改Provider的value内容都会重新渲染它的所有子组件，
应当抽离Provider，单独封装一个层复合组件

下面是我总结出来的Context一种使用方式：
```javascript

// 创建ContextProvider组件用于存取Provider数据
class ContextProvider extends Component {
  state = {
    counter: 0
  }
  add = (num = 1) => {
    this.setState({
      counter: this.state.counter + num
    })
  }
  render() {
    return (
      <Provider
        value={{
          ...this.state,
          add: this.add
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

// 封装一个高阶组件withConsumer，它根据配置返回一个高阶组件
// 用Consumer方式使用时更方便
function withConsumer(Consumer) {
  return Comp => props => {
    return <Consumer>{value => <Comp {...value} />}</Consumer>
  }
}

class App extends Component {
  render() {
    return (
      <ContextProvider>
        <MiddleComp />
      </ContextProvider>
    )
  }
}

// 当Provider的value放在App的state进行管理的时候，
// 每次改变value，都会重新渲染MiddleComp组件
// 用ContextProvider替换后就不会重新渲染MiddleComp组件
const MiddleComp = () => {
  console.log('MiddleComp')
  return (
    <div>
      <Child />
      <Child />
      <Child />
    </div>
  )
}

// 子组件
const ChildComp = (props) => {
  return (
    <div
      onClick={() => {
        props.add()
      }}
    >
      {props.counter}
    </div>
  )
}

// 用withConsumer高阶组件包装子组件
const Child = withConsumer(Consumer)(ChildComp)
```

获取上下文内容时也可以用下面两种方式:
1. class组件时
```javascript
class Child2 extends Component {
  static contextType = Context
  render() {
    return (
      <div
        onClick={() => {
          this.context.add()
        }}
      >
        {this.context.counter}
      </div>
    )
  }
}
```
2. 函数组件时
```javascript
const Child3 = (props) => {
  const context = useContext(Context)
  return (
    <div
      onClick={() => {
        context.add()
      }}
    >
      {context.counter}
    </div>
  )
}
```

重写MiddleComp，你会发现效果是一样的
```javascript
const MiddleComp = () => {
  console.log('MiddleComp')
  return (
    <div>
      <Child />
      <Child2 />
      <Child3 />
    </div>
  )
}
```

参考链接：
[避免React Context导致的重复渲染](https://zhuanlan.zhihu.com/p/50336226)

### 高阶组件
高阶组件（HOC）是 `React` 中用于复用组件逻辑的一种高级技巧，高阶组件是一个工厂函数，它接收一个参数并返回另外一个组件。

`HOC`的使用：
1. 扩展单一组件，让它变得更强大，下面就是一种高阶组件简单使用：
```javascript

const models = {
  a: {
    name: '水果店',
    productList: ['香蕉', '🍎', '梨']
  },
  b: {
    name: '超市',
    productList: ['地瓜', '🍉', '洋芋']
  }
}

const FruitShop = props => {
  return (
    <div>
      <h3>{props.name}</h3>
      <ul>
        {props.productList.map(a => (
          <li key={a}>{a}</li>
        ))}
      </ul>
    </div>
  )
}

// 定义高阶组件
const withCont = Comp => props => {
  const data = models[props.id]
  return <Comp {...props} {...data} />
}

// 包装
const ShopWithCont = withCont(FruitShop)

function HocTest() {
  return (
    <div>
      {['a', 'b'].map(item => (
        <ShopWithCont id={item} key={item} />
      ))}
    </div>
  )
}
```

1. 自定义参数，返回一个新的高阶组件：
```javascript

// 重写withCont
const withCont = mapModelToProps => {
  const data = mapModelToProps(models)
  return Comp => props => {
    return <Comp {...props} {...data} />
  }
}

// 使用, 这样组件就可以在使用的时候自定义需要的数据
const ShopWithCont = withCont((models) => {
  return models['a']
})(FruitShop)

function HocTest() {
  return (
    <div>
      <ShopWithCont />
    </div>
  )
}
```

3. 高阶组件嵌套使用：
```javascript
// 添加一个withLog高阶组件，能够在组件挂载时输出日志
const withLog = Comp => {
  return class extends Component {
    componentDidMount() {
      console.log('didMount', this.props)
    }
    render() {
      return <Comp {...this.props} />
    }
  }
}

// 嵌套使用高阶组件
const ShopWithCont = withLog(withCont((models) => {
  return models['a']
})(FruitShop))

```

4. 为了更好的实现嵌套使用多个高阶组件，实现一个compose方法，方法摘抄自[redux](https://github.com/reduxjs/redux/blob/master/src/compose.js) 组件库，自己的理解写在了注释上

```javascript
// 实现compose
function compose(...funcs) {
  // 没有参数的话直接返回一个函数组件
  // compose()(a) -> a
  // 先返回一个返回自身参数的函数 -> 函数执行,返回a
  if (funcs.length === 0) {
    return arg => arg
  }

  // 只有一个函数参数时返回该函数参数
  // compose(withA)(a) -> withA(a)
  // 先返回一个withA函数 -> 函数执行,并且参数为a
  if (funcs.length === 1) {
    return funcs[0]
  }

  // 用reduce遍历funcs，并且形成最终需要执行的函数
  // compose(withA, withB, withC, withD)(a) 
  // -> withA(withB(withC(withD(a))))
  return funcs.reduce((a, b) => {
    return (...args) => a(b(...args))
  })
  // 当a，b参数为withA，withB时， return (...args) -> withA(withB(...args))
  // 当a，b参数为上一轮返回函数，withC时， 
  // return (...args2) -> (...args) => withA(withB(...args))(withC(...args2)) 
  // 执行结果为： 
  // (...args2) => withA(withB(withC))(withC(...args2))
  // ... 持续执行,最终结果返回一个函数，函数的参数放在funcs最后一个函数：
  // (...argsN) => withA(withB(withC(...withN(...argsN))))
}
```
5. 装饰器写法

高阶函数本身就是对装饰器模式的应用，可以利用ES7中出现的 [装饰器](https://es6.ruanyifeng.com/#docs/decorator) 写法来更优雅的书写代码。如果项目不支持装饰器写法，需要额外配置，如果时ts项目，就可以直接支持装饰器写法，代码如下：
```javascript
// 执行顺序从下网上, 同compose方法 -> withA(withB(TestComp))
@withA
@withB
class TestComp extends Component {
  render() {
    return (
      ...
    )
  }
}
```
    注意：装饰器只能用在class上

### 组件组合 Composition
组件组合方式给予你足够的敏捷去定义自定义组件的外观和行为，这种方式更明确和安全。如果组件间有公用的非UI逻辑，将它们抽取为React组件导入使用，而不是继承它

组件复合通常有以下几种常用的方式：
1. 直接控制props.children来实现
2. 通过属性实现

    注意：props.children 是合法的js表达式，jsx也会被编译为js对象。

主要记录一下props.children的实现方式：
1. 常用方式：直接通过属性来实现具名插槽，children为默认插槽
```javascript
function Acticle(props) {
  const defaultFooter = '地址: 深圳 ~~'
  return (
    <div>
      <h1>{props.title}</h1>
      <hr />
      <div>{props.children}</div>
      <hr />
      <footer>
        {props.footer ? props.footer(defaultFooter) : defaultFooter}
      </footer>
    </div>
  )
}

function CompositionBase() {
  return (
    <Acticle
      title={<div>文章标题</div>}
      footer={address => (
        <div style={{ color: '#f00' }}>
          文章footer
          <br />
          {address}
        </div>
      )}
    >
      <div>文章内容</div>
      <div>文章内容</div>
      <div>文章内容</div>
    </Acticle>
  )
}

```
2. 通过children 传递对象，插值都放在children
```javascript
function Modal(props) {
  return (
    <div>
      {props.children.def}
      <hr />
      <footer>{props.children.footer}</footer>
    </div>
  )
}

function CompositionChildrenObj() {
  return (
    <Modal>
      {{
        def: (
          <>
            <h1>默认标题</h1>
            <div>默认内容</div>
          </>
        ),
        footer: (
          <button
            onClick={() => {
              alert('hello React!')
            }}
          >
            确定
          </button>
        )
      }}
    </Modal>
  )
}

```
3. 通过children 传递函数，可以获取组件内部数据，来进行下一步操作
```javascript
function Dialog(props) {
  const messages = {
    foo: {
      title: 'foo',
      content: 'foo ~~'
    },
    bar: {
      title: 'bar',
      content: 'bar ~~'
    }
  }
  const { body, footer } = props.children(messages[props.type])
  return (
    <div>
      {body}
      <hr />
      <footer>{footer}</footer>
    </div>
  )
}

function CompositionChildrenFunc() {
  return (
    <Dialog type="bar">
      {({ title, content }) => ({
        body: (
          <>
            <h1>{title}</h1>
            <div>{content}</div>
          </>
        ),
        footer: (
          <button
            onClick={() => {
              alert(title)
            }}
          >
            确定
          </button>
        )
      })}
    </Dialog>
  )
}

```
4. 实现简单版RadioGroup和Radio组件

考虑：在RadioGroup上添加name属性，给内部所有Radio都加上name属性

注意：如果Props.children是jsx，此时它是不能修改的

```javascript
function RadioGroup(props) {
  const children = React.Children.map(props.children, child => {
    // 要修改child属性必须先克隆它
    return React.cloneElement(child, { name: props.name })
  })
  return children
}

// Radio传入value,name和children，注意区分
function Radio({ children, ...rest }) {
  return (
    <label>
      <input {...rest} type="radio" />
      {children}
    </label>
  )
}

function TestRadioGroup() {
  const data = [{ label: '🍎', value: 1 }, { label: '香蕉', value: 2 }]
  return (
    <RadioGroup name="hello">
      {data.map(item => (
        <Radio key={item.value} value={item.value}>
          {item.label}
        </Radio>
      ))}
    </RadioGroup>
  )
}
```

### Hook

`Hook`是`React16.8`的新增项，它可以让你在不编写`class`的情况下使用`state`以及其他到的`React`特性
`Hook`的特点：
- 使你无需修改组件结构的情况下复用状态逻辑
- 可将组件中相互关联的部分拆分成更小的函数，复杂组件将变得更容易理解
- 更简洁、更易理解的代码

附上[React官方文档 - Hook](https://zh-hans.reactjs.org/docs/hooks-overview.html)

下面主要记录下一些hook的使用方法
#### useState

## Redux 源码探索
阅读redux源码，可以让我们在实践中更好使用它，也可以学习它来初步认JS识函数式编程

### 文件结构
```
|-- src
    |-- applyMiddleware.js  将middleware串联起来生成一个更强大的dispatch函数，就是中间件的本质作用
    |-- bindActionCreators.js  将action creators转换成拥有同名keys的action对象
    |-- combineReducers.js  将多个reducer组合起来，每一个reducer独立管理自己对应的state
    |-- compose.js  函数式编程中的组合函数，在applyMiddleware中调用，将middleware从右向左依次调用，生成一个从左向右执行middleware的dispatch增强函数
    |-- createStore.js  核心功能，创建一个store，实现了4个核心函数，dispatch、subscribe、getState、replaceReducer
    |-- index.js 对外暴露api
    |-- utils 供其他的函数调用的工具函数或变量
        |-- actionTypes.js 内置action type变量，用于初始化/重置 state
        |-- isPlainObject.js 用于校验是否是纯对象
        |-- warning.js 错误提示函数
```
### 入口文件
```javascript
import __DO_NOT_USE__ActionTypes from './utils/actionTypes'

// 仅用于判断代码是否被压缩
function isCrushed() {}

// 如果非生产环境压缩了代码会提示用户，使用压缩后的redux代码会降低性能
if (
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
  isCrushed.name !== 'isCrushed'
) {
  warning('~~~')
}

export {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose,
  __DO_NOT_USE__ActionTypes
}

```
    注意：actionTypes被暴露出去，但是并不希望被外部使用

### 创建仓库 - `createStore()` 

`createStore` 函数：
- 输入三个参数：`reducer` ，`preloadedState` ， `enhancer`
  - `reducer` 需要是一个纯函数，相同的输入，一定会返回相同的输出
  - `preloadedState` 初始值
  - `enhancer` 中文意思为`增强器`，意思就是这里可以引入第三方库，来增强store功能，redux的唯一增强器是 `applyMiddleware()` ，用于引入中间件来增强dispatch函数
- 返回了4个主要函数：
  - `dispatch` : 发起`action`，执行`reducer`函数，如果有中间件，dispatch发起的`action`会经过中间件的扩展，然后再执行`reducer`函数
  - `subscribe` : 用于添加对state的订阅
  - `getState` : 获取state
  - `replaceReducer` : 动态替换reducer
- 5个内部变量：
  - `currentReducer` : 保存当前的`reducer`
  - `currentState` : 保存应用的全局`store`状态
  - `currentListeners` : 保存当前的订阅函数数组
  - `nextListeners` : 订阅函数数组的快照，避免直接修改`currentListeners`
  - `isDispatching` : 用于标识是否正在触发一个`action`

下面再来看一下 `createStore` 源码实现：
```javascript
// src/createStore.js
function createStore(reducer, preloadedState, enhancer) {
  // 这段代码用于判断传递的参数是否符合规范
  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
        'createStore(). This is not supported. Instead, compose them ' +
        'together to a single function.'
    )
  }
  // 判断第二个参数为function时，第三个参数又不存在时，把第二个参数作为enhancer
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  // 如果 enhancer 函数存在，执行 enhancer 函数，并且不再继续执行下去
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }
  // reducer是必选参数且必须是一个函数
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }
  
  // 声明内部使用变量
  // 存储值
  let currentReducer = reducer
  // 设置默认state
  let currentState = preloadedState
  // 存放回调函数的订阅数组
  let currentListeners = []
  // 下一次的订阅数组
  let nextListeners = currentListeners
  // 用于防止在执行reducer函数时再次触发dispatch函数
  let isDispatching = false

  /**
   * 浅拷贝一份currentListeners 为下一阶段监听器提供快照
   * 用于防止在触发订阅/取消订阅回调函数时出现错误
   */
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  /**
   * 获取state
   * @returns {any} 返回currentState
   */
  function getState() {
    // 正在执行dispatch函数时不能获取，其实一般情况下不会出现这种情况
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.'
      )
    }

    return currentState
  }

  /**
   * 用于订阅state的更新
   *
   * @param {Function} listener 订阅函数
   * @returns {Function} 返回可以移除listener的函数
   */
  function subscribe(listener) {
    // 传入的listener必须是一个函数
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.')
    }
    // 保证纯函数不带来副作用
    if (isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. ' +
          'If you would like to be notified after the store has been updated, subscribe from a ' +
          'component and invoke store.getState() in the callback to access the latest state. ' +
          'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
      )
    }

    let isSubscribed = true
    
    // 只有第一次执行或者每次dispatch之后的第一次subscribe时会把 currentListeners 拷贝并覆盖 nextListeners 中
    ensureCanMutateNextListeners()
    // nextListeners 新增listener，currentListeners并不会新增
    nextListeners.push(listener)
    
    // 取消订阅
    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      // 保证纯函数不带来副作用
      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. ' +
            'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
        )
      }

      isSubscribed = false
      // 取消订阅后 把 currentListeners 拷贝并覆盖 nextListeners 中
      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      // 从nextListeners中删除unsubscribe的listener
      nextListeners.splice(index, 1)
      // 清空当前的订阅数组
      currentListeners = null
    }
  }

  /**
   * 用于执行reducer函数的函数
   */
  function dispatch(action) {
    // 保证action是个纯对象，即字面量对象或Object创建的对象
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
          'Use custom middleware for async actions.'
      )
    }
    // action必须有type属性存在
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          'Have you misspelled a constant?'
      )
    }
    // 正在执行reducer函数时不允许再次触发
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      // 执行reducer
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    // 通知所有之前通过subscribe订阅state更新的回调listener
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  /**
   * 用于替换当前存储的reducer函数
   * 比如当你需要进行代码拆分或者想要动态加载一些reducer、想要为redux实现热重载时
   *
   * @param {Function} nextReducer 用于替换 store 中的 reducer
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer

    // ActionTypes.REPLACE其实就是ActionTypes.INIT
    // 重新INIT依次是为了获取新的reducer中的默认参数
    dispatch({ type: ActionTypes.REPLACE })
  }

  // 用于观察和响应的互通 私有属性，暂时并未不做扩充
  function observable() {
    const outerSubscribe = subscribe
    return {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.')
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },

      [$$observable]() {
        return this
      }
    }
  }

  // reducer要求对无法识别的action返回state，就是因为需要通过ActionTypes.INIT获取默认参数值并返回
  // 当initailState和reducer的参数默认值都存在的时候，reducer参数默认值将不起作用
  // 因为在createStore声明变量时currState就已经被赋值了initialState
  // 同时这个initialState也是服务端渲染的初始状态入口
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}

```
总结以下几点注意事项：
1. enhancer
```javascript
  // 判断第二个参数为function时，第三个参数又不存在时，把第二个参数作为enhancer
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  // 如果 enhancer 函数存在，执行 enhancer 函数，并且不再继续执行下去
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }
```
首先`enhancer`在缺省条件下，如果`preloadedState`是个函数，则将其视为`enhancer`。
`enhancer`本身是个引入中间件扩展功能的返回函数，`enhancer(createStore)(reducer, preloadedState)`实际上是输出一个增强了`dispatch`功能的`store`
2. `nextListeners`及`currentListeners`
    currentListeners 为当前的 listener, nextListeners 为下次 dispatch 后才发布的订阅者集合

对listener做深拷贝的原因是因为如果在listener中进行unsubscribe操作，比如有3个listener(下标0,1,2)，在第2个listener执行时unsubscribe了自己，那么第3个listener的下标就变成了1，但是for循环下一轮的下标是2，第3个listener就被跳过了，所以执行一次深拷贝，即使在listener过程中unsubscribe了也是更改的nextListeners（nextListeners会去深拷贝currentListeners）。当前执行的currentListeners不会被修改，第3个listener就不会被跳过了。

3. observable 这个方法是为Rxjs准备的，如果不使用RxJS可以忽略，在这里略过。
4. replaceReducer 用于动态替换整个store的reducer

### 组合reducer - `combineReducers()` 
用来将若干个reducer合并成一个reducers
源码大部分都是用来校验数据、抛出错误
辅助方法说明：
```javascript
// 用于
function getUndefinedStateErrorMessage(key, action) {
  const actionType = action && action.type
  const actionDescription =
    (actionType && `action "${String(actionType)}"`) || 'an action'
  // 即使没有值应该返回null，而不要返回undefined
  return (
    `Given ${actionDescription}, reducer "${key}" returned undefined. ` +
    `To ignore an action, you must explicitly return the previous state. ` +
    `If you want this reducer to hold no value, you can return null instead of undefined.`
  )
}

function getUnexpectedStateShapeWarningMessage(
  inputState,
  reducers,
  action,
  unexpectedKeyCache
) {
  const reducerKeys = Object.keys(reducers)
  // 判断actionType是来自redux内部init type还是其他的
  const argumentName =
    action && action.type === ActionTypes.INIT
      ? 'preloadedState argument passed to createStore'
      : 'previous state received by the reducer'

  // 监测是否没有传递reducer
  if (reducerKeys.length === 0) {
    return (
      'Store does not have a valid reducer. Make sure the argument passed ' +
      'to combineReducers is an object whose values are reducers.'
    )
  }
  // state必须是个纯对象
  if (!isPlainObject(inputState)) {
    return (
      `The ${argumentName} has unexpected type of "` +
      {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] +
      `". Expected argument to be an object with the following ` +
      `keys: "${reducerKeys.join('", "')}"`
    )
  }
  // 判断combineReducer合并的reducer个数是否和finalReducers个数是否相同
  // 并获取不相同的key
  const unexpectedKeys = Object.keys(inputState).filter(
    key => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]
  )
  // 标记不相同的key
  unexpectedKeys.forEach(key => {
    unexpectedKeyCache[key] = true
  })
  // 当是调用replaceReducers时，就不需要再判断，直接返回
  if (action && action.type === ActionTypes.REPLACE) return
  // 告诉你有什么值是多出来的，会被忽略掉
  if (unexpectedKeys.length > 0) {
    return (
      `Unexpected ${unexpectedKeys.length > 1 ? 'keys' : 'key'} ` +
      `"${unexpectedKeys.join('", "')}" found in ${argumentName}. ` +
      `Expected to find one of the known reducer keys instead: ` +
      `"${reducerKeys.join('", "')}". Unexpected keys will be ignored.`
    )
  }
}
// 用来判断初始化和随机状态下返回的是不是 undefined
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(key => {
    // 遍历 reducer
    const reducer = reducers[key]
    // 初始化 reducer，得到一个state值
    const initialState = reducer(undefined, { type: ActionTypes.INIT })
    // 初始化状态下 state 不能返回undefined
    if (typeof initialState === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. ` +
          `If the state passed to the reducer is undefined, you must ` +
          `explicitly return the initial state. The initial state may ` +
          `not be undefined. If you don't want to set a value for this reducer, ` +
          `you can use null instead of undefined.`
      )
    }
    // 随机状态下 state 也能返回undefined
    if (
      typeof reducer(undefined, {
        type: ActionTypes.PROBE_UNKNOWN_ACTION()
      }) === 'undefined'
    ) {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
          `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
          `namespace. They are considered private. Instead, you must return the ` +
          `current state for any unknown actions, unless it is undefined, ` +
          `in which case you must return the initial state, regardless of the ` +
          `action type. The initial state may not be undefined, but can be null.`
      )
    }
  })
}

```
主要函数说明：
```javascript
export default function combineReducers(reducers) {
  // 获取传入reducers的所有key
  const reducerKeys = Object.keys(reducers)
  // 最后真正有效的reducer存在这里
  const finalReducers = {}
  // 筛选出有效的reducer
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }
    // reducer必须是函数，无效的数据不会被合并进来
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  // 所有可用reducer
  const finalReducerKeys = Object.keys(finalReducers)

  // This is used to make sure we don't warn about the same
  // keys multiple times.
  // 用于配合getUnexpectedStateShapeWarningMessage辅助函数过滤掉多出来的值
  let unexpectedKeyCache
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {}
  }

  let shapeAssertionError
  try {
    // 校验reducers是否都是有效数据
    assertReducerShape(finalReducers)
  } catch (e) {
    shapeAssertionError = e
  }

  // 返回一个合并后的 reducer 函数，与普通的 reducer 一样
  // 主要逻辑：取得每个子reducer对应的state，与action一起作为参数给每个子reducer执行。
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError
    }

    if (process.env.NODE_ENV !== 'production') {
      // 开发环境下校验有哪些值是多出来的
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        state,
        finalReducers,
        action,
        unexpectedKeyCache
      )
      if (warningMessage) {
        warning(warningMessage)
      }
    }

    let hasChanged = false // 标志state是否有变化
    const nextState = {}
    // 下面就会进行获取reducer对应的state，与action一起作为参数给每个子reducer执行。
    for (let i = 0; i < finalReducerKeys.length; i++) {
      // 获取本次循环的子reducer
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      // 获取该子reducer对应的旧的state
      const previousStateForKey = state[key]
      // 该子reducer执行后返回的新的state
      const nextStateForKey = reducer(previousStateForKey, action)
      // 如果新的state是undefined就抛出对应错误
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      // 用新的state替换旧的state
      nextState[key] = nextStateForKey
      // 判断state是否改变
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    // 改变后返回新的state，未改变返回旧的值
    return hasChanged ? nextState : state
  }
}

```

### 添加中间件 - `applyMiddleware()`
applyMiddleware，顾名思义，就是运用中间件。
作用：把一系列中间件转换为增强`dispatch`的函数`enhancer`
源码只有20行，主要内容只有十几行，如下：
```javascript
function applyMiddleware(...middlewares) {
  // middlewares 为传入的一系列中间件，等待调用
  // 这里返回的就是enhancer，enhancer会接收createStore并返回一个函数
  // 在createStore中，当存在enhancer时，拦截了createStore下面需要执行的代码，
  // 返回执行enhancer(createStore)(reducer, preloadedState)的结果
  return createStore => (...args) => {
    // 执行enhancer(createStore)(reducer, preloadedState)是会调用下面代码
    // 继续执行createStore，返回store
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }
    // 传递给中间件使用的api
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 遍历并执行中间件函数，把执行结果存放于chain
    // 每一个中间件函数的返回值是一个改造的dispatch函数
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 用compose去改造dispatch函数，得到一个增强的dispatch函数
    dispatch = compose(...chain)(store.dispatch)
    // compose(func1,func2,func3)
    // 返回一个函数: (...args) => func1( func2( func3(...args) ) )
    // 传入的dispatch被func3改造后得到一个新的dispatch，新的dispatch继续被func2改造.
    // 因此每个中间件内部必须执行dispatch才会继续下一个中间件的调用

    // 继续返回store，并用加强版的dispatch覆盖旧的dispatch
    return {
      ...store,
      dispatch
    }
  }
}

```
编写一个最简单的符合规范的中间件：
```javascript
function logger({ dispatch, getState }) {
  // middlewareAPI  中包含了dispatch, getState这两个方法
  // 但是调用middlewareAPI的dispatch函数会抛出异常，可以查看上面源码
  // 返回真正的中间件执行函数 下面的next就是增强的dispatch
  return next => {
    return action => {
      console.log('logger')
      // 执行改中间件任务
      console.log(action.type + '执行了！！！')
      // 执行下一个中间件
      next(action)
    }
  }
}
// 实现异步的中间件 - thunk redux-thunk也是这样实现的，不过加了层函数包裹，实现传递参额外参数
const thunk = ({dispatch, getState}) => next => action => {
    if (typeof action == 'function') {
        return action(dispatch, getState)
    }
    return next(action)
}
```

### 绑定actionCreator - `bindActionCreators`
作用： 实际上就是通过返回一个高阶函数，通过闭包应用，将dispatch隐藏起来，正常发起一个dispatch(action)，但是bindActionCreators将dispatch隐藏，当执行bindActionCreators时：
- 如果传入的是一个函数，就认为传入了一个actionCreator，转换成这样：() => dispatch(actionCreators(...arguments))
- 如果传入的是对象，包含多个actionCreator，就会遍历返回一个对象的对象，对每个key值都进行上面的转换

```javascript
// 返回一个高阶函数
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    // 执行actionCreator，获取action，再用dispatch进行派发action
    return dispatch(actionCreator.apply(this, arguments))
  }
}

export default function bindActionCreators(actionCreators, dispatch) {
  // actionCreators如果是函数，就认为就是一个actionCreator函数，
  // 直接调用bindActionCreator转换生成一个可以用dispatch派发的action
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }
  // 传入的只能是对象或者函数，函数在上面已经进行操作了
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }. ` +
        `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }
  // 这里处理actionCreators是一组包含actionCreator的对象时
  const boundActionCreators = {}
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      // 每一个key再次调用bindActionCreator进行转换
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  // 返回处理后的对象
  return boundActionCreators
}
```

### 组合函数 - compose
函数式编程中常用的方法。
```javascript
function compose(...funcs) {
  // 没有参数的话直接返回一个函数组件
  // compose()(a) -> a
  // 先返回一个返回自身参数的函数 -> 函数执行,返回a
  if (funcs.length === 0) {
    return arg => arg
  }

  // 只有一个函数参数时返回该函数参数
  // compose(withA)(a) -> withA(a)
  // 先返回一个withA函数 -> 函数执行,并且参数为a
  if (funcs.length === 1) {
    return funcs[0]
  }

  // 用reduce遍历funcs，并且形成最终需要执行的函数
  // compose(withA, withB, withC, withD)(a) 
  // -> withA(withB(withC(withD(a))))
  return funcs.reduce((a, b) => {
    return (...args) => a(b(...args))
  })
  // 当a，b参数为withA，withB时， return (...args) -> withA(withB(...args))
  // 当a，b参数为上一轮返回函数，withC时， 
  // return (...args2) -> (...args) => withA(withB(...args))(withC(...args2)) 
  // 执行结果为： 
  // (...args2) => withA(withB(withC))(withC(...args2))
  // ... 持续执行,最终结果返回一个函数，函数的参数放在funcs最后一个函数：
  // (...argsN) => withA(withB(withC(...withN(...argsN))))
}
```

### 参考链接
[redux github仓库](https://github.com/reduxjs/redux)

[通过Github Blame深入分析Redux源码](https://github.com/fi3ework/blog/issues/7)

[一次性彻底吸收 Redux 源码](https://juejin.im/post/5d308b2c6fb9a07ec63b4cad#heading-0)

[更好用的 Redux](https://juejin.im/post/5bc318b25188255c5f5414e7)

[JS函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

## React 和 redux 常见面试题 

### React中 setState 是同步的还是异步的？

[深入 setState 机制](https://github.com/sisterAn/blog/issues/26)
[React 官方描述](https://reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous)
