<script lang="ts" setup>
useHead({
  title: "Quotable Clients",
})
</script>

<template>
  <div
    class="pa-16 mt-16 d-flex flex-column justify-center align-center"
    style="min-height: calc(100vh - 112px)"
  >
    <v-card class="pa-8">
      <v-card-title class="text-h4 mb-4">A place to read quotes from clients</v-card-title>
      <div class="d-flex justify-center">
        <nuxt-link to="/clients"><v-btn>Go to dashboard</v-btn></nuxt-link>
      </div>
    </v-card>
  </div>
</template>
