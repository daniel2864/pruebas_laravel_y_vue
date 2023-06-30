<template>
    <div
      v-for="(verror, index) of errors"
      class="is-invalid text-danger"
      :key="index"
    >
      {{ verror.$message }}
    </div>
  </template>
  <script lang="js">
  import { defineComponent } from "vue";
  export default defineComponent({
    props: {
      config: {
        type: Object,
        requirend: true,
      },
    },
    computed: {
      errors() {
        try {
          let keys = this.config?.path?.split(".") || [];
          let current = this.config?.v;
          keys.forEach((key) => {
            current = current[key];
          });
          return current.$errors;
        } catch (error) {
          if(error){
            //console.error(error);
          } 
          
        }
        return [];
      },
    },
  });
  </script>