import { setActivePinia } from "pinia"
import { beforeEach, describe, it, expect, vi } from "vitest"
import { createTestingPinia } from "@pinia/testing"
import { useSearchStore } from "../clientSearch"

describe("Client Search Store", () => {
  beforeEach(() => {
    setActivePinia(createTestingPinia())
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
      vi.fn().mockResolvedValue({ data: mockData, pending: false, error: null }),
    )
  })

  it("initializes with default values", () => {
    const searchStore = useSearchStore()
    expect(searchStore.searchString).toBe("")
    expect(searchStore.isLoading).toBe(false)
    expect(searchStore.clients).toEqual([])
  })

  it("searches for clients", async () => {
    const store = useSearchStore()
    await store.searchClients("Test")

    expect(store.searchClients).toHaveBeenCalledTimes(1)
    expect(store.searchClients).toHaveBeenLastCalledWith("Test")
  })
})
