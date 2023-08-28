<script setup lang="ts">
import { stripHtml } from "string-strip-html"
import { Client } from "~/types"

const route = useRoute()

const { data } = await useClient({ clientId: route.params.clientId as string })
const client: Ref<Client | null> = ref(data)

const title = computed(() => `Quotable Clients | ${stripHtml(client.value?.name || "").result}`)

const backgrounds: any = {
  "New Zealand": ["#cc142b", "#00247d"],
  Ireland: ["#ff883e", "#169b62"],
  India: ["#ff9933", "#128807"],
  France: ["#ed2939", "#002395"],
}

const bg = computed(() =>
  client.value?.nationality ? backgrounds[client.value.nationality] : ["#b22234", "#3c3b6e"],
)

useHead({
  title,
})

watch(
  bg,
  (newBg) => {
    if (process.client && newBg && newBg.length === 2) {
      document.documentElement.style.setProperty("--bg", newBg[0])
      document.documentElement.style.setProperty(
        "--bg-gradient",
        `linear-gradient(135deg, ${newBg[0]}, ${newBg[1]})`,
      )
    }
  },
  { immediate: true },
)
</script>
<template>
  <v-card v-if="client" class="pa-8" style="min-height: calc(100vh - 184px)">
    <v-row align="center" dense>
      <v-col cols="2">
        <img :src="client.avatar" height="128" width="128" />
      </v-col>
      <v-col>
        <v-card-title
          class="text-h1"
          style="line-height: initial"
          v-html="client.name"
        ></v-card-title>
        <v-card-subtitle
          >{{ client.title
          }}{{ client.nationality ? ` from ${client.nationality}` : "" }}</v-card-subtitle
        >
      </v-col>
    </v-row>
    <v-card-text class="my-4">
      <h2 class="mb-2">Best Quotes</h2>
      <blockquote v-if="client.quote" class="blockquote">{{ client.quote }}</blockquote>
      <p v-else class="no-quotes-text">
        This client doesn't have any quotes yet. Ask them to say something quotable!
      </p>
    </v-card-text>
  </v-card>
  <v-card v-else class="pa-8" style="min-height: calc(100vh - 184px)">
    <v-card-title class="text-h3 mb-16" style="line-height: initial">Client not found</v-card-title>
    <div class="d-flex flex-col justify-center items-center pt-16">
      <p class="text-h4">Try searching for a different client!</p>
    </div>
  </v-card>
</template>

<style scoped>
.no-quotes-text {
  font-style: italic;
  font-size: 18px;
  padding: 1rem 0 1rem 1.5rem;
}
</style>
