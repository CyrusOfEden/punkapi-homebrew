<template lang="pug">
<svg v-if="loading" class="mt-12 animate-spin mx-auto w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>

main.container(v-else)
  nav.mb-8
    router-link.text-gray-500(to="/")
      <svg class="inline w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      span.text-lg.ml-2 Back

  article
    beer-card(v-bind="beer" expanded=true)
</template>

<style lang="sass" scoped>
.container
  @apply w-2/3 mx-auto p-8
</style>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import * as BeerAPI from "@/services/BeerAPI"
import BeerCard from "../components/BeerCard.vue"

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

@Component({
  watch: {
    $route: "loadBeer",
  },
  components: {
    BeerCard,
  },
})
export default class ViewBeer extends Vue {
  loading = true
  beer?: BeerAPI.Item

  async created() {
    await this.loadBeer()
  }

  async loadBeer() {
    const [beer] = await Promise.all([
      this.$store.dispatch("loadBeer", parseInt(this.$route.params.id)),
      wait(500),
    ])
    this.beer = beer
    this.loading = false
  }
}
</script>
