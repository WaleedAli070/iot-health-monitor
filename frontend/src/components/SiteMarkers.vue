<template>
  <v-container class='sites-markers'></v-container>
</template>

<script>
export default {
  name: 'sites-markers',
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    markerIcons: {
      offline: 'red',
      fault: 'yellow',
      online: 'green'
    }
  }),

  mounted() {
    const status = this.marker.status
    const marker = new this.google.maps.Marker({
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
      icon: `http://maps.google.com/mapfiles/ms/icons/${this.markerIcons[status]}-dot.png`
    })
    marker.addListener('click', () => {
      this.map.setCenter(marker.getPosition());
      this.$emit('markerClick', this.marker.id)
    })
  }
}
</script>

<style scoped lang='sass'>
  .sites-markers
</style>
