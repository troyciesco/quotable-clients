<script setup lang="ts">
import { Client } from "~/types"
const props = defineProps<{
  clients: Client[]
  searchString: string
  isLoading: boolean
}>()
const { clients, searchString } = toRefs(props)
</script>
<template>
  <v-sheet class="mx-auto" max-width="304">
    <div v-if="isLoading" class="px-2">Loading...</div>
    <div v-if="!isLoading && clients.length === 0 && !searchString" class="px-2">
      No clients yet!
    </div>
    <div v-else-if="clients.length === 0 && searchString" class="px-2">
      No clients match your search criteria.
    </div>
    <v-list v-else lines="three" class="mx-auto">
      <v-virtual-scroll :items="clients">
        <template #default="{ item: client }">
          <nuxt-link class="text-decoration-none text-black" :to="`/clients/${client.id}`">
            <v-list-item
              :class="{
                'bg-grey-darken-1': ($route.params.clientId as any) === client.id.toString(),
              }"
              :value="client"
              :prepend-avatar="client.avatar"
              rounded="shaped"
              :data-testid="`client-item-${client.id}`"
            >
              <v-list-item-title class="font-weight-bold" v-html="client.name"></v-list-item-title>
              <v-list-item-subtitle>{{ client.title }}</v-list-item-subtitle>
            </v-list-item>
          </nuxt-link>
        </template>
      </v-virtual-scroll>
    </v-list>
  </v-sheet>
</template>
