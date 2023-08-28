<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean
}>()
const { isLoading } = toRefs(props)
const debounceTimeout = ref<NodeJS.Timeout | null>(null)
const emit = defineEmits(["onSearch"])

const searchString = ref("")

const debounceSearch = () => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value)
  }
  debounceTimeout.value = setTimeout(() => {
    emit("onSearch", searchString.value)
  }, 300)
}
</script>
<template>
  <v-sheet class="mx-auto mt-10 px-2" max-width="320">
    <v-form>
      <v-text-field
        v-model="searchString"
        :loading="isLoading"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
        @input="debounceSearch()"
      ></v-text-field>
    </v-form>
  </v-sheet>
</template>
