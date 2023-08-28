import { expect, describe, vi, afterEach, it, beforeEach } from "vitest"
import ClientSearch from "../ClientSearch.vue"
import { mountWithVuetify } from "../../__tests__/setup"

describe("ClientSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("emits onSearch after debounce", async () => {
    const wrapper = mountWithVuetify(ClientSearch, {
      props: {
        isLoading: false,
        searchString: "",
      },
    })

    const component = wrapper.findComponent(ClientSearch)
    const textField = component.find('input[id="input-0"]')

    await textField.setValue("Test")
    vi.advanceTimersByTime(350)

    expect(component.emitted().onSearch).toBeTruthy()
    expect(component.emitted().onSearch[0]).toEqual(["Test"])
  })
})
