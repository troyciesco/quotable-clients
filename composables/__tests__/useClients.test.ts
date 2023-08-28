import { afterEach, describe, expect, test, vi } from "vitest"
import useClients from "../useClients"
import { Client } from "~/types"

describe("useClients composable", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test("returns loading status when the fetch operation is pending", async () => {
    vi.stubGlobal("useFetch", vi.fn().mockResolvedValue({ data: null, pending: true, error: null }))

    const result = await useClients({ searchString: "" })
    expect(result.pending).toBe(true)
  })

  test("returns error status when the fetch operation encounters an error", async () => {
    const mockError = new Error("Network error")
    vi.stubGlobal(
      "useFetch",
      vi.fn().mockResolvedValue({ data: null, pending: false, error: mockError }),
    )

    const result = await useClients({ searchString: "" })
    expect(result.pending).toBe(false)
    expect(result.error).toBe(mockError)
  })

  test("returns success status and data when the fetch operation is successful", async () => {
    const mockData = [{ id: "123", name: "Test Client" }]
    vi.stubGlobal(
      "useFetch",
      vi.fn().mockResolvedValue({ data: mockData, pending: false, error: null }),
    )

    const result = await useClients({ searchString: "Test" })
    expect(result.pending).toBe(false)
    expect(result.data).toEqual(mockData)
  })

  test("appends the searchString parameter correctly to the API endpoint", async () => {
    const mockFetchResult = {
      data: [{ id: 1, name: "Test Client" }],
      pending: false,
      error: null,
    }
    const mockUseFetch = vi.fn().mockResolvedValue(mockFetchResult)

    vi.stubGlobal("useFetch", mockUseFetch)
    const searchString = "Special&CharTest"

    await useClients({ searchString })

    expect(mockUseFetch).toHaveBeenCalledWith(
      `/api/clients?search=${encodeURIComponent(searchString)}`,
    )
  })

  test("handles data structure correctly", async () => {
    const mockData = ref<Client[]>([
      { id: 123, name: "Test Client", title: "Should handle extra props", avatar: "avataaaar" },
    ])

    vi.stubGlobal(
      "useFetch",
      vi.fn().mockResolvedValue({ data: mockData, pending: false, error: null }),
    )

    const { data } = await useClients({ searchString: "Test" })

    expect(data.value).toBeDefined()

    if (data.value) {
      expect(data.value[0]).toHaveProperty("id")
      expect(data.value[0]).toHaveProperty("name")
    }
  })

  test("handles empty data scenario gracefully", async () => {
    const mockData: Client[] = []
    vi.stubGlobal(
      "useFetch",
      vi.fn().mockResolvedValue({ data: mockData, pending: false, error: null }),
    )

    const result = await useClients({ searchString: "EmptyTest" })
    expect(result.data).toEqual([])
  })

  test("handles multiple calls gracefully", async () => {
    const mockDataOne = [{ id: "123", name: "Test Client One" }]
    const mockDataTwo = [{ id: "456", name: "Test Client Two" }]

    vi.stubGlobal(
      "useFetch",
      vi
        .fn()
        .mockResolvedValueOnce({ data: mockDataOne, pending: false, error: null })
        .mockResolvedValueOnce({ data: mockDataTwo, pending: false, error: null }),
    )

    const resultOne = await useClients({ searchString: "One" })
    const resultTwo = await useClients({ searchString: "Two" })

    expect(resultOne.data).toEqual(mockDataOne)
    expect(resultTwo.data).toEqual(mockDataTwo)
  })

  test("handles non-200 HTTP status codes gracefully", async () => {
    const mockError = new Error("Server error")
    vi.stubGlobal(
      "useFetch",
      vi.fn().mockResolvedValue({ data: null, pending: false, error: mockError }),
    )

    const result = await useClients({ searchString: "ServerErrorTest" })
    expect(result.error).toBe(mockError)
  })
})
