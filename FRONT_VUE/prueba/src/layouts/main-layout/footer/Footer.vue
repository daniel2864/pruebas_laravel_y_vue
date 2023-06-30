<template>
  <!--begin::Footer-->
  <div v-if="footerDisplay" id="kt_app_footer" class="app-footer" >
    <!--begin::Footer container-->
    <div
      class="app-container d-flex flex-column flex-md-row flex-center flex-md-stack py-3"
      :class="{
        'container-fluid': footerWidthFluid,
        'container-xxl': !footerWidthFluid,
      }">
      <!--begin::Copyright-->
      <div class="text-dark order-2 order-md-1">
        <span class="text-muted fw-semibold me-1">{{  footer  }} </span>
      </div>
      <!--end::Copyright-->
      <!--begin::Menu-->
      
      <!--end::Menu-->
    </div>
    <!--end::Footer container-->
  </div>
  <!--end::Footer-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { footerWidthFluid, footerDisplay } from "@/core/helpers/config";

export default defineComponent({
  name: "theme-footer",
  components: {},
  setup() {
    return {
      footerWidthFluid,
      footerDisplay,
    };
  },
  data() {
        return {
            footer: ''
        }
    },
  mounted() {
    const y = new Date().getFullYear();
    const year = 2023
    let y_rango:any = year
    if(year != y){
      y_rango = year + ' - ' + y
    }
    this.footer = y_rango + ' ' + import.meta.env.VITE_APP_NAME
   }
});
</script>

<style scoped>
#kt_app_footer{
  width: 86%;
  position: fixed !important;
  bottom: 0;
}
</style>