import "vuetify/styles"
import { mount, VueWrapper } from "@vue/test-utils"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const vuetify = createVuetify({
  ssr: true,
  components,
  directives,
})

global.ResizeObserver = require("resize-observer-polyfill")

export function mountWithVuetify(component: any, options?: any): VueWrapper<any> {
  const plugins = options?.global?.plugins ? [...options?.global?.plugins, vuetify] : [vuetify]
  return mount(
    {
      components: { InnerComponent: component },
      props: ["innerProps"],
      template: '<v-app><InnerComponent v-bind="innerProps" /></v-app>',
    },
    {
      ...options,
      props: {
        innerProps: options?.props || {},
      },
      global: {
        ...options?.global,
        plugins,
        stubs: {
          "nuxt-link": { template: "<a><slot /></a>" },
        },
      },
    },
  )
}
