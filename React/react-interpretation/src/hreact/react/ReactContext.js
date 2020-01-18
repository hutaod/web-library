import { REACT_PROVIDER_TYPE, REACT_CONTEXT_TYPE } from '../shared/ReactSymbols'

/**
 *
 * @param {*} defaultValue
 * @param {Function} calculateChangedBits
 */
export function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null
  } else {
    if (__DEV__) {
      if (
        calculateChangedBits !== null &&
        typeof calculateChangedBits !== 'function'
      ) {
        console.error(
          'createContext: Expected the optional second argument to be a ' +
            'function. Instead received: %s',
          calculateChangedBits
        )
      }
    }
  }

  const context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // 作为支持多个并发渲染器的解决方法，我们将一些渲染器归类为主要渲染器，
    // 将其他渲染器归为辅助渲染器。 我们只期望最多有两个并发渲染器：
    // React Native（主要）和Fabric（次要）。
    // React DOM（主要）和React ART（次要）。
    // 辅助渲染器将其上下文值存储在单独的字段中。
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // 用于跟踪此上下文当前在单个渲染器中支持多少个并发渲染器。 如并行服务器渲染。
    _threadCount: 0,
    Provider: null,
    Consumer: null,
  }

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  }

  let hasWarnedAboutUsingNestedContextConsumers = false
  let hasWarnedAboutUsingConsumerProvider = false

  if (__DEV__) {
    // 一个单独的对象，但是代理返回到原始上下文对象，以实现向后兼容。
    // 它具有不同的$$typeof，因此我们可以适当地警告将Context作为Consumer使用不正确。
    const Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits,
    }

    Object.defineProperties(Consumer, {
      Provider: {
        get() {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true
            console.error(
              'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' +
                'a future major release. Did you mean to render <Context.Provider> instead?'
            )
          }
          return context.Provider
        },
      },
      _currentValue: {
        get() {
          return context._currentValue
        },
        set(_currentValue) {
          context._currentValue = _currentValue
        },
      },
      _currentValue2: {
        get() {
          return context._currentValue2
        },
        set(_currentValue2) {
          context._currentValue2 = _currentValue2
        },
      },
      _threadCount: {
        get() {
          return context._threadCount
        },
        set(_threadCount) {
          context._threadCount = _threadCount
        },
      },
      Consumer: {
        get() {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true
            console.error(
              'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' +
                'a future major release. Did you mean to render <Context.Consumer> instead?'
            )
          }
          return context.Consumer
        },
      },
    })
    context.Consumer = Consumer
  } else {
    context.Consumer = context
  }

  if (__DEV__) {
    context._currentRender = null
    context._currentRender2 = null
  }
  return context
}
