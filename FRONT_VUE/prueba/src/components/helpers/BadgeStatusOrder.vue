<template>
    <span class="badge" :style="{ color: activeColor + ' !important', backgroundColor: ActiveBackgroundColor + ' !important' }" >{{ status_props }}</span>
</template>
<script>
import ColorStatusOrder from '@/core/helpers/colorStatusOrder';

import { defineComponent } from "vue";
  export default defineComponent({
    props: {
    status_props:  {
      type: String,
      required: true,
    }
   },
    data() {
        return {  
            activeColor: '',
            ActiveBackgroundColor: ''
        }
    },
    methods: {
    callColorStyles(){
        
        const status_colors = [{
        id: 'DISPONIBLE',
        color: '#3f4254',
        backgroundcolor: '#e4e6ef'
    },
    {
        id: 'EN CURSO',
        color: '#fff',
        backgroundcolor: '#2a7199'
    },
    {
        id: 'AUTH ACEPTADO',
        color: '#fff',
        backgroundcolor: '#ffc700'
    },
    {
        id: 'CARGANDO',
        color: '#fff',
        backgroundcolor: '#009ef7'
    },
    {
        id: 'CARGA FINALIZADA',
        color: '$fff',
        backgroundcolor: '#181c32'
    },
    {
        id: 'AUTH SALIDA',
        color: '#fff',
        backgroundcolor: '#18cb25'
    },
    {
        id: 'DESCARGANDO',
        color: '#fff',
        backgroundcolor: '#7239ea'
    },
    {
        id: 'ENTREGADO',
        color: '#fff',
        backgroundcolor: '#50cd89'
    }]

     
    for (let index = 0; index < status_colors.length; index++) {
        const element = status_colors[index];
        if(element.id == this.status_props){ 
            this.activeColor = element.color
            this.ActiveBackgroundColor = element.backgroundcolor
            break
        }
        
    }


    }
},
     mounted() {   
        this.callColorStyles()

    

  
}
})
</script>