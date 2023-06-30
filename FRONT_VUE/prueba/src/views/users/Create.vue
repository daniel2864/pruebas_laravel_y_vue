<template>
<div class="card mb-5 mb-xl-10">
    <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
        <div class="card-title m-0">
            <h3 class="fw-bold m-0">Usuario Nuevo</h3>
        </div>
    </div>

    <div id="kt_account_settings_profile_details" class="collapse show">
        <form @submit.prevent="create" id="kt_account_profile_details_form" class="form">
            <div class="card-body border-top p-9">

                <div class="row mb-6">
                    <label class="col-lg-4 col-form-label required fw-semibold fs-6">Nombre</label>

                    <div class="col-lg-8 fv-row">
                        <input type="text" v-model="user.name" class="form-control form-control-lg form-control-solid"/>
                        <vuelidate-errors :config="{ v: v$, path: 'user.name' }" />
                    </div>
                </div>

                <div class="row mb-6">
                    <label for="emailaddress" class="col-lg-4 col-form-label required fw-semibold fs-6">Correo electronico</label>

                    <div class="col-lg-8 fv-row">
                        <input type="email" v-model="user.email" class="form-control form-control-lg form-control-solid">    
                    </div>
                </div>

                <div class="row mb-6">
                    <label class="col-lg-4 col-form-label required fw-semibold fs-6">Teléfonos</label>

                    <div class="col-lg-8 fv-row">
                        <input type="text" v-model="user.phone" class="form-control form-control-lg form-control-solid" />
                        <vuelidate-errors :config="{ v: v$, path: 'user.phone' }" />
                    </div>
                </div>
                
             

                <div class="row mb-6">
                    <label for="password" class="col-lg-4 col-form-label required fw-semibold fs-6">Contraseña</label>

                    <div class="col-lg-8 fv-row">
                        <input type="password" v-model="user.password" class="form-control form-control-lg form-control-solid">
                        <vuelidate-errors :config="{ v: v$, path: 'user.password' }"/>                   
                    </div>
                </div>

                <div class="row mb-6">
                    <label class="col-lg-4 col-form-label fw-semibold fs-6">Confirmar Contraseña</label>

                    <div class="col-lg-8 fv-row">
                        <input  v-model="user.password_confirmation" type="password" class="form-control form-control-lg form-control-solid" name="password_confirmation" id="password_confirmation">                   
                        <vuelidate-errors :config="{ v: v$, path: 'user.password_confirmation' }" />
                    </div>
                </div>

                <div class="row mb-6">
                    <label class="col-lg-4 col-form-label required fw-semibold fs-6">Imagen</label>

                    <div class="col-lg-8 fv-row">
                        <input type="file" name="image" id="image" @change="getImage" accept="image/*" class="form-control form-control-lg form-control-solid" />
                        
                    </div>
                </div>

            </div>

            <div class="card-footer d-flex justify-content-end py-6 px-9">
                <button type="button" class="btn btn-light btn-active-light-primary me-2" @click="  $router.push('/users')">Cancelar</button>

                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
    </div>
</div>
</template>


<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, sameAs, email } from '@vuelidate/validators'
import Swal from "sweetalert2/dist/sweetalert2.js";
import VuelidateErrors from "@/components/helpers/VuelidateErrors.vue";
import ApiService from '@/core/services/ApiService';


export default {
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            imagen: null,
            user: {
                name: 'fdafa',
                phone: '434343', 
                email: 'test@vuelidate.com', 
                image_user: null,
                password: '123456',
                password_confirmation: '123456'
            }
        }
    },
    components: {
        VuelidateErrors
    },
    validations() {
        return {
            user: {
                name: { 
                    required,
                    maxLength: maxLength(50)
                },
                phone: {
                    required
                }, 
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(16)
                },
                password_confirmation: {
                    sameAsPassword: sameAs(
                        this.user.password
                    )
                }
            }
        }
    },
    methods: {
        getImage(event){ 
            this.imagen = event.target.files[0]; 
        },
        async create() {
            const isValid = await this.v$.$validate();
            if (!isValid) return;
            try {
                 
                const formData = new FormData();
                formData.append('_method', 'post');
                if(this.imagen){
                    formData.append('image_user',this.imagen);
                }
                
                formData.append('name',this.user.name);
                formData.append('phone',this.user.phone);
                formData.append('email',this.user.email);
                formData.append('password',this.user.password);
                formData.append('password_confirmation',this.user.password_confirmation);
                const res = await ApiService.post('/api/users/register', formData);
                 
                this.$router.push('/users')
            } catch (error) {
                if(error && error.response && error.response.data && error.response.data.errors){
                    let err = '';
                    for (const [key, value] of Object.entries(error.response.data.errors)) {
                        //console.log(key, value[0]);
                        err = value[0]
                    }
                    Swal.fire({
                        text: err,
                        icon: 'error',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    })

                }else{
                    Swal.fire({
                        text: 'Error con el servidor',
                        icon: 'error',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    })
                }
                
            }

        }
    }
}
</script>
