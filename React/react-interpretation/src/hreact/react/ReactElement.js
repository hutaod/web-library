import invariant from 'invariant'
import { REACT_ELEMENT_TYPE } from '../shared/ReactSymbols'

import ReactCurrentOwner from './ReactCurrentOwner'

const hasOwnProperty = Object.prototype.hasOwnProperty

const RESERVED_PROPS = {
	key: true,
	ref: true,
	__self: true,
	__source: true,
}

let specialPropKeyWarningShown, specialPropRefWarningShown

function hasValidRef(config) {
	if (__DEV__) {
		if (hasOwnProperty.call(config, 'ref')) {
			const getter = Object.getOwnPropertyDescriptor(config, 'ref').get
			if (getter && getter.isReactWarning) {
				return false
			}
		}
	}
	return config.ref !== undefined
}

function hasValidKey() {
	if (__DEV__) {
		if (hasOwnProperty.call(config, 'key')) {
			const getter = Object.getOwnPropertyDescriptor(config, 'key').get
			if (getter && getter.isReactWarning) {
				return false
			}
		}
	}
	return config.key !== undefined
}

function defineKeyPropWarningGetter(props, displayName) {
	const warnAboutAccessingKey = function() {
		if (__DEV__ && !specialPropKeyWarningShown) {
			specialPropKeyWarningShown = true
			console.error(
				'%s: `key`不是一个`prop`属性. 尝试访问它会导致在`未定义`中被返回。' +
					'如果需要在子组件中访问相同的值，则应该将其作为其他属性传递。(https://fb.me/react-special-props)',
				displayName
			)
		}
	}
	warnAboutAccessingKey.isReactWarning = true
	Object.defineProperty(props, 'key', {
		get: warnAboutAccessingKey,
		configurable: true,
	})
}

function defineRefPropWarningGetter(props, displayName) {
	const warnAboutAccessingRef = function() {
		if (__DEV__ && !specialPropRefWarningShown) {
			specialPropRefWarningShown = true
			console.error(
				'%s: `ref`不是一个`prop`属性. 尝试访问它会导致在`未定义`中被返回。' +
					'如果需要在子组件中访问相同的值，则应该将其作为其他属性传递。(https://fb.me/react-special-props)',
				displayName
			)
		}
	}
	warnAboutAccessingRef.isReactWarning = true
	Object.defineProperty(props, 'ref', {
		get: warnAboutAccessingRef,
		configurable: true,
	})
}

const ReactElement = function(type, key, ref, self, source, owner, props) {
	const element = {
		// 用于标识
		$$typeof: REACT_ELEMENT_TYPE,

		// 属于元素的内置属性
		type,
		key,
		ref,
		props,

		// 记录负责创建此元素的组件
		_owner: owner,
	}

	if (__DEV__) {
		// 验证标志当前是可变的。 我们将其放在外部后备存储上，
		// 以便冻结整个对象，一旦在常用的开发环境中实现了WeakMap，
		// 就可以将其替换为WeakMap。
		element._store = {}

		// 为了使ReactElement的比较更容易用于测试目的，
		// 我们使验证标志不可枚举（在可能的情况下，它应包括我们在其中运行测试的每个环境），
		// 因此测试框架将忽略它
		Object.defineProperty(element._store, 'validated', {
			configurable: false,
			enumerable: false,
			writable: true,
			value: false,
		})
		// self 和 source 仅是 DEV 的属性.
		Object.defineProperty(element, '_self', {
			configurable: false,
			enumerable: false,
			writable: false,
			value: self,
		})
		// 为了测试目的，在两个不同位置创建的两个元素应被视为相等，
		// 因此我们将其隐藏起来，以免枚举。
		Object.defineProperty(element, '_source', {
			configurable: false,
			enumerable: false,
			writable: false,
			value: source,
		})

		if (Object.freeze) {
			Object.freeze(element.props)
			Object.freeze(element)
		}
	}

	return element
}

/**
 * https://github.com/reactjs/rfcs/pull/107
 * 简化了React.createElement的工作方式，并最终使我们无需使用forwardRef。
 * @param {*} type
 * @param {object} config
 * @param {string} maybeKey
 */
export function jsx(type, config, maybeKey) {
	let propName

	// 提取保留名称
	const props = {}

	let key = null
	let ref = null

	// 目前，key可以作为一个prop进行传递，如果还显式声明了key，则导致潜在问题
	// （即<div {...props} key="Hi" />或<div key="Hi" {...props} />），我们想放弃key的传递
	// 但是作为中间步骤，我们将用jsxDEV进行除<div {...props} key="Hi" />之外的所有操作，
	// 因为我们目前无法确定key是否为明确声明为undefined或不存在.
	if (maybeKey !== undefined) {
		key = '' + maybeKey
	}
	if (hasValidKey(config)) {
		key = '' + config.key
	}
	if (hasValidRef(config)) {
		ref = '' + config.ref
	}
	// 其余属性添加到新的props对象
	for (propName in config) {
		if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
			props[propName] = config[propName]
		}
	}

	// 处理defaultProps，当prop没有值时，把defaultProp赋值给prop
	if (type && type.defaultProps) {
		const defaultProps = type.defaultProps
		for (const propName in defaultProps) {
			if (props[propName] === undefined) {
				props[propName] = defaultProps[propName]
			}
		}
	}
	return ReactElement(type, key, ref, undefined, undefined, ReactCurrentOwner.current, props)
}

export function jsxDEV(type, config, maybeKey, source, self) {
	let propName

	// 提取保留名称
	const props = {}

	let key = null
	let ref = null

	// 目前，key可以作为一个prop进行传递，如果还显式声明了key，则导致潜在问题
	// （即<div {...props} key="Hi" />或<div key="Hi" {...props} />），我们想放弃key的传递
	// 但是作为中间步骤，我们将用jsxDEV进行除<div {...props} key="Hi" />之外的所有操作，
	// 因为我们目前无法确定key是否为明确声明为undefined或不存在.
	if (maybeKey !== undefined) {
		key = '' + maybeKey
	}
	if (hasValidKey(config)) {
		key = '' + config.key
	}
	if (hasValidRef(config)) {
		ref = '' + config.ref
	}
	// 其余属性添加到新的props对象
	for (propName in config) {
		if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
			props[propName] = config[propName]
		}
	}

	// 处理defaultProps，当prop没有值时，把defaultProp赋值给prop
	if (type && type.defaultProps) {
		const defaultProps = type.defaultProps
		for (const propName in defaultProps) {
			if (props[propName] === undefined) {
				props[propName] = defaultProps[propName]
			}
		}
	}

	if (key || ref) {
		const displayName =
			typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type
		if (key) {
			defineKeyPropWarningGetter(props, displayName)
		}
		if (ref) {
			defineRefPropWarningGetter(props, displayName)
		}
	}

	return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props)
}

// @babel/preset-react会读取React.createElement 方法
// 并把jsx转义后的值传递给createElement作为参数
// 创建并返回给定type的一个新的ReactElement
// 文档位置：https://reactjs.org/docs/react-api.html#createelement
export function createElement(type, config, children) {
	let propName
	const props = {}

	let key = null
	let ref = null
	let self = null
	let source = null

	if (config != null) {
		if (hasValidRef(config)) {
			ref = config.ref
		}
		if (hasValidKey(config)) {
			key = config.key
		}
		self = config.__self === undefined ? null : config.__self
		self = config.__source === undefined ? null : config.__source

		// 其余属性添加到新的props对象
		for (propName in config) {
			if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
				props[propName] = config[propName]
			}
		}

		// 获取子元素
		const childrenLength = arguments.length - 2
		if (childrenLength === 1) {
			props.children = children
		} else if (childrenLength > 1) {
			// 先声明数组长度性能会好一点，在js中一般不用注意，数据量百万千万次级以上需要注意
			const children = Array(childrenLength)
			for (let i = 0; i < childrenLength; i++) {
				children[i] = arguments[i + childrenLength]
			}
			if (__DEV__ && Object.freeze) {
				Object.freeze(children)
			}
			props.children = children
		}
	}

	// 处理defaultProps，当prop没有值时，把defaultProp赋值给prop
	if (type && type.defaultProps) {
		const defaultProps = type.defaultProps
		for (const propName in defaultProps) {
			if (props[propName] === undefined) {
				props[propName] = defaultProps[propName]
			}
		}
	}

	// 开发环境校验子组件中从props属性中拿取ref或者key属性时进行错误提示
	if (__DEV__) {
		if (key || ref) {
			const displayName =
				typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type
			if (key) {
				defineKeyPropWarningGetter(props, displayName)
			}
			if (ref) {
				defineRefPropWarningGetter(props, displayName)
			}
		}
	}

	return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props)
}

/**
 * 返回一个产生给定类型(type)的ReactElement的函数。
 */
export function createFactory(type) {
	const factory = createElement.bind(null, type)
	// 在factory和prototype上公开类型(type)，以便可以在元素上轻松访问它。
	// 例如：`<Foo />.type === Foo`。
	// 不应将其命名为`constructor`，因为它可能不是创建元素的函数，甚至可能不是构造函数。
	// 旧版挂钩：将其删除
	factory.type = type
	return factory
}

export function cloneAndReplaceKey(oldElement, newKey) {
	const newElement = ReactElement(
		oldElement.type,
		newKey,
		oldElement.ref,
		oldElement._self,
		oldElement._source,
		oldElement._owner,
		oldElement.props
	)
	return newElement
}

export function cloneElement(element, config, children) {
	invariant(
		!(element === null || element === undefined),
		'React.cloneElement(...): The argument must be a React element, but you passed %s.',
		element
	)
	let propName

	// 拷贝props
	const props = Object.assign({}, element.props)

	// 提取需要保留下来的属性名称
	let key = element.key
	let ref = element.ref
	// 由于保留了owner，因此保留了self
	const self = element._self
	// 保留了source，因为cloneElement不太可能成为编译器的目标，
	// 并且原始source可能是真实所有者的更好指示
	const source = element._source

	// 除非ref被覆盖，否则owner会被保留
	let owner = element._owner

	if (config != null) {
		if (hasValidRef(config)) {
			// 默默的窃取parent的ref
			ref = config.ref
			owner = ReactCurrentOwner.current
		}
		if (hasValidKey(config)) {
			key = '' + config.key
		}
		// 其余prop会覆盖现有props
		let defaultProps
		if (element.type && element.type.defaultProps) {
			defaultProps = element.type.defaultProps
		}
		for (propName in config) {
			if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
				if (config[propName] === undefined && defaultProps != undefined) {
					// 处理默认props
					props[propName] = defaultProps[propName]
				} else {
					props[propName] = config[propName]
				}
			}
		}
	}

	// 子节点可能用多个，把这些节点分配到新的props对象的children上
	const childrenLength = arguments.length - 2
	if (childrenLength === 1) {
		props.children = children
	} else if (childrenLength > 1) {
		const children = Array(childrenLength)
		for (let i = 0; i < childrenLength; i++) {
			children[i] = arguments[i + childrenLength]
		}
		props.children = children
	}
	return ReactElement(element.type, key, ref, self, source, owner, props)
}

/**
 * 验证 object 是否是一个 ReactElement
 * @param {?object} object
 * @returns {boolean} 如果是一个 ReactElement 就返回true
 */
export function isValidElement(object) {
	return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE
}
