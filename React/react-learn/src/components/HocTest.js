import React, { Component } from 'react'

function Lesson(props) {
  return (
    <div>
      {props.stage} - {props.title}
    </div>
  )
}

// 模拟数据
const lessons = [
  {
    stage: 'React',
    title: '核心API'
  },
  {
    stage: 'React',
    title: '高阶组件'
  },
  {
    stage: 'React',
    title: 'HOOKs API'
  }
]

// 定义高阶组件withContent
const withContent = Comp => props => {
  const content = lessons[props.idx]
  return <Comp {...content} />
}

// withLog高阶组件，能够在组件挂载时输出日志
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

const LessonWithContent = withLog(withContent(Lesson))

// // 装饰器语法 @withLog

export default function HocTest() {
  return (
    <div>
      {[0, 0, 0].map((item, idx) => (
        <LessonWithContent key={idx} idx={idx} />
      ))}
    </div>
  )
}
