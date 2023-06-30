<template>
  <Datatable :header="tableHeader" :data="tableData"  >
    <template v-slot:id="{ row: data }">
      {{ data.id }}
    </template>
    <template v-slot:status_order="{ row: data }"> 
      <BadgeStatusOrder :status_props=data.status_order />
    </template>
    <template v-slot:name="{ row: data }">
      {{ data.name }}
    </template>
    <template v-slot:address="{ row: data }">
      {{ data.address }}
    </template>
    <template v-slot:neighborhood="{ row: data }">
      {{ data.neighborhood }}
    </template>
    <template v-slot:city="{ row: data }">
      {{ data.city }}
    </template>
    <template v-slot:state="{ row: data }">
      {{ data.state }}
    </template>
    <template v-slot:zipcode="{ row: data }">
      {{ data.zipcode }}
    </template>
    <template v-slot:date="{ row: data }">
      {{ data.date }}
    </template>
    <template v-slot:time="{ row: data }">
      {{ data.time }}
    </template>
    <template v-slot:driver_name="{ row: data }">
      {{ data.driver_name }}
    </template>
    <template v-slot:accion="{ row: data }">
      <div class="dropdown">
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Acciones
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" @click="$router.push({ name: 'orders-edit', params: { id: data.accion} })">Detalle</a></li>
            <li><a class="dropdown-item" @click="destroy(data.accion)">Eliminar</a></li>
        </ul>
        </div>
      
    </template>
  </Datatable>
</template>

<script>
import { defineComponent } from "vue";
import { ref, onBeforeMount } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import BadgeStatusOrder from "@/components/helpers/BadgeStatusOrder.vue";
import ApiService from '@/core/services/ApiService'   
import setFormtDate from '@/core/helpers/setFormatDate'   

export default defineComponent({
  props: {
    orders_data:  {
      type: Array,
      required: true,
    }
  },
  name: "tbOrder",
  components: {Datatable, BadgeStatusOrder},
 
   setup(props) {
    let data_order = []

    const tableHeader = ref([
      {
        columnName: "Pedido",
        columnLabel: "id",
      },
      {
        columnName: "Status",
        columnLabel: "status_order",
      },
      {
        columnName: "Nombre",
        columnLabel: "name",
      },
      {
        columnName: "Calle",
        columnLabel: "address",
      },
      {
        columnName: "colonia",
        columnLabel: "neighborhood",
      },
      {
        columnName: "Ciudad",
        columnLabel: "city",
      },
      {
        columnName: "Estado",
        columnLabel: "state",
      },
      {
        columnName: "Código postal",
        columnLabel: "zipcode",
      },
      {
        columnName: "Fecha de entrega",
        columnLabel: "date",
      },
      {
        columnName: "Hora de entrega",
        columnLabel: "time",
      },
      {
        columnName: "Chofer",
        columnLabel: "driver_name",
      },
      {columnName: "",
      columnLabel: "accion"}
    ]); 
    

    let Data = []; 
       
    for (let index = 0; index < props.orders_data.length; index++) {

        const element = props.orders_data[index];
        let name = element.first_name + ' ' + element.last_name

        Data.push({
          id: element.id,
          status_order: element.status_order,
          name: name,
          address: element.address,
          neighborhood: element.neighborhood,
          city: element.city,
          state: element.state,
          zipcode: element.zipcode,
          date: setFormtDate(element.scheduled_at, 'date'),
          time: setFormtDate(element.scheduled_at, 'time'),
          driver_name: element.driver_name,
          accion: element.id

        })

      }
    const tableData = ref(Data);
    
    return {
      tableHeader,
      tableData,
    };

    

    

    
  } 
});
</script>
