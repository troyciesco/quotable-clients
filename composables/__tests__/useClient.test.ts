import { afterEach, describe, expect, test, vi } from "vitest"
import useClient from "../useClient"

describe("useClient composable", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test("returns loading status when the fetch operation is pending", async () => {
    vi.stubGlobal("useFetch", vi.fn().mockResolvedValue({ data: null, pending: true, error: null }))

    const result = await useClient({ clientId: "123" })
    expect(result.pending).toBe(true)
  })

  test("returns error status when the fetch operation encounters an error", async () => {
    const mockError = new Error("Network error")
    vi.stubGlobal(
      "useFetch",
      vi.fn().mockResolvedValue({ data: null, pending: false, error: mockError }),
    )

    const result = await useClient({ clientId: "123" })
    expect(result.pending).toBe(false)
    expect(result.error).toBe(mockError)
  })

  test("returns success status and data when the fetch operation is successful", async () => {
    const mockData = { id: "123", name: "Test Client" }
    vi.stubGlobal(
      "useFetch",
      vi.fn().mockResolvedValue({ data: mockData, pending: false, error: null }),
    )

    const result = await useClient({ clientId: "123" })
    expect(result.pending).toBe(false)
    expect(result.data).toEqual(mockData)
  })
})
