<template>
  <v-app class="transparent-background">
    <DefaultHeader />
    <v-layout class="mt-18 pa-8">
      <SearchDrawer />
      <v-main>
        <div class="pl-8">
          <slot />
        </div>
      </v-main>
    </v-layout>
    <DefaultFooter />
  </v-app>
</template>
