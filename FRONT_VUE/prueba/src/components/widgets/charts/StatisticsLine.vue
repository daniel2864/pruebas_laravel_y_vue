<template>
  <!--begin::Charts Widget 3-->
  <div   class="card" style="width: 100%;">
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
        type="area"
        :options="chart"
        :series="dataseriesCopy"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Charts Widget 3-->
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onBeforeMount, toRef } from "vue";
import { useThemeStore } from "@/stores/theme";
import type { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "StatisticsLine",
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
  const labelColor = getCSSVariableValue("--bs-gray-800");
  const borderColor = getCSSVariableValue("--bs-gray-100"); 
  const baseColor = getCSSVariableValue("--bs-danger");
  const lightColor = getCSSVariableValue("--bs-info-light"); 
  const secondaryColor = getCSSVariableValue("--bs-blue");

  return {
    chart: {
      fontFamily: "inherit",
      stacked: true,
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseColor,secondaryColor],
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
      crosshairs: {
        position: "front",
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
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
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: [baseColor,secondaryColor],
      strokeWidth: 3,
    },
  };
};
</script>
