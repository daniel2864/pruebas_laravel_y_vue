<template>
  <!--begin::Logo-->
  <div class="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
    <!--begin::Logo image-->
    <router-link to="/">
      <span style="color:#fff;font-size:20px;font-weight:bold;">{{ name }}</span>
    </router-link>
    <!--end::Logo image-->
    <!--begin::Sidebar toggle-->
    <div
      v-if="sidebarToggleDisplay"
      id="kt_app_sidebar_toggle"
      class="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate"
      data-kt-toggle="true"
      data-kt-toggle-state="active"
      data-kt-toggle-target="body"
      data-kt-toggle-name="app-sidebar-minimize"
    >
      <span class="svg-icon svg-icon-2 rotate-180">
        <inline-svg
          :src="getAssetPath('media/icons/duotune/arrows/arr079.svg')"
        />
      </span>
    </div>
    <!--end::Sidebar toggle-->
  </div>
  <!--end::Logo-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import { layout, themeMode } from "@/core/helpers/config";
import { sidebarToggleDisplay } from "@/core/helpers/config";

export default defineComponent({
  name: "sidebar-logo",
  components: {},
  setup() {
    return {
      layout,
      themeMode,
      sidebarToggleDisplay,
      getAssetPath,
    };
  },
  data() {
        return {
            name: ''
        }
    },
  mounted() {
    this.name = import.meta.env.VITE_APP_NAME
   }

});
</script>
