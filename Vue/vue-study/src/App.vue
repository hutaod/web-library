<template>
  <div id="app">
    <!-- <CompCommunicate></CompCommunicate> -->
    <!-- <Recursion></Recursion> -->
    <!-- <Slots/> -->
    <FormTest/>
  </div>
</template>

<script>
import CompCommunicate from "@/components/communicate";
import Recursion from "@/components/recursion";
import Slots from "@/components/slots";
import FormTest from "@/components/form/Test";
export default {
  name: "app",
  components: {
    CompCommunicate,
    Recursion,
    Slots,
    FormTest
  }
};
</script>

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
