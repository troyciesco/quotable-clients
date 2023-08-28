import { defineStore } from "pinia"
import { Client } from "~/types"
import useClients from "~/composables/useClients"

export const useSearchStore = defineStore("search", () => {
  const searchString = ref("")
  const isLoading = ref(true)
  const error = ref<any>(null)
  const clients = ref<Client[]>([])
  const initialized = ref(false)

  if (!initialized.value) {
    ;(async () => {
      const { data, error: fetchError } = await useClients({ searchString: "" })
      clients.value = data.value || []
      isLoading.value = false
      initialized.value = true
      error.value = fetchError.value
    })()
  }

  const searchClients = async (newSearchString: string) => {
    isLoading.value = true
    searchString.value = newSearchString
    const { data, error: fetchError } = await useClients({ searchString: newSearchString })
    clients.value = data.value || []
    isLoading.value = false
    error.value = fetchError as any
  }

  return {
    searchString,
    isLoading,
    clients,
    searchClients,
    error,
  }
})
