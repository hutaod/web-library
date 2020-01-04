const didWarnStateUpdateForUnmountedComponent = {}

function warnNoop(publicInstance, callerName) {
	if (__DEV__) {
		const constructor = publicInstance.constructor
		const componentName =
			(constructor && (constructor.displayName || constructor.name)) || 'ReactClass'
		const warningKey = `${componentName}.${callerName}`
		if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
			return
		}
		console.error(
			"Can't call %s on a component that is not yet mounted. " +
				'This is a no-op, but it might indicate a bug in your application. ' +
				'Instead, assign to `this.state` directly or define a `state = {};` ' +
				'class property with the desired state in the %s component.',
			callerName,
			componentName
		)
		didWarnStateUpdateForUnmountedComponent[warningKey] = true
	}
}

const ReactNoopUpdateQueue = {
	/**
	 * 检测复合组件是否装载完成
	 * @param {ReactClass} publicInstance 我们要测试的实例
	 * @returns {boolean} 如果装载完成返回true，否则为false
	 * @protected
	 * @final
	 */
	isMounted: function(publicInstance) {
		return false
	},

	/**
	 * 强制更新，仅在确定我们不是一个dom事务中，才应调用此方法，
	 *
	 * 如果你知道组件状态的某些深层方面已更改，但未调用`setState`时，可能需要调用此方法
	 *
	 * 强制更新不会调用shouldComponentUpdate，但是会调用componentWillUpdate和componentDidUpdate
	 *
	 * @param {ReactClass} publicInstance 应该重新渲染的实例
	 * @param {?function} callback 组件更新完成后的回调
	 * @param {?string} callerName 在公共api中，回调函数的名称
	 */
	enqueueForceUpdate: function(publicInstance, callback, callerName) {
		warnNoop(publicInstance, 'forceUpdate')
	},

	/**
	 * 始终使用`replaceState`或者`setState`来改变state，你应该将`this.state`视为不可变的
	 * 不能保证`this.state`会立即更新，因此调用此方法后访问`this.state`可能会返回旧值
	 * @param {ReactClass} publicInstance 应该重新渲染的实例
	 * @param {object} completeState 下一个state
	 * @param {?function} callback 组件更新完成后的回调
	 * @param {?string} callerName 在公共api中，回调函数的名称
	 */
	enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
		warnNoop(publicInstance, 'replaceState')
	},

	/**
	 * 设置状态的子集。 这仅是因为_pendingState是内部的。
	 * 这提供了合并策略，该合并策略不适用于深层属性，这很令人困惑。
	 * 待办事项：公开未决状态或在合并过程中不使用它。
	 * @param {ReactClass} publicInstance 应该重新渲染的实例
	 * @param {object} partialState 下一个要与state合并的部分状态
	 * @param {?function} callback 组件更新完成后的回调
	 * @param {?string} callerName 在公共api中，回调函数的名称
	 */
	enqueueSetState: function(publicInstance, partialState, callback, callerName) {
		warnNoop(publicInstance, 'setState')
	},
}

export default ReactNoopUpdateQueue
