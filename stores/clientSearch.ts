import { defineStore } from "pinia"
import { Client } from "~/types"
import useClients from "~/composables/useClients"

export const useSearchStore = defineStore("search", () => {
  const searchString = ref("")
  const isLoading = ref(false)
  const clients = ref<Client[]>([])
  const initialized = ref(false)

  if (!initialized.value) {
    ;(async () => {
      const { data } = await useClients({ searchString: "" })
      clients.value = data.value || []
      isLoading.value = false
      initialized.value = true
    })()
  }

  const searchClients = async (newSearchString: string) => {
    isLoading.value = true
    searchString.value = newSearchString
    const { data } = await useClients({ searchString: newSearchString })
    clients.value = data.value || []
    isLoading.value = false
  }

  return {
    searchString,
    isLoading,
    clients,
    searchClients,
  }
})
