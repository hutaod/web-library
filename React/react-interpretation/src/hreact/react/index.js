import ReactVersion from '../shared/ReactVersion'
import {
  REACT_FRAGMENT_TYPE,
  REACT_PROFILER_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_SUSPENSE_TYPE,
  REACT_SUSPENSE_LIST_TYPE,
} from '../shared/ReactSymbols'

import { Component, PureComponent } from './ReactBaseClasses'
import { createRef } from './ReactCreateRef'
import { forEach, map, count, toArray, only } from './ReactChildren'
import { createElement } from './ReactElement'

const React = {
  Children: {
    map,
    forEach,
    count,
    toArray,
    only,
  },

  createRef,
  Component,
  PureComponent,

  Fragment: REACT_FRAGMENT_TYPE,
  Profiler: REACT_PROFILER_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,

  createElement,

  version: ReactVersion,
}

export default React
