import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import LandingPage from "@/screens/LandingPage.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: LandingPage,
  },
  {
    path: "/beers",
    name: "Beers",
    component: () =>
      import(/* webpackChunkName: "ListBeers" */ "./screens/ListBeers.vue"),
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
