<template>
  <!--begin::Charts Widget 2-->
  <div class="card" style="width: 100%;">
  <div  class="card" style="width: 100%;">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column mb-10" style="width: 100%;">
        <span class="card-label fw-bold fs-3 mb-1">Estatísticas de consumo de energia</span>
      </h3>

      <!--begin::Toolbar-->
      <!-- <div class="card-toolbar" data-kt-buttons="true">
        <a
          class="btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1"
          id="kt_charts_widget_2_year_btn" >Ano</a>

        <a class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1"
          id="kt_charts_widget_2_month_btn" >Mês</a>

        <a class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4"
          id="kt_charts_widget_2_week_btn"  >Semana</a>
      </div> -->
      <!--end::Toolbar-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Chart-->
      <apexchart
        ref="chartRef"
        type="bar"
        :options="chart"
        :series="dataseriesCopy"
        :height="height"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
</div>
  <!--end::Charts Widget 2-->
</template>

<script lang="ts">
import { defineComponent, ref, toRef,computed, watch, onBeforeMount } from "vue";
import { useThemeStore } from "@/stores/theme";
import type { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "statistics",
  props: { 
    height: Number,
    dataseries: Array
  },
  components: {},
  setup(props) {
    const dataseriesCopy = toRef(props, 'dataseries')
    const chartRef = ref<typeof VueApexCharts | null>(null);
    let chart: ApexOptions = {};
    const store = useThemeStore();

   

    const themeMode = computed(() => {
      return store.mode;
    });

    onBeforeMount(() => {
      Object.assign(chart, chartOptions());
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions());

      chartRef.value.refresh();
    };

    watch(themeMode, () => {
      refreshChart();
    });

    return {
      chart, 
      chartRef,
      dataseriesCopy
    };
  },
});

const chartOptions = (): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-500");
  const borderColor = getCSSVariableValue("--bs-gray-200");
  const baseColor = getCSSVariableValue("--bs-danger");
  const secondaryColor = getCSSVariableValue("--bs-blue");

  return {
    chart: {
      fontFamily: "inherit",
      type: "bar",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 5,
      },
    },
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dez"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return  (val == undefined) ? '0' : + val + " Kw"; 
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
};
</script>
