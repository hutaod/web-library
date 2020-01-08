export const Uninitialized = -1
export const Pending = 0
export const Resolved = 1
export const Rejected = 2

export function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null
}

export function initializeLazyComponentType(lazyComponent) {
  if (lazyComponent._status === Uninitialized) {
    lazyComponent._status = Pending
    const ctor = lazyComponent._ctor
    const thenable = ctor()
    lazyComponent._result = thenable
    thenable.then(
      moduleObject => {
        if (lazyComponent._status === Pending) {
          const defaultExport = moduleObject.default
          if (__DEV__) {
            if (defaultExport === undefined) {
              // 期望动态import()调用的结果，而不是接受到moduleObject，
              // 你的代码应该像这样：
              // "const MyComponent = lazy(() => import('./MyComponent'))"
              console.error(
                'lazy: Expected the result of a dynamic import() call. ' +
                  'Instead received: %s\n\nYour code should look like: \n  ' +
                  "const MyComponent = lazy(() => import('./MyComponent'))",
                moduleObject
              )
            }
          }
          lazyComponent._status = Resolved
          lazyComponent._result = defaultExport
        }
      },
      error => {
        if (lazyComponent._status === Pending) {
          lazyComponent._status = Rejected
          lazyComponent._result = error
        }
      }
    )
  }
}
