// 声明2个比赛队员
const rabbit = '兔子'
const turtle = '乌龟'
// 声明一坨变量
const start = '|'
const end = '》'
// 赛道上一米一米的距离，用 . 表示
const pad = '.'
// 速度是 1米/150 毫秒
const speed = 1
// 赛道长度 50 米
const length = 50
// 约定兔子在 42 米的时候听下
let stopAt = 42
// 判断兔子是否停下
let stoped = false
// 默认从0开始轮询 时间
let t = 0
// 定时器的句柄
let timer
let turtleX = 0 // 乌龟位置
let rabbitX = 0 // 兔子位置

// 计算兔子距离终点
const getRabbitLastLength = () => {
  return length - t * speed * 3
}

// 计算乌龟距离终点
const getTurtleLastLength = () => {
  return length - t * speed
}

// 计算乌兔之间的距离
const getBetweenLength = () => {
  return stopAt - t * speed
}

// 初始赛道
const renderRaceInit = () => {
  return `${rabbit}${turtle}${start}${pad.repeat(length)}${end}`
}

// 赛道实时状态
const renderRace = () => {
  turtleX = t * speed
  rabbitX = stoped ? stopAt : turtleX * 3
  // 兔子领先时
  if (getBetweenLength() > 0) {
    // start --- 乌龟 --- 兔子 --- end
    return `${start}${pad.repeat(turtleX)}${turtle}${pad.repeat(
      rabbitX - turtleX
    )}${rabbit}${pad.repeat(length - rabbitX)}${end}`
  } else {
    // 乌龟领先时
    // 判断乌龟距离终点的距离大于0时
    if (getTurtleLastLength() > 0) {
      return `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(
        turtleX - stopAt
      )}${turtle}${pad.repeat(getTurtleLastLength())}${end}`
    } else {
      // 终点
      return `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(
        length - stopAt
      )}${end}${turtle}`
    }
  }
}

// 等待
const wait = sec => new Promise(resolve => setTimeout(() => resolve(), sec))

const race = options => {
  if (options && options.stopAt > 0 && options.stopAt < length) {
    // console.log('hello', stopAt, options.stopAt)
    stopAt = stopAt
  }
  timer = setInterval(() => {
    // 判断兔子是否停下
    if (!stoped) {
      if (getRabbitLastLength() <= length - stopAt) {
        stoped = true
      }
    }

    let state = renderRace()
    updateRace(state)
    if (stoped) {
      if (getTurtleLastLength() <= 0) {
        clearInterval(timer)
        setTimeout(() => {
          process.exit(0)
        }, 100)
      }
    }
    t++
  }, 150)
}

const chalkWorker = require('chalk-animation')
const initState = renderRaceInit()
let racing
const updateRace = state => {
  racing.replace(state)
}

function startRace(options) {
  if (options && options.stopAt > 0 && options.stopAt < length) {
    stopAt = options.stopAt
  }
  racing = chalkWorker.rainbow(initState)

  // 可以支持特性刷新的命令行日志模块
  wait(2000).then(() => {
    race()
  })
}

startRace({ stopAt: 20 })
