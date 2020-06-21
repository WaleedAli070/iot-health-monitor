<template>
 <v-navigation-drawer
    id="sidebar-navigation_drawer"
    persistent
    permanent
    width="240"
    app
    color="blue-grey darken-4"
    dark
  >
    <v-list-item dark>
      <v-list-item-content>
        <v-list-item-title class="title">
          Open IoT
        </v-list-item-title>
        <v-list-item-subtitle>
          Health Monitor
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.path"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'app-sidebar',
  data: () => ({
    items: [
      { title: 'Home', icon: 'mdi-home-outline', path: '/' },
      { title: 'Sites', icon: 'mdi-air-filter', path: '/intersections' },
    ],
    right: null,
  }),
  mounted () {},
  methods: {}
}
</script>

<style scoped lang='sass'>
  .app-sidebar
</style>
