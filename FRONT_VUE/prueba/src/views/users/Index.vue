<template>
    <div id="kt_project_users_table_pane" class="tab-pane fade active show" role="tabpanel">
        <div class="card card-flush ">
            <div class="card-body pt-0">
                <!--begin::Table container-->
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-2  col-xl-2">
                        <button @click="$router.push({ name: 'users-create' })" type="button" class="btn btn-primary mt-5 width100">Crear Usuario</button> 
                    </div>
                    
                </div>
                <div class="table-responsive">
                    <div id="kt_project_users_table_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                        <div class="table-responsive">
                            <table id="kt_project_users_table" class="table table-row-bordered table-row-dashed gy-4 align-middle fw-bold dataTable no-footer">
                                <thead class="fs-7 text-gray-400 text-uppercase">
                                    <tr>
                                        <th :class="column.class" v-for="column of columns" :key="`${column.key }_users_column`" style="width: 0px;">
                                            {{ column.name }}
                                        </th>
                                    </tr>
                                </thead>

                                <tbody class="fs-6">
                                    <tr v-for="user of users" :key="user.id">
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="me-5 position-relative">
                                                    <div class="symbol symbol-35px symbol-circle">
                                                        <img alt="Pic" src="/public/media/avatars/blank.png">
                                                    </div>
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <a href="" class="mb-1 text-gray-800 text-hover-primary">{{ user.name }}</a>
                                            </div>
                                            </div>      
                                        </td>
                                        <td  >{{user.email}}</td>
                                        <td><div class="fw-semibold fs-6 ">{{ user.phone }}</div></td>
                                        
                                        <td >{{user.session_date}}</td>
                                        <td >{{format(user.created_at)}}</td>
                                        <td class="text-end">
                                            <div class="dropdown">
                                                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Acciones
                                                </button>
                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a class="dropdown-item" @click="$router.push({ name: 'users-edit', params: { id: user.id} })">Editar</a></li>
                                                    <li><a class="dropdown-item" @click="destroy(user.id)">Eliminar</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                             
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useI18n } from "vue-i18n";
import ApiService from '@/core/services/ApiService'
import setFormtDate from '@/core/helpers/setFormatDate' 

export default {
    setup() {
    const { t, te } = useI18n();
    const translate = (text='') => {
            if(!text || text ==  undefined || text ==  ''){ return ''}
            
            if (te(text)) {
                return t(text);
            } else {
                return text;
            }
            };
            return { 
            translate,
        };
    }, 
    data() {
        return { 
            users: [],
            loading: false,
            
            filters: {
                role: '',
                keyword: '',
                page: 1
            },
            columns: [
                {
                key: "name",
                name: "nombre",
                class: "min-w-250px"
                },
              
                {
                key: "email",
                name: "Correo",
                class: "min-w-250px"
                },
                {
                key: "phone",
                name: "Telefono",
                class: "min-w-250px"
                },
                {
                key: "session_date",
                name: "Ultima sesion",
                class: "min-w-250px"
                },
                {
                key: "created_at",
                name: "Creado",
                class: "min-w-250px"
                }
            ],
        }
    },

    methods:{
        async destroy(id) {
            try {
                await ApiService.delete(`/api/user/${id}`);
                let index = this.users.findIndex(user => user.id == id)
                this.users.splice(index, 1)
            } catch (error) {
                console.log(error);
                
            }
        },
        format(date){
            return setFormtDate(date,'datetime')
        },
        async fetch(){
           
            this.loading = true;
            try {

                const response = await ApiService.get('/api/users') 
             
               this.users.push(...response.data.data);
              
            } catch (error) {
                console.log(error);
            }
            this.loading = false;

        },
        async search(){ 
            
            this.users = [];
            this.fetch();
        },
         
    },
    async mounted() {
        this.fetch();
    }
}
</script>
<style>
.top_15{
    margin-top: 15px;
}
.width100{
    width: 100%;
}
</style>