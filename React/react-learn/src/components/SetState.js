import React, { Component, useState, useEffect } from 'react'

/**
 * setState
 * 1. state不能直接改属性
 * 2. 正常情况下是异步的，连续多次执行只会合并触发一次
 * 3. setTimeout等定时器，原生事件中用到setState是同步的
 */

export default class SetState extends Component {
  state = {
    counter: 0
  }

  componentDidMount() {
    console.log(1, this.state.counter) // 0
    this.setState(
      {
        counter: this.state.counter + 1
      },
      () => {
        console.log(8, this.state.counter) // 3
      }
    )
    console.log(2, this.state.counter) // 0
    this.setState(
      nextState => {
        console.log(6, this.state.counter, nextState.counter) // 0 1
        return {
          counter: nextState.counter + 1
        }
      },
      () => {
        console.log(9, this.state.counter) // 3
      }
    )
    console.log(3, this.state.counter) // 0
    this.setState(
      {
        counter: this.state.counter + 1
      },
      () => {
        console.log(10, this.state.counter) // 3
      }
    )
    console.log(4, this.state.counter) // 0
    this.setState(
      nextState => {
        console.log(7, this.state.counter, nextState.counter) // 0 2
        return {
          counter: nextState.counter + 1
        }
      },
      () => {
        console.log(11, this.state.counter) // 3
      }
    )
    console.log(5, this.state.counter) // 0
  }

  get a() {
    return this.state.counter
  }

  render() {
    return (
      <div>
        <div>{this.state.counter}</div>
        <div>{this.a}</div>
        <div>
          <button
            onClick={() => {
              this.setState(
                {
                  counter: this.state.counter + 1
                },
                () => {
                  console.log(1, this.state.counter)
                }
              )
              this.setState(
                {
                  counter: this.state.counter + 1
                },
                () => {
                  console.log(1, this.state.counter)
                }
              )
              setTimeout(() => {
                this.setState(
                  {
                    counter: this.state.counter + 1
                  },
                  () => {
                    console.log(1, this.state.counter)
                  }
                )
                // this.setState(
                //   {
                //     counter: this.state.counter + 1
                //   },
                //   () => {
                //     console.log(2, this.state.counter)
                //   }
                // )
                console.log(3, this.state.counter)
              })
            }}
          >
            点击
          </button>
          <ClockFunc />
        </div>
      </div>
    )
  }
}

const ClockFunc = () => {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => {
      // 组件销毁时触发
      clearInterval(intervalId)
    }
  })
  return <div>{date.toLocaleString()}</div>
}
