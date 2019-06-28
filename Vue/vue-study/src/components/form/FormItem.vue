<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-show="errMsg">{{errMsg}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      errMsg: ""
    };
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 做校验
      const value = this.form.model[this.prop];
      const rules = this.form.rules[this.prop];

      const desc = { [this.prop]: rules };
      const schema = new Schema(desc);

      // return 的是校验结果的Promise
      return schema.validate({ [this.prop]: value }, errs => {
        if (errs) {
          this.errMsg = errs[0].message;
        } else {
          this.errMsg = "";
        }
      });
    }
  }
};
</script>

<style>
</style>
