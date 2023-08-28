import { describe, afterEach, expect, vi, beforeEach, it } from "vitest"
import { createTestingPinia } from "@pinia/testing"
import SearchDrawer from "../SearchDrawer.vue"
import { mountWithVuetify } from "../../__tests__/setup"
import { useSearchStore } from "../../stores/clientSearch"
import ClientSearch from "../ClientSearch.vue"
import ClientList from "../ClientList.vue"

describe("SearchDrawer.vue", () => {
  let wrapper: any
  let searchClientsMock: any

  beforeEach(() => {
    vi.useFakeTimers()
    const mockFetchResult = {
      data: [{ id: 1, name: "Test Client" }],
      pending: false,
      error: null,
    }
    const mockUseFetch = vi.fn().mockResolvedValue(mockFetchResult)
    vi.stubGlobal("useFetch", mockUseFetch)

    wrapper = mountWithVuetify(SearchDrawer, {
      global: {
        plugins: [createTestingPinia()],
      },
    })

    const store = useSearchStore()
    store.searchClients("")
    searchClientsMock = vi.fn() // Create a mock function
    store.searchClients = searchClientsMock // Override the store's method with our mock
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders SearchDrawer", () => {
    const component = wrapper.findComponent(SearchDrawer)
    expect(component.exists()).toBe(true)
  })

  it("passes isLoading prop to ClientSearch", () => {
    const clientSearchComponent = wrapper.findComponent(ClientSearch)
    expect(clientSearchComponent.props("isLoading")).toBe(useSearchStore().isLoading)
  })

  it("passes clients and searchString props to ClientList", () => {
    const clientListComponent = wrapper.findComponent(ClientList)
    expect(clientListComponent.props("clients")).toEqual(useSearchStore().clients)
    expect(clientListComponent.props("searchString")).toBe(useSearchStore().searchString)
  })

  it("handleSearch method triggers when onSearch is emitted from ClientSearch", async () => {
    const testSearchString = "Test Search"
    await wrapper.findComponent(ClientSearch).vm.$emit("onSearch", testSearchString)
    expect(searchClientsMock).toHaveBeenCalledTimes(1)
    expect(searchClientsMock).toHaveBeenCalledWith(testSearchString)
  })
})
