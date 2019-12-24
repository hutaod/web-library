import invariant from 'invariant'
import isPlainObject from './isPlainObject'

/**
 * 检测model是否符合规范
 * @param {Object} model
 * @param {Object} allModels
 */
export default function checkModel(model, allModels) {
  invariant(model.namespace, 'model.namespace: should be string')
  console.log(allModels, model.namespace)

  invariant(
    allModels[model.namespace] === undefined,
    `model.namespace: ${model.namespace} has been registered`
  )
  allModels[model.namespace] = model.namespace
  if (model.reducers || model.state) {
    // TODO: 待续
  }
  if (model.effects) {
    invariant(
      isPlainObject(model.effects),
      `model.effects: should be PlainObject`
    )
  }
}
