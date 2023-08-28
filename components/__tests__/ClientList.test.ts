import { expect, describe, it } from "vitest"
import ClientList from "../ClientList.vue"
import { mountWithVuetify } from "../../__tests__/setup"

describe("ClientList Component", () => {
  it("displays fallback text when no clients and no search string provided", () => {
    const wrapper = mountWithVuetify(ClientList, {
      props: {
        clients: [],
        searchString: "",
      },
    })

    expect(wrapper.text()).toContain("No clients yet!")
  })

  it("displays fallback text when no clients but a search string is provided", () => {
    const wrapper = mountWithVuetify(ClientList, {
      props: {
        clients: [],
        searchString: "jon doe",
      },
    })

    expect(wrapper.text()).toContain("No clients match your search criteria.")
  })

  it("displays the list of clients when clients are provided", () => {
    const mockClients = [
      { id: 1, name: "John Doe", title: "Test Client", avatar: "avatar1" },
      { id: 2, name: "Jane Smith", title: "Another Client", avatar: "avatar2" },
    ]
    const wrapper = mountWithVuetify(ClientList, {
      props: {
        clients: mockClients,
        searchString: "",
      },
      global: {
        mocks: {
          $route: { params: { clientId: null } },
        },
      },
    })

    expect(wrapper.text()).toContain("John Doe")
    expect(wrapper.text()).toContain("Jane Smith")
  })

  it("applies a class to the currently selected client", () => {
    const mockClients = [{ id: 1, name: "John Doe", title: "Test Client", avatar: "avatar1" }]
    const wrapper = mountWithVuetify(ClientList, {
      props: {
        clients: mockClients,
        searchString: "",
      },
      global: {
        mocks: {
          $route: { params: { clientId: "1" } },
        },
      },
    })

    const clientItem = wrapper.get("[data-testid='client-item-1']")
    expect(clientItem.classes()).toContain("bg-grey-darken-1")
  })
})
