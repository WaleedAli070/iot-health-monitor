<template>
  <v-container class='intersections-profile'>
    <v-row>
      <h3 class="grey--text"><span class="black--text text-uppercase">{{this.siteId}}:</span> Unit Health History</h3>
    </v-row>
    <v-row>
      <template v-for="(stats, index) in intersectionStats">
        <v-col :key="index">
          <StatsCard 
            :title="stats.title"
            :cardColor="stats.cardColor"
            :value="stats.value"
            :unit="stats.unit"
            :lastUpdated="stats.lastUpdated"
          >
          </StatsCard>
        </v-col>
      </template>
    </v-row>
    <v-row>
      <v-col>
        <TemperatureChart
          :siteURL="this.siteHeartbeatBaseURL"
        ></TemperatureChart>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="heartbeats"
      :server-items-length="totalHeartbeats"
      :sort-by.sync="options.sortBy"
      :sort-desc.sync="options.sortDesc"
      :loading="loading"
      :page.sync="options.page"
      :items-per-page="paginationControls.itemCount"
      hide-default-footer
      class="elevation-1"
    > 
      <template v-slot:item.timestamp="{ item }">
        {{ parseTime(item.timestamp) }}
      </template>
      <template v-slot:item.temperature="{ item }">
        <span :class="getTemperatureClass(item.temperature)">{{ item.temperature }}</span>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination 
        :value="options.page"
        :length="paginationControls.pageCount"
        total-visible="5"
        @input="onUpdatePagination"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import moment from 'moment'
import StatsCard from '@/components/StatsCard'
import TemperatureChart from '@/components/TemperatureChart'

export default {
  name: 'intersections-profile',
  components: {
    StatsCard,
    TemperatureChart
  },
  data: () => ({
    headers: [
      {
        text: 'Date/Time',
        align: 'start',
        value: 'timestamp',
      },
      { text: 'Humidity', value: 'humidity' },
      { text: 'Temperature', value: 'temperature' }
    ],
    totalHeartbeats: 0,
    heartbeats: [],
    options: {},
    paginationControls: {
      itemCount: 10,
      pageCount: 1
    },
    loading: false,
    siteId: null,
    intersectionStats: {
      avgTemp: {
        cardColor: 'primary lighten-3',
        title: 'Average Temperature',
        value: 12,
        unit: '°F',
        lastUpdated: new Date()
      },
      minHumid: {
        cardColor: 'accent lighten-3',
        title: 'Min Humidity',
        value: 12,
        unit: 'g/m<sup>3</sup>',
        lastUpdated: new Date()
      },
      maxHumid: {
        cardColor: 'warning lighten-3',
        title: 'Max Humidity',
        value: 12,
        unit: 'g/m<sup>3</sup>',
        lastUpdated: new Date()
      }
    },
  }),
  mounted () {
    this.siteId = this.$route.params.id
    this.$nextTick(() => {
      this.resetSortOptions()
    })
    // Check Socket connection
    this.$socketClient.subscribeToSocket('connect', function () {
      console.log('Connected');
    })
    this.$socketClient.subscribeToSocket(`siteHeartbeat${this.siteId}`, this.onNewHeartbeat)
    this.fetchSiteHeartbeatData()
    this.fetchSiteHeartbeatStats()
  },
  computed: {
    siteHeartbeatBaseURL () {
      return `heartbeat/site/${this.siteId}`
    },
    siteHeartbeatLogsURL () {
      const queryParams = this.$helpers.serializeObjectToQueryParams(this.options)
      return `${this.siteHeartbeatBaseURL}?${queryParams}`
    }
  },
  watch: {
    options: {
      handler () {
        if (this.options.sortBy && this.options.sortDesc) {
          this.fetchSiteHeartbeatData()
        }
      },
      deep: true
    }
  },
  methods: {
    fetchSiteHeartbeatData () {
      if (this.siteId) {
        this.loading = true
        this.$https.get(this.siteHeartbeatLogsURL)
          .then(response => {
            this.heartbeats = response.items
            this.totalHeartbeats = response.totalItems
            this.updatePaginationObject(response)
            this.loading = false
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchSiteHeartbeatStats () {
      this.$https.get(`${this.siteHeartbeatBaseURL}/stats`)
        .then(response => {
          for (const key in response) {
            this.intersectionStats[key].value = response[key].toFixed(2)
            this.intersectionStats[key].lastUpdated = new Date() 
          }
        })
    },
    updatePaginationObject ({ totalItems, pageCount, itemCount }) {
      this.totalHeartbeats = totalItems
      this.paginationControls.pageCount = pageCount
      this.paginationControls.itemCount = itemCount
    },
    parseTime (time) {
      if (time && moment(time)) {
        return moment(time).format('lll')
      }
    },
    resetSortOptions () {
      this.options = {
        sortBy: 'timestamp',
        sortDesc: true,
        page: 1,
      }
    },
    onUpdatePagination (event) {
      this.options.page = event
      this.fetchSiteHeartbeatData()
    },
    onNewHeartbeat () {
      console.log('New heartbeat received for Site: ', this.siteId)
      this.resetSortOptions()
      this.fetchSiteHeartbeatData()
    },
    getTemperatureClass (value) {
      if (value > 70) {
        return 'error--text font-weight-bold'
      } else if (value <= 70 && value >= 65) {
        return 'warning--text font-weight-bold'
      }
      return ''
    } 
  }
}
</script>

<style scoped lang='sass'>
  .intersections-profile
</style>
