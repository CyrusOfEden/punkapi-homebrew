<template lang="pug">
  main.card-container
    router-link(v-for="beer in beers" :key="beer.id" as="router-link" :to="`beers/${beer.id}`")
      beer-card(v-bind="beer" expanded=false)
</template>

<style lang="sass" scoped>
.card-container
  @apply grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2

.card
  @apply col-span-1 flex flex-row bg-white rounded-lg shadow p-8 hover:shadow-lg
  transition: box-shadow 300ms ease-out

.details
  @apply flex-1 flex flex-col
</style>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import BeerCard from "@/components/BeerCard.vue"

@Component({
  components: { BeerCard },
})
export default class ListBeers extends Vue {
  async created() {
    await this.$store.dispatch("loadBeers")
  }
  data() {
    return this.$store.state
  }
}
</script>
