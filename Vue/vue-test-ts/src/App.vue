<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <Hello :msg="msg" @addFeature="addFeature" />
    <Decor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import HelloWorld from './components/HelloWorld.vue'
import Hello from './components/Hello.vue'
import Decor from './components/Decor.vue'

@Component({
  components: {
    // HelloWorld,
    Hello,
    Decor
  }
})
export default class App extends Vue {
  private msg: string = 'blabla'

  protected addFeature(name: any) {
    console.log(name)
  }
  private created() {
    setTimeout(() => {
      this.msg = 'hahaha'
    }, 2000)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
