<template>
  <v-container class="home">
    <v-row>
      <SitesMap 
        :apiKey="googleMapsApiKey"
        :mapConfig="mapConfig"
      >
        <template slot-scope="{ google, map }">
          <SiteMarkers
            v-for="marker in markers"
            :key="marker.id"
            :marker="marker"
            :google="google"
            :map="map"
            @markerClick="onMarkerClick"
          />
        </template>
      </SitesMap>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import SitesMap from '@/components/SitesMap'
import SiteMarkers from '@/components/SiteMarkers'

export default {
  name: 'home',
  components: {
    SitesMap,
    SiteMarkers
  },
  data: () => ({
    googleMapsApiKey: '',
    intersections: [],
    loading: false,
    mapConfig: {
      zoom: 14,
      center: null
    },
    markers: {}
  }),
  mounted () {
    this.$nextTick(() => {
      this.googleMapsApiKey = process.env.VUE_APP_GOOGLE_MAPS_KEY
      this.fetchIntersectionsData()
    })
    this.$socketClient.subscribeToSocket(`siteStatusChange`, this.onSiteStatusChange)
  },
  methods: {
    fetchIntersectionsData () {
      this.loading = true
      this.$https.get('site')
        .then(response => {
          this.intersections = response.items
          this.loading = false
          let intersectionId = ''
          this.intersections.map(site => {
            intersectionId = site.id
            this.markers[site.id] =  {
              id: site.id,
              position: {
                lat: site.lat,
                lng: site.long
              },
              status: site.status
            }
          })
          this.mapConfig.center = this.markers[intersectionId].position
        })
        .catch(error => {
          return error
        })
    },
    onMarkerClick (event) {
      this.$router.push(`/intersections/${event}`)
    },
    onSiteStatusChange (event) {
      this.markers[event.id].status = event.status
    }
  }
}
</script>
