<script setup lang="ts">
import { useSearchStore } from "~/stores/clientSearch"

const store = useSearchStore()

const handleSearch = (newSearchString: string) => {
  store.searchClients(newSearchString)
}

onMounted(() => {
  store.initialize()
})
</script>

<template>
  <v-navigation-drawer
    permanent
    rounded
    elevation="1"
    class="ml-8"
    style="top: 32px; height: calc(100vh - 184px)"
  >
    <ClientSearch :is-loading="store.isLoading" @on-search="handleSearch" />
    <ClientList
      :is-loading="store.isLoading"
      :has-error="!!store.error"
      :clients="store.clients || []"
      :search-string="store.searchString"
    />
  </v-navigation-drawer>
</template>

<style>
.v-navigation-drawer__content {
  border-radius: 4px;
}
</style>
