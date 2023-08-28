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

  it("renders ClientSearch", () => {
    const wrapper = mountWithVuetify(ClientSearch, {
      props: {
        isLoading: false,
      },
    })

    const component = wrapper.findComponent(ClientSearch)
    expect(component.exists()).toBe(true)
  })

  // it("emits onSearch after debounce", async () => {
  //   const wrapper = mountWithVuetify(ClientSearch, {
  //     props: {
  //       isLoading: false,
  //       searchString: "",
  //     },
  //   })

  //   const textField = wrapper.find('input[id="input-0"]')
  //   console.log(textField)
  //   await textField.setValue("Test")
  //   await textField.trigger("input")
  //   vi.advanceTimersByTime(350)

  //   console.log(wrapper.html())
  //   console.log(JSON.stringify(wrapper.emitted()))
  //   expect(wrapper.emitted().onSearch).toBeTruthy()
  //   expect(wrapper.emitted().onSearch[0]).toEqual(["Test"])
  // })
})
