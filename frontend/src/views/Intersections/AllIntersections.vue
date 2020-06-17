<template>
  <v-container class='all-intersections'>
    <v-data-table
      :headers="headers"
      :items="intersections"
      :options.sync="options"
      :server-items-length="totalIntersections"
      :loading="loading"
      class="elevation-1"
      @click:row="onItemClick"
    >
      <template v-slot:item.lastStatusUpdate="{ item }">
        {{ parseTime(item.lastStatusUpdate) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'all-intersections',
  data: () => ({
    headers: [
      {
        text: 'Site ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Status', value: 'status' },
      { text: 'Last Updated', value: 'lastStatusUpdate' }
    ],
    totalIntersections: 0,
    intersections: [],
    options: {},
    loading: false
  }),
  mounted () {
    this.fetchIntersectionsData()
  },
  watch: {
    options: {
      handler () {
        this.fetchIntersectionsData()
      },
      deep: true
    }
  },
  methods: {
    fetchIntersectionsData () {
      this.loading = true
      this.$https.get('site')
        .then(response => {
          this.intersections = response.items
          this.totalIntersections = response.totalItems
          this.options.itemsPerPage = response.itemCount
          this.loading = false
        })
        .catch(error => {
          return error
        })
    },
    parseTime (time) {
      if (time && moment(time)) {
        return moment(time).fromNow()
      }
    },
    onItemClick (item) {
      if (item && item.id) {
        this.$router.push(item.id)
      }
    }
  }
}
</script>

<style scoped lang='sass'>
  .all-intersections
</style>
