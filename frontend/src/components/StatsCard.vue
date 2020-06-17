<template>
  <v-card
    class="mt-4 mx-auto py-2"
    max-width="400"
    :color="cardColor"
  >

    <v-card-text class="pt-0">
      <span class="title mr-2">{{title}}</span>
      <span class="title mx-2 font-weight-bold black--text" v-html="computedValueWithUnit"></span>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="caption black--text font-weight-light">last updated {{ differenceFromNow }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'stats-card',
  props: {
    cardColor: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    unit: {
      type: String,
      default: null
    },
    value: {
      type: [Number, String],
      default: null
    },
    lastUpdated: {
      type: [Date, String],
      default: null
    }
  },
  data: () => ({}),
  computed: {
    differenceFromNow () {
      if (this.lastUpdated && moment(this.lastUpdated)) {
        return moment(this.lastUpdated).fromNow()
      }
      return moment()
    },
    computedValueWithUnit () {
      return `${this.value} ${this.unit}`
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang='sass'>
  .stats-card
</style>
