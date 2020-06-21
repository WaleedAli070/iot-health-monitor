<template>
  <v-app>

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

<style lang="scss">
.v-application {
   font-family: $body-font-family, sans-serif !important;
    .title { // To pin point specific classes of some components
       font-family: $title-font, sans-serif !important;
    }
 }
</style>
