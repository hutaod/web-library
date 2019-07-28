import React from 'react'

// 常用方式
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

function Modal(props) {
  return (
    <div>
      {props.children.def}
      <hr />
      <footer>{props.children.footer}</footer>
    </div>
  )
}

// children 传递对象，插值都放在children
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

// children 传递对象，插值都放在children
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

// 实现简单版RadioGroup和Radio组件
// 考虑：在RadioGroup上添加name属性，给内部所有Radio都加上name属性
// 注意：如果Props.children是jsx，此时它是不能修改的
function RadioGroup(props) {
  const children = React.Children.map(props.children, child => {
    // console.log(child)
    // 要修改虚拟dom(jsx) 只能克隆它
    // React.cloneElement 参数1是克隆对象，参数2是设置的属性
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

// const TestChildren = React.forwardRef((props, ref) => {
//   console.log(props, ref)
//   return <div ref={ref}>111</div>
// })

// const testRef = React.createRef()
export default function() {
  return (
    <>
      <CompositionBase />
      <CompositionChildrenObj />
      <CompositionChildrenFunc />
      {/* <TestChildren children="123" ref={testRef}>
        <h2>hello</h2>
      </TestChildren> */}
      <TestRadioGroup />
    </>
  )
}
