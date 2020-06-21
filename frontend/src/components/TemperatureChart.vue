<template>
  <v-container class='pa-0 temperature-chart'>
    <h3 class="subheading font-weight-medium">Temperature - Last 24 Hours</h3>
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import moment from 'moment'

export default {
  name: 'temperature-chart',
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    siteURL: {
      type: String,
      default: null
    }
  },
  data: () => ({
    temperatureData: [],
    timestamps: [],
    series: [{
      name: "Temperature",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    chartOptions: {
      chart: {
        height: 340,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: [],
      }
    },
  }),
  mounted () {
    this.fetchSiteHeartbeatGraphs()
  },
  watch: {
    siteURL: {
      handler () {
        this.fetchSiteHeartbeatGraphs()
      }
    }
  },
  methods: {
    fetchSiteHeartbeatGraphs () {
      this.$https.get(`${this.siteURL}/graphs`)
        .then(response => {
          if (response && response.length) {
            response.map(obj => {
              this.temperatureData.push(obj.temperature)
              this.timestamps.push(moment(obj.timestamp).format('LT'))
            })
          }
          this.series = [{
            data: this.temperatureData
          }]
          this.chartOptions = {
            xaxis: {
              categories: this.timestamps
            }
          }
        })
    },
  }
}
</script>

<style scoped lang='sass'>
  .temperature-chart
</style>
