<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">
        <svg-icon icon-class="qq" />Home
      </router-link>|
      <router-link to="/about">
        <svg-icon icon-class="wx" />About
      </router-link>
    </div>-->
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
