import axios from "axios"

export const client = axios.create({
  baseURL: "https://api.punkapi.com/v2/",
})

interface FilterParams {
  abv_gt: number
  abv_lt: number
  ibu_gt: number
  ibu_lt: number
  ebc_gt: number
  ebc_lt: number
  beer_name: string
  yeast: string
  brewed_before: string // "mm-yyyy"
  brewed_after: string // "mm-yyyy"
  hops: string
  malt: string
  food: string
  ids: string
}

export const list = async (params: Partial<FilterParams> = {}) => {
  const { data } = await client.get("beers", { params })
  return data
}

export const get = async (id: number) => {
  const { data } = await client.get(`beers/${id}`)
  return data[0]
}
