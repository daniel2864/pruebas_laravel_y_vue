<template>
    <div style="margin:30px">

        <h1><b>OPERAÇÃO DETALHADA</b></h1><br>
        <h3>Cálculo Kw consumido entre a Casa e a Kitnet:</h3><br />
        - Valor da fatura: <b>X</b> -> ${{total_invoice_amount == '' || total_invoice_amount == 0 ? '0': total_invoice_amount}}<br />
        - Leitura anterior Kw (<b>Unidade principal</b>): <b>B</b> -> {{reading_main_unit_old == '' || reading_main_unit_old == 0 ? '0': reading_main_unit_old}}<br />
        - Leitura atual Kw (<b>Unidade principal</b>): <b>A</b> -> {{reading_main_unit == '' || reading_main_unit == 0 ? '0': reading_main_unit}}<br />
        - Leitura anterior Kw (<b>Kitnet</b>): <b>D</b> -> {{reading_kitnet_unit_old == '' || reading_kitnet_unit_old == 0 ? '0': reading_kitnet_unit_old}}<br />
        - Leitura atual Kw (<b>Kitnet</b>): <b>F</b> -> {{reading_kitnet_unit == '' || reading_kitnet_unit == 0 ? '0': reading_kitnet_unit}}<br />

        - Kw consumido (<b>Casa e Kitnet</b>): A - B = <b>AB</b> -> {{reading_main_unit == '' || reading_main_unit == 0 ? '0': reading_main_unit}} - {{reading_main_unit_old == '' || reading_main_unit_old == 0 ? '0': reading_main_unit_old}} = {{total_kw_cal == '' || total_kw_cal == 0 ? '0': total_kw_cal}}<br />

        - Cálculo do custo de 1 Kw com base no valor da fatura e total consumido em Kw: X / AB = <b>XAB</b> -> {{total_invoice_amount == '' || total_invoice_amount == 0 ? '0': total_invoice_amount}} / {{total_kw_cal == '' || total_kw_cal == 0 ? '0': total_kw_cal}} = <b>${{monto_por_kw == '' || monto_por_kw == 0 ? '0': monto_por_kw}}</b><br /><br />
        - Kw consumido (<b>Kitnet</b>): F - D = <b>G</b> -> {{reading_kitnet_unit == '' || reading_kitnet_unit == 0 ? '0': reading_kitnet_unit}} - {{reading_kitnet_unit_old == '' || reading_kitnet_unit_old == 0 ? '0': reading_kitnet_unit_old}} = {{total_kw_cal_kitnet == '' || total_kw_cal_kitnet == 0 ? '0': total_kw_cal_kitnet}}<br />
        - <span style="color: red">TOTAL A PAGAR (KITNET):</span> XAB * G = <b>XABG</b> -> {{monto_por_kw == '' || monto_por_kw == 0 ? '0': monto_por_kw}} * {{reading_kitnet_unit == '' || reading_kitnet_unit == 0 ? '0': reading_kitnet_unit}} = <span style="color: red;font-size: 17px;"><b>${{monto_pagar_kitnet == '' || monto_pagar_kitnet == 0 ? '0': monto_pagar_kitnet}}</b></span> <br />
        - Kw consumido (<b>Casa</b>): AB - G = <b>GAB</b> -> {{total_kw_cal == '' || total_kw_cal == 0 ? '0': total_kw_cal}} - {{reading_kitnet_unit == '' || reading_kitnet_unit == 0 ? '0': reading_kitnet_unit}} = {{kw_casa == '' || kw_casa == 0 ? '0': kw_casa}} <br />
        - <span style="color: red">TOTAL A PAGAR (CASA):</span> GAB * XAB = <b>GABXAB</b> -> {{kw_casa == '' || kw_casa == 0 ? '0': kw_casa}} * {{monto_por_kw == '' || monto_por_kw == 0 ? '0': monto_por_kw}} = <span style="color: red;font-size: 17px;"><b>${{monto_pagar_casa == '' || monto_pagar_casa == 0 ? '0': monto_pagar_casa}}</b></span> <br /><br />
        <h3>Representação percentual:</h3><br />
        - Porcentagem consumida com base no total de kw {{total_kw_cal == '' || total_kw_cal == 0 ? '0': total_kw_cal}} consumido  (<b>Kitnet</b>): G / AB * 100 = <b>ABG</b> -> {{total_kw_cal_kitnet == '' || total_kw_cal_kitnet == 0 ? '0': total_kw_cal_kitnet}} / {{total_kw_cal == '' || total_kw_cal == 0 ? '0': total_kw_cal}} * 100 = <span style="color: red"><b>%{{total_porcentaje_kitnet == '' || total_porcentaje_kitnet == 0 ? '0': total_porcentaje_kitnet}}</b></span><br />
        - Porcentagem consumida com base no total de kw {{total_kw_cal == '' || total_kw_cal == 0 ? '0': total_kw_cal}} consumido  (<b>Casa</b>): GAB / AB * 100 = <b>GABAB</b> -> {{kw_casa == '' || kw_casa == 0 ? '0': kw_casa}} / {{total_kw_cal == '' || total_kw_cal == 0 ? '0': total_kw_cal}} * 100 = <span style="color: red"><b>%{{total_porcentaje_casa == '' || total_porcentaje_casa == 0 ? '0': total_porcentaje_casa}}</b></span><br />
        - <span style="color: red">TOTAL A PAGAR (KITNET):</span> X * ABG / 100 = <b>TOTAL</b> -> {{total_invoice_amount == '' || total_invoice_amount == 0 ? '0': total_invoice_amount}} * {{total_porcentaje_kitnet == '' || total_porcentaje_kitnet == 0 ? '0': total_porcentaje_kitnet}} / 100 = <span style="color: red;font-size: 17px;"><b>${{total_result_kitnet == '' || total_result_kitnet == 0 ? '0': total_result_kitnet}}</b></span> <br />
        - <span style="color: red">TOTAL A PAGAR (CASA):</span> X * GABAB / 100 = <b>TOTAL</b> -> {{total_invoice_amount == '' || total_invoice_amount == 0 ? '0': total_invoice_amount}} * {{total_porcentaje_casa == '' || total_porcentaje_casa == 0 ? '0': total_porcentaje_casa}} / 100 = <span style="color: red;font-size: 17px;"><b>${{total_result_casa == '' || total_result_casa == 0 ? '0': total_result_casa}}</b></span> <br />
    </div>
</template>
<script>
 
import { defineComponent } from "vue";

  export default defineComponent({
    name: "DetalleOperacion",
    props: {
        total_invoice_amount:  {
            type: String || Number,
            required: true,
        },
        reading_main_unit_old:  {
            type: String || Number,
            required: true,
        },
        reading_main_unit:  {
            type: String || Number,
            required: true,
        },
        reading_kitnet_unit_old:  {
            type: String || Number,
            required: true,
        }
   },
   setup(){
    return{

    }
   },

    data() {
        return {
                data_current: '',
                clock_reading: [{}],
                total_invoice_amount_old: '',
                reading_main_unit_old: '',
                total_invoice_amount: '',
                reading_main_unit: '',
                reading_kitnet_unit: '', 
                reading_kitnet_unit_old:'',

                total_kw_cal: 0,
                monto_por_kw: 0,
                monto_pagar_kitnet: 0,
                monto_pagar_casa: 0,
                kw_casa: 0,
                total_kw_cal_kitnet: 0,
                total_porcentaje_kitnet: 0,
                total_porcentaje_casa: 0,
                total_result_kitnet: 0,
                total_result_casa: 0,


            }
        
    },
    methods: {
        setV(value = 0, type = 'i'){
            if(typeof value == 'string'){
                return 0
            }
            
            return value
        },
        calcular(){
            this.setV(this.reading_kitnet_unit)
            const total_kw_cal          = parseInt(this.setV(this.reading_main_unit)) - parseInt(this.setV(this.reading_main_unit_old))
         
             
            const monto_por_kw        = parseFloat(this.setV(this.total_invoice_amount)) / parseInt(total_kw_cal)
            const total_kw_cal_kitnet = parseInt(this.setV(this.reading_kitnet_unit)) - parseInt(this.setV(this.reading_kitnet_unit_old))
            const monto_pagar_kitnet  = parseFloat(monto_por_kw) * parseInt(total_kw_cal_kitnet)
            
            const kwMain              = parseInt(total_kw_cal) - parseInt(total_kw_cal_kitnet)
            const monto_pagar_casa    = kwMain * parseFloat(monto_por_kw)

           // this.setMontoReloj(monto_pagar_casa, kwMain, 'Casa')
            //this.setMontoReloj(monto_pagar_kitnet, this.reading_kitnet_unit, 'Kitnet')

            this.total_kw_cal = total_kw_cal;
            this.total_kw_cal_kitnet = total_kw_cal_kitnet;
            this.monto_por_kw = monto_por_kw;
            this.monto_pagar_kitnet = monto_pagar_kitnet;
            this.monto_pagar_casa = monto_pagar_casa;
            this.kw_casa = kwMain;
            this.total_porcentaje_kitnet = (total_kw_cal_kitnet / total_kw_cal) * 100;
            this.total_porcentaje_casa = (kwMain / total_kw_cal) * 100;
            this.total_result_kitnet = (parseFloat(this.setV(this.total_invoice_amount)) * parseFloat(this.total_porcentaje_kitnet)) / 100;
            this.total_result_casa = (parseFloat(this.setV(this.total_invoice_amount)) * parseFloat(this.total_porcentaje_casa)) / 100;
            
        }
    },
     mounted() {   
         

    

  
    }
})
</script>