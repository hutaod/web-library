# React使用总结

## 组件跨层级通信 - Context
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

## 高阶组件
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

## 组件组合 Composition
组件组合方式给予你足够的敏捷去定义自定义组件的外观和行为，这种方式更明确和安全。如果组件间有公用的非UI逻辑，将它们抽取为React组件导入使用，而不是继承它

组件复合通常有以下几种常用的方式：
1. 直接控制props.children来实现
2. 通过属性实现

    注意：props.children 是合法的js表达式，jsx也会被边缘为js对象。

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

## Hook

`Hook`是`React16.8`的新增项，它可以让你在不编写`class`的情况下使用`state`以及其他到的`React`特性
`Hook`的特点：
- 使你无需修改组件结构的情况下复用状态逻辑
- 可将组件中相互关联的部分拆分成更小的函数，复杂组件将变得更容易理解
- 更简洁、更易理解的代码

附上[React官方文档 - Hook](https://zh-hans.reactjs.org/docs/hooks-overview.html)

下面主要记录下一些hook的使用方法
### useState