import { afterEach, expect, describe, vi, beforeEach, it } from "vitest"
import { flushPromises } from "@vue/test-utils"
import ClientPanel from "../ClientPanel.vue"
import { mountWithVuetify } from "../../__tests__/setup"

beforeEach(async () => {
  const VueRouter = await import("vue-router")

  // @ts-ignore
  VueRouter.useRoute.mockReturnValueOnce({
    params: { clientId: "1" },
  })
})
afterEach(() => {
  vi.restoreAllMocks()
})

vi.mock("vue-router")
vi.stubGlobal("useHead", vi.fn())

const SuspenseWrapper = {
  components: {
    ClientPanel,
  },
  template: `
      <Suspense>
        <template #default>
          <ClientPanel v-bind="$attrs" v-on="$attrs" />
        </template>
      </Suspense>
    `,
}

describe("ClientPanel.vue", () => {
  it("renders ClientPanel", async () => {
    const mockUseClientResult = {
      data: {
        id: 1,
        name: "Test Client",
        quote: "A test quote",
        title: "Mr.",
        nationality: "Ireland",
      },
      pending: false,
      error: null,
    }
    const mockUseClient = vi.fn().mockResolvedValue(mockUseClientResult)

    vi.stubGlobal("useClient", mockUseClient)

    const wrapper = mountWithVuetify(SuspenseWrapper, {
      global: {
        mocks: {
          $route: { params: { clientId: "1" } },
        },
      },
    })

    await flushPromises()

    const component = wrapper.findComponent(ClientPanel)
    expect(component.exists()).toBe(true)
  })

  it("displays client's details correctly", async () => {
    const mockUseClientResult = {
      data: {
        id: 1,
        name: "Test Client",
        quote: "A test quote",
        title: "Mr.",
        nationality: "Ireland",
      },
      pending: false,
      error: null,
    }
    const mockUseClient = vi.fn().mockResolvedValue(mockUseClientResult)

    vi.stubGlobal("useClient", mockUseClient)

    const wrapper = mountWithVuetify(SuspenseWrapper, {
      global: {
        mocks: {
          $route: { params: { clientId: "1" } },
        },
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain("Test Client")
    expect(wrapper.text()).toContain("A test quote")
    expect(wrapper.text()).toContain("Mr.")
    expect(wrapper.text()).toContain("from Ireland")
  })

  it("displays fallback text if no quote is available", async () => {
    const mockUseClientResult = {
      data: { id: 1, name: "Test Client", title: "Mr.", nationality: "Ireland" },
      pending: false,
      error: null,
    }
    const mockUseClient = vi.fn().mockResolvedValue(mockUseClientResult)

    vi.stubGlobal("useClient", mockUseClient)

    const wrapper = mountWithVuetify(SuspenseWrapper, {
      global: {
        mocks: {
          $route: { params: { clientId: "1" } },
        },
      },
    })

    await flushPromises()
    expect(wrapper.text()).toContain(
      "This client doesn't have any quotes yet. Ask them to say something quotable!",
    )
  })
})
