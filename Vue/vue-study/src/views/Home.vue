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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home"
};
</script>
