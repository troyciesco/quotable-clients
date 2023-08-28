import { createPinia, setActivePinia } from "pinia"
import { beforeEach, describe, it, expect, vi, afterEach } from "vitest"
import { useSearchStore } from "../clientSearch"

const TEST_SEARCH_STRING = "Test"

describe("Client Search Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const mockData = [
      {
        id: 1,
        name: "Test Client",
        quote: "A test quote",
        title: "Mr.",
        nationality: "Ireland",
      },
      {
        id: 2,
        name: "Jon Doe",
        quote: "A real quote",
        title: "Supervisor",
        nationality: "Scotland",
      },
    ]

    vi.stubGlobal(
      "useFetch",
      vi.fn(() => {
        const filteredData = TEST_SEARCH_STRING
          ? mockData.filter((client) => client.name.includes(TEST_SEARCH_STRING))
          : mockData

        return { data: { value: filteredData }, pending: false, error: null }
      }),
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("initializes with default values", () => {
    const searchStore = useSearchStore()
    expect(searchStore.searchString).toBe("")
    expect(searchStore.isLoading).toBe(true)
    expect(searchStore.clients).toEqual([])
  })

  it("searches for clients", async () => {
    const store = useSearchStore()
    await store.searchClients(TEST_SEARCH_STRING)

    expect(store.clients).toHaveLength(1)
    expect(store.clients[0].name).toEqual("Test Client")
  })
})
