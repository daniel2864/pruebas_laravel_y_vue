<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10 ">
    <!--begin::Form-->
    <form @submit.prevent="onSubmitLogin" class="form w-100" id="kt_login_signin_form">
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3 title_login">Prueba</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          Nuevo aqui?

          <router-link to="/sign-up" class="link-primary fw-bold">
            Crea una cuenta
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading -->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-dark">Correo</label>
        <!--end::Label-->

        <!--begin::Input-->
        <input
          v-model="credentials.email"
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block"></div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0">Contraseña</label>
          <!--end::Label-->

         
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <input
          v-model="credentials.password"
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block"></div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          tabindex="3"
          type="submit"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
          :disabled="loading"
          :data-kt-indicator="loading"
        >
          <span class="indicator-label"> Entrar </span>

          <span class="indicator-progress">
            Please wait...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
        <!--end::Submit button-->
      </div>
      <!--end::Actions-->
    </form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";

export default defineComponent({
  name: "sign-in",
  data: function () {
    return {
      credentials: {
        email: "admin@gmail.com",
        password: "123456",
      },
      loading: false,
    };
  },
  methods: {
    onSubmitLogin: async function () {
      const store = useAuthStore();
      store.logout();

      this.loading = true;

      try {
        
        
       const res = await store.login(this.credentials);

       if(res){
          this.$router.push({ name: "dashboard" });
       } 
       this.loading = false;
      } catch (error) {
        console.log(error)
        Swal.fire({
          text: error[0],
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Intente nuevamente!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(() => {
          store.errors = {};
        });
      }

      this.loading = false;
    },
  },
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Righteous&display=swap");


@media only screen and (min-width: 320px) and (max-width: 576px) {
  .title_login {
    font-family: "Righteous", cursive;
    color: #fff !important;
    font-size: 60px !important;
  }
}

@media only screen and (min-width: 577px) and (max-width: 90000px) {
  .title_login {
    font-family: "Righteous", cursive;
    color: #fff !important;
    font-size: 84px !important;
  }
}
</style>
