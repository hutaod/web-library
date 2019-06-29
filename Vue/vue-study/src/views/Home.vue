<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <div>
      <router-link to="/home/list?a=123">List</router-link>|
      <router-link to="/home/detail/hello">detail</router-link>
    </div>
    <router-view></router-view>-->
    <div>数量：{{$store.state.counter}}</div>
    <button @click="$store.commit('increment')">新增</button>
    <button @click="$store.dispatch('incrementAsync')">异步新增</button>
    <p />
    <input type="text" v-model="username" /> 等同于
    <input :value="username" @input="username=$event.target.value" />
    <p />
    <!-- .sync 只能用于自定义组件 可以绑定多种属性名 -->
    <HInput :value.sync="username" />等同于
    <HInput :value.sync="username" @update:value="username=$event" />
    <p />
    <HInput v-bind.sync="doc" />
    <p />
    <p>{{username}}</p>
    <p>doc: {{doc}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HInput from "../components/form/Input";

export default {
  name: "home",
  components: { HInput },
  data() {
    return {
      username: "1",
      doc: {
        value: "",
        name: ""
      }
    };
  }
};
</script>
