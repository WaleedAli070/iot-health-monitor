<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      DERQ Task - Health Monitor
    </v-app-bar>

    <v-content>
      <AppSidebar />
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import AppSidebar from '@/components/Sidebar'
export default {
  name: 'App',
  components: {
    AppSidebar
  },
  data: () => ({
    //
  }),
};
</script>
