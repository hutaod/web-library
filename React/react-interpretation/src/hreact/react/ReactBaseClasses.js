import invariant from 'invariant'
import ReactNoopUpdateQueue from './ReactNoopUpdateQueue'

const emptyObject = {}
if (__DEV__) {
	Object.freeze(emptyObject)
}

/**
 * 基类助手，用于更新组件的状态
 */
function Component(props, context, updater) {
	this.props = props
	this.context = context
	// 如果一个组件有字符串refs，我们稍后会分配一个不同的对象
	this.refs = emptyObject
	// 初始化默认的更新程序，但是真正的更新程序由渲染器注入
	this.updater = updater || ReactNoopUpdateQueue
}

Component.prototype.isReactComponent = {}

/**
 * 设置state的子集. 始终使用用它来改变子集。你应该将`this.state`视为不可变的。
 *
 * 不能保证`this.state`会立即改变，因此在调用此方法后访问`this.state`可能会返回旧值.
 *
 * 不能保证对`setState`的调用将同步运行，因为它们最终可能会一起批处理。
 * 你可以提供一个可选的回调函数，该回调函数将在setState的调用实际完成时执行。
 *
 * 当一个函数被提供给setState作为参数，该函数会在将来的某个时刻被调用（而不是同步的），
 * 它将使用最新的组件参数（state, props, context）进行调用。这些值可能与此不同，
 * 因为你的函数可能在receiveProps之后但在shouldComponentUpdate之前调用，
 * 并且此新的state, props, 和 context可能尚未分配给此函数
 *
 * @param {object|function} partialState 下一次的部分state值
 *        或者是一个函数，该函数返回的值与当前state合并为下一次的state
 * @param {?function} callback state更新后调用
 * @final
 * @protected
 */
Component.prototype.setState = function(partialState, callback) {
	invariant(
		typeof partialState === 'object' || typeof partialState === 'function' || partialState == null,
		'setState(...): takes an object of state variables to update or a ' +
			'function which returns an object of state variables.'
	)
	this.updater.enqueueSetState(this, partialState, callback, 'setState')
}

/**
 * 强制更新。仅在确定我们不是在DOM事务中时，此方法会被调用。
 *
 * 当你明确的知道在组件的state中某些深层部分的值被改变时，但未调用setState时，可能需要调用此方法
 *
 * 调用此方法不会触发`shouldComponentUpdate`，但是会调用 `componentWillUpdate` 和 `componentDidUpdate`
 *
 * @param {?function} callback 在更新完成后调用
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function(callback) {
	this.updater.enqueueForceState(this, callback, 'forceUpdate')
}

if (__DEV__) {
	const deprecatedAPIS = {
		isMounted: [
			'isMounted',
			'相反, 请确保在componentWillUnmount中清理订阅和未结束的请求，以防止内存泄露。',
		],
		replaceState: [
			'replaceState',
			'重构代码，以使用setState代替（查看 https://github.com/facebook/react/issues/3236).',
		],
	}
	const defineDeprecationWarning = function(methodName, info) {
		Object.defineProperty(Component.prototype, methodName, {
			get: function() {
				console.warn('%s(...) 在普通的`JavaScript React`类中已经被弃用。%s', info[0], info[1])
				return undefined
			},
		})
	}
	for (const fnName in deprecatedAPIS) {
		if (deprecatedAPIS.hasOwnProperty(fnName)) {
			defineDeprecationWarning(fnName, deprecatedAPIS[fnName])
		}
	}
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype

/**
 * 带有默认浅层相等性检查的sCu便利组件
 */
function PureComponent(props, context, updater) {
	this.props = props
	this.context = context
	// 如果一个组件有字符串refs，我们稍后会分配一个不同的对象
	this.refs = emptyObject
	// 初始化默认的更新程序，但是真正的更新程序由渲染器注入
	this.updater = updater || ReactNoopUpdateQueue
}

const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy())
PureComponent.constructor = PureComponent
// 对于这些方法，请避免额外的原型跳转
Object.assign(pureComponentPrototype, Component.prototype)
pureComponentPrototype.isPureReactComponent = true

export { Component, PureComponent }
