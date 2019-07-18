<template>
  <div>
    {{msg}}
    <div>
      <input type="text" @submit="addFeature" />
    </div>
    <ul>
      <li v-for="feature in features" :key="feature">{{feature}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Hello extends Vue {
  // Prop里面的是配置部分，后面是ts关心部分
  @Prop({
    default: 'msg',
    required: true
  })
  private msg!: string

  // 没有加装饰器，声明属于正常属性，会作为data选项
  private features: string[]

  constructor() {
    super()
    this.features = ['类型注解', '类型推论']
  }

  // 声明方法将来会加入到methods里面， 除了生命周期
  private addFeature(e: any) {
    this.features.push(e.target.value)
  }
}
</script>
<style scoped>
</style>