<template>
  <div>{{msg}}</div>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator'

function Component(target: any) {
  const options: any = {
    data() {
      return {
        msg: 'mua~~ mua~~'
      }
    }
  }
  return Vue.extend(options)
}

@Component
export default class Hello extends Vue {}
</script>
<style scoped>
</style>