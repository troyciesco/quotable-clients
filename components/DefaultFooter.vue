<template>
  <v-footer class="flex-grow-0 mx-2 mb-2 footer" rounded elevation="1">
    <v-row justify="center" no-gutters>
      <v-col class="text-right" cols="12"> Built with 🍕 by Troy Ciesco </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped lang="scss">
.footer {
  background: rgba(255, 255, 255, 0.48);
  backdrop-filter: blur(7.7px);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
}
</style>
