import { defineStore } from "pinia"
import { Client } from "~/types"
import useClients from "~/composables/useClients"

export const useSearchStore = defineStore("search", () => {
  const searchString = ref("")
  const isLoading = ref(true)
  const error = ref<any>(null)
  const clients = ref<Client[]>([])
  const initialized = ref(false)

  const initialize = async () => {
    isLoading.value = true
    searchString.value = ""
    const { data, error: fetchError } = await useClients({ searchString: "" })
    clients.value = data.value || []
    isLoading.value = false
    error.value = fetchError?.value
  }

  if (!initialized.value) {
    initialize().then(() => {
      initialized.value = true
    })
  }

  const searchClients = async (newSearchString: string) => {
    isLoading.value = true
    searchString.value = newSearchString
    const { data, error: fetchError } = await useClients({ searchString: newSearchString })

    clients.value = data.value || []
    isLoading.value = false
    error.value = fetchError?.value
  }

  return {
    searchString,
    isLoading,
    clients,
    searchClients,
    error,
    initialize,
  }
})
