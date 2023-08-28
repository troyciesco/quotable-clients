import { describe, expect, test } from "vitest"
import Footer from "../DefaultFooter.vue"
import { mountWithVuetify } from "~/__tests__/setup"

describe("Footer.vue", () => {
  test("renders Footer component", () => {
    const wrapper = mountWithVuetify(Footer)
    expect(wrapper.exists()).toBe(true)
  })

  test("contains the correct attribution text", () => {
    const wrapper = mountWithVuetify(Footer)
    const expectedText = "Built with 🍕 by Troy Ciesco"
    expect(wrapper.text()).toContain(expectedText)
  })
})
