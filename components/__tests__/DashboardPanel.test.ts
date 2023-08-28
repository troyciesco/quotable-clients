import { describe, expect, it } from "vitest"
import DashboardPanel from "../DashboardPanel.vue"
import { mountWithVuetify } from "../../__tests__/setup"

describe("DashboardPanel", () => {
  it("renders DashboardPanel", () => {
    const wrapper = mountWithVuetify(DashboardPanel)

    const component = wrapper.findComponent(DashboardPanel)
    expect(component.exists()).toBe(true)
  })
})
