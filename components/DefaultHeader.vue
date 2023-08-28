<template>
  <v-app-bar
    title="Quotable Clients"
    elevation="1"
    rounded
    class="ma-2 header"
    style="width: calc(100% - 16px)"
  >
    <div class="flex items-center">
      <nuxt-link to="/" class="mr-4 link">Home</nuxt-link>
      <nuxt-link to="/clients" class="mr-4 link">Dashboard</nuxt-link>
    </div>
  </v-app-bar>
</template>

<style scoped lang="scss">
.header {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(7.7px);
  transition-property: background;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
}

.link {
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: underline;
  }
}
</style>
