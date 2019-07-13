// 导入vue
import Vue from 'vue'
import TestComp from '@/components/TestComp'
import { mount } from '@vue/test-utils'

// 测试套件 test suite
describe('myTestComp', () => {
  // 检查原始组件选项
  it('有created生命周期', () => {
    // 断言 assert
    expect(typeof TestComp.created).toBe('function')
  })

  // 评估原始组件选项中的函数的结果
  it('初始data是vue-text', () => {
    // 检查data函数存在性
    expect(typeof TestComp.data).toBe('function')
    // 检查data返回的默认值
    const defaultData = TestComp.data()
    expect(defaultData.message).toBe('vue-text')
  })

  it('mount之后测data是hello', () => {
    const vm = new Vue(TestComp).$mount()
    expect(vm.message).toBe('hello')
  })

  it('按钮点击后', () => {
    const wrapper = mount(TestComp)
    wrapper.find('button').trigger('click')
    // 测试数据变化
    expect(wrapper.vm.message).toBe('按钮点击')
    // 测试html渲染结果
    expect(wrapper.find('span').html()).toBe('<span>按钮点击</span>')
    // 等效的方式
    expect(wrapper.find('span').text()).toBe('按钮点击')
  })
})
