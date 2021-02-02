<template lang="pug">
  article.card
    img.h-48.w-36.mr-8.object-contain(v-bind:src="imageUrl")
    div.flex-1.details
      h2.text-2xl.text-gray-700.font-medium {{name}}
      h3.text-lg.text-blue-500.font-bold.mt-1.mb-3 {{tagline}}
      p.text-xl.text-gray-600 {{lede}}

      dl.details--expanded.mt-8(v-if="expanded")
        div
          dt Goes Great With
          dd
            ol
              li(v-for="pairing in foodPairing") {{pairing}}
</template>

<style lang="sass" scoped>
.card
  @apply col-span-1 flex flex-row bg-white rounded-lg shadow p-8 hover:shadow-lg
  transition: box-shadow 300ms ease-out

.details
  @apply flex-1 flex flex-col

.details--expanded
  @apply text-lg divide-y divide-gray-200 border-t-2
  & > div
    @apply sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4
  dt
    @apply text-gray-500 font-medium
  dd
    @apply text-gray-800 sm:mt-0 sm:col-span-2 mt-1
</style>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

const BeerCardProps = Vue.extend({
  props: {
    expanded: Boolean,
    name: String,
    tagline: String,
    imageUrl: String,
    description: String,
    foodPairing: Array,
    brewersTips: String,
    method: Object,
    ingredients: Object,
  },
})

@Component({ name: "beer-card" })
export default class BeerCard extends BeerCardProps {
  get lede() {
    if (this.expanded) {
      return this.description
    }
    const [intro] = this.description.split(". ")
    return intro.endsWith(".") ? intro : intro + "."
  }
}
</script>
