<template>
  <div>
    {{msg}}
    <div>
      <input type="text" @keydown.enter="addFeature" />
    </div>
    <ul>
      <li v-for="feature in features" :key="feature.id">{{feature.name}}</li>
    </ul>
    {{count}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { State, Action, Mutation, Getter, namespace } from 'vuex-class'

// class Feature {
//   constructor(public id: number, public name: string) {}
// }

interface Feature {
  id: number
  name: string
}

// 泛型
interface Result<T> {
  ok: 0 | 1
  data: T[]
}

// 获取特性接口，泛型函数
async function getData<T extends Feature>(): Promise<Result<T>> {
  // return await fetch(
  //   'https://easy-mock.com/mock/5d29717e3d38243ecccb6b89/kkb-cart/testData'
  // ).then(res => {
  //   return res.json()
  // })

  const data: any[] = [
    {
      id: 1,
      name: '类型注解'
    },
    {
      id: 2,
      name: '类型推论'
    }
  ]
  return Promise.resolve<Result<T>>({
    ok: 1,
    data
  })
  // 等同于
  // return Promise.resolve({
  //   ok: 1,
  //   data
  // } as Result<T>)

  // resolve作为形参不需要声明类型
  // return new Promise(resolve => {
  //   resolve({
  //     ok: 1,
  //     data
  //   })
  // })

  // return {
  //   ok: 1,
  //   data
  // }
}

@Component({
  props: {
    msg: {
      type: String,
      default: 'msg'
    }
  }
})
export default class Hello extends Vue {
  // Prop里面的是配置部分，后面是ts关心部分
  // @Prop({
  //   default: 'msg',
  //   required: true
  // })
  // private msg!: string

  // 没有加装饰器，声明属于正常属性，会作为data选项
  // private features: Feature[]

  // 使用vuex方式
  @State('features') public features!: Feature[]
  // Getter、State添加到computed选项

  @Action('addFeature') private addFeatureAction: any
  @Mutation private addFeatureMutation: any

  // constructor() {
  //   super()
  //   this.features = []
  // }

  // protected async created() {
  //   // this.features.push('bla')
  //   const res = await getData<Feature>()
  //   this.features = res.data
  // }

  // 声明方法将来会加入到methods里面， 除了生命周期
  // Emit若不传参, 则函数名就是事件名 会自动转成add-feature
  @Emit('addFeature')
  private addFeature(e: any) {
    const name = e.target.value
    this.addFeatureAction(name)
    // this.addFeatureMutation(name)

    // this.features.push({
    //   id: this.features.length + 1,
    //   name
    // })
    e.target.value = ''
    return name
  }

  // 使用getter实现存取器
  get count() {
    return this.features.length
  }

  // 监听
  @Watch('msg')
  private onMsgChange(val: string, oldVal: any) {
    console.log(val, oldVal)
  }

  // 监听
  // @Watch('@route')
  // private onRouteChange(val: any, oldVal: any) {
  //   console.log(val, oldVal)
  // }
}
</script>
<style scoped>
</style>