// 用于标记类似ReactElement的类型的Symbol。
// 如果既没有Symbol也没有polyfill，则将使用纯数字来提高性能。
const hasSymbol = typeof Symbol === 'function' && Symbol.for
export const REACT_ELEMENT_TYPE = hasSymbol
  ? Symbol.for('react.element')
  : 0xeac7
export const REACT_PORTAL_TYPE = hasSymbol
  ? Symbol.for('react.portal')
  : 0xeaca;
export const REACT_FRAGMENT_TYPE = hasSymbol
  ? Symbol.for('react.fragment')
  : 0xeacb;
export const REACT_STRICT_MODE_TYPE = hasSymbol
  ? Symbol.for('react.strict_mode')
  : 0xeacc;
export const REACT_PROFILER_TYPE = hasSymbol
  ? Symbol.for('react.profiler')
  : 0xead2;
export const REACT_PROVIDER_TYPE = hasSymbol
  ? Symbol.for('react.provider')
  : 0xeacd;
export const REACT_CONTEXT_TYPE = hasSymbol
  ? Symbol.for('react.context')
  : 0xeace;

// TODO: 我们不在使用AsyncMode 或者 ConcurrentMode. 
// 它们是已删除的临时api. 我们可能会删除这些symbols
export const REACT_ASYNC_MODE_TYPE = hasSymbol
  ? Symbol.for('react.async_mode')
  : 0xeacf;
export const REACT_CONCURRENT_MODE_TYPE = hasSymbol
  ? Symbol.for('react.concurrent_mode')
  : 0xeacf;
export const REACT_FORWARD_REF_TYPE = hasSymbol
  ? Symbol.for('react.forward_ref')
  : 0xead0;
export const REACT_SUSPENSE_TYPE = hasSymbol
  ? Symbol.for('react.suspense')
  : 0xead1;
export const REACT_SUSPENSE_LIST_TYPE = hasSymbol
  ? Symbol.for('react.suspense_list')
  : 0xead8;
export const REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
export const REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
export const REACT_CHUNK_TYPE = hasSymbol ? Symbol.for('react.chunk') : 0xead9;
export const REACT_FUNDAMENTAL_TYPE = hasSymbol
  ? Symbol.for('react.fundamental')
  : 0xead5;
export const REACT_RESPONDER_TYPE = hasSymbol
  ? Symbol.for('react.responder')
  : 0xead6;
export const REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

const MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
const FAUX_ITERATOR_SYMBOL = '@@iterator'

export function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null
  }
  const maybeIterator = (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) || maybeIterable[FAUX_ITERATOR_SYMBOL]
  if (typeof maybeIterator === 'function') {
    return maybeIterator
  }
  return null
}