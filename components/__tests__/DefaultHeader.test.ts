import { describe, expect, test } from "vitest"
import DefaultHeader from "../DefaultHeader.vue"
import { mountWithVuetify } from "../../__tests__/setup"

describe("DefaultHeader.vue", () => {
  // Basic rendering test
  test("renders DefaultHeader component", () => {
    const wrapper = mountWithVuetify(DefaultHeader)
    expect(wrapper.exists()).toBe(true)
  })

  test("contains correct nuxt-link paths", () => {
    const wrapper = mountWithVuetify(DefaultHeader)

    const homeLink = wrapper.find('a[to="/"]')
    const dashboardLink = wrapper.find('a[to="/clients"]')

    expect(homeLink.exists()).toBe(true)
    expect(dashboardLink.exists()).toBe(true)
  })

  test("has the correct title", () => {
    const wrapper = mountWithVuetify(DefaultHeader)
    expect(wrapper.text()).toContain("Quotable Clients")
  })
})
