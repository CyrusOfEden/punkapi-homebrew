import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import ListBeers from "@/screens/ListBeers.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Beers",
    component: ListBeers,
  },
  {
    path: "/beers/:id",
    name: "Beer",
    component: () =>
      import(/* webpackChunkName: "ViewBeer" */ "./screens/ViewBeer.vue"),
  },
]

const Router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default Router
