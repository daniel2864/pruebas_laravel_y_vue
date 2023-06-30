<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      novalidate
      @submit="onSubmitRegister"
      id="kt_login_signup_form"
      :validation-schema="registration"
    >
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Crea una cuenta</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          ¿Ya tienes una cuenta?

          <router-link to="/sign-in" class="link-primary fw-bold">
            Inicia sesión aquí
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--end::Heading-->

      

      <!--begin::Input group-->

      <!--begin::Col-->
      <div class="row mb-12">
                    

                    <div class="col-lg-8 fv-row">
                      <label class="col-lg-4 col-form-label required fw-semibold fs-6" style="color: #fff;">Imagen</label><br>
                        <input type="file" name="image" id="image" @change="getImage" accept="image/*" class="form-control form-control-lg form-control-solid" />
                        
                    </div>
                </div>
        <!--end::Col-->
      
        <!--begin::Col-->
        <div class="col-xl-12">
          <label class="form-label fw-bold text-dark fs-6">Nombre</label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder="Nombre"
            name="name"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="name" />
            </div>
          </div>
        </div>
        <!--end::Col-->
 
     
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-7">
        <label class="form-label fw-bold text-dark fs-6">Email</label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="email"
          placeholder="Email"
          name="email"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Col-->
      <div class="col-xl-12">
          <label class="form-label fw-bold text-dark fs-6">Telefono</label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder="Telefono"
            name="phone"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="phone" />
            </div>
          </div>
        </div>
        <!--end::Col-->


      <!--begin::Input group-->
      <div class="mb-10 fv-row" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6"> Contraseña </label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <Field
              class="form-control form-control-lg form-control-solid"
              type="password"
              placeholder="Contraseña"
              name="password"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <!--end::Input wrapper-->

           
          
        </div>
        <!--end::Wrapper-->
        
      </div>
      <!--end::Input group--->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bold text-dark fs-6"
          >Confirme su Contraseña</label
        >
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          placeholder="Confirme su Contraseña"
          name="password_confirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password_confirmation" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

    

      <!--begin::Actions-->
      <div class="text-center">
        <button
          id="kt_sign_up_submit"
          ref="submitButton"
          type="submit"
          class="btn btn-lg btn-primary"
        >
          <span class="indicator-label"> Enviar </span>
          <span class="indicator-progress">
            Espere por favor...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2";

export default defineComponent({
  name: "sign-up",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const imagen = ref<any>('')



    const submitButton = ref<HTMLButtonElement | null>(null);

    const registration = Yup.object().shape({
      name: Yup.string().required('El campo nombre es requerido').label("Name"), 
      phone: Yup.string().required('Campo requerido').label("Phone"),
      email: Yup.string().min(4).required('Campo requerido').email('Email invalido').label("Email"),
      password: Yup.string().required('Campo requerido').label("Password"),
      password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
        .label("Confirmación de contraseña"),
    });

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });

    const onSubmitRegister = async (values: any) => {
      values = values as any;

      // Clear existing errors
      store.logout();

      // eslint-disable-next-line
      submitButton.value!.disabled = true;

      // Activate indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      const formData = new FormData();
        formData.append('_method', 'post');
        if(imagen.value){
            formData.append('image_user',imagen.value);
        }
        
        formData.append('name',values.name);
        formData.append('phone',values.phone);
        formData.append('email',values.email);
        formData.append('password',values.password);
        formData.append('password_confirmation',values.password_confirmation);

      // Send login request
      await store.register(formData);

      const error = Object.values(store.errors);

      console.log(error)

      if (!error || error.length ==0) {

         
        Swal.fire({
          text: "Registro realizado correctamente.",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(function () {
          // Go to page after successfully login
          router.push({ name: "sign-in" });
        });
      } else {
        Swal.fire({
          text: "Revise los datos nuevamente y vuelva a intentar",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Intente nuevamente",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      }

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

   const  getImage=(event)=>{ 
          imagen.value = event.target.files[0];  
  }

    return {
      getImage,
      registration,
      onSubmitRegister,
      submitButton,
      getAssetPath,
    };
  },
  
});
</script>
