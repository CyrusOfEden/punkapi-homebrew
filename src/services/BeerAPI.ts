import axios from "axios"
import camelCase from "lodash/camelCase"
import isObject from "lodash/isObject"
import isArray from "lodash/isArray"

const camelify = (
  thing: Array<unknown> | Record<string, unknown> | unknown,
): unknown => {
  if (isArray(thing)) {
    return (thing as Array<unknown>).map(camelify)
  }
  if (isObject(thing)) {
    const object: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(
      thing as Record<string, unknown>,
    )) {
      object[camelCase(key)] = camelify(value)
    }
    return object
  }
  return thing
}

export const client = axios.create({
  baseURL: "https://api.punkapi.com/v2/",
  transformResponse: [
    body => {
      const response = JSON.parse(body)
      return camelify(response)
    },
  ],
})

interface Measurement {
  value: number
  unit: string
}

interface Ingredient {
  name: string
  amount: Measurement
}

export interface Item {
  id: number
  name: string
  tagline: string
  firstBrewed: string // "mm/yyyy"
  description: string
  imageUrl: string
  abv: number
  ibu: number
  targetFg: number
  targetOg: number
  ebc: number
  srm: number
  ph: number
  attenuation_level: number
  volume: Measurement
  boilVolume: Measurement
  method: {
    mashTemp: Array<{ temp: Measurement; duration: number }>
    fermentation: { temp: Measurement }
  }
  ingredients: {
    malt: Ingredient[]
    hops: Array<Ingredient & { add: string; attribute: string }>
    yeast: string
  }
  foodPairing: string[]
  brewersTips: string
  contributedBy: string
}

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

export type ListParams = Partial<FilterParams>

export const list = async (params: ListParams = {}): Promise<Item[]> => {
  const { data } = await client.get("beers", { params })
  return data
}

export const get = async (id: number): Promise<Item> => {
  const { data } = await client.get(`beers/${id}`)
  return data[0]
}
